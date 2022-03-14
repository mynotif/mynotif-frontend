interface Patient {
  id: number
  firstname: string
  lastname: string
  address: string
  zip_code: string
  city: string
  phone: string
}

interface Profile {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
}

interface Token {
  token: string
}

export type {
  Patient,
  Profile,
  Token
}
