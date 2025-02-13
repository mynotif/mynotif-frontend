import { Prescription } from '../../types'
import { useDaysRemaining } from '../../hook/daysRemaining'
import { CalendarIcon } from 'lucide-react'

interface PrescriptionProps {
    prescription: Prescription
}

export const PatientDaysRemaining = ({ prescription }: PrescriptionProps) => {
    const daysRemaining = useDaysRemaining(prescription.end_date)
    const formatDaysRemaining = () =>
        `${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} restant${daysRemaining > 1 ? 's' : ''}`

    return (
        <div className={`flex items-center space-x-1 text-xs text-yellow-500`}>
            <CalendarIcon className='w-4 h-4' />
            <span>{formatDaysRemaining()}</span>
        </div>
    )
}
