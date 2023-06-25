import { strict as assert } from 'assert'
import { FunctionComponent, useState, useContext, useCallback } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Patient } from '../types'
import { TokenContext } from '../context/token'
import { ErrorContext, ErrorType } from '../context/error'
import { createPatient, deletePatient, updatePatient } from '../services/api'
import ModalDelete from './ModalDelete'
import useTranslationHook from '../hook/TranslationHook'

interface PatientFormProps {
  patient: Patient
  isEditForm: boolean
}

const PatientForm: FunctionComponent<PatientFormProps> = ({ patient, isEditForm }) => {
  const { token } = useContext(TokenContext)
  const { addError } = useContext(ErrorContext)

  const [patientState, setPatientState] = useState<Patient>(patient)

  const [show, setShow] = useState(false)
  const handleClose = (): void => setShow(false)
  const handleShow = (): void => setShow(true)
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

  const onDelete = async (): Promise<void> => {
    assert(token)
    try {
      await deletePatient(token, patientState.id)
      navigate('/patients')
    } catch (error) {
      console.error(error)
      addError({ body: 'Error deleting patient' })
    }
    handleClose()
  }

  return (
    <Form onSubmit={async e => await handleSubmit(e)}>
      <Row className='mb-3'>
        <Form.Group as={Col}>
          <Form.Label>{t('form.lastName')}</Form.Label>
          <Form.Control
            name='lastname'
            type='text'
            placeholder='Enter lastname'
            value={patientState.lastname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>{t('form.firstName')}</Form.Label>
          <Form.Control
            name='firstname'
            type='text'
            placeholder='Enter firstname'
            value={patientState.firstname}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Row className='mb-3'>
        <Form.Group as={Col}>
          <Form.Label>{t('form.emailAddress')}</Form.Label>
          <Form.Control
            name='address'
            placeholder='1234 Main St'
            value={patientState.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>{t('form.phone')}</Form.Label>
          <Form.Control
            name='phone'
            placeholder='(123) 456-7890'
            value={patientState.phone}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Row className='mb-3'>
        <Form.Group as={Col}>
          <Form.Label>{t('form.city')}</Form.Label>
          <Form.Control
            name='city'
            value={patientState.city}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>{t('form.zipPostal')}</Form.Label>
          <Form.Control
            name='zip_code'
            value={patientState.zip_code}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>
      <Button variant='success' type='submit'>
        {t('navigation.validate')}
      </Button>
      {isEditForm && (
        <Button onClick={handleShow} className='ms-4' variant='danger'>
          {t('navigation.delete')}
        </Button>
      )}
      {show && isEditForm && (
        <ModalDelete handleClose={handleClose} show={show} onDelete={onDelete} confirmText={t('text.confirmationPatient')} />
      )}
      <Button className='btn btn-primary ms-4' href='/patients'>
        {t('navigation.return')}
      </Button>
    </Form>
  )
}

export default PatientForm
