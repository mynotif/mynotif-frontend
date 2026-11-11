import { PatientInput } from '../types'

const PATIENT_INPUT_FIELDS: readonly (keyof PatientInput)[] = [
  'firstname',
  'lastname',
  'street',
  'zip_code',
  'city',
  'phone',
  'birthday',
  'health_card_number',
  'ss_provider_code'
]

export const toPatientInput = (patient: PatientInput): PatientInput =>
  Object.fromEntries(PATIENT_INPUT_FIELDS
    .filter(field => Object.prototype.hasOwnProperty.call(patient, field))
    .map(field => [field, patient[field]]))
