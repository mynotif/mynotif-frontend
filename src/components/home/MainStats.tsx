import { t } from 'i18next'
import { Patient, Prescription } from '../../types'

interface MainStatsProps {
    patients: Patient[]
    prescriptions: Prescription[]
}

export const MainStats = ({ patients, prescriptions }: MainStatsProps) => (
    <div className='grid grid-cols-2 gap-6'>
        <div className='bg-white border border-gray-200 rounded-lg p-6 text-center'>
            <div className='text-5xl font-light text-colorprimary mb-2'>
                {patients.length}
            </div>
            <h2 className='text-sm uppercase tracking-wider text-gray-500 mb-1'>
                {t('text.patients')}
            </h2>
        </div>
        <div className='bg-white border border-gray-200 rounded-lg p-6 text-center'>
            <div className='text-5xl font-light text-colorprimary mb-2'>
                {prescriptions.length}
            </div>
            <h2 className='text-sm uppercase tracking-wider text-gray-500 mb-1'>
                {t('text.prescriptions')}
            </h2>
        </div>
    </div>
)
