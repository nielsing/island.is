import { defineMessages } from 'react-intl'

export const school = {
  general: defineMessages({
    sectionTitle: {
      id: 'ss.application:school.general.sectionTitle',
      defaultMessage: 'Val á skóla',
      description: 'Title of school selection section',
    },
    pageTitle: {
      id: 'ss.application:school.general.pageTitle',
      defaultMessage: 'Val á skóla',
      description: 'Title of school selection page',
    },
    description: {
      id: 'ss.application:school.general.description',
      defaultMessage:
        'Vinsamlegast veldu hvaða skóla og námsleið þú vilt sækja um.',
      description: 'Description of school selection page',
    },
  }),
  selection: defineMessages({
    schoolLabel: {
      id: 'ss.application:school.selection.schoolLabel',
      defaultMessage: 'Skóli',
      description: 'School select label',
    },
    firstProgramLabel: {
      id: 'ss.application:school.selection.firstProgramLabel',
      defaultMessage: 'Braut',
      description: 'First program select label',
    },
    secondProgramLabel: {
      id: 'ss.application:school.selection.secondProgramLabel',
      defaultMessage: 'Braut til vara',
      description: 'Second program select label',
    },
    thirdLanguageLabel: {
      id: 'ss.application:school.selection.thirdLanguageLabel',
      defaultMessage: 'Þriðja tungumál ef við á',
      description: 'Third language select label',
    },
    nordicLanguageLabel: {
      id: 'ss.application:school.selection.nordicLanguageLabel',
      defaultMessage: 'Norðurlandamál (ef annað en danska)',
      description: 'Nordic language select label',
    },
    nordicLanguageAlertMessage: {
      id: 'ss.application:school.selection.nordicLanguageAlertMessage',
      defaultMessage:
        'Þetta er aðeins valmöguleiki ef nemandinn er með bakgrunn í öðru norðurlandamáli en dönsku. Önnur norðurlandamál eru yfirleitt kennd fyrir utan stundarskrá og stundum í öðrum skóla.',
      description: 'Nordic language alert message',
    },
    requestDormitoryCheckboxLabel: {
      id: 'ss.application:school.selection.requestDormitoryCheckboxLabel',
      defaultMessage: 'Ég óska eftir heimavist',
      description: 'Request dormitory checkbox label',
    },
    schoolDuplicateError: {
      id: 'ss.application:school.selection.schoolDuplicateError',
      defaultMessage: 'Það má ekki velja sama skóla tvisvar',
      description: 'School duplicate error',
    },
    programDuplicateError: {
      id: 'ss.application:school.selection.programDuplicateError',
      defaultMessage: 'Það má ekki velja sömu braut tvisvar í sama vali',
      description: 'Program duplicate error',
    },
  }),
  firstSelection: defineMessages({
    subtitle: {
      id: 'ss.application:school.firstSelection.subtitle',
      defaultMessage: 'Fyrsta val',
      description: 'First selection sub title',
    },
  }),
  secondSelection: defineMessages({
    subtitle: {
      id: 'ss.application:school.secondSelection.subtitle',
      defaultMessage: 'Annað val',
      description: 'Second selection sub title',
    },
    addSubtitle: {
      id: 'ss.application:school.secondSelection.addSubtitle',
      defaultMessage: 'Viltu bæta við öðrum skóla?',
      description: 'Add second selection sub title',
    },
  }),
  thirdSelection: defineMessages({
    subtitle: {
      id: 'ss.application:school.thirdSelection.subtitle',
      defaultMessage: 'Þriðja val',
      description: 'Third selection sub title',
    },
    addSubtitle: {
      id: 'ss.application:school.thirdSelection.addSubtitle',
      defaultMessage: 'Viltu bæta við þriðja skólanum?',
      description: 'Add third selection sub title',
    },
    addDescription: {
      id: 'ss.application:school.thirdSelection.addDescription',
      defaultMessage:
        'Ákveðnir framhaldsskólar á Íslandi fá jafnan fleiri umsóknir en pláss leyfa. Til að auka líkur á að komast inn í skóla að þínu vali getur þú bætt inn þriðja skólanum. Mikilvægt er að kynna sér inntökuskilyrði hvers skóla vandlega. Fáir þú ekki inn í einhverjum þeirra skóla sem þú sækir um mun Miðstöð menntunar og skólaþjónustu útvega þér skólapláss.',
      description: 'Add third selection description',
    },
    addButtonLabel: {
      id: 'ss.application:school.thirdSelection.addButtonLabel',
      defaultMessage: 'Bæta við vali á skóla',
      description: 'Third selection add button label',
    },
    removeButtonLabel: {
      id: 'ss.application:school.thirdSelection.removeButtonLabel',
      defaultMessage: 'Fjarlægja vali á skóla',
      description: 'Third selection remove button label',
    },
  }),
}
