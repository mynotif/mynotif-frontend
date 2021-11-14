import axios from 'axios'
import { Patient } from '../types'

const ApiUrl = 'https://mynotif-api.herokuapp.com/'

const getPatients = async (): Promise<Patient[]> => {
  const response = await axios.get<Patient[]>((ApiUrl + 'patient/'))
  return response.data
}
export {
  getPatients
}
