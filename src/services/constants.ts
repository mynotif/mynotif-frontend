import assert from 'assert'

const BACKEND_URL: string = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8000'
assert(typeof BACKEND_URL === 'string')

export {
  BACKEND_URL
}
