import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Patient } from '../../types'

interface PatientCardProps {
  patient: Patient
  onClick?: () => void
}

export const PatientCard = ({ patient, onClick }: PatientCardProps): JSX.Element => {
  const { firstname, lastname } = patient
  const fullName = `${firstname} ${lastname}`
  return (
    <div onClick={onClick} className='bg-white rounded-lg p-4 shadow-md my-8'>
      <div className='flex items-center space-x-4 mb-2'>
        <div className='bg-colorsecondary rounded-full w-12 h-12 flex items-center justify-center '>
          <FontAwesomeIcon icon={['fas', 'id-badge']} className='text-colorprimary text-xl' />
        </div>
        <div>
          <h3 className='font-semibold'>{fullName}</h3>
        </div>
      </div>
    </div>
  )
}
