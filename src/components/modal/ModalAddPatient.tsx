import { XIcon } from "lucide-react";
import { Button } from "../forms/inputGroups/Button";
import { InputField } from "../forms/inputGroups/InputField";
import { InputFieldContainer } from "../forms/inputGroups/InputFieldContainer";
import useTranslationHook from "../../hook/TranslationHook";
import { Patient } from "../../types";

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

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-colorsecondary via-colorsecondary to-shade3 backdrop-blur-sm border border-gray-400 rounded-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-400/30">
          <h2 className="text-xl font-semibold text-gray-800">Ajouter un patient</h2>
          <button 
            onClick={onHide} 
            className="text-gray-400 hover:text-colorprimary transition-colors"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 m-4 rounded-lg">
            {error}
          </div>
        )}

        <form className="p-6 space-y-4">
          <InputFieldContainer icon={['fas', 'user']} label={t('form.firstName')} required>
            <InputField
              name='firstname'
              placeholder={t('form.firstName')}
              value={patientState.firstname}
              onChange={handleChangeNewPatient}
            />
          </InputFieldContainer>

          <InputFieldContainer icon={['fas', 'user']} label={t('form.lastName')} required>
            <InputField
              name='lastname'
              placeholder={t('form.lastName')}
              value={patientState.lastname}
              onChange={handleChangeNewPatient}
            />
          </InputFieldContainer>

          <Button 
            variant='accent' 
            isLoading={loading} 
            onClick={handleNewPatientSubmit} 
            type='submit'
          >
            {t('navigation.add')}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ModalAddPatient
