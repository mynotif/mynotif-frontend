import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { Card } from '../components/home/Card'
import usePatients from '../hook/patient.hook'
import usePrescription from '../hook/prescription.hook'
import { PatientCard } from '../components/patients/PatientCard'
import { ExpirationBanner } from '../components/home/ExpirationBanner'
import { DashboardContainer } from '../components/home/DashboardContainer'
import { CardList } from '../components/home/CardList'

const HomePage = (): JSX.Element => {
  const navigate = useNavigate()

  const { patients } = usePatients()
  const [prescriptions] = usePrescription()

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
        <ExpirationBanner expirationDate='Expire bientot' />
        <PatientCard />
      </DashboardContainer>

    </>
  )
}

export default HomePage
