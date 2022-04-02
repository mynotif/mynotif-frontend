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

export type {
  Patient,
  Prescription,
  Profile,
  Token
}

export { defaultPatient }
