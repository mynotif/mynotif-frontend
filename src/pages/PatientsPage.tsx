import { useEffect, useState } from 'react'
import PatientLine from '../components/PatientLine'
import { getPatients } from '../services/api'
import { Patient } from '../types'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const PatientsPage = (): JSX.Element => {
  const [patients, setPatients] = useState<Patient[]>([])

  // allows us to pick up patients
  const fetchPatients = async (): Promise<void> => {
    try {
      const data = await getPatients()
      setPatients(data)
    } catch (error) {
      console.error(error.response)
    }
  }

  // when the component is loaded, the patients are picked up
  useEffect(() => {
    // eslint-disable-next-line no-void
    void (async () => await fetchPatients())()
  }, [])

  return (
    <div>
      <h1 className='center'>Patients</h1>
      <Button variant='primary' className='ms-5' href='/patients/create'>Ajouter un patient</Button>
      <Container>
        {patients.map((patient) => (
          <PatientLine key={patient.id} patient={patient} />
        ))}
      </Container>
    </div>
  )
}

export default PatientsPage
