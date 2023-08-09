import assert from 'assert'
import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useState
} from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FlashMessageContext, FlashMessageType } from '../../context/flashmessage'
import { TokenContext } from '../../context/token'
import {
  createPatient,
  createPrescription,
  updatePrescription,
  uploadPrescription
} from '../../services/api'
import { Patient, Prescription, defaultPatient } from '../../types'
import SelectPatient from '../SelectPatient'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import useTranslationHook from '../../hook/TranslationHook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePatients from '../../hook/patient.hook'
import ModalAddPatient from '../modal/ModalAddPatient'

interface PrescriptionFormRequiredProps {
  prescription: Prescription
  isEditForm: boolean
}
interface PrescriptionFormOptionalProps {
  patients?: Patient[]
}
interface PrescriptionFormProps
  extends PrescriptionFormRequiredProps,
  PrescriptionFormOptionalProps { }

const PrescriptionForm: FunctionComponent<PrescriptionFormProps> = ({
  prescription,
  isEditForm
}) => {
  const { token } = useContext(TokenContext)
  const [file, setFile] = useState<File>()
  const { addErrorMessage, addSuccessMessage } = useContext(FlashMessageContext)
  const { t } = useTranslationHook()
  const [addingNewPatient, setAddingNewPatient] = useState(false)
  const [patientState, setPatientState] = useState<Patient>(defaultPatient)
  const { patients, reloadPatients } = usePatients()
  const [newCreatedPatientId, setNewCreatedPatientId] = useState<null | number>(null)
  const [error, setError] = useState<string>('')

  const [prescriptionState, setPrescriptionState] =
    useState<Prescription>(prescription)

  const startDateValue: Date | null = prescription.start_date !== '' ? new Date(prescription.start_date) : null
  const endDateValue: Date | null = prescription.end_date !== '' ? new Date(prescription.end_date) : null

  const [startDate, setStartDate] = useState<Date | null>(startDateValue)
  const [endDate, setEndDate] = useState<Date | null>(endDateValue)

  const updatePrescriptionDate = (date: Date, field: string): void => {
    const formattedDate = format(date, 'yyyy-MM-dd')
    setPrescriptionState((prevState) => ({
      ...prevState,
      [field]: formattedDate
    }))
  }

  const onStartDateChange = (date: Date): void => {
    setStartDate(date)
    updatePrescriptionDate(date, 'start_date')
  }

  const onEndDateChange = (date: Date): void => {
    setEndDate(date)
    updatePrescriptionDate(date, 'end_date')
  }

  const navigate = useNavigate()

  const onFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    isEditForm ? await handleSave() : await addPrescription()
  }

  const addPrescription = async (): Promise<void> => {
    await onCreatePrescription()
    navigate('/prescriptions')
    addSuccessMessage({ body: t('text.createdPrescription') })
  }

  const onCreatePrescription = async (): Promise<void> => {
    assert(token)
    try {
      const data = await createPrescription(token, prescriptionState)
      if (file !== null && file !== undefined) {
        await uploadPrescription(token, data.id, file)
      }
      setPrescriptionState(data)
    } catch (error) {
      console.error(error)
      addErrorMessageCallback({ body: t('error.createdPrescription') })
    }
  }

  const addErrorMessageCallback = useCallback(
    (flashMessage: FlashMessageType) => addErrorMessage(flashMessage),
    [addErrorMessage]
  )

  const handleSave = async (): Promise<void> => {
    assert(token)
    try {
      await updatePrescription(token, prescriptionState)
      if (file !== null && file !== undefined) {
        await uploadPrescription(token, prescriptionState.id, file)
      }
      navigate('/prescriptions')
    } catch (error) {
      addErrorMessageCallback({ body: t('error.updatedPrescription') })
    }
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, files } = event.target

    setPrescriptionState({
      ...prescriptionState,
      [name]: value
    })
    if (name === 'patient' && value !== 'addNewPatient') {
      setNewCreatedPatientId(Number(value))
    }
    if (files !== null && files !== undefined) {
      setFile(files[0])
    }
    if (name === 'patient' && value === 'addNewPatient') {
      setAddingNewPatient(true)
      setPrescriptionState((prevState) => ({
        ...prevState,
        patient: patientState.id
      }))
    }
  }

  const handleNewPatientSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    e.preventDefault()
    assert(token)
    try {
      const data = await createPatient(token, patientState)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      reloadPatients()
      setAddingNewPatient(false)

      // Set the new created patient ID
      setNewCreatedPatientId(data?.id)

      // Update prescription with the new patient ID
      setPrescriptionState((prevState) => ({
        ...prevState,
        patient: data?.id
      }))
      addSuccessMessage({ body: t('text.createdPatient') })
    } catch (error) {
      console.error(error)
      setError(t('error.createdPatient'))
      addErrorMessageCallback({ body: t('error.createdPatient') })
    }
  }

  const handleChangeNewPatient = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setPatientState({ ...patientState, [name]: value })
  }

  return (
    <Form className='mt-4' onSubmit={onFormSubmit}>
      {/* TODO: dropdown patient list */}
      <Form.Group as={Col} className='mt-2'>
        <Form.Label><FontAwesomeIcon icon={['fas', 'user-doctor']} /> {t('form.doctor')}</Form.Label>
        <Form.Control
          type='text'
          name='prescribing_doctor'
          value={prescriptionState.prescribing_doctor}
          onChange={onInputChange}
        />
      </Form.Group>
      {/* TODO: photo upload refs #77 */}
      <Form.Group as={Col} className='mt-2'>
        <Form.Label><FontAwesomeIcon icon={['fas', 'file-prescription']} /> {t('form.selectYourPrescription')}</Form.Label>
        <Form.Control
          type='file'
          name='photo_prescription'
          onChange={onInputChange}
        />
      </Form.Group>
      <Row className='my-3'>
        <Form.Group as={Col} className='mt-2'>
          <Form.Label className='me-2'><FontAwesomeIcon icon={['fas', 'calendar-days']} /> {t('form.startDate')}</Form.Label>
          <DatePicker
            selected={startDate}
            onChange={onStartDateChange}
            dateFormat='dd/MM/yyyy'
            className='form-control'
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </Form.Group>
        <Form.Group as={Col} className='mt-2'>
          <Form.Label className='me-2'><FontAwesomeIcon icon={['fas', 'calendar-days']} /> {t('form.endDate')}</Form.Label>
          <DatePicker
            selected={endDate}
            onChange={onEndDateChange}
            dateFormat='dd/MM/yyyy'
            className='form-control'
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </Form.Group>
      </Row>
      <Row className='my-3'>
        {!isEditForm && (
          <>
            <Form.Group>
              <Form.Label className='my-3'>
                <FontAwesomeIcon icon={['fas', 'user-injured']} /> {t('text.whichPatientAddOrder')}
              </Form.Label>
              <Form.Control as='select' name='patient' onChange={onInputChange} className='custom-select' value={newCreatedPatientId ?? ''}>
                <option>--{t('form.selectPatient')}--</option>
                <option value='addNewPatient'>--{t('title.addPatient')}--</option>
                {
                  patients?.map((patient) => (
                    <SelectPatient
                      key={patient.id}
                      patient={patient}
                    />
                  ))
                }
              </Form.Control>
            </Form.Group>

            <ModalAddPatient
              patientState={patientState}
              handleChangeNewPatient={handleChangeNewPatient}
              handleNewPatientSubmit={handleNewPatientSubmit}
              onHide={() => setAddingNewPatient(false)}
              show={addingNewPatient}
              error={error}
            />
          </>
        )}
      </Row>
      <div className='d-flex align-items-center'>
        <Button variant='success' className='me-2' type='submit' onClick={() => null}>
          {t('navigation.validate')}
        </Button>
        <Button variant='primary' href='/prescriptions'>
          {t('navigation.return')}
        </Button>
      </div>

    </Form>
  )
}

export default PrescriptionForm
