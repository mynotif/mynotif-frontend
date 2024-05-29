import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { formatDate } from '../../../utils/helpers'
import { Patient, Prescription } from '../../../types'

interface PrescriptionFieldProps {
  prescriptionState: Prescription
  patientState: Patient
  fullNamePatient: string
}

export const PrescriptionField = ({ prescriptionState, patientState, fullNamePatient }: PrescriptionFieldProps): JSX.Element => {
  return (
    <>
      <div className='bg-white p-4 mt-8 rounded-lg relative z-10 shadow-sm'>
        <div className='mb-2'>
          <p className='font-semibold'> Patient:
            <span className='font-normal'>
              {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
              {fullNamePatient || <span className='text-red-500'>Valeur manquante à remplir</span>}
            </span>
          </p>
        </div>
        <div className='flex items-center mb-2'>
          <p className='flex-grow font-semibold'>N° carte vital: </p>
          <p className='font-normal'>
            {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
            {patientState.health_card_number && patientState.health_card_number !== '' ? patientState.health_card_number : <span className='text-red-500'>Valeur manquante à remplir</span>}
          </p>
        </div>
        <div className='flex items-center mb-2'>
          <p className='flex-grow font-semibold'>Caisse de rattachement: </p>
          <p className='font-normal'>
            {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
            {patientState.ss_provider_code && patientState.ss_provider_code !== '' ? patientState.ss_provider_code : <span className='text-red-500'>Valeur manquante à remplir</span>}
          </p>
        </div>
      </div>
      <div className='bg-white p-4 mt-8 rounded-lg relative  shadow-sm'>
        <div className='flex items-center mb-2'>
          <p className='flex-grow font-semibold'>Expire le: </p>
          <div className='flex items-center bg-colorsecondary text-colorprimary px-3 py-1 rounded-full'>
            <FontAwesomeIcon icon={['fas', 'calendar']} className='mr-2' />
            {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
            <span>{(prescriptionState.end_date && prescriptionState.end_date !== '') ? formatDate(prescriptionState.end_date) : <span className='text-red-500'>Valeur manquante à remplir</span>}</span>
          </div>
        </div>
        <div className='flex justify-end'>
          {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
          {prescriptionState.photo_prescription && prescriptionState.photo_prescription !== '' && (
            <a href={prescriptionState.photo_prescription} target='_blank' rel='noreferrer' className='flex justify-center items-center no-underline bg-colorprimary text-white px-4 py-2 w-full rounded-lg'>
              <FontAwesomeIcon icon={['fas', 'eye']} className='mr-2' />
              <span>Voir ordonnance</span>
            </a>
          )}
        </div>
      </div>
    </>
  )
}
