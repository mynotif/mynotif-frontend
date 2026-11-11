import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePatientDetail } from '../../hook/patientDetail.hook'
import { patientReadMessages, PatientReadStatus } from '../../services/patientDetail'
import { Container } from '../../components/home/Container'
import { Loading } from '../../components/loading/Loading'
import { EditIcon, EyeIcon, UserIcon } from 'lucide-react'
import { t } from 'i18next'
import { InfoRow } from '../../components/pageSections/detail/InfoRow'

export const PatientReadFeedback = ({ status, retry }: { status: PatientReadStatus; retry: () => void }): JSX.Element => (
  status === 'loading' ? <div role='status' aria-label='Chargement du dossier patient'><Loading /></div>
    : <div role='alert' className='space-y-4'>
      <p>{status === 'ready' ? '' : patientReadMessages[status]}</p>
      <button type='button' onClick={retry} className='text-colorprimary underline'>Réessayer</button>
    </div>
)
const dateLabel = (date: string | null): string => date ? date.split('-').reverse().join('/') : '—'
const dateOrder = (date: string | null): number => date ? Date.parse(date) : 0

const PatientDetail = (): JSX.Element => {
  const { id } = useParams<'id'>()
  const { patient, status, retry } = usePatientDetail(id)
  const navigate = useNavigate()

  const goToEditPatient = (): void => {
    if (patient?.id !== undefined) {
      navigate(`/patients/edit/${patient.id}/`)
    } else {
      return
    }
  }

  const prescriptionCategories = {
    expireSoon: patient?.prescriptions.filter((p) => p.is_valid && p.expiring_soon) ?? [],
    valid: patient?.prescriptions.filter((p) => p.is_valid && !p.expiring_soon) ?? [],
    invalid: patient?.prescriptions.filter((p) => !p.is_valid) ?? []
  }

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
              aria-label='Modifier le patient'
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
                  value={patient.birthday ?
                    // Split ISO date string and reformat to DD/MM/YYYY
                    patient.birthday.split('-').reverse().join('/')
                    : ''}
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
              </div>
              <div className="space-y-3">
                <div>
                  <InfoRow
                    label={t('text.expiredSoon').charAt(0).toUpperCase() + t('text.expiredSoon').toLowerCase().slice(1)}
                    value={`${prescriptionCategories.expireSoon.length} ${t('text.prescription')}${prescriptionCategories.expireSoon.length > 1 ? 's' : ''}`}
                    valueClassName="text-yellow-500"
                  />
                  {prescriptionCategories.expireSoon.length > 0 && (
                    <div className="ml-4 mt-2 space-y-2">
                      {prescriptionCategories.expireSoon
                        .sort((a, b) => dateOrder(a.end_date) - dateOrder(b.end_date)) // Sort by closest expiry date first
                        .map((prescription) => (
                        <button
                          key={prescription.id}
                          onClick={() => navigate(`/prescriptions/${prescription.id}`)}
                          className="text-yellow-500 hover:text-yellow-600 transition-colors text-sm flex items-center space-x-2 w-full pb-2 border-b border-yellow-200/20 last:border-b-0"
                        >
                          <EyeIcon className="w-4 h-4" />
                          <span>
                            {dateLabel(prescription.end_date)} - Dr {prescription.prescribing_doctor}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <InfoRow
                    label={t('text.running').charAt(0).toUpperCase() + t('text.running').toLowerCase().slice(1)}
                    value={`${prescriptionCategories.valid.length} ${t('text.prescription')}${prescriptionCategories.valid.length > 1 ? 's' : ''}`}
                    valueClassName="text-green-500"
                  />
                  {prescriptionCategories.valid.length > 0 && (
                    <div className="ml-4 mt-2 space-y-2">
                      {prescriptionCategories.valid
                        .sort((a, b) => dateOrder(a.end_date) - dateOrder(b.end_date))
                        .map((prescription) => (
                        <button
                          key={prescription.id}
                          onClick={() => navigate(`/prescriptions/${prescription.id}`)}
                          className="text-green-500 hover:text-green-600 transition-colors text-sm flex items-center space-x-2 w-full pb-2 border-b border-green-200/20 last:border-b-0"
                        >
                          <EyeIcon className="w-4 h-4" />
                          <span>
                            {dateLabel(prescription.end_date)} - Dr {prescription.prescribing_doctor}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <InfoRow
                    label={t('text.expired')}
                    value={`${prescriptionCategories.invalid.length} ${t('text.prescription')}${prescriptionCategories.invalid.length > 1 ? 's' : ''}`}
                    valueClassName="text-red-500"
                  />
                  {prescriptionCategories.invalid.length > 0 && (
                    <div className="ml-4 mt-2 space-y-2">
                      {prescriptionCategories.invalid
                        .sort((a, b) => dateOrder(b.end_date) - dateOrder(a.end_date)) // Sort expired prescriptions with most recently expired first
                        .map((prescription) => (
                        <button
                          key={prescription.id}
                          onClick={() => navigate(`/prescriptions/${prescription.id}`)}
                          className="text-red-500 hover:text-red-600 transition-colors text-sm flex items-center space-x-2 w-full pb-2 border-b border-red-200/20 last:border-b-0"
                        >
                          <EyeIcon className="w-4 h-4" />
                          <span>
                            {dateLabel(prescription.end_date)} - Dr {prescription.prescribing_doctor}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PatientReadFeedback status={status} retry={retry} />
      )}
    </Container>
  )
}

export default PatientDetail
