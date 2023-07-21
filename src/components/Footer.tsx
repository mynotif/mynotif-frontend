import { useCallback, useContext, useEffect } from 'react'
import { Container, Navbar } from 'react-bootstrap'
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
import FooterNav from './FooterNav'

const Header = (): JSX.Element => {
  const { token, setToken } = useContext(TokenContext)
  const { profile, setProfile } = useContext(ProfileContext)
  const { addErrorMessage } = useContext(FlashMessageContext)
  const logout = useLogout()
  const { t } = useTranslationHook()

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
    <Navbar className='shadow-lg' fixed='bottom' bg='body' data-bs-theme='light'>
      <Container>
        {useIsLoggedIn() === true && (
          <>
            {profile.is_staff && (
              <FooterNav url={`${BACKEND_URL}/admin`} icon='user-shield' title={t('text.admin')} />
            )}
            <FooterNav url='/patients' icon='users' title={t('text.patients')} />
            <FooterNav url='/prescriptions' icon='file-medical' title={t('text.prescription')} />
            <FooterNav url='/account' icon='user-nurse' title={t('text.profile')} />
          </>
        )}
      </Container>
    </Navbar>
  )
}

export default Header
