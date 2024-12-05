import { useLocale } from '@island.is/localization'
import { FormGroup } from '../components/form/FormGroup'
import { InputFields, OJOIFieldBaseProps } from '../lib/types'
import { error, publishing } from '../lib/messages'
import { OJOIDateController } from '../components/input/OJOIDateController'
import { useApplication } from '../hooks/useUpdateApplication'
import {
  AlertMessage,
  Box,
  Icon,
  Inline,
  Select,
  SkeletonLoader,
  Tag,
} from '@island.is/island-ui/core'
import { useCategories } from '../hooks/useCategories'
import { MINIMUM_WEEKDAYS, OJOI_INPUT_HEIGHT } from '../lib/constants'
import set from 'lodash/set'
import addYears from 'date-fns/addYears'
import { addWeekdays, getFastTrack, getWeekendDates } from '../lib/utils'
import { useState } from 'react'
import { baseEntitySchema } from '../lib/dataSchema'
import { z } from 'zod'

export const Publishing = ({ application }: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()
  const [isUpdatingCategory, setIsUpdatingCategory] = useState(false)

  const { application: currentApplication, updateApplication } = useApplication(
    {
      applicationId: application.id,
    },
  )

  const {
    categories,
    error: categoryError,
    loading: categoryLoading,
  } = useCategories()

  const today = new Date()
  const maxEndDate = addYears(today, 5)
  const minDate = new Date()
  if (minDate.getHours() >= 12) {
    minDate.setDate(minDate.getDate() + 1)
  }

  const defaultDate = currentApplication.answers.advert?.requestedDate
    ? new Date(currentApplication.answers.advert.requestedDate)
        .toISOString()
        .split('T')[0]
    : addWeekdays(today, MINIMUM_WEEKDAYS).toISOString().split('T')[0]

  const [fastTrack, setFastTrack] = useState(
    getFastTrack(new Date(defaultDate)).fastTrack,
  )

  const onCategoryChange = (value?: z.infer<typeof baseEntitySchema>) => {
    setIsUpdatingCategory(true)
    if (!value) {
      setIsUpdatingCategory(false)
      return
    }

    const currentAnswers = structuredClone(currentApplication.answers)
    const selectedCategories = currentAnswers.advert?.categories || []

    const newCategories = selectedCategories.find((cat) => cat.id === value.id)
      ? selectedCategories.filter((c) => c.id !== value.id)
      : [...selectedCategories, value]

    const updatedAnswers = set(
      currentAnswers,
      InputFields.advert.categories,
      newCategories,
    )

    updateApplication(updatedAnswers, () => {
      setIsUpdatingCategory(false)
    })
  }

  const mappedCategories = categories?.map((c) => ({
    label: c.title,
    value: c,
  }))

  const selectedCategories = currentApplication.answers.advert?.categories

  return (
    <FormGroup title={f(publishing.headings.date)}>
      <Box width="half">
        <OJOIDateController
          name={InputFields.advert.requestedDate}
          label={f(publishing.inputs.datepicker.label)}
          placeholder={f(publishing.inputs.datepicker.placeholder)}
          applicationId={application.id}
          excludeDates={getWeekendDates(today, maxEndDate)}
          minDate={minDate}
          maxDate={maxEndDate}
          defaultValue={defaultDate}
          onChange={(date) => {
            const fastTrack = getFastTrack(new Date(date)).fastTrack
            setFastTrack(fastTrack)
          }}
        />
      </Box>
      <Box width="half">
        {categoryLoading ? (
          <SkeletonLoader repeat={2} height={OJOI_INPUT_HEIGHT} space={2} />
        ) : categoryError ? (
          <AlertMessage
            type="error"
            message={f(error.fetchFailedTitle)}
            title={f(error.fetchFailedTitle)}
          />
        ) : (
          <>
            <Select
              size="sm"
              label={f(publishing.inputs.contentCategories.label)}
              backgroundColor="blue"
              options={mappedCategories}
              defaultValue={mappedCategories?.[0]}
              onChange={(opt) => onCategoryChange(opt?.value)}
            />
            <Box marginTop={1}>
              <Inline space={1} flexWrap="wrap">
                {selectedCategories?.map((c) => (
                  <Tag
                    disabled={isUpdatingCategory}
                    onClick={() => onCategoryChange(c)}
                    outlined
                    key={c.id}
                  >
                    <Box display="flex" alignItems="center">
                      {c.title}
                      <Icon icon="close" size="small" />
                    </Box>
                  </Tag>
                ))}
              </Inline>
            </Box>
          </>
        )}
      </Box>
      {fastTrack && (
        <AlertMessage
          type="info"
          title={f(publishing.headings.fastTrack)}
          message={f(publishing.headings.fastTrackMessage)}
        />
      )}
    </FormGroup>
  )
}
