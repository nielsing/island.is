import { buildSubSection } from '@island.is/application/core'
import { applicantInformationMultiField } from '@island.is/application/ui-forms'

export const applicantInfoSubsection = buildSubSection({
  id: 'aplicantInfoSubsection',
  title: 'Aplicant Info Subsection',
  // Common form, fills automatically with applicant information
  children: [applicantInformationMultiField()],
})
