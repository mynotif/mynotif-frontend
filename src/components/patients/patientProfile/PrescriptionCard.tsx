import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Prescription } from '../../../types'
import { t } from 'i18next'

interface PrescriptionCardProps {
  prescriptions: Prescription[]
  title: string
  icon: IconProp
}

export const PrescriptionCard = ({ prescriptions, title, icon }: PrescriptionCardProps): JSX.Element => (
  <div className='bg-white rounded-lg p-4 shadow-sm flex items-center justify-between'>
    <div className='flex items-center'>
      <div className='bg-colorsecondary rounded-full w-12 h-12 flex items-center justify-center'>
        <FontAwesomeIcon icon={['fas', 'clipboard']} className='text-colorprimary text-2xl' />
      </div>
      <div className='ml-4'>
        <h3 className='font-semibold'>{title}</h3>
      </div>
    </div>
    <div className='flex space-x-4'>
      {prescriptions.length > 0 ? (
        prescriptions.map((prescription, index) => (
          <a key={index} href={prescription.photo_prescription} target='_blank' rel='noreferrer'>
            <FontAwesomeIcon icon={icon} className='text-gray-600' />
          </a>
        ))
      ) : (
        <p>{t('text.noPrescriptionsFound')}</p>
      )}
    </div>
  </div>
)
