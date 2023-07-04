import React, { useState } from 'react'
import PrescriptionForm from '../components/PrescriptionForm'
import { defaultPrescription, Prescription } from '../types'
import useTranslationHook from '../hook/TranslationHook'
import TitlePage from '../components/TitlePage'

const PrescriptionCreatePage = (): JSX.Element => {
  const [newPrescription] = useState<Prescription>(defaultPrescription)

  const { t } = useTranslationHook()

  return (
    <div>
      <TitlePage title={t('title.addPrescription')} />
      <PrescriptionForm
        prescription={newPrescription}
        isEditForm={false}
      />
    </div>
  )
}

export default PrescriptionCreatePage
