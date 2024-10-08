import { parseISO, format } from 'date-fns'
import { COLOR_STATUS } from './constants'
import { last, sortBy } from 'lodash'
import { Prescription } from '../types'
import { USER_DATE_FORMAT } from '../services/constants'
const tokenLocalStorageKey = 'token'

const getTokenLocalStorage = (): string | null =>
  localStorage.getItem(tokenLocalStorageKey)

const setTokenLocalStorage = (token: string): void =>
  localStorage.setItem(tokenLocalStorageKey, token)

const removeTokenLocalStorage = (): void =>
  localStorage.removeItem(tokenLocalStorageKey)

/**
 * Returns the first valid prescription found or null
 */
const getValidPrescription = (
  prescriptions: Prescription[]
): Prescription | null =>
  prescriptions.filter((prescription) => prescription.is_valid)[0] ?? null

/**
 * Returns the last prescription (by `end_date`) or null if none.
 */
const getLastPrescription = (
  prescriptions: Prescription[]
): Prescription | null => last(sortBy(prescriptions, 'end_date')) ?? null

/**
 * Returns a valid prescription if found or default to the last one
 */
const getValidOrLastPrescription = (
  prescriptions: Prescription[]
): Prescription | null =>
  getValidPrescription(prescriptions) ?? getLastPrescription(prescriptions)

/**
 * This function returns a color based on the validity of a prescription and if it expires soon
 * @param prescription - The prescription object
 * @returns The color of the badge
 */
const getIconClass = (prescription: Prescription): string => {
  if (prescription.is_valid && prescription.expiring_soon) {
    return COLOR_STATUS.WARNING
  }

  if (prescription.is_valid && !prescription.expiring_soon) {
    return COLOR_STATUS.SUCCESS
  }

  return COLOR_STATUS.DANGER
}

// Utility function to format date from ISO string to `dd/MM/yyyy`
const formatDate = (dateIsoString: string): string => {
  // Parse the ISO string to a Date object
  const date = parseISO(dateIsoString)
  // Format the Date object to a string in `dd/MM/yyyy` format
  return format(date, USER_DATE_FORMAT)
}

/**
 * Function to validate if a file type is accepted.
 *
 * @param {File} file - The file object to check.
 * @param {string} accept - A comma-separated string of accepted file types.
 */
function validateFileType(file: File): boolean {
  const accept = ".pdf,.jpg,.jpeg,.png"
  const acceptedTypes = accept.split(',').map(type => type.trim());
  // Check if the file type starts with 'image/' or directly matches an extension
  return acceptedTypes.some(type =>
    file.type.startsWith('image/') || file.type.endsWith(type)
  );

}

export {
  getTokenLocalStorage,
  setTokenLocalStorage,
  removeTokenLocalStorage,
  getValidPrescription,
  getLastPrescription,
  getValidOrLastPrescription,
  getIconClass,
  formatDate,
  validateFileType,
}
