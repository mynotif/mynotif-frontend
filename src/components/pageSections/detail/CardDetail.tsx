import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import clsx from 'clsx'

interface CardDetailProps {
  title: string
  content: string
  icon: IconProp
  defaultContent: string
}

export const CardDetail = ({ title, content, icon, defaultContent }: CardDetailProps): JSX.Element => (
  <div className='bg-white rounded-lg p-4 shadow-sm flex items-center'>
    <div className='bg-colorsecondary rounded-full w-12 h-12 flex items-center justify-center'>
      <FontAwesomeIcon icon={icon} className='text-colorprimary text-2xl' />
    </div>
    <div className='ml-4'>
      <h3 className='font-semibold'>{title}</h3>
      <p className={clsx('text-gray-600',!content && defaultContent && 'text-red-500',)}>{content ? content : defaultContent}</p>
    </div>
  </div>
)
