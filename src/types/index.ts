interface Patient {
  id: number
  firstname: string
  lastname: string
  address: string
  zip_code: string
  city: string
  phone: string
  prescriptions: Prescription[]
}

const defaultPatient = {
  id: 0,
  firstname: '',
  lastname: '',
  address: '',
  zip_code: '',
  city: '',
  phone: '',
  prescriptions: []
}

interface Prescription {
  id: number
  carte_vitale: string
  caisse_rattachement: string
  prescribing_doctor: string
  start_date: string
  end_date: string
  at_renew: boolean
  photo_prescription: string
  is_valid: boolean
  patient: number
}

const defaultPrescription = {
  id: 0,
  carte_vitale: '',
  caisse_rattachement: '',
  prescribing_doctor: '',
  start_date: '',
  end_date: '',
  at_renew: false,
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

export type {
  ErrorResponse,
  Patient,
  Prescription,
  PrescriptionUploadResponse,
  Profile,
  Token
}

export { defaultPatient, defaultPrescription }
