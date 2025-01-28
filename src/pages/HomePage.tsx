import { useNavigate } from 'react-router-dom'
import usePatients from '../hook/patient.hook'
import usePrescription from '../hook/prescription.hook'
import { Container } from '../components/home/Container'
import { Loading } from '../components/loading/Loading'
import { t } from 'i18next'
import { Patient } from '../types'
import { WelcomeSection } from '../components/home/WelcomeSection'
import { PrescriptionSoon } from '../components/home/PrescriptionSoon'
import { MainStats } from '../components/home/MainStats'
import { QuickInfos } from '../components/home/QuickInfos'
import { QuickActions } from '../components/home/QuickActions'

const HomePage = (): JSX.Element => {
  const navigate = useNavigate()
  const { patients } = usePatients(['id', 'firstname', 'lastname'])
  const [prescriptions] = usePrescription()
  const loading = !patients || !prescriptions

  const isFirstTimeUser = patients.length === 0 && prescriptions.length === 0

  const expiredSoon = prescriptions.filter(prescription => prescription.expiring_soon)
  const patientsExpiredSoon = patients.filter(patient => expiredSoon.some(prescription => prescription.patient === patient.id))

  const goToPrescription = (patient: Patient): void => {
    const expiredPrescription = expiredSoon.find(prescription => prescription.patient === patient.id);

    if (expiredPrescription?.id !== undefined) {
      navigate(`/prescriptions/${expiredPrescription.id}/`, {
        state: { title: t('text.detailPrescription') }
      })
    } else {
      console.error('Patient is undefined')
    }
  }

  const goToNewAddPatient = () => {
    navigate('/patients/create')
  }

  const goToNewPrescription = () => {
    navigate('/prescriptions/create')
  }

  return (
    <Container>
      <div className='max-w-4xl mx-auto space-y-8'>
    {loading ? (
        <Loading />
      ) : isFirstTimeUser ? (
        <WelcomeSection
                goToNewAddPatient={goToNewAddPatient}
                goToNewPrescription={goToNewPrescription}
              />
      ) : (
        <>
          <PrescriptionSoon
            patientsExpiredSoon={patientsExpiredSoon}
            goToPrescription={goToPrescription}
          />

          <MainStats
            patients={patients}
            prescriptions={prescriptions}
          />

          <QuickActions
            goToNewAddPatient={goToNewAddPatient}
            goToNewPrescription={goToNewPrescription}
          />

          <QuickInfos
            expiredSoon={expiredSoon}
            prescriptions={prescriptions}
          />
        </>
      )}
      </div>
    </Container>
  )
}


export default HomePage
