import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePatientCount } from '../hook/patient.hook'
import { Container } from '../components/home/Container'
import { t } from 'i18next'
import { Prescription } from '../types'
import { WelcomeSection } from '../components/home/WelcomeSection'
import { PrescriptionSoon, PatientPrescriptionAlerts } from '../components/home/PrescriptionSoon'
import { MainStats } from '../components/home/MainStats'
import { QuickActions } from '../components/home/QuickActions'
import { TokenContext } from '../context/token'
import { getPrescriptions } from '../services/api'
import { SessionFailure, sessionErrorMessage } from '../services/session'
import { patientListErrorMessage } from '../services/patientList'

function useHomePrescriptions() {
  const { token } = useContext(TokenContext)
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<{ owner: typeof token; rows: Prescription[]; loading: boolean; error: unknown }>(
    { owner: token, rows: [], loading: true, error: null }
  )
  useEffect(() => {
    const controller = new AbortController()
    setState({ owner: token, rows: [], loading: true, error: null })
    const load = async () => {
      try {
        if (!token) throw new SessionFailure('expired')
        const rows = await getPrescriptions(token, controller.signal)
        if (!Array.isArray(rows)) throw new SessionFailure('server')
        if (!controller.signal.aborted) setState({ owner: token, rows, loading: false, error: null })
      } catch (error) {
        if (!controller.signal.aborted) setState({ owner: token, rows: [], loading: false, error })
      }
    }
    void load()
    return () => controller.abort()
  }, [token, attempt])
  const retry = useCallback(() => setAttempt(value => value + 1), [])
  const current = state.owner === token ? state : { rows: [], loading: true, error: null }
  return { ...current, retry }
}

const HomePage = (): JSX.Element => {
  const navigate = useNavigate()
  const { patientCount, countLoading, countError, retryCount } = usePatientCount()
  const prescriptions = useHomePrescriptions()
  const patientsExpiredSoon = useMemo(() => {
    const grouped = new Map<number, PatientPrescriptionAlerts>()
    prescriptions.rows.filter(row => row.expiring_soon).forEach(row => {
      const patient = grouped.get(row.patient) ?? { id: row.patient,
        firstname: row.patient_firstname, lastname: row.patient_lastname, prescriptions: [] }
      patient.prescriptions.push(row)
      grouped.set(row.patient, patient)
    })
    return Array.from(grouped.values())
  }, [prescriptions.rows])

  const goToPrescription = (patient: PatientPrescriptionAlerts): void => {
    const id = patient.prescriptions[0]?.id
    if (id !== undefined) navigate(`/prescriptions/${id}/`, { state: { title: t('text.detailPrescription') } })
  }
  const goToNewAddPatient = () => navigate('/patients/create')
  const goToNewPrescription = () => navigate('/prescriptions/create')
  const retry = () => {
    if (countError) void retryCount()
    if (prescriptions.error) prescriptions.retry()
  }
  const hasError = Boolean(countError || prescriptions.error)

  return <Container>
    <div className='max-w-4xl mx-auto space-y-8'>
      {hasError ? <div role='alert'>
        <p>{countError ? patientListErrorMessage(countError) : sessionErrorMessage(prescriptions.error)}</p>
        <button type='button' onClick={retry}>Réessayer</button>
      </div> : countLoading || prescriptions.loading ? <p role='status'>Chargement du tableau de bord…</p>
        : patientCount === 0 && prescriptions.rows.length === 0 ?
          <WelcomeSection goToNewAddPatient={goToNewAddPatient} goToNewPrescription={goToNewPrescription} />
          : patientCount !== null && <>
            <PrescriptionSoon patientsExpiredSoon={patientsExpiredSoon} goToPrescription={goToPrescription} />
            <MainStats patientCount={patientCount} prescriptions={prescriptions.rows} />
            <QuickActions goToNewAddPatient={goToNewAddPatient} goToNewPrescription={goToNewPrescription} />
          </>}
    </div>
  </Container>
}

export default HomePage
