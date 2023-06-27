import PatientLine from '../components/PatientLine'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import usePatients from '../hook/patient.hook'
import useTranslationHook from '../hook/TranslationHook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PatientsPage = (): JSX.Element => {
  const patients = usePatients()
  const { t } = useTranslationHook()

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1>{t('title.myPatients')}</h1>
        <Button variant='primary' className='ms-auto' href='/patients/create'>
          <FontAwesomeIcon icon={['fas', 'user-plus']} />
        </Button>
      </div>
      <Container>
        {patients.map((patient) => (
          <PatientLine key={patient.id} patient={patient} />
        ))}
      </Container>
    </>
  )
}

export default PatientsPage
