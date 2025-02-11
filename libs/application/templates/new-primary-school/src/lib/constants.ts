import { DefaultEvents } from '@island.is/application/types'

export enum Actions {
  SEND_APPLICATION = 'sendApplication',
}
export const enum States {
  PREREQUISITES = 'prerequisites',
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
}

export type Events =
  | { type: DefaultEvents.APPROVE }
  | { type: DefaultEvents.REJECT }
  | { type: DefaultEvents.SUBMIT }
  | { type: DefaultEvents.ASSIGN }
  | { type: DefaultEvents.EDIT }

export enum ApiModuleActions {
  getChildInformation = 'getChildInformation',
  sendApplication = 'sendApplication',
}

export enum Roles {
  APPLICANT = 'applicant',
}

export enum ReasonForApplicationOptions {
  MOVING_MUNICIPALITY = 'movingMuniciplaity',
  MOVING_ABROAD = 'movingAbroad',
  SIBLINGS_IN_SAME_SCHOOL = 'SiblingsInSameSchool',
}

export enum OptionsType {
  PRONOUN = 'pronoun',
  GENDER = 'gender',
  INTOLERANCE = 'intolerence',
  REASON = 'registrationReason',
  RELATION = 'relation',
  ALLERGY = 'allergy',
}

export enum MembershipRole {
  Admin = 'admin',
  Guardian = 'guardian',
  Parent = 'parent',
  Principal = 'principal',
  Relative = 'relative',
  Student = 'student',
  Teacher = 'teacher',
}

export enum MembershipOrganizationType {
  Municipality = 'municipality',
  National = 'national',
  School = 'school',
}
