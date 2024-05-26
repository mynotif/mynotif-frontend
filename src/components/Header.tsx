import { useLocation } from 'react-router-dom'
import HeaderProfile from './HeaderProfile'
import { useIsLoggedIn } from '../utils/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { ProfileContext } from '../context/profile'
import { PAGE_CONFIG } from '../utils/constants'
import PageHeader from './PageHeader'
import AvatarCircle from './AvatarCircle'

interface HeaderProps {
  countNotification?: number
}

const Header = ({ countNotification }: HeaderProps): JSX.Element => {
  const location = useLocation()
  const currentPage = PAGE_CONFIG.find(page => location.pathname.includes(page.path))
  const { profile } = useContext(ProfileContext)
  const initialUsername = profile.username.charAt(0).toUpperCase() + profile.username.charAt(1).toUpperCase()
  const initialFullname = profile.first_name.charAt(0).toUpperCase() + profile.last_name.charAt(0).toUpperCase()
  const initials = initialFullname !== '' ? initialFullname : initialUsername
  const isPatientProfile = location.pathname.match(/patients\/\d+$/)
  const isPrescriptionProfile = location.pathname.match(/prescriptions\/\d+$/)
  const isCountNotification = countNotification !== null && countNotification !== undefined && countNotification > 0

  return (
    <>
      {useIsLoggedIn() === true && location.pathname === '/home' && (
        <div className='bg-colorprimary pb-60 rounded-b-2xl relative'>
          <div className='flex justify-between items-start mb-4 p-5'>
            <HeaderProfile />
            <div className='flex items-center space-x-4'>
              <FontAwesomeIcon icon={['fas', 'bell']} className='text-white text-2xl' />
              {isCountNotification && (
                <i className='fas fa-bell text-white text-2xl relative'>
                  <span className='absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>{countNotification}</span>
                </i>
              )}
              <AvatarCircle initials={initials} size={40} fontSize={16} />
            </div>
          </div>
        </div>
      )}
      {currentPage != null && (
        <>
          {(isPatientProfile != null) ? (
            <PageHeader url='/patients' title='Patient Profile' />
          ) : (isPrescriptionProfile != null) ? (
            <PageHeader url='/prescriptions' title='Prescription Profile' />
          ) : (
            <PageHeader url='/home' title={currentPage.title} />
          )}
        </>
      )}
    </>
  )
}

export default Header
