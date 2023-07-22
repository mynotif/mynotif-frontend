import axios, { AxiosError } from 'axios'
import { ErrorResponse } from '../types'
import { useLogout } from '../utils/hooks'
import { getProfile } from '../services/api'
import { useCallback, useContext, useEffect } from 'react'
import { FlashMessageContext, FlashMessageType } from '../context/flashmessage'
import { ProfileContext } from '../context/profile'
import { TokenContext } from '../context/token'
import { getTokenLocalStorage } from '../utils/helpers'

/**
 * Fetch and set profile context
 */
export const useProfile = (): void => {
  const { addErrorMessage } = useContext(FlashMessageContext)
  const { token, setToken } = useContext(TokenContext)
  const { setProfile } = useContext(ProfileContext)
  const logout = useLogout()

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
}
