import { t } from 'i18next'
import { FilePlusIcon, UserPlusIcon } from 'lucide-react'

interface QuickActionsProps {
    goToNewAddPatient: () => void
    goToNewPrescription: () => void
}

export const QuickActions = ({ goToNewAddPatient, goToNewPrescription }: QuickActionsProps) => (
    <div className='grid grid-cols-2 gap-4'>
        <div
            onClick={goToNewAddPatient}
            className='bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors'
        >
            <div className='text-colorprimary mb-2'>
                <UserPlusIcon className='h-8 w-8 mx-auto' />
            </div>
            <h3 className='text-sm text-gray-600 mb-1'>
                {t('text.addNewPatient')}
            </h3>
        </div>
        <div
            onClick={goToNewPrescription}
            className='bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors'
        >
            <div className='text-colorprimary mb-2'>
                <FilePlusIcon className='h-8 w-8 mx-auto' />
            </div>
            <h3 className='text-sm text-gray-600 mb-1'>
                {t('text.addNewPrescription')}
            </h3>
        </div>
    </div>
)
