import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { strict as assert } from 'assert'
import { TokenContext } from '../../context/token'
import { FlashMessageContext } from '../../context/flashmessage'
import { getPatient } from '../../services/api'
import { Patient } from '../../types'
import { Container } from '../../components/home/Container'
import { Loading } from '../../components/loading/Loading'
import { EditIcon, EyeIcon, InfoIcon, UserIcon } from 'lucide-react'
import { t } from 'i18next'
import { InfoRow } from '../../components/pageSections/detail/InfoRow'
import Tippy from '@tippyjs/react'

const PatientDetail = (): JSX.Element => {
  const { id } = useParams<'id'>()
  const { token } = useContext(TokenContext)
  const { addErrorMessage } = useContext(FlashMessageContext)
  const navigate = useNavigate()

  const [patient, setPatient] = useState<Patient | null>(null)

  const fetchPatientCallback = useCallback(async (): Promise<void> => {
    assert(token)
    assert(id)
    try {
      const data = await getPatient(token, parseInt(id, 10))
      setPatient(data)
    } catch (error) {
      console.error(error)
      addErrorMessage({ body: 'Error fetching patient data' })
    }
  }, [token, id, addErrorMessage])

  useEffect(() => {
    if (token === null) return
    void (async () => await fetchPatientCallback())()
  }, [token, fetchPatientCallback])

  const goToEditPatient = (): void => {
    if (patient?.id !== undefined) {
      navigate(`/patients/edit/${patient.id}/`)
    } else {
      console.error('Patient is undefined')
    }
  }

  const prescriptionCategories = {
    expireSoon: patient?.prescriptions.filter((p) => p.is_valid && p.expiring_soon) ?? [],
    valid: patient?.prescriptions.filter((p) => p.is_valid && !p.expiring_soon) ?? [],
    invalid: patient?.prescriptions.filter((p) => !p.is_valid) ?? []
  }

  const prescriptionIdSoon = prescriptionCategories.expireSoon.reduce((closest, current) => {
    if (!closest || !closest.end_date) return current;
    const closestEndDate = new Date(closest.end_date);
    const currentEndDate = new Date(current.end_date);

    return currentEndDate < closestEndDate ? current : closest;
  }, patient?.prescriptions[0])?.id;

  return (
    <Container>
      {patient ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-colorprimary/10 rounded-full w-12 h-12 flex items-center justify-center">
                <UserIcon className="text-colorprimary w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {patient.firstname} {patient.lastname}
                </h2>
                <p className="text-sm text-gray-500">
                  {t('text.patient')}
                </p>
              </div>
            </div>
            <button
              onClick={goToEditPatient}
              className="bg-colorsecondary text-colorprimary px-3 py-2 rounded-lg hover:bg-shade3 transition-colors flex items-center space-x-2"
            >
              <EditIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                {t('title.infoPatient')}
              </h3>
              <div className="space-y-3">
                <InfoRow
                  label={t('form.address')}
                  value={patient.street}
                />
                <InfoRow
                  label={t('form.city')}
                  value={patient.city}
                />
                <InfoRow
                  label={t('form.phone')}
                  value={patient.phone}
                />
                <InfoRow
                  label={t('form.birthday')}
                  value={patient.birthday}
                />
                <InfoRow
                  label={t('form.carteVitale')}
                  value={patient.health_card_number}
                />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  {t('text.prescription')}
                </h3>
                {/* View the prescription with the closest expiration date */}
               {prescriptionIdSoon !== undefined && (
                 <div className='flex items-center space-x-2'>
                 <button
                   onClick={() => navigate(`/prescriptions/${prescriptionIdSoon}`)}
                   className="bg-colorprimary text-colorsecondary px-4 py-2 rounded-lg hover:bg-colorprimary transition-colors flex items-center space-x-2"
                 >
                   <EyeIcon className="w-5 h-5" />
                 </button>
                 <Tippy
                   content="L'ordonnance dont la date est la plus proche de la date actuelle"
                   placement="bottom"
                   theme="custom"
                   trigger="click"
                   interactive={true}
                   onClickOutside={(instance) => instance.hide()}
                 >
                   <span className='cursor-help text-gray-400 hover:text-colorprimary transition-colors'>
                     <InfoIcon className="w-4 h-4" />
                   </span>
                 </Tippy>
                 </div>
               )}
              </div>
              <div className="space-y-3">
                <InfoRow
                  label={t('text.expiredSoon').charAt(0).toUpperCase() + t('text.expiredSoon').toLowerCase().slice(1)}
                  value={`${prescriptionCategories.expireSoon.length} ${t('text.prescription')}${prescriptionCategories.expireSoon.length > 1 ? 's' : ''}`}
                  valueClassName="text-yellow-500"
                />
                <InfoRow
                  label={t('text.running').charAt(0).toUpperCase() + t('text.running').toLowerCase().slice(1)}
                  value={`${prescriptionCategories.valid.length} ${t('text.prescription')}${prescriptionCategories.valid.length > 1 ? 's' : ''}`}
                  valueClassName="text-green-500"
                />
                <InfoRow
                  label={t('text.expired')}
                  value={`${prescriptionCategories.invalid.length} ${t('text.prescription')}${prescriptionCategories.invalid.length > 1 ? 's' : ''}`} valueClassName="text-red-500"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  )
}

export default PatientDetail
