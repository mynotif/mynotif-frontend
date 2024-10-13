import { useNavigate } from 'react-router-dom'
import { Card } from '../components/home/Card'
import usePatients from '../hook/patient.hook'
import usePrescription from '../hook/prescription.hook'
import { PatientCard } from '../components/home/PatientCard'
import { ExpirationBanner } from '../components/home/ExpirationBanner'
import { Container } from '../components/home/Container'
import { CardList } from '../components/home/CardList'
import { Loading } from '../components/loading/Loading'
import { t } from 'i18next'

const HomePage = (): JSX.Element => {
  const navigate = useNavigate()

  const { patients } = usePatients()
  const [prescriptions] = usePrescription()

  const expiredSoon = prescriptions.filter(prescription => prescription.expiring_soon)
  const patientsExpiredSoon = patients.filter(patient => expiredSoon.some(prescription => prescription.patient === patient.id))

  const goToPatients = (): void => {
    navigate('/patients')
  }
  const goToPrescriptions = (): void => {
    navigate('/prescriptions')
  }
  const goToPatient = (id: number): void => {
    navigate(`/patients/${id}`)
  }

  return (
    <>
      {patients && prescriptions ? (
        <Container className='mt-24 mb-24'>
          <CardList>
            <Card count={patients.length} title={t('text.patients')} onClick={goToPatients} />
            <Card count={prescriptions.length} title={t('text.prescriptions')} onClick={goToPrescriptions} />
          </CardList>
          <ExpirationBanner expiration='Expirant bientôt' />
          {patientsExpiredSoon.length === 0 && <p>Pas de patients expirant bientôt</p>}
          {patientsExpiredSoon.map(patient => (
            <PatientCard className='bg-colorsecondary text-colorprimary' onClick={() => goToPatient(patient.id)} key={patient.id} patient={patient} />
          ))}
        </Container>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default HomePage
