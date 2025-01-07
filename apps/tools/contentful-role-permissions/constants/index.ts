export const contentfulManagementAccessToken =
  process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
export const spaceId = process.env.CONTENTFUL_SPACE || '8k0h54kbe6bj'
export const environmentId = process.env.CONTENTFUL_ENVIRONMENT || 'master'

export const DEFAULT_EDITABLE_ENTRY_TYPE_IDS = [
  'accordionSlice',
  'alertBanner',
  'article',
  'subArticle',
  'embeddedVideo',
  'enhancedAsset',
  'faqList',
  'featuredArticles',
  'introLinkImage',
  'link',
  'linkUrl',
  'news',
  'oneColumnText',
  'organizationSubpage',
  'organizationPage',
  'overviewLinks',
  'processEntry',
  'questionAndAnswer',
  'sidebarCard',
  'sliceConnectedComponent',
  'twoColumnText',
  'emailSignup',
  'bigBulletList',
  'districts',
  'iconBullet',
  'form',
  'formField',
  'genericTag',
  'genericTagGroup',
  'graphCard',
  'grantCardsList',
  'latestNewsSlice',
  'linkGroup',
  'menuLink',
  'menuLinkWithChildren',
  'multipleStatistics',
  'numberBullet',
  'numberBulletSection',
  'statistic',
  'statistics',
  'tabContent',
  'tabSection',
  'organization',
  'chart',
  'chartComponent',
  'event',
  'latestEventsSlice',
  'featuredEvents',
  'price',
  'sectionWithImage',
  'sliceDropdown',
  'teamList',
  'teamMember',
  'namespace',
  'tableSlice',
]

export const DEFAULT_READ_ONLY_ENTRY_IDS = [
  'article',
  'articleCategory',
  'articleGroup',
  'articleSubgroup',
  'subArticle',
  'organizationTag',
  'uiConfiguration',
  'featuredSupportQNAs',
  'footerItem',
]
