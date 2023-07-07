import { strict as assert } from 'assert'
import { FunctionComponent, useState, useContext, useCallback } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Patient } from '../../types'
import { TokenContext } from '../../context/token'
import { ErrorContext, ErrorType } from '../../context/error'
import useTranslationHook from '../../hook/TranslationHook'
import { createPatient, updatePatient } from '../../services/api'

interface PatientFormProps {
  patient: Patient
  isEditForm: boolean
}

const PatientForm: FunctionComponent<PatientFormProps> = ({ patient, isEditForm }) => {
  const { token } = useContext(TokenContext)
  const { addError } = useContext(ErrorContext)
  const [patientState, setPatientState] = useState<Patient>(patient)
  const { t } = useTranslationHook()
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setPatientState({ ...patientState, [name]: value })
  }

  const addErrorCallback = useCallback(
    (error: ErrorType) => addError(error),
    // eslint-disable-next-line
    []
  )

  const onUpdate = async (): Promise<void> => {
    assert(token)
    try {
      await updatePatient(token, patientState)
    } catch (error) {
      addErrorCallback({ body: 'Error updating patient' })
    }
  }

  const onCreatePatient = async (): Promise<void> => {
    assert(token)
    try {
      const data = await createPatient(token, patientState)
      setPatientState(data)
    } catch (error) {
      console.error(error)
      addErrorCallback({ body: 'Error creating patient' })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    isEditForm ? await editPatient() : await addPatient()
  }

  const addPatient = async (): Promise<void> => {
    await onCreatePatient()
    navigate('/patients')
  }

  const editPatient = async (): Promise<void> => {
    await onUpdate()
    navigate(`/patients/${patient.id}`)
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
