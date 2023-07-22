import React, { useState } from 'react'
import PrescriptionForm from '../../components/forms/PrescriptionForm'
import { defaultPrescription, Prescription } from '../../types'

const PrescriptionCreatePage = (): JSX.Element => {
  const [newPrescription] = useState<Prescription>(defaultPrescription)

  return (
    <div>
      <PrescriptionForm
        prescription={newPrescription}
        isEditForm={false}
      />
    </div>
  )
}

export default PrescriptionCreatePage
