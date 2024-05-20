import { useLocation } from 'react-router-dom'
import HeaderProfile from './HeaderProfile'
import { useIsLoggedIn } from '../utils/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { ProfileContext } from '../context/profile'
import { PAGE_CONFIG } from '../utils/constants'
import PageHeader from './PageHeader'

const Header = (): JSX.Element => {
  const location = useLocation()
  const currentPage = PAGE_CONFIG.find(page => location.pathname.includes(page.path))
  const { profile } = useContext(ProfileContext)
  const initialUsername = profile.username.charAt(0).toUpperCase() + profile.username.charAt(1).toUpperCase()
  const initialFullname = profile.first_name.charAt(0).toUpperCase() + profile.last_name.charAt(0).toUpperCase()
  const initials = initialFullname !== '' ? initialFullname : initialUsername
  return (
    <>
      {useIsLoggedIn() === true && location.pathname === '/home' && (
        <div className='bg-colorprimary pb-60 rounded-b-2xl relative'>
          <div className='flex justify-between items-center mb-4 p-5'>
            <HeaderProfile />
            <div className='flex items-center space-x-4'>
              <FontAwesomeIcon icon={['fas', 'bell']} className='text-white text-2xl' />
              <i className='fas fa-bell text-white text-2xl relative'>
                <span className='absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>2</span>
              </i>
              <div className='bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center'>
                <span className='text-white text-xl font-semibold'>{initials}</span>
              </div>

            </div>
          </div>
        </div>
      )}
      {(currentPage != null) && (
        <PageHeader url='/home' title={currentPage.title} />
      )}
    </>
  )
}

export default Header
