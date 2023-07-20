import { strict as assert } from 'assert'
import { FunctionComponent, useState, useContext, useCallback } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Patient } from '../../types'
import { TokenContext } from '../../context/token'
import { FlashMessageContext, FlashMessageType } from '../../context/flashmessage'
import useTranslationHook from '../../hook/TranslationHook'
import { createPatient, updatePatient } from '../../services/api'

interface PatientFormProps {
  patient: Patient
  isEditForm: boolean
}

const PatientForm: FunctionComponent<PatientFormProps> = ({ patient, isEditForm }) => {
  const { token } = useContext(TokenContext)
  const { addErrorMessage, addSuccessMessage } = useContext(FlashMessageContext)
  const [patientState, setPatientState] = useState<Patient>(patient)
  const { t } = useTranslationHook()
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setPatientState({ ...patientState, [name]: value })
  }

  const addErrorMessageCallback = useCallback(
    (flashMessage: FlashMessageType) => addErrorMessage(flashMessage),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const onUpdate = async (): Promise<void> => {
    assert(token)
    try {
      await updatePatient(token, patientState)
    } catch (error) {
      addErrorMessageCallback({ body: t('error.updatedPatient') })
    }
  }

  const onCreatePatient = async (): Promise<void> => {
    assert(token)
    try {
      const data = await createPatient(token, patientState)
      setPatientState(data)
    } catch (error) {
      console.error(error)
      addErrorMessageCallback({ body: t('error.createdPatient') })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    isEditForm ? await editPatient() : await addPatient()
  }

  const addPatient = async (): Promise<void> => {
    await onCreatePatient()
    navigate('/patients')
    addSuccessMessage({ body: t('text.createdPatient') })
  }

  const editPatient = async (): Promise<void> => {
    await onUpdate()
    navigate(`/patients/${patient.id}`)
    addSuccessMessage({ body: t('text.updatedPatient') })
  }

  return (
    <Form className='mt-4' onSubmit={async e => await handleSubmit(e)}>
      <Form.Group as={Col} className='mt-2'>
        <Form.Label><FontAwesomeIcon icon={['fas', 'id-card']} /> {t('form.lastName')}</Form.Label>
        <Form.Control
          name='lastname'
          type='text'
          value={patientState.lastname}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group as={Col} className='mt-2'>
        <Form.Label><FontAwesomeIcon icon={['fas', 'id-card']} /> {t('form.firstName')}</Form.Label>
        <Form.Control
          name='firstname'
          type='text'
          value={patientState.firstname}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group as={Col} className='mt-2'>
        <Form.Label><FontAwesomeIcon icon={['fas', 'address-card']} /> {t('form.emailAddress')}</Form.Label>
        <Form.Control
          name='address'
          value={patientState.address}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group as={Col} className='mt-2'>
        <Form.Label><FontAwesomeIcon icon={['fas', 'mobile']} /> {t('form.phone')}</Form.Label>
        <Form.Control
          name='phone'
          value={patientState.phone}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group as={Col} className='mt-2'>
        <Form.Label><FontAwesomeIcon icon={['fas', 'city']} /> {t('form.city')}</Form.Label>
        <Form.Control
          name='city'
          value={patientState.city}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group as={Col} className='mt-2'>
        <Form.Label><FontAwesomeIcon icon={['fas', 'city']} />  {t('form.zipPostal')}</Form.Label>
        <Form.Control
          name='zip_code'
          value={patientState.zip_code}
          onChange={handleChange}
        />
      </Form.Group>
      <div className='d-flex align-items-center mt-4'>
        <Button variant='success' type='submit'>
          {t('navigation.validate')}
        </Button>
        <Button className='btn btn-primary ms-4' href='/patients'>
          {t('navigation.return')}
        </Button>
      </div>
    </Form>
  )
}

export default PatientForm
