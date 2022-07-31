import React, { useState } from 'react'
import { Patient, defaultPatient } from '../types'
import PatientForm from '../components/PatientForm'

const PatientCreatePage = (): JSX.Element => {
  const [newPatient] = useState<Patient>(defaultPatient)
  return (
    <div>
      <h1>Ajouter un patient</h1>
      <PatientForm patient={newPatient} isEditForm={false} />
    </div>
  )
}

export default PatientCreatePage
