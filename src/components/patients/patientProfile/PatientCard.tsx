import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface PatientCardProps {
  title: string
  content: string
  icon: IconProp
}

export const PatientCard = ({ title, content, icon }: PatientCardProps): JSX.Element => (
  <div className='bg-white rounded-lg p-4 shadow-sm flex items-center'>
    <div className='bg-colorsecondary rounded-full w-12 h-12 flex items-center justify-center'>
      <FontAwesomeIcon icon={icon} className='text-colorprimary text-2xl' />
    </div>
    <div className='ml-4'>
      <h3 className='font-semibold'>{title}</h3>
      <p className='text-gray-600'>{content}</p>
    </div>
  </div>
)
