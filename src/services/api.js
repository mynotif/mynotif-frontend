import axios from 'axios'

const ApiUrl = 'https://mynotif-api.herokuapp.com/'

const getPatients = async () => {
  const response = await axios.get((ApiUrl + 'patient/'))
  return response.data
}
export {
  getPatients
}
