import PatientLine from '../components/PatientLine'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import usePatients from '../hook/patient.hook'
import useTranslationHook from '../hook/TranslationHook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TitlePage from '../components/TitlePage'

const PatientsPage = (): JSX.Element => {
  const { patients, reloadPatients } = usePatients()
  const { t } = useTranslationHook()

  return (
    <>
      <div className='position-fixed bottom-0 end-0 me-3 mb-5 pb-5' style={{ zIndex: '1030' }}>
        <Button variant='info' href='/patients/create'>
          <FontAwesomeIcon icon={['fas', 'user-plus']} />
        </Button>
      </div>
      <TitlePage title={t('title.myPatients')} />
      <Container>
        {patients.map((patient) => (
          <PatientLine key={patient.id} patient={patient} reloadPatients={reloadPatients} />
        ))}
      </Container>
    </>

  )
}

export default PatientsPage
