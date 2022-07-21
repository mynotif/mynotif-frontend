import axios from 'axios'
import { Patient, Prescription, Profile, Token } from '../types'
import { BACKEND_URL } from './constants'

const getPatients = async (): Promise<Patient[]> => {
  const url = BACKEND_URL + '/patient/'
  const response = await axios.get<Patient[]>(url)
  return response.data
}

const getPatient = async (token: string, id: number): Promise<Patient> => {
  const url = BACKEND_URL + `/patient/${id}/`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.get(url, { headers })
  return response.data
}

const updatePatient = async (token: string, patient: Patient): Promise<Patient> => {
  const url = BACKEND_URL + `/patient/${patient.id}/`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.patch<Patient>(url, patient, { headers })
  return response.data
}

const createPatient = async (token: string, patient: Patient): Promise<Patient> => {
  const headers = { Authorization: `Token ${token}` }
  const url = BACKEND_URL + '/patient/'
  const response = await axios.post<Patient>(url, patient, { headers })
  return response.data
}

const deletePatient = async (token: string, id: number): Promise<{}> => {
  const url = BACKEND_URL + `/patient/${id}/`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.delete(url, { headers })
  return response.data
}

const getPrescriptions = async (): Promise<Prescription[]> => {
  const url = BACKEND_URL + '/prescription/'
  const response = await axios.get<Prescription[]>(url)
  return response.data
}

const deletePrescription = async (token: string, id: number): Promise<{}> => {
  const url = BACKEND_URL + `/prescription/${id}/`
  const headers = { Authorization: `Token ${token}` }
  const response = await axios.delete(url, { headers })
  return response.data
}

const login = async (username: string, password: string): Promise<Token> => {
  const data = { username, password }
  const url = BACKEND_URL + '/api-token-auth/'
  const response = await axios.post<Token>(url, data)
  return response.data
}

const register = async (username: string, password: string): Promise<{}> => {
  const data = { username, password }
  const url = BACKEND_URL + '/account/register'
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

export {
  getPatients,
  getPatient,
  createPatient,
  login,
  register,
  getProfile,
  updateUser,
  updatePatient,
  getPrescriptions,
  deletePrescription,
  deletePatient
}
