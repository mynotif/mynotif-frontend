import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Patient, Prescription } from '../../types'
import { getPatient, getPrescription } from '../../services/api'
import { TokenContext } from '../../context/token'
import assert from 'assert'
import { capitalize } from 'lodash'
import { Container } from '../../components/home/Container'
import { Loading } from '../../components/loading/Loading'
import { AlertTriangleIcon, EditIcon, EyeIcon, FileTextIcon, InfoIcon, MailIcon } from 'lucide-react'
import { formatDate, getIconClass } from '../../utils/helpers'
import { t } from 'i18next'
import Tippy from '@tippyjs/react'
import { InfoRow } from '../../components/pageSections/detail/InfoRow'

const PrescriptionDetail = (): JSX.Element => {
  const { id } = useParams<'id'>()
  const { token } = useContext(TokenContext)
  const [prescriptionState, setPrescriptionState] = useState<Prescription | null>(null)
  const [patientState, setPatientState] = useState<Patient | null>(null)
  const navigate = useNavigate()

  const fetchPrescriptionCallback = useCallback(async (): Promise<void> => {
    assert(token)
    assert(id)
    try {
      const prescriptionData = await getPrescription(token, parseInt(id, 10))
      setPrescriptionState(prescriptionData)
      const patientData = await getPatient(token, prescriptionData.patient)
      setPatientState(patientData)
    } catch (error) {
      console.error(error)
    }
  }, [token, id])

  useEffect(() => {
    if (token === null) return
    // eslint-disable-next-line no-void
    void (async () => await fetchPrescriptionCallback())()
  }, [token, fetchPrescriptionCallback])

  const goToEditPrescription = (): void => {
    if (prescriptionState?.id !== undefined) {
      navigate(`/prescriptions/edit/${prescriptionState.id}/`)
    } else {
      console.error('Patient is undefined')
    }
  }

  const goToPatient = (patient: Patient): void => {
    navigate(`/patients/${patient.id}/`)
  }

  const goToSendEmail = (): void => {
    if (prescriptionState?.id !== undefined) {
      navigate(`/prescriptions/send/${prescriptionState.id}/`, {
        state: {
          patient: patientState,
          prescription: prescriptionState
        }
      })
    } else {
      console.error('Patient is undefined')
    }
  }

  return (
    <Container>
      {prescriptionState && patientState ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-colorprimary/10 rounded-full w-12 h-12 flex items-center justify-center">
                <FileTextIcon className="text-colorprimary w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {t('text.dr')} {capitalize(prescriptionState.prescribing_doctor)}
                </h2>
                <p className="text-sm text-gray-500">
                  {t('text.prescriptionFor')} {patientState.firstname} {patientState.lastname}
                </p>
              </div>
            </div>
            <button
              onClick={goToEditPrescription}
              className="bg-colorsecondary text-colorprimary px-3 py-2 rounded-lg hover:bg-shade3 transition-colors flex items-center space-x-2"
            >
              <EditIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              {t('title.infoPrescription')}
            </h3>
            <div className="space-y-3">
              <InfoRow
                label="Date d'expiration"
                value={formatDate(prescriptionState.end_date)}
                valueClassName={getIconClass(prescriptionState)}
              />
              {prescriptionState.photo_prescription ? (
                <div>
                  <a
                    href={prescriptionState.photo_prescription}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-colorprimary hover:underline"
                  >
                    <EyeIcon className="w-5 h-5 mr-2" />
                    {t('text.seePrescription')}
                  </a>
                </div>
              ) : (
                <div className="flex text-colorprimary items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangleIcon className="w-4 h-4" />
                    <span className="text-xs">{t('text.notSavePrescription')}</span>
                  </div>
                  <Tippy
                    content="Pour ajouter une ordonnance, cliquez sur le bouton 'Modifier' puis ajoutez une ordonnance"
                    placement="bottom"
                    theme="custom"
                    trigger="click"
                    interactive={true}
                    onClickOutside={(instance) => instance.hide()}
                  >
                    <span className='cursor-help text-gray-400 hover:text-colorprimary transition-colors'>
                      <InfoIcon className="w-5 h-5 text-blue-400" />
                    </span>
                  </Tippy>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                {t('title.contactDoctor')}
              </h3>
              <Tippy
                content="Pour contacter votre médecin par email, ajoutez son adresse email en haut à droite cliquer sur l'icon modifier. Lorsqu'une ordonnance est proche de l'expiration, un bouton de renouvellement par email sera automatiquement disponible."
                placement="bottom"
                theme="custom"
                trigger="click"
                interactive={true}
                onClickOutside={(instance) => instance.hide()}
              >
                <span className='cursor-help text-gray-400 hover:text-colorprimary transition-colors'>
                  <InfoIcon className="w-5 h-5 text-blue-400" />
                </span>
              </Tippy>
            </div>
            <div className="space-y-3">
              <InfoRow
                label="Nom"
                value={`Dr. ${capitalize(prescriptionState.prescribing_doctor)}`}
              />
              {prescriptionState.email_doctor ? (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Email</span>
                  <a
                    href={`mailto:${prescriptionState.email_doctor}`}
                    className="text-colorprimary hover:underline flex items-center"
                  >
                    <MailIcon className="w-5 h-5 mr-2" />
                    {prescriptionState.email_doctor}
                  </a>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <AlertTriangleIcon className="w-4 h-4 font-bold" />
                  <span className="text-xs">{t('text.notEmailDoctor')}</span>
                </div>
              )}
              {prescriptionState.email_doctor && (
                <button
                  onClick={goToSendEmail}
                  className="w-full bg-colorprimary text-white px-4 py-2 rounded-lg hover:bg-shade1 transition-colors flex items-center justify-center"
                >
                  <MailIcon className="w-5 h-5 mr-2" />
                  {t('text.contactDoctor')}
                </button>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  {t('title.informationPatient')}
                </h3>
                <button
                  onClick={() => goToPatient(patientState)}
                  className="text-sm font-semibold text-colorprimary hover:bg-colorsecondary px-3 py-1 rounded transition-colors"
                >
                  <EyeIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <InfoRow
                  label="N° Carte Vitale"
                  value={patientState.health_card_number}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

export default PrescriptionDetail
