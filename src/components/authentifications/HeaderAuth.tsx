import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const HeaderAuth = (): JSX.Element => (
  <div className='bg-colorprimary pb-60 rounded-b-2xl relative'>
    <div className='flex justify-center items-center h-64 mb-5'>
      <FontAwesomeIcon size='7x' icon={['fas', 'user-nurse']} className='text-white' />
    </div>
  </div>
)
