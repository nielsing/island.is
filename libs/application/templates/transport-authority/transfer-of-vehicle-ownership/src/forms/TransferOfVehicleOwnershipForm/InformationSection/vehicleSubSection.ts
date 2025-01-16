import { Application } from '@island.is/api/schema'
import {
  buildMultiField,
  buildTextField,
  buildDateField,
  buildSubSection,
  buildHiddenInput,
} from '@island.is/application/core'
import { information } from '../../../lib/messages'
import { getSelectedVehicle } from '../../../utils'

export const vehicleSubSection = buildSubSection({
  id: 'vehicle',
  title: information.labels.vehicle.sectionTitle,
  children: [
    buildMultiField({
      id: 'vehicleMultiField',
      title: information.labels.vehicle.title,
      description: information.labels.vehicle.description,
      children: [
        buildTextField({
          id: 'vehicleInfo.plate',
          title: information.labels.vehicle.plate,
          backgroundColor: 'white',
          width: 'full',
          readOnly: true,
          defaultValue: (application: Application) => {
            const vehicle = getSelectedVehicle(
              application.externalData,
              application.answers,
            )
            return vehicle?.permno
          },
        }),
        buildTextField({
          id: 'vehicleInfo.type',
          title: information.labels.vehicle.type,
          backgroundColor: 'white',
          width: 'full',
          readOnly: true,
          defaultValue: (application: Application) => {
            const vehicle = getSelectedVehicle(
              application.externalData,
              application.answers,
            )
            return vehicle?.make
          },
        }),
        buildTextField({
          id: 'vehicle.salePrice',
          title: information.labels.vehicle.salePrice,
          width: 'full',
          variant: 'currency',
        }),
        buildDateField({
          id: 'vehicle.date',
          title: information.labels.vehicle.date,
          required: true,
          width: 'full',
          maxDate: new Date(),
          minDate: () => {
            const minDate = new Date()
            minDate.setDate(minDate.getDate() - 6)
            return minDate
          },
          defaultValue: new Date().toISOString().substring(0, 10),
        }),
        buildHiddenInput({
          id: 'vehicleMileage.requireMileage',
          defaultValue: (application: Application) => {
            const vehicle = getSelectedVehicle(
              application.externalData,
              application.answers,
            )
            return vehicle?.requireMileage || false
          },
        }),
        buildHiddenInput({
          id: 'vehicleMileage.mileageReading',
          defaultValue: (application: Application) => {
            const vehicle = getSelectedVehicle(
              application.externalData,
              application.answers,
            )
            return vehicle?.mileageReading || ''
          },
        }),
        buildTextField({
          id: 'vehicleMileage.value',
          title: information.labels.vehicle.mileage,
          width: 'full',
          variant: 'number',
          condition: (answers, externalData) => {
            const vehicle = getSelectedVehicle(externalData, answers)
            return vehicle?.requireMileage || false
          },
          placeholder(application) {
            const vehicle = getSelectedVehicle(
              application.externalData,
              application.answers,
            )
            return vehicle?.mileageReading
              ? `Síðasta skráning ${vehicle.mileageReading} Km`
              : ''
          },
        }),
      ],
    }),
  ],
})
