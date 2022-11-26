import PatientLine from '../components/PatientLine'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import usePatients from '../hook/patient.hook'

const PatientsPage = (): JSX.Element => {
  const patients = usePatients()

  return (
    <div>
      <h1 className='center'>Patients</h1>
      <Button variant='primary' className='ms-5' href='/patients/create'>
        Ajouter un patient
      </Button>
      <Container>
        {patients.map((patient) => (
          <PatientLine key={patient.id} patient={patient} />
        ))}
      </Container>
    </div>
  )
}

export default PatientsPage
