import { Auth, AuthMiddleware, User } from '@island.is/auth-nest-tools'
import { Injectable } from '@nestjs/common'
import {
  ApiProtectedV1IncomePlanTemporaryCalculationsPostRequest,
  ApiProtectedV1IncomePlanWithholdingTaxGetRequest,
  ApiProtectedV1PensionCalculatorPostRequest,
  ApplicantApi,
  ApplicationApi,
  GeneralApi,
  IncomePlanApi,
  PaymentPlanApi,
  PensionCalculatorApi,
  DeathBenefitsApi,
  TrWebApiServicesDomainApplicationsModelsCreateApplicationFromPaperReturn,
  TrWebCommonsExternalPortalsApiModelsApplicantApplicantInfoReturn,
  TrWebCommonsExternalPortalsApiModelsApplicationsIsEligibleForApplicationReturn,
  TrWebCommonsExternalPortalsApiModelsDocumentsDocument,
  TrWebCommonsExternalPortalsApiModelsIncomePlanExternalIncomeTypeDto,
  TrWebCommonsExternalPortalsApiModelsIncomePlanIncomePlanConditionsDto,
  TrWebCommonsExternalPortalsApiModelsIncomePlanWithholdingTaxDto,
  TrWebCommonsExternalPortalsApiModelsPaymentPlanLegitimatePayments,
  TrWebCommonsExternalPortalsApiModelsPaymentPlanPaymentPlanDto,
  TrWebApiServicesUseCaseDeathBenefitsModelsExternalSpousalInfo,
} from '../../gen/fetch'
import { handle404 } from '@island.is/clients/middlewares'
import { ApplicationWriteApi } from './socialInsuranceAdministrationClient.type'
import { IncomePlanDto, mapIncomePlanDto } from './dto/incomePlan.dto'

@Injectable()
export class SocialInsuranceAdministrationClientService {
  constructor(
    private readonly applicationApi: ApplicationApi,
    private readonly applicationWriteApi: ApplicationWriteApi,
    private readonly applicantApi: ApplicantApi,
    private readonly paymentPlanApi: PaymentPlanApi,
    private readonly currencyApi: GeneralApi,
    private readonly pensionCalculatorApi: PensionCalculatorApi,
    private readonly deathBenefitsApi: DeathBenefitsApi,
    private readonly incomePlanApi: IncomePlanApi,
  ) {}

  private applicationApiWithAuth = (user: User) =>
    this.applicationApi.withMiddleware(new AuthMiddleware(user as Auth))

  private applicationWriteApiWithAuth = (user: User) =>
    this.applicationWriteApi.withMiddleware(new AuthMiddleware(user as Auth))

  private applicantApiWithAuth = (user: User) =>
    this.applicantApi.withMiddleware(new AuthMiddleware(user as Auth))

  private currencyApiWithAuth = (user: User) =>
    this.currencyApi.withMiddleware(new AuthMiddleware(user as Auth))

  private paymentPlanApiWithAuth = (user: User) =>
    this.paymentPlanApi.withMiddleware(new AuthMiddleware(user as Auth))

  private deathBenefitsApiWithAuth = (user: User) =>
    this.deathBenefitsApi.withMiddleware(new AuthMiddleware(user as Auth))

  private incomePlanApiWithAuth = (user: User) =>
    this.incomePlanApi.withMiddleware(new AuthMiddleware(user as Auth))

  getPaymentPlan(
    user: User,
  ): Promise<TrWebCommonsExternalPortalsApiModelsPaymentPlanPaymentPlanDto> {
    return this.paymentPlanApiWithAuth(user).apiProtectedV1PaymentPlanGet({
      year: undefined,
    })
  }

  async getPayments(
    user: User,
  ): Promise<TrWebCommonsExternalPortalsApiModelsPaymentPlanLegitimatePayments | null> {
    return await this.paymentPlanApiWithAuth(user)
      .apiProtectedV1PaymentPlanLegitimatepaymentsGet()
      .catch(handle404)
  }

  async getLatestIncomePlan(user: User): Promise<IncomePlanDto | null> {
    const incomePlan = await this.incomePlanApiWithAuth(user)
      .apiProtectedV1IncomePlanLatestIncomePlanGet()
      .catch(handle404)

    if (!incomePlan) {
      return null
    }

    return mapIncomePlanDto(incomePlan) ?? null
  }

  async getIncomePlanConditions(
    user: User,
  ): Promise<TrWebCommonsExternalPortalsApiModelsIncomePlanIncomePlanConditionsDto> {
    return this.incomePlanApiWithAuth(
      user,
    ).apiProtectedV1IncomePlanIncomePlanConditionsGet()
  }

  sendApplication(
    user: User,
    applicationDTO: object,
    applicationType: string,
  ): Promise<TrWebApiServicesDomainApplicationsModelsCreateApplicationFromPaperReturn> {
    return this.applicationWriteApiWithAuth(
      user,
    ).apiProtectedV1ApplicationApplicationTypePost({
      applicationType,
      body: applicationDTO,
    })
  }

  sendAdditionalDocuments(
    user: User,
    applicationId: string,
    documents: Array<TrWebCommonsExternalPortalsApiModelsDocumentsDocument>,
  ): Promise<void> {
    return this.applicationWriteApiWithAuth(
      user,
    ).apiProtectedV1ApplicationApplicationGuidDocumentsPost({
      applicationGuid: applicationId,
      trWebCommonsExternalPortalsApiModelsDocumentsDocument: documents,
    })
  }

  async getApplicant(
    user: User,
  ): Promise<TrWebCommonsExternalPortalsApiModelsApplicantApplicantInfoReturn> {
    return this.applicantApiWithAuth(user).apiProtectedV1ApplicantGet()
  }

  async getIsEligible(
    user: User,
    applicationType: string,
  ): Promise<TrWebCommonsExternalPortalsApiModelsApplicationsIsEligibleForApplicationReturn> {
    return this.applicantApiWithAuth(
      user,
    ).apiProtectedV1ApplicantApplicationTypeEligibleGet({
      applicationType,
    })
  }

  async getCurrencies(user: User): Promise<Array<string>> {
    return this.currencyApiWithAuth(user).apiProtectedV1GeneralCurrenciesGet()
  }

  async getPensionCalculation(
    parameters: ApiProtectedV1PensionCalculatorPostRequest['trWebCommonsExternalPortalsApiModelsPensionCalculatorPensionCalculatorInput'],
  ) {
    return this.pensionCalculatorApi.apiProtectedV1PensionCalculatorPost({
      trWebCommonsExternalPortalsApiModelsPensionCalculatorPensionCalculatorInput:
        parameters,
    })
  }

  async getSpousalInfo(
    user: User,
  ): Promise<TrWebApiServicesUseCaseDeathBenefitsModelsExternalSpousalInfo> {
    return this.deathBenefitsApiWithAuth(
      user,
    ).apiProtectedV1DeathBenefitsSpousalinfoGet()
  }

  async getCategorizedIncomeTypes(
    user: User,
  ): Promise<
    Array<TrWebCommonsExternalPortalsApiModelsIncomePlanExternalIncomeTypeDto>
  > {
    return this.incomePlanApiWithAuth(
      user,
    ).apiProtectedV1IncomePlanCategorizedIncomeTypesGet()
  }

  async getWithholdingTax(
    user: User,
    year: ApiProtectedV1IncomePlanWithholdingTaxGetRequest,
  ): Promise<TrWebCommonsExternalPortalsApiModelsIncomePlanWithholdingTaxDto> {
    return this.incomePlanApiWithAuth(
      user,
    ).apiProtectedV1IncomePlanWithholdingTaxGet(year)
  }

  async getTemporaryCalculations(
    user: User,
    parameters: ApiProtectedV1IncomePlanTemporaryCalculationsPostRequest['trWebApiServicesDomainFinanceModelsIslandIsIncomePlanDto'],
  ): Promise<TrWebCommonsExternalPortalsApiModelsPaymentPlanPaymentPlanDto> {
    return this.incomePlanApiWithAuth(
      user,
    ).apiProtectedV1IncomePlanTemporaryCalculationsPost({
      trWebApiServicesDomainFinanceModelsIslandIsIncomePlanDto: parameters,
    })
  }
}
