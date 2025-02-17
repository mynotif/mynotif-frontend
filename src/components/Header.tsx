import { useLocation, useNavigate } from 'react-router-dom'
import HeaderProfile from './HeaderProfile'
import { useIsLoggedIn } from '../utils/hooks'
import { useContext } from 'react'
import { ProfileContext } from '../context/profile'
import { PAGE_CONFIG } from '../utils/constants'
import AvatarCircle from './AvatarCircle'
import { t } from 'i18next'
import { ArrowLeftIcon } from 'lucide-react'

interface LocationState {
  title?: string;
}

const Header = (): JSX.Element => {
  const location = useLocation()
  const state = location.state as LocationState
  const { profile } = useContext(ProfileContext)
  const initialFullname = profile.first_name.charAt(0).toUpperCase() + profile.last_name.charAt(0).toUpperCase()
  const initials = initialFullname ? initialFullname : ''
  const isLoggedIn = useIsLoggedIn()
  const isHomePage = location.pathname === '/home'
  const navigate = useNavigate()

  const onAccount = (): void => {
    navigate('/setting')
  }

  if (!isLoggedIn) {
    return <></>
  }

  const getPageHeaderProps = (): { title: string; showBackButton: boolean } => {
    // Find matching page config, handling both exact and dynamic routes
    const currentPageConfig = PAGE_CONFIG.find(page => {
      if (page.path.includes(':id')) {
        // Convert :id pattern to regex for dynamic routes
        const pathRegex = new RegExp('^' + page.path.replace(':id', '\\d+') + '/?$')
        return pathRegex.test(location.pathname)
      }
      return location.pathname.startsWith(page.path)
    })

    if (!currentPageConfig) {
      return { title: '', showBackButton: false }
    }

    return {
      title: state?.title ?? t(currentPageConfig.titleKey),
      showBackButton: location.pathname !== '/home'
    }
  }

  const { title, showBackButton } = getPageHeaderProps()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <>
    <header className='fixed top-0 left-0 right-0 h-16 bg-gradient-to-br from-colorsecondary via-colorsecondary to-shade3 border-b border-gray-100 shadow-[0_4px_6px_-1px_rgba(75,181,193,0.1)] flex justify-between items-center px-4 z-10'>
    {isHomePage ? (
        <div className='flex items-center w-full justify-between'>
          <HeaderProfile />
          <div className='flex items-center space-x-4'>
            <div onClick={onAccount} className='cursor-pointer'>
              <AvatarCircle initials={initials} size={40} fontSize={16} />
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full flex items-center'>
          {showBackButton && (
            <button 
              onClick={handleBack} 
              className='mr-4 p-2 rounded-full hover:bg-colorsecondary transition-colors'
            >
              <ArrowLeftIcon className='w-6 h-6 text-colorprimary' />
            </button>
          )}
          <h1 className={`text-xl font-semibold flex-grow ${showBackButton ? 'ml-2' : 'text-center'}`}>
            {title}
          </h1>
        </div>
      )}
    </header>
    {!isHomePage && (
      <div className='fixed top-16 left-0 right-0 h-0 bg-gradient-to-r from-colorprimary via-shade1 to-shade2 z-10'></div>
    )}
  </>
  )
}

export default Header
