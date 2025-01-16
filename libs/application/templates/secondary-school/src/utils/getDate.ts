import { getValueViaPath } from '@island.is/application/core'
import { FormValue } from '@island.is/application/types'
import { SecondarySchoolAnswers } from '..'

const getRegistrationEndDates = (formValue: FormValue): Date[] => {
  const selection = getValueViaPath<SecondarySchoolAnswers['selection']>(
    formValue,
    'selection',
  )

  return [
    selection?.first?.firstProgram?.registrationEndDate,
    selection?.first?.secondProgram?.registrationEndDate,
    selection?.second?.firstProgram?.registrationEndDate,
    selection?.second?.secondProgram?.registrationEndDate,
    selection?.third?.firstProgram?.registrationEndDate,
    selection?.third?.secondProgram?.registrationEndDate,
  ]
    .filter((x) => !!x)
    .map((x) => (x ? new Date(x) : new Date()))
}

export const getFirstRegistrationEndDate = (answers: FormValue): Date => {
  return getRegistrationEndDates(answers).sort(
    (a, b) => a.getTime() - b.getTime(), // ascending order
  )[0]
}

export const getLastRegistrationEndDate = (answers: FormValue): Date => {
  return getRegistrationEndDates(answers).sort(
    (a, b) => b.getTime() - a.getTime(), // descending order
  )[0]
}

export const getEndOfDayUTCDate = (date: Date | undefined): Date => {
  if (!date) date = new Date()

  // Clone the date to avoid mutating the original
  const newDate = new Date(date.getTime())

  // Set the time to 23:59:59.999 UTC
  newDate.setUTCHours(23, 59, 59, 999)

  return newDate
}
