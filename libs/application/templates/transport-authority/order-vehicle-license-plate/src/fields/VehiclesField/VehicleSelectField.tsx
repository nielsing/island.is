import { FieldBaseProps, Option } from '@island.is/application/types'
import { useLocale } from '@island.is/localization'
import { FC, useCallback, useEffect, useState } from 'react'
import {
  ActionCard,
  AlertMessage,
  Box,
  Bullet,
  BulletList,
  InputError,
  SkeletonLoader,
} from '@island.is/island-ui/core'
import {
  VehiclesCurrentVehicle,
  VehiclesCurrentVehicleWithPlateOrderChecks,
} from '../../shared'
import { error, information } from '../../lib/messages'
import { SelectController } from '@island.is/shared/form-fields'
import { useFormContext } from 'react-hook-form'
import { getValueViaPath } from '@island.is/application/core'
import { GetVehicleDetailInput } from '@island.is/api/schema'
import { useLazyVehicleDetails } from '../../hooks/useLazyVehicleDetails'

interface VehicleSearchFieldProps {
  currentVehicleList: VehiclesCurrentVehicle[]
}

export const VehicleSelectField: FC<
  React.PropsWithChildren<VehicleSearchFieldProps & FieldBaseProps>
> = ({ currentVehicleList, application, errors, setFieldLoadingState }) => {
  const { formatMessage } = useLocale()
  const { setValue } = useFormContext()

  const vehicleValue = getValueViaPath(
    application.answers,
    'pickVehicle.vehicle',
    '',
  ) as string
  const currentVehicle = currentVehicleList[parseInt(vehicleValue, 10)]

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedVehicle, setSelectedVehicle] =
    useState<VehiclesCurrentVehicleWithPlateOrderChecks | null>(
      currentVehicle && currentVehicle.permno
        ? {
            permno: currentVehicle.permno,
            make: currentVehicle?.make || '',
            color: currentVehicle?.color || '',
            role: currentVehicle?.role,
            validationErrorMessages: [],
          }
        : null,
    )
  const [plate, setPlate] = useState<string>(
    getValueViaPath(application.answers, 'pickVehicle.plate', '') as string,
  )

  const getVehicleDetails = useLazyVehicleDetails()
  const getVehicleDetailsCallback = useCallback(
    async ({ permno }: GetVehicleDetailInput) => {
      const { data } = await getVehicleDetails({
        permno,
      })
      return data
    },
    [getVehicleDetails],
  )

  const onChange = (option: Option) => {
    const currentVehicle = currentVehicleList[parseInt(option.value, 10)]
    setIsLoading(true)
    if (currentVehicle.permno) {
      getVehicleDetailsCallback({
        permno: currentVehicle.permno,
      })
        .then((response) => {
          setSelectedVehicle({
            permno: currentVehicle.permno,
            make: currentVehicle?.make || '',
            color: currentVehicle?.color || '',
            role: currentVehicle?.role,
            validationErrorMessages:
              response?.vehiclePlateOrderChecksByPermno
                ?.validationErrorMessages,
          })

          const disabled =
            !!response?.vehiclePlateOrderChecksByPermno?.validationErrorMessages
              ?.length

          const permno = disabled ? '' : currentVehicle.permno || ''

          setPlate(permno)

          setValue('pickVehicle.plate', permno)

          setValue('plateSize.frontPlateSize', [])
          setValue('plateSize.rearPlateSize', [])

          setIsLoading(false)
        })
        .catch((error) => console.error(error))
    }
  }

  const disabled =
    selectedVehicle && !!selectedVehicle.validationErrorMessages?.length

  useEffect(() => {
    setFieldLoadingState?.(isLoading)
  }, [isLoading])

  return (
    <Box>
      <SelectController
        label={formatMessage(information.labels.pickVehicle.vehicle)}
        id="pickVehicle.vehicle"
        name="pickVehicle.vehicle"
        onSelect={(option) => onChange(option as Option)}
        options={currentVehicleList.map((vehicle, index) => {
          return {
            value: index.toString(),
            label: `${vehicle.make} - ${vehicle.permno}` || '',
          }
        })}
        placeholder={formatMessage(information.labels.pickVehicle.placeholder)}
        backgroundColor="blue"
      />
      <Box paddingTop={3}>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <Box>
            {selectedVehicle && (
              <ActionCard
                backgroundColor={disabled ? 'red' : 'blue'}
                heading={selectedVehicle.make || ''}
                text={`${selectedVehicle.color} - ${selectedVehicle.permno}`}
                focused={true}
              />
            )}
            {selectedVehicle && disabled && (
              <Box marginTop={2}>
                <AlertMessage
                  type="error"
                  title={formatMessage(
                    information.labels.pickVehicle.hasErrorTitle,
                  )}
                  message={
                    <Box>
                      <BulletList>
                        {!!selectedVehicle.validationErrorMessages?.length &&
                          selectedVehicle.validationErrorMessages?.map(
                            (err) => {
                              const defaultMessage = err.defaultMessage
                              const fallbackMessage =
                                formatMessage(
                                  error.validationFallbackErrorMessage,
                                ) +
                                ' - ' +
                                err.errorNo

                              return (
                                <Bullet>
                                  {defaultMessage || fallbackMessage}
                                </Bullet>
                              )
                            },
                          )}
                      </BulletList>
                    </Box>
                  }
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
      {!isLoading && plate.length === 0 && (errors as any)?.pickVehicle && (
        <InputError errorMessage={formatMessage(error.requiredValidVehicle)} />
      )}
    </Box>
  )
}
