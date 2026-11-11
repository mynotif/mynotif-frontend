import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Patient, Prescription } from '../../types'
import { getPrescription } from '../../services/api'
import { TokenContext } from '../../context/token'
import { usePatientDetail } from '../../hook/patientDetail.hook'
import { patientId, patientReadFailure, PatientReadStatus, InvalidPatientDetail } from '../../services/patientDetail'
import { PatientReadFeedback } from '../patients/PatientDetail'
import { Container } from '../../components/home/Container'
import { EditIcon } from 'lucide-react'
import { PrescriptionInfo } from '../../components/prescriptions/PrescriptionInfo'
import { ContactDoctor } from '../../components/prescriptions/ContactDoctor'
import { PatientInformation } from '../../components/prescriptions/PatientInformation'
import { PrescriptionSummary } from '../../components/prescriptions/PrescriptionSummary'

const PrescriptionDetail = (): JSX.Element => {
  const { id } = useParams<'id'>()
  const { token } = useContext(TokenContext)
  const [attempt, setAttempt] = useState(0)
  const prescriptionId = patientId(id)
  const [identity, setIdentity] = useState({ token, id: prescriptionId, attempt })
  if (identity.token !== token || identity.id !== prescriptionId || identity.attempt !== attempt) {
    setIdentity({ token, id: prescriptionId, attempt })
  }
  const [result, setResult] = useState<{
    identity: typeof identity; prescription: Prescription | null; status: PatientReadStatus
  } | null>(null)
  const current = result?.identity === identity && identity.token === token &&
    identity.id === prescriptionId && identity.attempt === attempt
  const prescriptionState = current ? result?.prescription : null
  const patientRead = usePatientDetail(prescriptionState ? String(prescriptionState.patient) : undefined)
  const patientState = patientRead.patient
  const navigate = useNavigate()

  useEffect(() => {
    const { token, id } = identity
    if (!token || id === null) return
    let active = true
    getPrescription(token, id).then(prescription => {
      if (!active) return
      if (prescription.id !== id) throw new InvalidPatientDetail()
      setResult({ identity, prescription, status: 'ready' })
    }).catch(error => {
      if (active) setResult({ identity, prescription: null, status: patientReadFailure(error) })
    })
    return () => { active = false }
  }, [identity])

  const status = prescriptionId === null ? 'invalid'
    : prescriptionState ? patientRead.status : current && result ? result.status : 'loading'
  const retry = (): void => {
    if (prescriptionState) patientRead.retry()
    else setAttempt(value => value + 1)
  }

  const goToEditPrescription = (): void => {
    if (prescriptionState?.id !== undefined) {
      navigate(`/prescriptions/edit/${prescriptionState.id}/`)
    } else {
      console.error('Patient is undefined')
    }
  }

  const goToPatient = (patient: Pick<Patient, 'id'>): void => {
    navigate(`/patients/${patient.id}/`)
  }

  const goToSendEmail = (): void => {
    if (prescriptionState?.id !== undefined) {
      navigate(`/prescriptions/send/${prescriptionState.id}/`, {
        state: {
          patient: patientState,
          prescription: prescriptionState
        }
      })
    } else {
      console.error('Patient is undefined')
    }
  }

  return (
    <Container>
      {prescriptionState && patientState ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <PrescriptionSummary prescriptionState={prescriptionState} patientState={patientState} />
            <button
              onClick={goToEditPrescription}
              className="bg-colorsecondary text-colorprimary px-3 py-2 rounded-lg hover:bg-shade3 transition-colors flex items-center space-x-2"
            >
              <EditIcon className="w-5 h-5" />
            </button>
          </div>

          <PrescriptionInfo prescriptionState={prescriptionState} />

          <ContactDoctor prescriptionState={prescriptionState} goToSendEmail={goToSendEmail} />

          <PatientInformation patientState={patientState} goToPatient={goToPatient} />
        </div>
      ) : (
        <PatientReadFeedback status={status} retry={retry} />
      )}
    </Container>
  );
}

export default PrescriptionDetail
