import axios from 'axios'
import { Patient, Token } from '../types'
import { BACKEND_URL } from './constants'

const getPatients = async (): Promise<Patient[]> => {
  const url = BACKEND_URL + '/patient/'
  const response = await axios.get<Patient[]>(url)
  return response.data
}

const login = async (username: string, password: string): Promise<Token> => {
  const data = { username, password }
  const url = BACKEND_URL + '/api-token-auth/'
  const response = await axios.post<Token>(url, data)
  return response.data
}

export {
  getPatients,
  login
}
