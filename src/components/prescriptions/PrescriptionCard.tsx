import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { Prescription } from '../../types'
import { getIconClass } from '../../utils/helpers'

interface PrescriptionCardProps {
  doctorName: string
  endDate: string
  patientName: string
  prescription: Prescription
}

export const PrescriptionCard = ({ doctorName, endDate, patientName, prescription }: PrescriptionCardProps): JSX.Element => {
  const navigate = useNavigate()

  const goToPrescription = (): void => {
    navigate(`/prescriptions/${prescription.id}`)
  }

  const isValidIconClass = getIconClass(prescription)

  return (
    <div onClick={goToPrescription} className='p-4 space-y-2 relative z-10 h-auto overflow-hidden'>

      <div className='bg-white rounded-lg p-4 shadow-md'>
        <div className='flex items-center space-x-4 mb-2'>
          <div className='bg-colorsecondary rounded-full w-12 h-12 flex items-center justify-center'>
            <FontAwesomeIcon icon={['fas', 'user-md']} className='text-colorprimary text-xl' />
          </div>
          <h3 className='font-semibold ml-4'>Dr. {doctorName}</h3>
        </div>
        <div className='flex items-center mb-2'>
          <p className='flex-grow font-semibold'>End of prescription: </p>
          <div className={`flex items-center ${isValidIconClass} px-3 py-1 rounded-full`}>
            <FontAwesomeIcon icon={['fas', 'calendar']} className='mr-2' />
            <span>{endDate}</span>
          </div>
        </div>
        <div className='mb-2'>
          <p className='font-semibold'>Patient: <span className='font-normal'>{patientName}</span></p>
          <div className='h-1 bg-colorprimary w-12 mb-2' />
        </div>
      </div>
    </div>
  )
}
