import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TokenContext } from '../../context/token'
import { strict as assert } from 'assert'
import { getPatient } from '../../services/api'
import PatientForm from '../../components/forms/PatientForm'
import { Patient } from '../../types'
import useTranslationHook from '../../hook/TranslationHook'
import { MessageContext, MessageType } from '../../context/message'

const PatientEdit = (): JSX.Element => {
  const { id } = useParams<'id'>()

  const { token } = useContext(TokenContext)
  const { addMessage } = useContext(MessageContext)
  const { t } = useTranslationHook()

  const addErrorCallback = useCallback(
    (error: MessageType) => addMessage(error),
    // eslint-disable-next-line
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
      addErrorCallback({ text: 'Error fetching patient data', variant: 'danger' })
    }
  }, [token, addErrorCallback, id])

  useEffect(() => {
    if (token === null) return
    // eslint-disable-next-line no-void
    void (async () => await fetchPatientCallback())()
  }, [token, fetchPatientCallback])

  return (
    <>
      {(patient !== null) ? (
        <>
          <div className='d-flex align-items-center justify-content-center bg-info rounded-bottom py-4'>
            <h2 className='header center'>{t('title.editPatient')}</h2>
          </div>
          <PatientForm patient={patient} isEditForm />
        </>
      ) : (
        <h4 className='center'>{t('title.noPatientToDisplay')}</h4>
      )}
    </>
  )
}

export default PatientEdit
