interface Patient {
  id: number
  firstname: string
  lastname: string
  street: string
  zip_code: string
  city: string
  phone: string
  birthday: string | null
  health_card_number: string
  ss_provider_code: string
  prescriptions: Prescription[]
}

interface OneSignal {
  subscription_id: string
}

interface SubscriptionInfo {
  subscription_id: string
  user: number
}

const defaultPatient = {
  id: 0,
  firstname: '',
  lastname: '',
  street: '',
  zip_code: '',
  city: '',
  phone: '',
  birthday: '',
  health_card_number: '',
  ss_provider_code: '',
  prescriptions: []
}

interface Prescription {
  id: number
  prescribing_doctor: string
  start_date: string
  end_date: string
  photo_prescription: string
  is_valid: boolean
  patient: number
}

const defaultPrescription = {
  id: 0,
  prescribing_doctor: '',
  start_date: '',
  end_date: '',
  photo_prescription: '',
  is_valid: false,
  patient: 0
}

interface Profile {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
  is_staff: boolean
}

interface Token {
  token: string
}

interface PrescriptionUploadResponse {
  id: number
  photo_prescription: string
}

interface ErrorResponse {
  detail: string
}

interface RegisterFormType {
  username: string
  email: string
  password: string
}

export type {
  ErrorResponse,
  Patient,
  Prescription,
  PrescriptionUploadResponse,
  Profile,
  Token,
  RegisterFormType,
  OneSignal,
  SubscriptionInfo
}

export { defaultPatient, defaultPrescription }
