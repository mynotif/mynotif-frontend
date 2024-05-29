import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Patient, Prescription } from '../../../types'
import { useNavigate } from 'react-router-dom'

interface PrescriptionCardProps {
  prescriptions: Prescription[]
  title: string
  icon: IconProp
  expireSoon: Prescription[]
  valid: Prescription[]
  invalid: Prescription[]
  patient: Patient
}

export const PrescriptionCard = ({ prescriptions, title, icon, expireSoon, valid, invalid, patient }: PrescriptionCardProps): JSX.Element => {
  const navigate = useNavigate()

  const goToPrescriptionList = (status: string): void => {
    navigate(`/prescriptions/status/${status}`, { state: { prescriptions: status === 'valid' ? valid : status === 'expireSoon' ? expireSoon : invalid,
      patient: {...patient}
     } });
  }

  return (
  <div className='bg-white rounded-lg p-4 shadow-sm flex items-center justify-between'>
    <div className='flex items-center justify-center'>
      <div className='bg-colorsecondary rounded-full w-12 h-12 flex items-center justify-center'>
        <FontAwesomeIcon icon={['fas', 'clipboard']} className='text-colorprimary text-2xl' />
      </div>
      <div className='ml-2'>
        <h3 className='font-semibold mt-2'>{title}</h3>
      </div>
    </div>
    {prescriptions.length > 0 ? (
      <>
        <span onClick={() => goToPrescriptionList('valid')} className='flex bg-green-100 rounded-full justify-center items-center w-5 h-5 text-green-500 font-semibold'>
          <span>{valid.length}</span>
        </span>
        <span onClick={() => goToPrescriptionList('expireSoon')} className='flex bg-yellow-100 rounded-full justify-center items-center w-5 h-5 text-yellow-500 font-semibold'>
          <span>{expireSoon.length}</span>
        </span>
        <span onClick={() => goToPrescriptionList('invalid')} className='flex bg-red-100 rounded-full justify-center items-center w-5 h-5 text-red-500 font-semibold'>
          <span>{invalid.length}</span>
        </span>
      </>
    ) : (
      <p>Zero ordonnace</p>
    )}
  </div>
)}
