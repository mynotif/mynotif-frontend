import { EyeIcon } from 'lucide-react'
import { Patient, Prescription } from '../../types';
import { t } from 'i18next';
import { PatientDaysRemaining } from './PatientDaysRemaining';
import { useMemo } from 'react';

const calculateDaysRemaining = (endDate: string): number => {
    const [year, month, day] = endDate.split('-').map(Number);
    const end = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const isValidPrescription = (prescription: Prescription): boolean => {
    return calculateDaysRemaining(prescription.end_date) >= 0;
};

interface PrescriptionSoonProps {
    patientsExpiredSoon: Patient[];
    goToPrescription: (patient: Patient, prescriptionId?: string) => void;
}

export const PrescriptionSoon = ({ patientsExpiredSoon, goToPrescription }: PrescriptionSoonProps) => {
    const validPatients = useMemo(() =>
        patientsExpiredSoon.filter(patient =>
            patient.prescriptions?.some(isValidPrescription)
        )
    , [patientsExpiredSoon]);

    return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className='p-4 bg-colorprimary text-white flex justify-between items-center'>
            <h3 className='text-lg font-semibold'>{t('text.expiredSoon')}</h3>
            <span className='text-xl bg-white/20 px-2 rounded'>
                {validPatients.length}
            </span>
        </div>
        {validPatients.map((patient) => (
            <div
                key={patient.id}
                className="flex justify-between items-center py-4 px-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center space-x-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                            {patient.firstname} {patient.lastname}
                        </p>
                        <div className="space-y-2">
                            {patient.prescriptions?.map(prescription => (
                                <div key={prescription.id} className="flex items-center justify-between">
                                    <PatientDaysRemaining prescription={prescription} />
                                    <button
                                        onClick={() => goToPrescription(patient, prescription.id.toString())}
                                        className="ml-2 text-sm font-semibold text-colorprimary hover:bg-colorsecondary px-2 py-1 rounded transition-colors"
                                    >
                                        <EyeIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
    );
}
