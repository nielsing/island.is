import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useContext } from 'react'
import { useForm } from 'react-hook-form'

import { Box, Breadcrumbs, Stack, toast } from '@island.is/island-ui/core'
import {
  hasPermission,
  hasMunicipalityRole,
} from '@island.is/skilavottord-web/auth/utils'
import { NotFound } from '@island.is/skilavottord-web/components'
import { PartnerPageLayout } from '@island.is/skilavottord-web/components/Layouts'
import { UserContext } from '@island.is/skilavottord-web/context'
import { Role } from '@island.is/skilavottord-web/graphql/schema'
import { useI18n } from '@island.is/skilavottord-web/i18n'

import NavigationLinks from '@island.is/skilavottord-web/components/NavigationLinks/NavigationLinks'
import PageHeader from '@island.is/skilavottord-web/components/PageHeader/PageHeader'
import { RecyclingCompanyForm } from '../components'
import { SkilavottordRecyclingPartnersQuery } from '../RecyclingCompanies'

export const CreateSkilavottordRecyclingPartnerMutation = gql`
  mutation createSkilavottordRecyclingPartnerMutation(
    $input: CreateRecyclingPartnerInput!
  ) {
    createSkilavottordRecyclingPartner(input: $input) {
      companyId
      companyName
      email
      nationalId
      address
      postnumber
      city
      website
      phone
      active
      isMunicipality
      municipalityId
    }
  }
`

const RecyclingCompanyCreate: FC<React.PropsWithChildren<unknown>> = () => {
  const { user } = useContext(UserContext)
  const router = useRouter()
  const {
    t: { recyclingCompanies: t, municipalities: mt, routes },
  } = useI18n()

  let breadcrumbTitle = t.title
  let title = t.recyclingCompany.add.title
  let info = t.recyclingCompany.add.info
  let activeSection = 2
  let route = routes.recyclingCompanies.baseRoute

  const isMunicipalityPage = router.route === routes.municipalities.add

  // Show only recycling companies for the municipality
  let partnerId = null
  if (hasMunicipalityRole(user?.role)) {
    partnerId = user?.partnerId
  }

  // If coming from municipality page
  if (isMunicipalityPage) {
    activeSection = 1
    breadcrumbTitle = mt.title
    title = mt.municipality.add.title
    info = mt.municipality.add.info
    route = routes.municipalities.baseRoute
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: isMunicipalityPage
      ? { isMunicipality: isMunicipalityPage }
      : { isMunicipality: isMunicipalityPage, municipalityId: partnerId },
  })

  const [createSkilavottordRecyclingPartner] = useMutation(
    CreateSkilavottordRecyclingPartnerMutation,
    {
      onError: (_) => {
        // Hide Runtime error message. The error message is already shown to the user in toast.
      },
      refetchQueries: [
        {
          query: SkilavottordRecyclingPartnersQuery,
          variables: { isMunicipalityPage, municipalityId: partnerId },
        },
      ],
    },
  )

  if (!user) {
    return null
  } else if (!hasPermission('recyclingCompanies', user?.role as Role)) {
    return <NotFound />
  }

  const handleCreateRecyclingPartner = handleSubmit(async (input) => {
    if (typeof input.municipalityId !== 'string') {
      input.municipalityId = input.municipalityId?.value || ''
    }

    const { errors } = await createSkilavottordRecyclingPartner({
      variables: {
        input: {
          ...input,
          active: !!input.active,
          isMunicipality: !!input.isMunicipality,
        },
      },
    })
    if (!errors) {
      if (isMunicipalityPage) {
        router.push(routes.municipalities.baseRoute).then(() => {
          toast.success(t.recyclingCompany.add.added)
        })
      } else {
        router.push(routes.recyclingCompanies.baseRoute).then(() => {
          toast.success(t.recyclingCompany.add.added)
        })
      }
    }
  })

  const handleCancel = () => {
    if (isMunicipalityPage) {
      router.push(routes.municipalities.baseRoute)
    } else {
      router.push(routes.recyclingCompanies.baseRoute)
    }
  }

  return (
    <PartnerPageLayout side={<NavigationLinks activeSection={activeSection} />}>
      <Stack space={4}>
        <Breadcrumbs
          items={[
            { title: 'Ísland.is', href: routes.home['recyclingCompany'] },
            {
              title: breadcrumbTitle,
              href: route,
            },
            {
              title: t.recyclingCompany.add.breadcrumb,
            },
          ]}
          renderLink={(link, item) => {
            return item?.href ? (
              <NextLink href={item?.href} legacyBehavior>
                {link}
              </NextLink>
            ) : (
              link
            )
          }}
        />

        <PageHeader title={title} info={info} />
      </Stack>
      <Box marginTop={7}>
        <RecyclingCompanyForm
          onSubmit={handleCreateRecyclingPartner}
          onCancel={handleCancel}
          control={control}
          errors={errors}
          isMunicipalityPage={isMunicipalityPage}
        />
      </Box>
    </PartnerPageLayout>
  )
}
export default RecyclingCompanyCreate
