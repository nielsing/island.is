import { useContext } from 'react'
import { useIntl } from 'react-intl'

import { Box, RadioButton, Text } from '@island.is/island-ui/core'
import * as constants from '@island.is/judicial-system/consts'
import { formatDate } from '@island.is/judicial-system/formatters'
import { PunishmentType } from '@island.is/judicial-system/types'
import { core } from '@island.is/judicial-system-web/messages'
import {
  BlueBox,
  FormContentContainer,
  FormContext,
  FormFooter,
  InfoCardClosedIndictment,
  PageHeader,
  PageLayout,
  PageTitle,
  RenderFiles,
} from '@island.is/judicial-system-web/src/components'
import { CaseFileCategory } from '@island.is/judicial-system-web/src/graphql/schema'
import {
  useDefendants,
  useFileList,
} from '@island.is/judicial-system-web/src/utils/hooks'

import { strings } from './IndictmentOverview.strings'

const IndictmentOverview = () => {
  const { workingCase, setWorkingCase } = useContext(FormContext)
  const { formatMessage } = useIntl()
  const { limitedAccessUpdateDefendant, updateDefendantState } = useDefendants()

  const { onOpen } = useFileList({
    caseId: workingCase.id,
  })

  const { defendants } = workingCase
  const defendant =
    defendants && defendants?.length > 0 ? defendants[0] : undefined

  const onChange = (updatedPunishmentType: PunishmentType) => {
    if (!defendant) return

    const defendantUpdate = {
      defendantId: defendant.id,
      caseId: workingCase.id,
      punishmentType: updatedPunishmentType,
    }
    updateDefendantState(defendantUpdate, setWorkingCase)
    limitedAccessUpdateDefendant(defendantUpdate)
  }

  const hasPunishmentType = (punishmentType: PunishmentType) =>
    defendant?.punishmentType === punishmentType

  return (
    <PageLayout workingCase={workingCase} isLoading={false} notFound={false}>
      <PageHeader title={formatMessage(strings.htmlTitle)} />
      <FormContentContainer>
        <PageTitle previousUrl={constants.PRISON_CASES_ROUTE}>
          {formatMessage(strings.title)}
        </PageTitle>
        <Box marginBottom={5}>
          {workingCase.courtCaseNumber && (
            <Box marginBottom={1}>
              <Text variant="h2" as="h2">
                {formatMessage(core.caseNumber, {
                  caseNumber: workingCase.courtCaseNumber,
                })}
              </Text>
            </Box>
          )}
          {workingCase.indictmentCompletedDate && (
            <Text variant="h4" as="h3">
              {formatMessage(strings.indictmentCompletedTitle, {
                date: formatDate(workingCase.indictmentCompletedDate, 'PPP'),
              })}
            </Text>
          )}
        </Box>
        <Box marginBottom={5}>
          <InfoCardClosedIndictment displayVerdictViewDate />
        </Box>
        <Box marginBottom={5}>
          <Text variant="h4" as="h4" marginBottom={1}>
            {formatMessage(strings.verdictTitle)}
          </Text>
          <RenderFiles
            onOpenFile={onOpen}
            caseFiles={
              workingCase.caseFiles?.filter(
                (file) => file.category === CaseFileCategory.RULING,
              ) || []
            }
          />
        </Box>
        <Box marginBottom={10}>
          <Text variant="h4" as="h4" marginBottom={2}>
            {formatMessage(strings.punishmentTypeTitle)}
          </Text>
          <BlueBox>
            <Box marginBottom={2}>
              <RadioButton
                id="punishment-type-imprisonment"
                name="punishmentTypeImprisonment"
                checked={hasPunishmentType(PunishmentType.IMPRISONMENT)}
                onChange={() => {
                  onChange(PunishmentType.IMPRISONMENT)
                }}
                large
                backgroundColor="white"
                label={formatMessage(strings.punishmentTypeImprisonment)}
              />
            </Box>
            <Box marginBottom={2}>
              <RadioButton
                id="punishment-type-probation"
                name="punishmentTypeProbation"
                checked={hasPunishmentType(PunishmentType.PROBATION)}
                onChange={() => {
                  onChange(PunishmentType.PROBATION)
                }}
                large
                backgroundColor="white"
                label={formatMessage(strings.punishmentTypeProbation)}
              />
            </Box>
            <Box marginBottom={2}>
              <RadioButton
                id="punishment-type-fine"
                name="punishmentTypeFine"
                checked={hasPunishmentType(PunishmentType.FINE)}
                onChange={() => {
                  onChange(PunishmentType.FINE)
                }}
                large
                backgroundColor="white"
                label={formatMessage(strings.punishmentTypeFine)}
              />
            </Box>
            <Box marginBottom={2}>
              <RadioButton
                id="punishment-type-indictment-ruling-decision-fine"
                name="punishmentTypeIndictmentRulingDecisionFine"
                checked={hasPunishmentType(
                  PunishmentType.INDICTMENT_RULING_DECISION_FINE,
                )}
                onChange={() => {
                  onChange(PunishmentType.INDICTMENT_RULING_DECISION_FINE)
                }}
                large
                backgroundColor="white"
                label={formatMessage(
                  strings.punishmentTypeIndictmentRulingDecisionFine,
                )}
              />
            </Box>
            <Box marginBottom={2}>
              <RadioButton
                id="punishment-type-indictment-signed-fine-invitation"
                name="punishmentTypeIndictmentSignedFineInvitation"
                checked={hasPunishmentType(
                  PunishmentType.SIGNED_FINE_INVITATION,
                )}
                onChange={() => {
                  onChange(PunishmentType.SIGNED_FINE_INVITATION)
                }}
                large
                backgroundColor="white"
                label={formatMessage(
                  strings.punishmentTypeSignedFineInvitation,
                )}
              />
            </Box>
          </BlueBox>
        </Box>
      </FormContentContainer>
      <FormContentContainer isFooter>
        <FormFooter previousUrl={constants.PRISON_CASES_ROUTE} hideNextButton />
      </FormContentContainer>
    </PageLayout>
  )
}

export default IndictmentOverview
