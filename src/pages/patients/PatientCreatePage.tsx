import React, { useState } from 'react'
import { Patient, defaultPatient } from '../../types'
import PatientForm from '../../components/forms/PatientForm'
import { Container } from '../../components/home/Container'
import { usePatientManagement } from '../../hook/patientManagement'
import { Link } from 'react-router-dom'
import { t } from 'i18next'
import { patientListErrorMessage } from '../../services/patientList'

const PatientCreatePage = (): JSX.Element => {
  const [newPatient] = useState<Patient>(defaultPatient)
  const { canAddPatient, remainingFreePatients, isSubscriptionActive, countLoading, countError, retryCount } = usePatientManagement()

  return (
    <Container>
      {!isSubscriptionActive && canAddPatient && (
        <p className="mb-4 text-sm text-gray-600">
          Il vous reste {remainingFreePatients} patient(s) dans le plan gratuit(s).
        </p>
      )}
      {!isSubscriptionActive && countLoading ? <p role='status'>Vérification du nombre de patients…</p> : !isSubscriptionActive && countError ? (
        <div role='alert'>
          <p>{patientListErrorMessage(countError)}</p>
          <button type='button' onClick={() => { void retryCount() }}>Réessayer</button>
        </div>
      ) : !canAddPatient ? (
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
        <PatientForm patient={newPatient} isEditForm={false} />
      )}
    </Container>
  )
}

export default PatientCreatePage
