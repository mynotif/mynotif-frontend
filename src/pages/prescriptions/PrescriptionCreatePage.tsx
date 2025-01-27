import React, { useState } from 'react'
import PrescriptionForm from '../../components/forms/PrescriptionForm'
import { defaultPrescription, Prescription } from '../../types'
import { Container } from '../../components/home/Container'
import { usePrescriptionManagement } from '../../hook/prescriptionManagement'
import { Link } from 'react-router-dom'

const PrescriptionCreatePage = (): JSX.Element => {
  const [newPrescription] = useState<Prescription>(defaultPrescription)
  const { canAddPrescription, remainingFreePrescriptions, isSubscriptionActive } = usePrescriptionManagement()

  return (
    <Container>
      {!isSubscriptionActive && canAddPrescription && (
        <p className="mb-4 text-sm text-gray-600">
          Il vous reste {remainingFreePrescriptions} prescription(s) gratuit(s).
        </p>
      )}
      {!canAddPrescription ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Limite de prescriptions atteinte</h2>
          <p className="mb-4">
            Vous avez atteint la limite de prescriptions gratuits. Veuillez passer à la version Essentielle pour ajouter plus de prescriptions.
          </p>
          <Link
            to="/subscription"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Passer à la version Essentielle
          </Link>
        </div>
      ) : (
        <PrescriptionForm
          prescription={newPrescription}
          isEditForm={false}
        />
      )}
    </Container>
  )
}

export default PrescriptionCreatePage
