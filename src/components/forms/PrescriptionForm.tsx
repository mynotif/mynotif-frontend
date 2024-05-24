import assert from 'assert'
import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useState
} from 'react'
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
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import useTranslationHook from '../../hook/TranslationHook'
import usePatients from '../../hook/patient.hook'
import ModalAddPatient from '../modal/ModalAddPatient'
import { BACKEND_DATE_FORMAT, USER_DATE_FORMAT } from '../../services/constants'
import { InputFieldContainer } from './inputGroups/InputFieldContainer'
import { InputField } from './inputGroups/InputField'
import { SelectField } from './inputGroups/SelectField'
import { Button } from './inputGroups/Button'

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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [prescriptionState, setPrescriptionState] =
    useState<Prescription>(prescription)

  const endDateValue: Date | null = prescription.end_date !== '' ? new Date(prescription.end_date) : null

  const [endDate, setEndDate] = useState<Date | null>(endDateValue)

  const updatePrescriptionDate = (date: Date, field: string): void => {
    const formattedDate = format(date, BACKEND_DATE_FORMAT)
    setPrescriptionState((prevState) => ({
      ...prevState,
      [field]: formattedDate
    }))
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
      const prescriptionData = {
        ...prescriptionState,
        start_date: format(new Date(), BACKEND_DATE_FORMAT)
      }
      const data = await createPrescription(token, prescriptionData)
      if (file !== null && file !== undefined) {
        await uploadPrescription(token, data.id, file)
      }
      setPrescriptionState(data)
      setIsLoading(true)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
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
      setIsLoading(true)
      navigate('/prescriptions')
    } catch (error) {
      setIsLoading(false)
      addErrorMessageCallback({ body: t('error.updatedPrescription') })
    }
  }
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, files } = event.target

    setPrescriptionState({
      ...prescriptionState,
      [name]: value
    })

    if (files !== null && files !== undefined) {
      setFile(files[0])
    }
  }

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target
    setPrescriptionState({
      ...prescriptionState,
      [name]: value
    })
    if (name === 'patient' && value !== 'addNewPatient') {
      setNewCreatedPatientId(Number(value))
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
    const updatedPatientState = {
      ...patientState,
      birthday: patientState.birthday === '' ? null : patientState.birthday
    }
    try {
      const data = await createPatient(token, updatedPatientState)
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
    <div className='bg-gray-50 min-h-screen flex flex-col'>
      <form className='mt-4 p-4 space-y-4 mb-24' onSubmit={onFormSubmit}>
        <InputFieldContainer icon={['fas', 'user-doctor']}>
          <InputField
            name='prescribing_doctor'
            placeholder={t('form.doctor')}
            value={prescriptionState.prescribing_doctor}
            onChange={onInputChange}
          />
        </InputFieldContainer>
        <InputFieldContainer icon={['fas', 'file-prescription']}>
          <InputField
            type='file'
            name='photo_prescription'
            placeholder={t('form.selectYourPrescription')}
            onChange={onInputChange}
            file={file?.name}
          />
        </InputFieldContainer>
        <InputFieldContainer icon={['fas', 'calendar-alt']}>
          <DatePicker
            selected={endDate}
            onChange={onEndDateChange}
            dateFormat={USER_DATE_FORMAT}
            className='flex-grow outline-none text-gray-600'
            placeholderText={t('form.endDate')}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode='select'
          />
        </InputFieldContainer>
        {!isEditForm && (
          <>
            <InputFieldContainer icon={['fas', 'user-injured']}>
              <SelectField
                name='patient'
                value={newCreatedPatientId ?? ''}
                onChange={onSelectChange}
                patients={patients}
              />
            </InputFieldContainer>

          </>
        )}

        <Button isLoading={isLoading} text={t('navigation.validate')} />
      </form>
      {addingNewPatient && (
        <ModalAddPatient
          patientState={patientState}
          handleChangeNewPatient={handleChangeNewPatient}
          handleNewPatientSubmit={handleNewPatientSubmit}
          onHide={() => setAddingNewPatient(false)}
          show={addingNewPatient}
          error={error}
        />
      )}
    </div>
  )
}

export default PrescriptionForm
