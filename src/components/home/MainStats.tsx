import { t } from 'i18next'
import { Patient, Prescription } from '../../types'
import { useNavigate } from 'react-router-dom'

interface MainStatsProps {
    patients: Patient[]
    prescriptions: Prescription[]
}

export const MainStats = ({ patients, prescriptions }: MainStatsProps) => {
    const navigate = useNavigate()
    const handlePatientClick = () => navigate('/patients')
    const handlePrescriptionClick = () => navigate('/prescriptions')

    return (
        <div className="grid grid-cols-2 gap-6">
            <button
                onClick={handlePatientClick}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center transition-all hover:shadow-lg hover:border-colorprimary focus:outline-none focus:ring-2 focus:ring-colorprimary focus:ring-offset-2"
                aria-label={`${t('text.patients')} - ${patients.length} ${t('text.total')}`}
            >
                <div className="text-5xl font-light text-colorprimary mb-2">
                    {patients.length}
                </div>
                <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                    {t('text.patients')}
                </h2>
            </button>

            <button
                onClick={handlePrescriptionClick}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center transition-all hover:shadow-lg hover:border-colorprimary focus:outline-none focus:ring-2 focus:ring-colorprimary focus:ring-offset-2"
                aria-label={`${t('text.prescriptions')} - ${prescriptions.length} ${t('text.total')}`}
            >
                <div className="text-5xl font-light text-colorprimary mb-2">
                    {prescriptions.length}
                </div>
                <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                    {t('text.prescriptions')}
                </h2>
            </button>
        </div>
    )
}
