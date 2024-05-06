import { strict as assert } from 'assert'
import { FunctionComponent, useState, useContext, useCallback } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Patient } from '../../types'
import { TokenContext } from '../../context/token'
import { FlashMessageContext, FlashMessageType } from '../../context/flashmessage'
import useTranslationHook from '../../hook/TranslationHook'
import { createPatient, updatePatient } from '../../services/api'
import ReactDatePicker from 'react-datepicker'
import { USER_DATE_FORMAT, BACKEND_DATE_FORMAT } from '../../services/constants'

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

  const birthdayDateValue: Date | null = patient.birthday !== null && patient.birthday !== undefined && patient.birthday !== '' ? new Date(patient.birthday) : null
  const [birthdayDate, setBirthdayDate] = useState<Date | null>(birthdayDateValue)

  const onBirthdayChange = (date: Date): void => {
    setBirthdayDate(date)
    updatePatientDate(date, 'birthday')
  }

  const updatePatientDate = (date: Date, field: string): void => {
    const formattedDate = format(date, BACKEND_DATE_FORMAT)
    setPatientState((prevState) => ({
      ...prevState,
      [field]: formattedDate
    }))
  }

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
      <Row className='my-3'>
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
      </Row>
      <Form.Group as={Col} className='mt-2'>
        <Form.Label className='me-2'><FontAwesomeIcon icon={['fas', 'calendar-days']} /> {t('form.birthday')}</Form.Label>
        <ReactDatePicker
          selected={birthdayDate}
          onChange={onBirthdayChange}
          dateFormat={USER_DATE_FORMAT}
          className='form-control'
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode='select'
        />
      </Form.Group>
      <Row className='my-3'>
        <Form.Group as={Col} className='mt-2'>
          <Form.Label><FontAwesomeIcon icon={['fas', 'address-card']} /> {t('form.address')}</Form.Label>
          <Form.Control
            name='street'
            type='text'
            value={patientState.street}
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
      </Row>

      <Row className='my-3'>
        <Form.Group as={Col} className='mt-2'>
          <Form.Label><FontAwesomeIcon icon={['fas', 'mobile']} /> {t('form.phone')}</Form.Label>
          <Form.Control
            name='phone'
            value={patientState.phone}
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
      </Row>

      <Form.Group as={Col} className='mt-2'>
        <Form.Label><FontAwesomeIcon icon={['fas', 'id-card']} /> {t('form.caisseDeRattachement')}</Form.Label>
        <Form.Control
          type='text'
          value={patientState.ss_provider_code}
          name='ss_provider_code'
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group as={Col} className='mt-2'>
        <Form.Label><FontAwesomeIcon icon={['fas', 'id-card']} /> {t('form.carteVitale')}</Form.Label>
        <Form.Control
          type='text'
          value={patientState.health_card_number}
          name='health_card_number'
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
