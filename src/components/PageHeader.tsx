import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
interface PageHeaderProps {
  url: string
  title: string
}

const PageHeader = ({ url, title }: PageHeaderProps): JSX.Element => (
  <div className=' w-full flex justify-around items-center'>
    <div className='rounded-full border border-gray-300 w-10 h-10 flex items-center justify-center mr-2'>
      <Link to={url}>
        <FontAwesomeIcon icon={['fas', 'arrow-left']} className='text-black' />
      </Link>
    </div>
    <div>
      <h1 className='text-xl font-semibold flex-grow text-center mr-28'>{title}</h1>
    </div>
  </div>
)

export default PageHeader
