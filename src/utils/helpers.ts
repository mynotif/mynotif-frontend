import { last, sortBy } from 'lodash'
import { Prescription } from '../types'
const tokenLocalStorageKey = 'token'

const getTokenLocalStorage = (): (string|null) => localStorage.getItem(tokenLocalStorageKey)

const setTokenLocalStorage = (token: string): void => localStorage.setItem(tokenLocalStorageKey, token)

const removeTokenLocalStorage = (): void => localStorage.removeItem(tokenLocalStorageKey)

/**
 * Returns the first valid prescription found or null
 */
const getValidPrescription = (prescriptions: Prescription[]): Prescription|null => (
  prescriptions.filter((prescription) => prescription.is_valid)[0] ?? null
)

/**
 * Returns the last prescription (by `end_date`) or null if none.
 */
const getLastPrescription = (prescriptions: Prescription[]): Prescription|null => (
  last(sortBy(prescriptions, 'end_date')) ?? null
)

/**
 * Returns a valid prescription if found or default to the last one
 */
const getValidOrLastPrescription = (prescriptions: Prescription[]): Prescription|null => (
  getValidPrescription(prescriptions) ?? getLastPrescription(prescriptions)
)

export {
  getTokenLocalStorage,
  setTokenLocalStorage,
  removeTokenLocalStorage,
  getValidPrescription,
  getLastPrescription,
  getValidOrLastPrescription
}
