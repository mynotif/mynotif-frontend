import axios from 'axios'
import {
  Patient,
  Prescription,
  PrescriptionUploadResponse,
  Profile,
  Token,
  OneSignal,
  SubscriptionInfo
} from '../types'
import { BACKEND_URL } from './constants'
import cacheService from './cache'

const getPatients = async (token: string): Promise<Patient[]> => {
  const cachedPatients = await cacheService.get('patients')
  if (cachedPatients) return cachedPatients
  const url = BACKEND_URL + '/patient/'
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.get<Patient[]>(url, { headers })
  const patients = response.data
  cacheService.set('patients', patients)
  return patients
}

const getPatient = async (token: string, id: number): Promise<Patient> => {
  const cachedPatient = await cacheService.get('patients.' + id)
  if (cachedPatient) return cachedPatient
  const url = BACKEND_URL + `/patient/${id}/`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.get(url, { headers })
  const patient = response.data
  cacheService.set('patients.' + id, patient)
  return patient
}

const updatePatient = async (
  token: string,
  patient: Patient
): Promise<Patient> => {
  const url = BACKEND_URL + `/patient/${patient.id}/`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.patch<Patient>(url, patient, { headers })
  const cachedPatients = await cacheService.get('patients')
  const cachedPatient = await cacheService.get('patients.' + patient.id)
  if (cachedPatient) {
    cacheService.set('patients.' + patient.id, response.data)
  }
  if (cachedPatients) {
  const index = cachedPatients.findIndex((p: Patient) => p.id === patient.id)
  cachedPatients[index] = response.data
  }
  return response.data
}

const createPatient = async (
  token: string,
  patient: Patient
): Promise<Patient> => {
  const headers = { Authorization: `Token ${token}` }
  const url = BACKEND_URL + '/patient/'
  const response = await axios.post<Patient>(url, patient, { headers })
  const cachedPatients = await cacheService.get('patients')
  if (cachedPatients) {
    cacheService.set('patients', [...cachedPatients, response.data])
  }
  return response.data
}

const deletePatient = async (token: string, id: number): Promise<{}> => {
  const url = BACKEND_URL + `/patient/${id}/`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.delete(url, { headers })
  const cachedPatients = await cacheService.get('patients')
  if (cachedPatients) {
    cacheService.set('patients', cachedPatients.filter((patient: Patient) => patient.id !== id))
  }
  return response.data
}

const createPrescription = async (
  token: string,
  prescription: Prescription
): Promise<Prescription> => {
  const headers = { Authorization: `Token ${token}` }
  const url = BACKEND_URL + '/prescription/'
  const response = await axios.post<Prescription>(url, prescription, { headers })
  const cachedPrescriptions = await cacheService.get('prescriptions')
  if (cachedPrescriptions) {
    cacheService.set('prescriptions', [...cachedPrescriptions, response.data])
  }
  return response.data
}

const getPrescriptions = async (token: string): Promise<Prescription[]> => {
  const cachedPrescriptions = await cacheService.get('prescriptions')
  if (cachedPrescriptions) return cachedPrescriptions
  const url = BACKEND_URL + '/prescription/'
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.get<Prescription[]>(url, { headers })
  const prescriptions = response.data
  cacheService.set('prescriptions', prescriptions)
  return prescriptions
}

const getPrescription = async (token: string, id: number): Promise<Prescription> => {
  const cachedPrescription = await cacheService.get(`prescriptions.${id}`)
  if (cachedPrescription) return cachedPrescription
  const url = BACKEND_URL + `/prescription/${id}/`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.get<Prescription>(url, { headers })
  const prescription = response.data
  cacheService.set(`prescriptions.${id}`, prescription)
  return prescription
}

const updatePrescription = async (
  token: string,
  prescription: Prescription
): Promise<Prescription> => {
  const url = BACKEND_URL + `/prescription/${prescription.id}/`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.patch<Prescription>(url, prescription, { headers })
  cacheService.set(`prescriptions.${prescription.id}`, response.data)
  const cachedPrescriptions = await cacheService.get('prescriptions')
  if (cachedPrescriptions) {
    const index = cachedPrescriptions.findIndex((p: Prescription) => p.id === prescription.id)
    cachedPrescriptions[index] = response.data
    cacheService.set('prescriptions', cachedPrescriptions)
  }
  return response.data
}

const deletePrescription = async (token: string, id: number): Promise<{}> => {
  const url = BACKEND_URL + `/prescription/${id}/`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.delete(url, { headers })
  const cachedPrescriptions = await cacheService.get('prescriptions')
  if (cachedPrescriptions) {
    cacheService.set(
      'prescriptions',
      cachedPrescriptions.filter((prescription: Prescription) => prescription.id !== id)
    )
  }
  return response.data
}

const uploadPrescription = async (
  token: string,
  id: number,
  file: File
): Promise<PrescriptionUploadResponse> => {
  const url = BACKEND_URL + `/prescription/upload/${id}/`
  const data = { photo_prescription: file }
  const headers = {
    Authorization: `Token ${token}`,
    'content-type': 'multipart/form-data'
  }
  const response = await axios.patch<PrescriptionUploadResponse>(url, data, {
    headers
  })
  return response.data
}

const login = async (username: string, password: string): Promise<Token> => {
  const data = { username, password }
  const url = BACKEND_URL + '/api-token-auth/'
  const response = await axios.post<Token>(url, data)
  return response.data
}

const register = async (username: string, password: string, email: string): Promise<{}> => {
  const data = { username, password, email }
  const url = BACKEND_URL + '/account/register'
  const response = await axios.post(url, data)
  return response.data
}

const resetPassword = async (email: string): Promise<{}> => {
  const data = { email }
  const url = BACKEND_URL + '/auth/users/reset_password/'
  const response = await axios.post(url, data)
  return response.data
}

const confirmResetPassword = async (uid: string, token: string, newPassword: string): Promise<{}> => {
  const data = { uid, token, new_password: newPassword }
  const url = BACKEND_URL + '/auth/users/reset_password_confirm/'
  const response = await axios.post(url, data)
  return response.data
}

const getProfile = async (token: string): Promise<Profile> => {
  const url = BACKEND_URL + '/profile/'
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.get<Profile>(url, { headers })
  return response.data
}

const updateUser = async (token: string, data: Profile): Promise<Profile> => {
  const url = BACKEND_URL + '/user/current/'
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.patch<Profile>(url, data, { headers })
  return response.data
}

const createOneSignalSubscriptionId = async (token: string, subscriptionId: string): Promise<{}> => {
  const url = BACKEND_URL + '/onesignal/'
  const headers = { Authorization: `Token ${token}` }
  const data = { subscription_id: subscriptionId }
  const response = await axios.post<OneSignal>(url, data, { headers })
  return response.data
}

const getOneSignalSubscriptionId = async (token: string): Promise<SubscriptionInfo[]> => {
  const url = BACKEND_URL + '/onesignal/'
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.get<SubscriptionInfo[]>(url, { headers })
  return response.data
}

const sendEmailToDoctor = async (token: string, prescriptionId: number, careDetails: string): Promise<{}> => {
  const url = BACKEND_URL + `/prescription/${prescriptionId}/send-email/`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.post(url, {additional_info: careDetails}, { headers })
  return response.data
}


export {
  getPatients,
  getPatient,
  createPatient,
  login,
  register,
  getProfile,
  updateUser,
  updatePatient,
  updatePrescription,
  uploadPrescription,
  getPrescriptions,
  getPrescription,
  deletePrescription,
  deletePatient,
  createPrescription,
  resetPassword,
  confirmResetPassword,
  createOneSignalSubscriptionId,
  getOneSignalSubscriptionId,
  sendEmailToDoctor,
}
