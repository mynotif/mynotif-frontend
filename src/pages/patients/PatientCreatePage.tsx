import React, { useState } from 'react'
import { Patient, defaultPatient } from '../../types'
import PatientForm from '../../components/forms/PatientForm'
import { Container } from '../../components/home/Container'

const PatientCreatePage = (): JSX.Element => {
  const [newPatient] = useState<Patient>(defaultPatient)

  return (
    <Container>
      <PatientForm patient={newPatient} isEditForm={false} />
    </Container>
  )
}

export default PatientCreatePage
