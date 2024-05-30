import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { strict as assert } from 'assert'
import { TokenContext } from '../../context/token'
import { FlashMessageContext, FlashMessageType } from '../../context/flashmessage'
import { getPatient } from '../../services/api'
import { Patient } from '../../types'
import useTranslationHook from '../../hook/TranslationHook'
import { BannerDetail } from '../../components/pageSections/detail/BannerDetail'
import { CardDetail } from '../../components/pageSections/detail/CardDetail'
import { PrescriptionCard } from '../../components/patients/patientProfile/PrescriptionCard'
import { Spinner } from '../../components/module/Spinner'
import { Container } from '../../components/home/Container'

const PatientDetail = (): JSX.Element => {
  const { id } = useParams<'id'>()

  const { token } = useContext(TokenContext)
  const { addErrorMessage } = useContext(FlashMessageContext)
  const { t } = useTranslationHook()
  const navigate = useNavigate()

  const addErrorMessageCallback = useCallback(
    (error: FlashMessageType) => addErrorMessage(error),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const [patient, setPatient] = useState<Patient | null>(null)

  const fetchPatientCallback = useCallback(async (): Promise<void> => {
    assert(token)
    assert(id)
    try {
      const data = await getPatient(token, parseInt(id, 10))
      setPatient(data)
    } catch (error) {
      console.error(error)
      addErrorMessageCallback({ body: 'Error fetching patient data' })
    }
  }, [token, addErrorMessageCallback, id])

  useEffect(() => {
    if (token === null) return
    // eslint-disable-next-line no-void
    void (async () => await fetchPatientCallback())()
  }, [token, fetchPatientCallback])

  const initials = (patient?.firstname?.charAt(0) ?? '').toUpperCase() + (patient?.lastname?.charAt(0) ?? '').toUpperCase()
  const fullName = `${patient?.firstname ?? ''} ${patient?.lastname ?? ''}`

  const goToEditPatient = (): void => {
    if (patient?.id !== undefined) {
      navigate(`/patients/edit/${patient.id}/`)
    } else {
      console.error('Patient is undefined')
    }
  }

  /**
   * Filter the prescriptions by their validity status
   */
  const expireSoon = patient?.prescriptions.filter((prescription) => prescription.is_valid && prescription.expiring_soon) ?? []
  const valid = patient?.prescriptions.filter((prescription) => prescription.is_valid && !prescription.expiring_soon) ?? []
  const invalid = patient?.prescriptions.filter((prescription) => !prescription.is_valid) ?? []

  return (
    <>
      {patient !== null ? (
        <Container>
          <BannerDetail fullName={fullName} initials={initials} onEditClick={goToEditPatient} />
            <CardDetail icon={['fas', 'map-marker-alt']} content={patient.street} defaultContent='Adresse manquante' title={t('form.address')} />
            <CardDetail icon={['fas', 'map-marker-alt']} content={patient.city} defaultContent='Ville manquante' title={t('form.city')} />
            <CardDetail icon={['fas', 'phone']} content={patient.phone} defaultContent='Numéro manquant' title={t('form.phone')} />
            <PrescriptionCard 
              prescriptions={patient.prescriptions}
              title={t('text.prescription')}
              icon={['fas', 'eye']}
              expireSoon={expireSoon}
              valid={valid}
              invalid={invalid}
              patient={patient}
          />
        </Container>
      ) : (
        <div className='flex justify-center items-center min-h-screen'>
          <div className='border-4 border-t-4 border-colorprimary rounded-full w-12 h-12 animate-spin'>
            <Spinner size='large' variant='primary' />
          </div>
        </div>
      )}
    </>
  )
}

export default PatientDetail
