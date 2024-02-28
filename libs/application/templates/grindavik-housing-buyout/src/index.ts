import GrindavikHousingBuyoutTemplate from './lib/GrindavikHousingBuyoutTemplate'
import { GrindavikHousingBuyout } from './lib/dataSchema'

export const getDataProviders = () => import('./dataProviders/')
export type GrindavikHousingBuyoutAnswers = GrindavikHousingBuyout
export type {
  GrindavikHousingBuyoutApplication,
  GrindavikHousingBuyoutExternalData,
} from './types'

export * from './lib/messages'

export default GrindavikHousingBuyoutTemplate
