import { getValueViaPath } from '@island.is/application/core'
import { FormValue } from '@island.is/application/types'
import { YES } from './constants'

export const allowFakeCondition =
  (result = YES) =>
  (answers: FormValue) =>
    getValueViaPath(answers, 'fakeData.useFakeData') === result

export const fakeDataIsEnabled = allowFakeCondition(YES)

export const formatIsk = (value: number): string =>
  `${value.toLocaleString('is-IS')} kr.`
