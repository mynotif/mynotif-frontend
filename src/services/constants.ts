import assert from 'assert'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8000'
assert(typeof BACKEND_URL === 'string')
const API_ROOT = `${BACKEND_URL}/api`
const API_V1 = `${API_ROOT}/v1`
const API_V2 = `${API_ROOT}/v2`

const USER_DATE_FORMAT = 'dd/MM/yyyy'
const BACKEND_DATE_FORMAT = 'yyyy-MM-dd'

export {
  BACKEND_URL,
  API_ROOT,
  API_V1,
  API_V2,
  USER_DATE_FORMAT,
  BACKEND_DATE_FORMAT
}
