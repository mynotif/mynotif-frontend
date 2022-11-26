import React, { useState } from 'react'
import PrescriptionForm from '../components/PrescriptionForm'
import usePatients from '../hook/patient.hook'
import { defaultPrescription, Prescription } from '../types'

const PrescriptionCreatePage = (): JSX.Element => {
  const [newPrescription] = useState<Prescription>(defaultPrescription)
  const patients = usePatients()

  return (
    <div>
      <h1>Ajouter une prescription</h1>
      <PrescriptionForm
        prescription={newPrescription}
        patients={patients}
        isEditForm={false}
      />
    </div>
  )
}

export default PrescriptionCreatePage
