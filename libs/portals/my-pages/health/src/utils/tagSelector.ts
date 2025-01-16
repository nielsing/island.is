import { HealthDirectorateVaccinationStatusEnum } from '@island.is/api/schema'
import { isDefined } from 'class-validator'
import type { TagVariant } from '@island.is/island-ui/core'

// Tag selector for expandable, sorting table in vaccinations
export const tagSelector = (
  status?: HealthDirectorateVaccinationStatusEnum,
): TagVariant => {
  if (!isDefined(status)) return 'blue'

  switch (status) {
    case HealthDirectorateVaccinationStatusEnum.complete:
      return 'blue'
    case HealthDirectorateVaccinationStatusEnum.expired:
      return 'blue'
    case HealthDirectorateVaccinationStatusEnum.incomplete:
      return 'blue'
    case HealthDirectorateVaccinationStatusEnum.rejected:
      return 'purple'
    case HealthDirectorateVaccinationStatusEnum.undetermined:
      return 'purple'
    case HealthDirectorateVaccinationStatusEnum.undocumented:
      return 'purple'
    case HealthDirectorateVaccinationStatusEnum.unvaccinated:
      return 'red'
    case HealthDirectorateVaccinationStatusEnum.valid:
      return 'mint'
    default:
      return 'blue'
  }
}
