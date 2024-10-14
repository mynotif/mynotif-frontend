import { useLocation, useNavigate } from 'react-router-dom'
import HeaderProfile from './HeaderProfile'
import { useIsLoggedIn } from '../utils/hooks'
import { useContext, useEffect, useState } from 'react'
import { ProfileContext } from '../context/profile'
import { PAGE_CONFIG } from '../utils/constants'
import PageHeader from './PageHeader'
import AvatarCircle from './AvatarCircle'

const Header = (): JSX.Element => {
  const location = useLocation()
  const { profile } = useContext(ProfileContext)
  const initialUsername = profile.username.charAt(0).toUpperCase() + profile.username.charAt(1).toUpperCase()
  const initialFullname = profile.first_name.charAt(0).toUpperCase() + profile.last_name.charAt(0).toUpperCase()
  const initials = initialFullname !== '' ? initialFullname : initialUsername
  const isPatientProfile = location.pathname.match(/patients\/\d+$/)
  const isPrescriptionProfile = location.pathname.match(/prescriptions\/\d+$/)
  const isLoggedIn = useIsLoggedIn()
  const isHomePage = location.pathname === '/home'
  const navigate = useNavigate()

  const onAccountDetail = (): void => {
    navigate('/profile')
  }

  const [previousPath, setPreviousPath] = useState<string | null>(sessionStorage.getItem('previousPath'))

  useEffect(() => {
    const currentPath = sessionStorage.getItem('currentPath')
    if (location.pathname !== currentPath) {
      setPreviousPath(currentPath);
      sessionStorage.setItem('previousPath', currentPath ?? '')
      sessionStorage.setItem('currentPath', location.pathname)
    }
  }, [location.pathname])

  if (!isLoggedIn) {
    return <></>
  }

  const getPageHeaderProps = (): { url: string; title: string; showBackButton: boolean } => {
    let url = previousPath ?? '/home'
    let title = ''
    let showBackButton = false

    const currentPageConfig = PAGE_CONFIG.find(page => location.pathname.includes(page.path))

    if (currentPageConfig) {
      url = previousPath ?? currentPageConfig.path
      title = currentPageConfig.title
      showBackButton = currentPageConfig.showBackButton
    } else if (isPatientProfile) {
      url = previousPath ?? '/patients'
      title = 'Patient Profile'
    } else if (isPrescriptionProfile) {
      url = previousPath ?? '/prescriptions'
      title = 'Prescription Profile'
    }

    return { url, title, showBackButton }
  }

  const { url, title, showBackButton } = getPageHeaderProps()

  return (
    <header className='fixed top-0 left-0 right-0 h-16 bg-white shadow-md flex justify-between items-center px-4 z-10'>
      {isHomePage && (
        <>
          <HeaderProfile />
          <div onClick={onAccountDetail}>
            <AvatarCircle initials={initials} size={40} fontSize={16} />
          </div>
        </>
      )}
      {title && (
        <PageHeader
          url={url}
          title={title}
          showBackButton={showBackButton}
        />
      )}
    </header>
  )
}

export default Header