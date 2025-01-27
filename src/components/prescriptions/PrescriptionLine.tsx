import { FileTextIcon, CalendarIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Prescription } from "../../types"
import { getIconClass } from "../../utils/helpers"
import { useDaysRemaining } from '../../hook/daysRemaining'
import { t } from 'i18next'

const PrescriptionLine = ({ prescription }: { prescription: Prescription }) => {
    const navigate = useNavigate()
    const goToPrescription = () => navigate(`/prescriptions/${prescription.id}`)
    const daysRemaining = useDaysRemaining(prescription.end_date)

    const iconClass = getIconClass(prescription)

    const formatDaysRemaining = () => {
        if (daysRemaining < 0) return t('text.expired')
        if (daysRemaining === 0) return t('text.expireToday')
        return `${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} restant${daysRemaining > 1 ? 's' : ''}`
    }

    return (
        <div 
            onClick={goToPrescription} 
            className='group border-b border-gray-200/50 py-3 flex items-center justify-between hover:bg-colorsecondary/30 transition-colors cursor-pointer'
        >
            <div className='flex items-center space-x-3'>
                <div className={`rounded-full w-10 h-10 flex items-center justify-center`}>
                    <FileTextIcon className='text-colorprimary w-5 h-5' />
                </div>
                <div>
                    <h3 className='font-medium text-gray-800 group-hover:text-colorprimary transition-colors'>
                        Dr. {prescription.prescribing_doctor}
                    </h3>
                    <p className='text-xs text-gray-500'>
                        {prescription.patient_firstname} {prescription.patient_lastname}
                    </p>
                </div>
            </div>
            <div className={`flex items-center space-x-1 text-xs ${iconClass}`}>
                <CalendarIcon className='w-4 h-4' />
                <span>{formatDaysRemaining()}</span>
            </div>
        </div>
    )
}

export default PrescriptionLine
