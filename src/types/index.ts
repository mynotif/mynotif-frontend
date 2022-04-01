interface Patient {
  id: number
  firstname: string
  lastname: string
  address: string
  zip_code: string
  city: string
  phone: string
}

interface Prescription {
  id: number
  carte_vitale: number
  caisse_rattachement: string
  prescribing_doctor: string
  start_date: Date
  end_date: Date
  at_renew: boolean
  photo_prescription: string
  patient: Patient
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
