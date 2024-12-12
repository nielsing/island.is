import gql from 'graphql-tag'
import { nestedFields, slices } from './fragments'

export const GET_GRANTS_QUERY = gql`
  query GetGrants($input: GetGrantsInput!) {
    getGrants(input: $input) {
      items {
        id
        name
        description
        applicationId
        applicationDeadlineStatus
        applicationUrl {
          slug
          type
        }
        dateFrom
        dateTo
        isOpen
        status
        categoryTags {
          id
          title
          genericTagGroup {
            title
          }
        }
        typeTag {
          id
          title
          genericTagGroup {
            title
          }
        }
        fund {
          id
          title
          link {
            slug
            type
          }
          featuredImage {
            id
            url
          }
          parentOrganization {
            id
            title
            logo {
              url
            }
          }
        }
      }
    }
  }
`

export const GET_GRANT_QUERY = gql`
  query GetGrant($input: GetSingleGrantInput!) {
    getSingleGrant(input: $input) {
      id
      name
      description
      applicationId
      applicationUrl {
          slug
          type
    }
      applicationDeadlineStatus
      status
      categoryTags {
        id
        title
      }
      typeTag {
        id
        title
      }
      supportLinks {
        id
        text
        url
        date
      }
      files {
          ...AssetFields
      }
      fund {
        id
        title
        link {
          slug
          type
        }
        featuredImage {
          id
          url
        }
        parentOrganization {
          id
          title
          logo {
            url
          }
        }
      }
      specialEmphasis {
        ...AllSlices
        ${nestedFields}
      }
      whoCanApply {
        ...AllSlices
        ${nestedFields}
      }
      howToApply {
        ...AllSlices
        ${nestedFields}
      }
      applicationDeadline {
        ...AllSlices
        ${nestedFields}
      }
      applicationHints {
        ...AllSlices
        ${nestedFields}
      }
    }
  }
  ${slices}
`
