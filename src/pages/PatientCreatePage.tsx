import React, { useState } from 'react'
import { Patient, defaultPatient } from '../types'
import PatientForm from '../components/PatientForm'
import useTranslationHook from '../hook/TranslationHook'
import TitlePage from '../components/TitlePage'

const PatientCreatePage = (): JSX.Element => {
  const [newPatient] = useState<Patient>(defaultPatient)
  const { t } = useTranslationHook()

  return (
    <div>
      <TitlePage title={t('title.addPatient')} />
      <PatientForm patient={newPatient} isEditForm={false} />
    </div>
  )
}

export default PatientCreatePage
