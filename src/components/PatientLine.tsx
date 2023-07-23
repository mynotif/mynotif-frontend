import { Patient } from '../types'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import useTranslationHook from '../hook/TranslationHook'

interface PatientLineProps {
  patient: Patient
}

const PatientLine: FunctionComponent<PatientLineProps> = ({ patient }) => {
  const navigate = useNavigate()
  const { t } = useTranslationHook()

  const goToPatient = (): void => {
    navigate(`/patients/${patient.id}`)
  }

  const capitalizeFirstLetter = (name: string): string =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

  return (
    <div onClick={goToPatient} className='link-dark mt-2' role='button'>
      <div className='bg-white d-flex align-items-center gap-3 p-3 mb-1 shadow-sm'>
        <div>
          <h6 className='mb-1'>{capitalizeFirstLetter(patient.lastname)} {capitalizeFirstLetter(patient.firstname)}</h6>
          <p className='text-muted mb-2'>{capitalizeFirstLetter(patient.city)}</p>
          <p className='text-muted m-0'>{capitalizeFirstLetter(patient.address)}</p>
        </div>
        <div className='ms-auto'>
          <Badge bg='success' className='fw-normal'>{t('text.running')}</Badge>
        </div>
      </div>
    </div>
  )
}

export default PatientLine
