import React, { useState } from 'react'
import { Patient, defaultPatient } from '../types'
import PatientForm from '../components/PatientForm'
import useTranslationHook from '../hook/TranslationHook'

const PatientCreatePage = (): JSX.Element => {
  const [newPatient] = useState<Patient>(defaultPatient)
  const { t } = useTranslationHook()

  return (
    <div>
      <h1>{t('title.addPatient')}</h1>
      <PatientForm patient={newPatient} isEditForm={false} />
    </div>
  )
}

export default PatientCreatePage
