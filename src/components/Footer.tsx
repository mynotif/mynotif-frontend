import { useCallback, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { ErrorResponse } from '../types'
import { useIsLoggedIn, useLogout } from '../utils/hooks'
import { getTokenLocalStorage } from '../utils/helpers'
import { FlashMessageContext, FlashMessageType } from '../context/flashmessage'
import { ProfileContext } from '../context/profile'
import { TokenContext } from '../context/token'
import { getProfile } from '../services/api'
import { BACKEND_URL } from '../services/constants'
import useTranslationHook from '../hook/TranslationHook'

const Footer = (): JSX.Element => {
  const { token, setToken } = useContext(TokenContext)
  const { profile, setProfile } = useContext(ProfileContext)
  const { addErrorMessage } = useContext(FlashMessageContext)
  const logout = useLogout()
  const { t } = useTranslationHook()
  const location = useLocation()

  const addErrorMessageCallback = useCallback(
    (flashMessage: FlashMessageType) => addErrorMessage(flashMessage),
    // eslint-disable-next-line
        []
  )

  const handleFetchProfileErrorCallback = useCallback((error: unknown | AxiosError): void => {
    console.error(error)
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>
      const { response } = axiosError
      if ((response?.status === 401) && (response.data?.detail === 'Invalid token.')) {
        addErrorMessageCallback({ body: 'Session expired, please log in again.' })
        logout()
      }
    } else {
      addErrorMessageCallback({ body: 'Error fetching profile data' })
    }
  },
  // eslint-disable-next-line
        [addErrorMessageCallback]
  )

  const fetchProfileCallback = useCallback(async (token: string): Promise<void> => {
    try {
      const data = await getProfile(token)
      setProfile(data)
    } catch (error: unknown | AxiosError) {
      handleFetchProfileErrorCallback(error)
    }
    // eslint-disable-next-line
    }, [addErrorMessageCallback, handleFetchProfileErrorCallback])

  // fetch profile
  useEffect(() => {
    if (token === null || token === undefined) return
    // eslint-disable-next-line no-void
    void (async () => await fetchProfileCallback(token))()
  }, [token, fetchProfileCallback])

  useEffect(() => {
    setToken(getTokenLocalStorage())
  }, [setToken])

  return (
    <>
      <Navbar className='shadow-lg' fixed='bottom' bg='body' data-bs-theme='light'>
        <Container>
          {useIsLoggedIn() === true && (
            <>
              {profile.is_staff && (
                <Nav className='me-auto'>
                  <Nav.Link href={`${BACKEND_URL}/admin`}>
                    <div className={`d-flex flex-column align-items-center ${location.pathname === '/admin' ? 'text-primary' : ''}`}>
                      <FontAwesomeIcon icon={['fas', 'user-shield']} />
                      <div className='mt-1'>{t('text.admin')}</div>
                    </div>
                  </Nav.Link>
                </Nav>
              )}
              <Nav className='me-auto'>
                <Nav.Link as={Link} to='/patients'>
                  <div className={`d-flex flex-column align-items-center ${location.pathname === '/patients' ? 'text-primary' : ''}`}>
                    <FontAwesomeIcon icon={['fas', 'users']} className='fa-lg' />
                    <div className='mt-1'>{t('text.patients')}</div>
                  </div>
                </Nav.Link>
              </Nav>
              <Nav className='mr-auto'>
                <Nav.Link as={Link} to='/prescriptions' className='text-center'>
                  <div className={`d-flex flex-column align-items-center ${location.pathname === '/prescriptions' ? ' text-primary' : ''}`}>
                    <FontAwesomeIcon icon={['fas', 'file-medical']} className='fa-lg' />
                    <div className='mt-1'>{t('text.prescription')}</div>
                  </div>
                </Nav.Link>
              </Nav>
              <Nav className='ms-auto'>
                <Nav.Link as={Link} to='/account'>
                  <div className={`d-flex flex-column align-items-center ${location.pathname === '/account' ? 'text-primary' : ''}`}>
                    <FontAwesomeIcon icon={['fas', 'user-nurse']} className='fa-lg' />
                    <div className='mt-1'>{t('text.profile')}</div>
                  </div>
                </Nav.Link>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>
    </>
  )
}

export default Footer
