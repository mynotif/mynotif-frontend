import { Patient } from '../../types'
import useTranslationHook from '../../hook/TranslationHook'
import { InputFieldContainer } from '../forms/inputGroups/InputFieldContainer'
import { InputField } from '../forms/inputGroups/InputField'
import { Button } from '../forms/inputGroups/Button'

interface ModalAddPatientProps {
  patientState: Patient
  handleChangeNewPatient: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleNewPatientSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
  onHide: () => void
  show: boolean
  error: string
  loading?: boolean
}

const ModalAddPatient: React.FC<ModalAddPatientProps> = ({
  patientState,
  handleChangeNewPatient,
  handleNewPatientSubmit,
  onHide,
  show,
  error,
  loading
}) => {
  const { t } = useTranslationHook()

  return (
    <div className={`fixed bg-black bg-opacity-50 inset-0 flex items-center justify-center ${show ? 'block' : 'hidden'}`}>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4'>
        <div className='flex justify-between items-center p-4 border-b'>
          <h2 className='text-xl font-semibold'>Ajouter un patient</h2>
          <button onClick={onHide} className='text-gray-500 text-3xl hover:text-gray-700'>
            &times;
          </button>
        </div>
        {error !== null && error !== undefined && error !== '' && <div className='bg-red-100 text-red-700 p-3 rounded-md'>{error}</div>}
        <form className='mt-4 p-4 space-y-4 mb-24'>
          <InputFieldContainer icon={['fas', 'user']}>
            <InputField
              name='firstname'
              placeholder={t('form.firstName')}
              value={patientState.firstname}
              onChange={handleChangeNewPatient}
            />
          </InputFieldContainer>
          <InputFieldContainer icon={['fas', 'user']}>
            <InputField
              name='lastname'
              placeholder={t('form.lastName')}
              value={patientState.lastname}
              onChange={handleChangeNewPatient}
            />
          </InputFieldContainer>
          <Button isLoading={loading} onClick={handleNewPatientSubmit} type='submit' >
            {t('navigation.validate')}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ModalAddPatient
