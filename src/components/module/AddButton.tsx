import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

interface AddButtonProps {
  url: string
  icon: IconProp
}

export const AddButton = ({ url, icon }: AddButtonProps): JSX.Element => {
  return (
    <div className='fixed bottom-10 right-0 mb-20 mr-12 w-10 h-10 flex items-center' style={{ zIndex: 1030 }}>
      <Link to={url} className='bg-colorprimary text-white p-4 rounded-full shadow-lg hover:bg-colorprimary'>
        <FontAwesomeIcon icon={icon} className='text-2xl' />
      </Link>
    </div>
  )
}
