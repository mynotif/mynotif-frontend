import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Patient, Prescription } from '../../../types'

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
        <span className='flex bg-green-100 rounded-full justify-center items-center w-5 h-5 text-green-500 font-semibold'>
          <span>{valid.length}</span>
        </span>
        <span className='flex bg-yellow-100 rounded-full justify-center items-center w-5 h-5 text-yellow-500 font-semibold'>
          <span>{expireSoon.length}</span>
        </span>
        <span className='flex bg-red-100 rounded-full justify-center items-center w-5 h-5 text-red-500 font-semibold'>
          <span>{invalid.length}</span>
        </span>
      </>
    ) : (
      <p>Zero ordonnace</p>
    )}
  </div>
)}
