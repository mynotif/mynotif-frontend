import { FunctionComponent, useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { PatientFields } from '../../types'
import { TokenContext } from '../../context/token'
import { FlashMessageContext } from '../../context/flashmessage'
import useTranslationHook from '../../hook/TranslationHook'
import { createPatient, updatePatient } from '../../services/api'
import DatePicker from 'react-datepicker'
import { BACKEND_DATE_FORMAT, USER_DATE_FORMAT } from '../../services/constants'
import { InputFieldContainer } from './inputGroups/InputFieldContainer'
import { InputField } from './inputGroups/InputField'
import { Button } from './inputGroups/Button'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

interface PatientFormProps {
  patient: PatientFields
  isEditForm: boolean
}

const PatientForm: FunctionComponent<PatientFormProps> = ({ patient, isEditForm }) => {
  const { token } = useContext(TokenContext)
  const { addErrorMessage, addSuccessMessage } = useContext(FlashMessageContext)
  const [patientState, setPatientState] = useState<PatientFields>(patient)
  const { t } = useTranslationHook()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState('')
  const submitting = useRef(false)
  const [isOptionalFieldsOpen, setIsOptionalFieldsOpen] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (submitting.current) return
    submitting.current = true
    setLoading(true)
    setSubmitError('')

    try {
      if (!token) throw new Error('Session unavailable')
      if (isEditForm) {
        await updatePatient(token, patientState)
      } else {
        await createPatient(token, patientState)
      }
    } catch {
      const message = t(isEditForm ? 'error.updatedPatient' : 'error.createdPatient')
      setSubmitError(message)
      addErrorMessage({ body: message })
      return
    } finally {
      submitting.current = false
      setLoading(false)
    }

    addSuccessMessage({ body: t(isEditForm ? 'text.updatedPatient' : 'text.createdPatient') })
    navigate(isEditForm ? `/patients/${patient.id}` : '/patients')
  }

  return (
      <form className='space-y-4' onSubmit={handleSubmit}>
        {/* Required Fields */}
        <div className="space-y-4 bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {t('title.requiredInformation')}
          </h3>
          <InputFieldContainer icon={['fas', 'user']} label={t('form.firstName')} required>
            <InputField
              name='firstname'
              placeholder={t('form.firstName')}
              value={patientState.firstname}
              onChange={handleChange}
            />
          </InputFieldContainer>
          <InputFieldContainer icon={['fas', 'user']} label={t('form.lastName')} required>
            <InputField
              name='lastname'
              placeholder={t('form.lastName')}
              value={patientState.lastname}
              onChange={handleChange}
            />
          </InputFieldContainer>
        </div>

        {/* Optional Fields Toggle */}
        <button
          type="button"
          onClick={() => setIsOptionalFieldsOpen(!isOptionalFieldsOpen)}
          className="w-full flex items-center justify-center space-x-2 text-colorprimary hover:bg-colorsecondary p-2 rounded-lg transition-colors"
        >
          {isOptionalFieldsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          <span>{t('title.optionalInformation')}</span>
        </button>

        {/* Optional Fields */}
        {isOptionalFieldsOpen && (
          <div className="space-y-4 bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6">
            <InputFieldContainer icon={['fas', 'calendar-alt']} label={t('form.birthday')}>
          <DatePicker
            selected={birthdayDate}
            onChange={onBirthdayChange}
            dateFormat={USER_DATE_FORMAT}
            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 pr-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6 w-full"
            wrapperClassName="h-full flex items-center"
            placeholderText={t('form.birthday')}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode='select'
          />
          </InputFieldContainer>
          <InputFieldContainer icon={['fas', 'city']} label={t('form.city')}>
            <InputField
              name='city'
              placeholder={t('form.city')}
              value={patientState.city}
              onChange={handleChange}
            />
          </InputFieldContainer>
          <InputFieldContainer icon={['fas', 'address-card']} label={t('form.address')}>
            <InputField
              name='street'
              placeholder={t('form.address')}
              value={patientState.street}
              onChange={handleChange}
            />
          </InputFieldContainer>
          <InputFieldContainer icon={['fas', 'phone']} label={t('form.phone')}>
            <InputField
              name='phone'
              placeholder={t('form.phone')}
              value={patientState.phone}
              onChange={handleChange}
            />
          </InputFieldContainer>
          <InputFieldContainer icon={['fas', 'city']} label={t('form.city')}>
            <InputField
              name='zip_code'
              placeholder={t('form.zipPostal')}
              value={patientState.zip_code}
              onChange={handleChange}
            />
          </InputFieldContainer>
          <InputFieldContainer icon={['fas', 'id-card']} label={t('form.carteVitale')}>
            <InputField
              name='health_card_number'
              placeholder={t('form.carteVitale')}
              value={patientState.health_card_number}
              onChange={handleChange}
            />
          </InputFieldContainer>
          <InputFieldContainer icon={['fas', 'id-card']} label={t('form.caisseDeRattachement')}>
            <InputField
              name='ss_provider_code'
              placeholder={t('form.caisseDeRattachement')}
              value={patientState.ss_provider_code}
              onChange={handleChange}
            />
          </InputFieldContainer>
          </div>
        )}

        {submitError && <p role='alert' className='text-red-500 text-sm'>{submitError}</p>}
        <Button variant='accent' isLoading={loading} disabled={loading} type='submit'>
          {t('navigation.validate')}
        </Button>
      </form>
  )
}

export default PatientForm
