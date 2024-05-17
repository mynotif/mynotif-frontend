import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { Card } from '../components/home/Card'
import usePatients from '../hook/patient.hook'
import usePrescription from '../hook/prescription.hook'
import { PatientCard } from '../components/home/PatientCard'
import { ExpirationBanner } from '../components/home/ExpirationBanner'
import { DashboardContainer } from '../components/home/DashboardContainer'
import { CardList } from '../components/home/CardList'

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

  return (
    <>
      <Header />
      <DashboardContainer>
        <CardList>
          <Card count={patients.length} title='Total Patients' onClick={goToPatients} />
          <Card count={prescriptions.length} title='Prescriptions' onClick={goToPrescriptions} />
        </CardList>
        <ExpirationBanner expiration='Expire bientot' />
        {patientsExpiredSoon.length === 0 && <p>No patients expiring soon</p>}
        {patientsExpiredSoon.map(patient => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </DashboardContainer>
    </>
  )
}

export default HomePage
