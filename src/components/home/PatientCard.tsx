import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Patient } from '../../types'

interface PatientCardProps {
  patient: Patient
}

export const PatientCard = ({ patient }: PatientCardProps): JSX.Element => {
  const { firstname, lastname } = patient
  const fullName = `${firstname} ${lastname}`
  return (
    <div className='bg-white rounded-lg p-4 shadow-md my-8'>
      <div className='flex items-center space-x-4 mb-2'>
        <div className='bg-colorsecondary rounded-full w-20 h-20 flex items-center justify-center '>
          <FontAwesomeIcon icon={['fas', 'id-badge']} className='text-colorprimary text-3xl' />
        </div>
        <div>
          <h3 className='font-semibold'>{fullName}</h3>
        </div>
      </div>
    </div>
  )
}
