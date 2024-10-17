import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDate, getIconClass } from '../../../utils/helpers'
import { Patient, Prescription } from '../../../types'
import { Button } from '../../forms/inputGroups/Button'
import clsx from 'clsx'

interface PrescriptionFieldProps {
  prescriptionState: Prescription
  patientState: Patient
  fullNamePatient: string
  onClick?: () => void
  onEditClick?: () => void
  onSendClick?: () => void
}

export const PrescriptionField = ({ prescriptionState, patientState, fullNamePatient, onClick, onEditClick, onSendClick }: PrescriptionFieldProps): JSX.Element => {
  const missingValue = <span className='text-red-500'>A remplir</span>
  const isValidIconClass = getIconClass(prescriptionState)
  return (
    <>
      <div onClick={onClick} className='bg-white p-4 mt-8 rounded-lg relative z-10 shadow-sm'>
        <div className='mb-2'>
          <p className='font-semibold'> Patient:
            <span className='font-normal'>
              { ' ' + fullNamePatient || missingValue}
            </span>
          </p>
        </div>
        <div className='flex items-center mb-2'>
          <p className='flex-grow font-semibold'>N° carte vital: </p>
          <p className='font-normal'>
            {patientState.health_card_number && patientState.health_card_number !== '' ? patientState.health_card_number : missingValue}
          </p>
        </div>
        <div className='flex items-center mb-2'>
          <p className='flex-grow font-semibold'>Caisse de rattachement: </p>
          <p className='font-normal'>
            {patientState.ss_provider_code && patientState.ss_provider_code !== '' ? patientState.ss_provider_code : missingValue}
          </p>
        </div>
      </div>
      <div className='bg-white p-4 mt-8 rounded-lg relative  shadow-sm'>
        <div className='flex items-center mb-2'>
          <p className='flex-grow font-semibold'>Expire le: </p>
          <span className={clsx(isValidIconClass, "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium")}>
            <span>{(prescriptionState.end_date && prescriptionState.end_date !== '') ? formatDate(prescriptionState.end_date) : missingValue}</span>
          </span>
        </div>
        <div className='flex flex-col justify-end'>
          {prescriptionState.photo_prescription && prescriptionState.photo_prescription !== '' ? (
            <>
            <a href={prescriptionState.photo_prescription} target='_blank' rel='noreferrer' className='flex justify-center items-center no-underline bg-colorprimary text-white px-4 py-2 w-full rounded-lg'>
              <FontAwesomeIcon icon={['fas', 'eye']} className='mr-2' />
              <span>Voir ordonnance</span>
            </a>
            </>
          ) : (
            <Button icon={['fas', 'eye-slash']} iconPosition='left' size='small' disabled variant='disabled'>
              <span>Aucune ordonnance</span>
            </Button>
          )}
            {prescriptionState.is_valid && prescriptionState.expiring_soon && (
              <>
                <Button onClick={onEditClick} size='small' icon={['fas', 'calendar']} iconPosition='left' variant='secondary'>
                  <span>Mettre a jour date</span>
                </Button>
                <Button onClick={onSendClick} size='small' icon={['fas', 'envelope']} iconPosition='left' variant='accent'>
                  <span>Contacter médecin</span>
                </Button>
              </>
            )}
        </div>
      </div>
    </>
  )
}
