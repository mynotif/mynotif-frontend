import { privateApi, loginSession, publicRequest, confirmSessionReset } from './session'
import axios from 'axios'
import {
  Patient,
  Prescription,
  PrescriptionUploadResponse,
  Profile,
  OneSignal,
  SubscriptionInfo,
  Subscription,
  SessionObject,
  SubscriptionPlanType,
  CancelSubscriptionResponse,
} from '../types'
import { API_V1, API_V2 } from './constants'

const getPatient = async (token: string, id: number): Promise<Patient> => {
  const url = API_V1 + `/patient/${id}/`
  const headers = { Authorization: `Bearer ${token}` }
  const response = await privateApi.get(url, { headers })
  return response.data
}

const updatePatient = async (
  token: string,
  patient: Patient
): Promise<Patient> => {
  const url = API_V1 + `/patient/${patient.id}/`
  const headers = { Authorization: `Bearer ${token}` }
  const response = await privateApi.patch<Patient>(url, patient, { headers })
  return response.data
}

const createPatient = async (
  token: string,
  patient: Patient
): Promise<Patient> => {
  const headers = { Authorization: `Bearer ${token}` }
  const url = API_V1 + '/patient/'
  const response = await privateApi.post<Patient>(url, patient, { headers })
  return response.data
}

const deletePatient = async (token: string, id: number): Promise<{}> => {
  const url = API_V1 + `/patient/${id}/`
  const headers = { Authorization: `Bearer ${token}` }
  const response = await privateApi.delete(url, { headers })
  return response.data
}

const createPrescription = async (
  token: string,
  prescription: Prescription
): Promise<Prescription> => {
  const headers = { Authorization: `Bearer ${token}` }
  const url = API_V1 + '/prescription/'
  const response = await privateApi.post<Prescription>(url, prescription, {
    headers
  })
  return response.data
}

const getPrescriptions = async (token: string, signal?: AbortSignal): Promise<Prescription[]> => {
  const url = API_V1 + '/prescription/'
  const headers = { Authorization: `Bearer ${token}` }
  const response = await privateApi.get<Prescription[]>(url, { headers, signal })
  return response.data
}

const getPrescription = async (
  token: string,
  id: number
): Promise<Prescription> => {
  const url = API_V1 + `/prescription/${id}/`
  const headers = { Authorization: `Bearer ${token}` }
  const response = await privateApi.get<Prescription>(url, { headers })
  return response.data
}

const updatePrescription = async (
  token: string,
  prescription: Prescription
): Promise<Prescription> => {
  const url = API_V1 + `/prescription/${prescription.id}/`
  const headers = { Authorization: `Bearer ${token}` }
  const response = await privateApi.patch<Prescription>(url, prescription, {
    headers
  })
  return response.data
}

const deletePrescription = async (token: string, id: number): Promise<{}> => {
  const url = API_V1 + `/prescription/${id}/`
  const headers = { Authorization: `Bearer ${token}` }
  const response = await privateApi.delete(url, { headers })
  return response.data
}

const uploadPrescription = async (
  token: string,
  id: number,
  file: File
): Promise<PrescriptionUploadResponse> => {
  const url = API_V1 + `/prescription/upload/${id}/`
  const data = { photo_prescription: file }
  const headers = {
    Authorization: `Bearer ${token}`,
    'content-type': 'multipart/form-data'
  }
  const response = await privateApi.patch<PrescriptionUploadResponse>(url, data, {
    headers
  })
  return response.data
}

const login = loginSession

const register = async ( password: string, email: string): Promise<{}> => {
  const data = { password, email }
  const url = API_V2 + '/account/register'
  return publicRequest(() => axios.post(url, data))
}

const resetPassword = async (email: string): Promise<{}> => {
  const data = { email }
  const url = API_V1 + '/auth/users/reset_password/'
  return publicRequest(() => axios.post(url, data))
}

const confirmResetPassword = async (uid: string, token: string, newPassword: string): Promise<{}> => {
  const data = { uid, token, new_password: newPassword }
  const url = API_V1 + '/auth/users/reset_password_confirm/'
  return confirmSessionReset(() => axios.post(url, data))
}

const getProfile = async (token: string): Promise<Profile> => {
  const url = API_V1 + '/profile/'
  const headers = { Authorization: `Bearer ${token}` }
  const response = await privateApi.get<Profile>(url, { headers })
  return response.data
}

const updateUser = async (token: string, data: Profile): Promise<Profile> => {
  const url = API_V1 + '/user/current/'
  const headers = { Authorization: `Bearer ${token}` }
  const response = await privateApi.patch<Profile>(url, { first_name: data.first_name, last_name: data.last_name }, { headers })
  return response.data
}

const createOneSignalSubscriptionId = async (token: string, subscriptionId: string): Promise<{}> => {
  const url = API_V1 + '/onesignal/'
  const headers = { Authorization: `Bearer ${token}` }
  const data = { subscription_id: subscriptionId }
  const response = await privateApi.post<OneSignal>(url, data, { headers })
  return response.data
}

const getOneSignalSubscriptionId = async (token: string): Promise<SubscriptionInfo[]> => {
  const url = API_V1 + '/onesignal/'
  const headers = { Authorization: `Bearer ${token}` }
  const response = await privateApi.get<SubscriptionInfo[]>(url, { headers })
  return response.data
}

const sendEmailToDoctor = async (token: string, prescriptionId: number, careDetails: string): Promise<{}> => {
  const url = API_V1 + `/prescription/${prescriptionId}/send-email/`
  const headers = { Authorization: `Bearer ${token}` }
  const response = await privateApi.post(url, {additional_info: careDetails}, { headers })
  return response.data
}

const getSubscriptionById = async (token: string, id: number): Promise<Subscription> => {
  const url = API_V1 + `/payment/subscription/${id}/`
  const headers = { Authorization: `Bearer ${token}` }
  const response = await privateApi.get<Subscription>(url, { headers });
  return response.data;
}

const createSubscription = async (token: string, plan: SubscriptionPlanType): Promise<Partial<SessionObject>> => {
  const url = API_V1 + '/payment/subscription/'
  const headers = { Authorization: `Bearer ${token}` }
  const data = { plan }
  const response = await privateApi.post<SessionObject>(url, data, { headers })
  return response.data
}

const deleteSubscription = async (token: string): Promise<CancelSubscriptionResponse> => {
  const url = API_V1 + `/payment/subscriptions/user/cancel/`
  const headers = { Authorization: `Bearer ${token}` }
  const data = {}
  const response = await privateApi.post<CancelSubscriptionResponse>(url, data, { headers })
  return response.data
}

export {
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
  getSubscriptionById,
  createSubscription,
  deleteSubscription,
}
