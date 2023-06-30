import React, { useState } from 'react'
import { Patient, defaultPatient } from '../types'
import PatientForm from '../components/PatientForm'
import useTranslationHook from '../hook/TranslationHook'

const PatientCreatePage = (): JSX.Element => {
  const [newPatient] = useState<Patient>(defaultPatient)
  const { t } = useTranslationHook()

  return (
    <div>
      <div className='d-flex align-items-center justify-content-center bg-info rounded-bottom py-4'>
        <h1>{t('title.addPatient')}</h1>
      </div>
      <PatientForm patient={newPatient} isEditForm={false} />
    </div>
  )
}

export default PatientCreatePage
