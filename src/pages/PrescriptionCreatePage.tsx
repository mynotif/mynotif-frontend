import React, { useState } from 'react'
import PrescriptionForm from '../components/PrescriptionForm'
import usePatients from '../hook/patient.hook'
import { defaultPrescription, Prescription } from '../types'
import useTranslationHook from '../hook/TranslationHook'

const PrescriptionCreatePage = (): JSX.Element => {
  const [newPrescription] = useState<Prescription>(defaultPrescription)
  const patients = usePatients()
  const { t } = useTranslationHook()

  return (
    <div>
      <div className='d-flex align-items-center justify-content-center bg-info rounded-bottom py-4'>
        <h1>{t('title.addPrescription')}</h1>
      </div>
      <PrescriptionForm
        prescription={newPrescription}
        patients={patients}
        isEditForm={false}
      />
    </div>
  )
}

export default PrescriptionCreatePage
