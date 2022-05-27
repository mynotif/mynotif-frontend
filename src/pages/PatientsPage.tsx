import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import PatientLine from '../components/PatientLine'
import { getPatients } from '../services/api'
import { Patient } from '../types'

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
      <div className='mb-3 d-flex justify-content-between align-items-center'>
        <h1>Liste des Patients</h1>
        <Button href='patients/new'>Créer un patient</Button>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Address</th>
            <th>Zip code</th>
            <th>City</th>
            <th>Phone</th>
            <th>Valid</th>
            <th>Prescription end date</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <PatientLine
              key={patient.id}
              id={patient.id}
              firstname={patient.firstname}
              lastname={patient.lastname}
              address={patient.address}
              zipCode={patient.zip_code}
              city={patient.city}
              phone={patient.phone}
              prescriptions={patient.prescriptions}
            />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default PatientsPage
