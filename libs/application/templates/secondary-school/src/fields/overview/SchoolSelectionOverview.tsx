import { FieldBaseProps } from '@island.is/application/types'
import { FC } from 'react'
import { Box, GridColumn, GridRow, Text } from '@island.is/island-ui/core'
import { useLocale } from '@island.is/localization'
import { overview } from '../../lib/messages'
import { SecondarySchoolAnswers } from '../..'
import { getTranslatedProgram, Routes, States } from '../../utils'
import { ReviewGroup } from '../../components/ReviewGroup'
import { getValueViaPath } from '@island.is/application/core'

export const SchoolSelectionOverview: FC<FieldBaseProps> = ({
  application,
  goToScreen,
}) => {
  const { formatMessage, lang } = useLocale()

  const selection = getValueViaPath<SecondarySchoolAnswers['selection']>(
    application.answers,
    'selection',
  )

  const onClick = (page: string) => {
    if (goToScreen) goToScreen(page)
  }

  return (
    <ReviewGroup
      handleClick={() => onClick(Routes.SCHOOL)}
      editMessage={formatMessage(overview.general.editMessage)}
      title={formatMessage(overview.selection.subtitle)}
      isEditable={application.state === States.DRAFT}
    >
      <Box>
        <GridRow>
          {/* First selection */}
          <GridColumn span={selection?.[1]?.include ? '1/2' : '1/1'}>
            {selection?.[1]?.include && (
              <Text variant="h5">
                {formatMessage(overview.selection.firstSubtitle)}
              </Text>
            )}
            <Text>{selection?.[0]?.school?.name}</Text>
            <Text>
              {formatMessage(overview.selection.firstProgramLabel)}:{' '}
              {getTranslatedProgram(lang, selection?.[0]?.firstProgram)}
            </Text>
            {!!selection?.[0]?.secondProgram?.id && (
              <Text>
                {formatMessage(overview.selection.secondProgramLabel)}:{' '}
                {getTranslatedProgram(lang, selection?.[0]?.secondProgram)}
              </Text>
            )}
            {!!selection?.[0]?.thirdLanguage?.code && (
              <Text>
                {formatMessage(overview.selection.thirdLanguageLabel)}:{' '}
                {selection?.[0]?.thirdLanguage?.name}
              </Text>
            )}
            {!!selection?.[0]?.nordicLanguage?.code && (
              <Text>
                {formatMessage(overview.selection.nordicLanguageLabel)}:{' '}
                {selection?.[0]?.nordicLanguage?.name}
              </Text>
            )}
          </GridColumn>

          {/* Second selection */}
          {selection?.[1]?.include && (
            <GridColumn span="1/2">
              <Text variant="h5">
                {formatMessage(overview.selection.secondSubtitle)}
              </Text>
              <Text>{selection?.[1]?.school?.name}</Text>
              <Text>
                {formatMessage(overview.selection.firstProgramLabel)}:{' '}
                {getTranslatedProgram(lang, selection?.[1]?.firstProgram)}
              </Text>
              {!!selection?.[1]?.secondProgram?.id && (
                <Text>
                  {formatMessage(overview.selection.secondProgramLabel)}:{' '}
                  {getTranslatedProgram(lang, selection?.[1]?.secondProgram)}
                </Text>
              )}
              {!!selection?.[1]?.thirdLanguage?.code && (
                <Text>
                  {formatMessage(overview.selection.thirdLanguageLabel)}:{' '}
                  {selection?.[1]?.thirdLanguage?.name}
                </Text>
              )}{' '}
              {!!selection?.[1]?.nordicLanguage?.code && (
                <Text>
                  {formatMessage(overview.selection.nordicLanguageLabel)}:{' '}
                  {selection?.[1]?.nordicLanguage?.name}
                </Text>
              )}
            </GridColumn>
          )}

          {/* Third selection */}
          {selection?.[2]?.include && (
            <Box marginTop={2}>
              <GridColumn span="1/2">
                <Text variant="h5">
                  {formatMessage(overview.selection.thirdSubtitle)}
                </Text>
                <Text>{selection?.[2]?.school?.name}</Text>
                <Text>
                  {formatMessage(overview.selection.firstProgramLabel)}:{' '}
                  {getTranslatedProgram(lang, selection?.[2]?.firstProgram)}
                </Text>
                {!!selection?.[2]?.secondProgram?.id && (
                  <Text>
                    {formatMessage(overview.selection.secondProgramLabel)}:{' '}
                    {getTranslatedProgram(lang, selection?.[2]?.secondProgram)}
                  </Text>
                )}
                {!!selection?.[2]?.thirdLanguage?.code && (
                  <Text>
                    {formatMessage(overview.selection.thirdLanguageLabel)}:{' '}
                    {selection?.[2]?.thirdLanguage?.name}
                  </Text>
                )}
                {!!selection?.[2]?.nordicLanguage?.code && (
                  <Text>
                    {formatMessage(overview.selection.nordicLanguageLabel)}:{' '}
                    {selection?.[2]?.nordicLanguage?.name}
                  </Text>
                )}
              </GridColumn>
              <GridColumn span="1/2"></GridColumn>
            </Box>
          )}
        </GridRow>
      </Box>
    </ReviewGroup>
  )
}
