import { EyeIcon } from 'lucide-react'
import { Patient } from '../../types';
import { t } from 'i18next';

interface PrescriptionSoonProps {
    patientsExpiredSoon: Patient[];
    goToPrescription: (patient: Patient) => void;
}

export const PrescriptionSoon = ({ patientsExpiredSoon, goToPrescription }: PrescriptionSoonProps) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className='p-4 bg-colorprimary text-white flex justify-between items-center'>
            <h3 className='text-lg font-semibold'>{t('text.expiredSoon')}</h3>
            <span className='text-sm bg-white/20 px-2 py-1 rounded'>
                {patientsExpiredSoon.length}
            </span>
        </div>
        {patientsExpiredSoon.map((patient) => (
            <div
                key={patient.id}
                className="flex justify-between items-center py-4 px-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center space-x-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                            {patient.firstname} {patient.lastname}
                        </p>
                        <p className="text-xs text-gray-500">
                            {t('text.prescriptionExpireSoon')}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => goToPrescription(patient)}
                    className="text-sm font-semibold text-colorprimary hover:bg-colorsecondary px-3 py-1 rounded transition-colors"
                >
                    <EyeIcon className="w-5 h-5" />
                </button>
            </div>
        ))}
    </div>
)
