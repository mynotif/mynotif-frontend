interface Patient {
  id: number
  firstname: string
  lastname: string
  address: string
  zip_code: string
  city: string
  phone: string
}

interface Token {
  token: string
}

export type {
  Patient,
  Token
}
