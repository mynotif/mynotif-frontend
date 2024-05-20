import React, { useState } from 'react'
import { Patient, defaultPatient } from '../../types'
import PatientForm from '../../components/forms/PatientForm'
import Header from '../../components/Header'

const PatientCreatePage = (): JSX.Element => {
  const [newPatient] = useState<Patient>(defaultPatient)

  return (
    <div>
      <Header />
      <PatientForm patient={newPatient} isEditForm={false} />
    </div>
  )
}

export default PatientCreatePage
