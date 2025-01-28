import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FlashMessageContext, FlashMessageType } from '../../context/flashmessage'
import { TokenContext } from '../../context/token'
import { strict as assert } from 'assert'
import { getPatient } from '../../services/api'
import PatientForm from '../../components/forms/PatientForm'
import { Patient } from '../../types'
import useTranslationHook from '../../hook/TranslationHook'
import { Container } from '../../components/home/Container'
import { usePatientManagement } from '../../hook/patientManagement'
import { Link } from 'react-router-dom'

const PatientEdit = (): JSX.Element => {
  const { id } = useParams<'id'>()
  const { canAddPatient } = usePatientManagement()
  const { token } = useContext(TokenContext)
  const { addErrorMessage } = useContext(FlashMessageContext)
  const { t } = useTranslationHook()

  const addErrorMessageCallback = useCallback(
    (flashMessage: FlashMessageType) => addErrorMessage(flashMessage),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const [patient, setPatient] = useState<Patient | null>(null)

  const fetchPatientCallback = useCallback(async (): Promise<void> => {
    assert(token)
    assert(id)
    try {
      const data = await getPatient(token, parseInt(id, 10))
      setPatient(data)
    } catch (error) {
      console.error(error)
      addErrorMessageCallback({ body: 'Error fetching patient data' })
    }
  }, [token, addErrorMessageCallback, id])

  useEffect(() => {
    if (token === null) return
    // eslint-disable-next-line no-void
    void (async () => await fetchPatientCallback())()
  }, [token, fetchPatientCallback])

  return (
    <Container>
      {canAddPatient ? (
        patient !== null ? (
          <PatientForm patient={patient} isEditForm />
        ) : (
          <h4 className='center'>{t('title.noPatientToDisplay')}</h4>
        )
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Limite de patients atteinte</h2>
          <p className="mb-4">
            Vous avez atteint la limite de patients gratuits. Veuillez passer à la version Essentielle pour ajouter plus de patients.
          </p>
          <Link
            to="/subscription"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Passer à la version Essentielle
          </Link>
        </div>
      )}
    </Container>
  )
}

export default PatientEdit
