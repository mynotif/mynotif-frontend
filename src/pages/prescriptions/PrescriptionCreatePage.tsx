import React, { useState } from 'react'
import PrescriptionForm from '../../components/forms/PrescriptionForm'
import { defaultPrescription, Prescription } from '../../types'
import { Container } from '../../components/home/Container'

const PrescriptionCreatePage = (): JSX.Element => {
  const [newPrescription] = useState<Prescription>(defaultPrescription)

  return (
    <Container>
      <PrescriptionForm
        prescription={newPrescription}
        isEditForm={false}
      />
    </Container>
  )
}

export default PrescriptionCreatePage
