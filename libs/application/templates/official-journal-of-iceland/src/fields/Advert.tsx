import { InputFields, OJOIFieldBaseProps } from '../lib/types'
import { Stack } from '@island.is/island-ui/core'
import { FormGroup } from '../components/form/FormGroup'
import { advert } from '../lib/messages'
import { useDepartments } from '../hooks/useDepartments'
import { OJOISelectController } from '../components/input/OJOISelectController'
import { useTypes } from '../hooks/useTypes'
import { OJOIInputController } from '../components/input/OJOIInputController'
import { OJOIHtmlController } from '../components/input/OJOIHtmlController'
import { useFormContext } from 'react-hook-form'
import { useApplication } from '../hooks/useUpdateApplication'
import set from 'lodash/set'
import { HTMLEditor } from '../components/htmlEditor/HTMLEditor'
import { cleanTypename, getAdvertMarkup } from '../lib/utils'
import { DEPARTMENT_A } from '../lib/constants'

export const Advert = ({ application }: OJOIFieldBaseProps) => {
  const { setValue } = useFormContext()
  const { application: currentApplication } = useApplication({
    applicationId: application.id,
  })

  const { departments, loading: loadingDepartments } = useDepartments()

  const defaultDepartment =
    application.answers?.advert?.department?.id || DEPARTMENT_A

  const { getLazyMainTypes, mainTypes, mainTypeLoading } = useTypes({
    initalDepartmentId: defaultDepartment,
    pageSize: 300,
  })

  const departmentOptions = departments?.map((d) => ({
    label: d.title,
    value: {
      id: d.id,
      title: d.title,
      slug: d.slug,
    },
  }))

  const mainTypeOptions = mainTypes?.map((d) => ({
    label: d.title,
    value: d,
  }))

  const currentTypes =
    currentApplication?.answers?.advert?.mainType?.types?.map((d) => ({
      label: d.title,
      value: d,
    })) ?? []

  const titlePreview = getAdvertMarkup({
    type: currentApplication.answers.advert?.type?.title,
    title: currentApplication.answers.advert?.title,
  })

  return (
    <Stack space={[2, 2, 3]}>
      <FormGroup>
        <Stack space={[2, 2, 3]}>
          <OJOISelectController
            width="half"
            applicationId={application.id}
            name={InputFields.advert.department}
            label={advert.inputs.department.label}
            placeholder={advert.inputs.department.placeholder}
            loading={loadingDepartments}
            options={departmentOptions}
            defaultValue={application.answers?.advert?.department}
            onBeforeChange={(answers) => {
              setValue(InputFields.advert.type, null)
              set(answers, InputFields.advert.type, null)
            }}
            onChange={(value) =>
              getLazyMainTypes({
                variables: {
                  params: {
                    department: value.id,
                    pageSize: 100,
                  },
                },
              })
            }
          />

          <OJOISelectController
            width="half"
            applicationId={application.id}
            name={InputFields.advert.mainType}
            label={advert.inputs.mainType.label}
            placeholder={advert.inputs.mainType.placeholder}
            loading={mainTypeLoading}
            options={mainTypeOptions}
            onBeforeChange={(answers, value) => {
              if (value.types.length === 1) {
                const cleaned = cleanTypename(value.types[0])
                set(answers, InputFields.advert.type, cleaned)
              } else {
                set(answers, InputFields.advert.type, null)
              }
            }}
          />

          {currentTypes.length > 1 && (
            <OJOISelectController
              width="half"
              applicationId={application.id}
              name={InputFields.advert.type}
              label={advert.inputs.type.label}
              placeholder={advert.inputs.type.placeholder}
              options={currentTypes}
            />
          )}

          <OJOIInputController
            applicationId={application.id}
            name={InputFields.advert.title}
            label={advert.inputs.title.label}
            defaultValue={application.answers?.advert?.title}
            placeholder={advert.inputs.title.placeholder}
            textarea={true}
            maxLength={600}
          />

          <HTMLEditor
            key={`${currentApplication.answers.advert?.type?.title}-${currentApplication.answers.advert?.title}`}
            name="preview.title"
            config={{ toolbar: false }}
            readOnly={true}
            value={titlePreview}
          />
        </Stack>
      </FormGroup>

      <FormGroup title={advert.headings.materialForPublication}>
        <Stack space={[2, 2, 3]}>
          <OJOISelectController
            name={InputFields.misc.selectedTemplate}
            label={advert.inputs.template.label}
            placeholder={advert.inputs.template.placeholder}
            applicationId={application.id}
            disabled={true}
          />

          <OJOIHtmlController
            applicationId={application.id}
            name={InputFields.advert.html}
            defaultValue={currentApplication.answers?.advert?.html}
            // we have use setValue from useFormContext to update the value
            // because this is not a controlled component
            onChange={(value) => setValue(InputFields.advert.html, value)}
          />
        </Stack>
      </FormGroup>
    </Stack>
  )
}
