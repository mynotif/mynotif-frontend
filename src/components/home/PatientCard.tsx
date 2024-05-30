import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Patient } from '../../types'
import clsx from 'clsx'

interface PatientCardProps {
  patient: Patient
  onClick?: () => void
  className?: string
}

export const PatientCard = ({ patient, onClick, className }: PatientCardProps): JSX.Element => {
  const { firstname, lastname } = patient
  const fullName = `${firstname} ${lastname}`
  return (
    <div onClick={onClick} className='bg-white rounded-lg p-4 shadow-md my-8'>
      <div className='flex items-center space-x-4 mb-2'>
        <div className={clsx(className, ' rounded-full w-12 h-12 flex items-center justify-center ')}>
          <FontAwesomeIcon icon={['fas', 'id-badge']} className={clsx(className, 'text-xl')} />
        </div>
        <div>
          <h3 className={clsx('font-semibold')}>{fullName}</h3>
        </div>
      </div>
    </div>
  )
}
