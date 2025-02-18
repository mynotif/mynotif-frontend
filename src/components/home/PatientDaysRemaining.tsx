import { Prescription } from '../../types'
import { useDaysRemaining } from '../../hook/daysRemaining'
import { CalendarIcon } from 'lucide-react'

interface PrescriptionProps {
    prescription: Prescription
}

export const PatientDaysRemaining = ({ prescription }: PrescriptionProps) => {
    const daysRemaining = useDaysRemaining(prescription.end_date)
    const formatDaysRemaining = () => {
        if (daysRemaining < 0) {
            return 'Expiré';
        }
        if (daysRemaining === 0) {
            return 'Expire aujourd\'hui';
        }
        return `${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} restant${daysRemaining > 1 ? 's' : ''}`;
    }

    const textColor = daysRemaining < 0 ? 'text-red-500' : 'text-yellow-500';

    return (
        <div className={`flex items-center space-x-1 text-xs ${textColor}`}>
            <CalendarIcon className='w-4 h-4' />
            <span>{formatDaysRemaining()}</span>
        </div>
    )
}
