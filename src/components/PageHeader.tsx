import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
interface PageHeaderProps {
  url: string
  title: string
}

const PageHeader = ({ url, title }: PageHeaderProps): JSX.Element => (
  <div className='bg-white p-4 flex items-center shadow-md'>
    <div className='rounded-full border border-gray-300 w-10 h-10 flex items-center justify-center mr-2'>
      <a href={url}>
        <FontAwesomeIcon icon={['fas', 'arrow-left']} className='text-black' />
      </a>
    </div>
    <h1 className='text-xl font-semibold flex-grow text-center'>{title}</h1>
    <div className='w-8' />
  </div>
)

export default PageHeader
