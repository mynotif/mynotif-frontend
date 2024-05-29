import React, { useState } from 'react'
import { Patient, defaultPatient } from '../../types'
import PatientForm from '../../components/forms/PatientForm'

const PatientCreatePage = (): JSX.Element => {
  const [newPatient] = useState<Patient>(defaultPatient)

  return (
    <div>
      <PatientForm patient={newPatient} isEditForm={false} />
    </div>
  )
}

export default PatientCreatePage
