import React, { useState } from 'react'
import PrescriptionForm from '../../components/forms/PrescriptionForm'
import { defaultPrescription, Prescription } from '../../types'
import { Container } from '../../components/home/Container'
import { usePrescriptionManagement } from '../../hook/prescriptionManagement'
import { Link } from 'react-router-dom'
import { t } from 'i18next'

const PrescriptionCreatePage = (): JSX.Element => {
  const [newPrescription] = useState<Prescription>(defaultPrescription)
  const { canAddPrescription, remainingFreePrescriptions, isSubscriptionActive } = usePrescriptionManagement()

  return (
    <Container>
      {!isSubscriptionActive && canAddPrescription && (
        <p className="mb-4 text-sm text-gray-600">
          Il vous reste {remainingFreePrescriptions} {t('text.prescription').toLocaleLowerCase()}(s) dans le plan gratuit(s).
        </p>
      )}
      {!canAddPrescription ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t('subscription.limit_reached')}</h2>
          <p className="mb-4">
            {t('subscription.description')}
          </p>
          <Link
            to="/subscription"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {t('subscription.upgrade_subscribe_button')}
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
