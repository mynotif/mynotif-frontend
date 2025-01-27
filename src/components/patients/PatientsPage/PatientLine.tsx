import { Patient } from '../../../types'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRightIcon, User2Icon } from 'lucide-react'

interface PatientLineProps {
  patient: Patient
}

const PatientLine: FunctionComponent<PatientLineProps> = ({ patient }) => {
  const navigate = useNavigate()

  const goToPatient = (): void => {
    navigate(`/patients/${patient.id}`)
  }

  const capitalizeFirstLetter = (name: string): string =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

  return (
    <div 
    onClick={goToPatient} 
    className='group border-b border-gray-200/50 py-3 flex items-center justify-between hover:bg-colorsecondary/30 transition-colors cursor-pointer'
  >
    <div className='flex items-center space-x-3'>
      <div className='bg-colorprimary/10 rounded-full w-10 h-10 flex items-center justify-center'>
        <User2Icon className='text-colorprimary w-5 h-5' />
      </div>
      <div>
        <h3 className='font-medium text-gray-800 group-hover:text-colorprimary transition-colors'>
          {capitalizeFirstLetter(patient.lastname)} {capitalizeFirstLetter(patient.firstname)}
        </h3>
      </div>
    </div>
    <ChevronRightIcon className='w-5 h-5 text-gray-400 group-hover:text-colorprimary transition-colors' />
  </div>

  )
}

export default PatientLine
