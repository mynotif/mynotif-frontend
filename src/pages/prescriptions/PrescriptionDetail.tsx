import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Patient, Prescription } from '../../types'
import { getPatient, getPrescription } from '../../services/api'
import { TokenContext } from '../../context/token'
import assert from 'assert'
import { Container } from '../../components/home/Container'
import { Loading } from '../../components/loading/Loading'
import { EditIcon } from 'lucide-react'
import { PrescriptionInfo } from '../../components/prescriptions/PrescriptionInfo'
import { ContactDoctor } from '../../components/prescriptions/ContactDoctor'
import { PatientInformation } from '../../components/prescriptions/PatientInformation'
import { PrescriptionSummary } from '../../components/prescriptions/PrescriptionSummary'

const PrescriptionDetail = (): JSX.Element => {
  const { id } = useParams<'id'>()
  const { token } = useContext(TokenContext)
  const [prescriptionState, setPrescriptionState] = useState<Prescription | null>(null)
  const [patientState, setPatientState] = useState<Patient | null>(null)
  const navigate = useNavigate()

  const fetchPrescriptionCallback = useCallback(async (): Promise<void> => {
    assert(token)
    assert(id)
    try {
      const prescriptionData = await getPrescription(token, parseInt(id, 10))
      setPrescriptionState(prescriptionData)
      const patientData = await getPatient(token, prescriptionData.patient)
      setPatientState(patientData)
    } catch (error) {
      console.error(error)
    }
  }, [token, id])

  useEffect(() => {
    if (token === null) return
    // eslint-disable-next-line no-void
    void (async () => await fetchPrescriptionCallback())()
  }, [token, fetchPrescriptionCallback])

  const goToEditPrescription = (): void => {
    if (prescriptionState?.id !== undefined) {
      navigate(`/prescriptions/edit/${prescriptionState.id}/`)
    } else {
      console.error('Patient is undefined')
    }
  }

  const goToPatient = (patient: Patient): void => {
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
        <Loading />
      )}
    </Container>
  );
}

export default PrescriptionDetail
