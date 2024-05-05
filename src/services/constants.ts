import assert from 'assert'

const BACKEND_URL: string = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8000'
assert(typeof BACKEND_URL === 'string')

const USER_DATE_FORMAT = 'dd/MM/yyyy'
const BACKEND_DATE_FORMAT = 'yyyy-MM-dd'

export {
  BACKEND_URL,
  USER_DATE_FORMAT,
  BACKEND_DATE_FORMAT
}
