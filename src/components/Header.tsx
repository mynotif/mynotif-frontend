import { useCallback, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { ErrorResponse } from '../types'
import { useIsLoggedIn, useLogout } from '../utils/hooks'
import { getTokenLocalStorage } from '../utils/helpers'
import { FlashMessageContext, FlashMessageType } from '../context/flashmessage'
import { ProfileContext } from '../context/profile'
import { TokenContext } from '../context/token'
import { getProfile } from '../services/api'
import useTranslationHook from '../hook/TranslationHook'
import PageHeader from './PageHeader'
import { PAGE_CONFIG } from '../utils/constants'

const Header = (): JSX.Element => {
  const { token, setToken } = useContext(TokenContext)
  const { profile, setProfile } = useContext(ProfileContext)
  const { addErrorMessage } = useContext(FlashMessageContext)
  const logout = useLogout()
  const { t } = useTranslationHook()
  const location = useLocation()
  const currentPage = PAGE_CONFIG.find(page => location.pathname.includes(page.path))

  const addErrorMessageCallback = useCallback(
    (flashMessage: FlashMessageType) => addErrorMessage(flashMessage),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [addErrorMessageCallback]
  )

  const fetchProfileCallback = useCallback(async (token: string): Promise<void> => {
    try {
      const data = await getProfile(token)
      setProfile(data)
    } catch (error: unknown | AxiosError) {
      handleFetchProfileErrorCallback(error)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {useIsLoggedIn() === true && (
        <Navbar className='shadow-sm mb-5' fixed='top' bg='body' data-bs-theme='light'>
          <Container fluid>
            <Row className='bg-light shadow-sm mx-1 w-100'>
              <Col className='d-flex align-items-center justify-content-between'>
                {location.pathname === '/home' && (
                  <div className='ms-5'>
                    <div className='ps-1'>
                      <p className='text-warning fw-bold m-0'>{t('text.welcome')}</p>
                      <p className='fw-bold mb-0 text-primary'>{t('text.hey')}, {profile.username}</p>
                    </div>
                  </div>
                )}
                {(currentPage != null) && (
                  <PageHeader title={currentPage?.title} />
                )}
                <div className='d-flex align-items-center gap-2'>
                  <Nav>
                    <Nav.Link as={Link} to='#'>
                      <div className='d-flex flex-column align-items-center'>
                        <FontAwesomeIcon icon={['far', 'bell']} className='text-primary' />
                      </div>
                    </Nav.Link>
                  </Nav>
                  <Nav>
                    <Nav.Link as={Link} to='#' className='text-center'>
                      <div className='d-flex flex-column align-items-center'>
                        <FontAwesomeIcon icon={['fas', 'bars']} className='toggle text-primary' />
                      </div>
                    </Nav.Link>
                  </Nav>
                </div>
              </Col>
            </Row>
          </Container>
        </Navbar>
      )}
    </>
  )
}

export default Header
