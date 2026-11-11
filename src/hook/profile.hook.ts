import { useContext, useEffect } from 'react'
import { ProfileContext } from '../context/profile'
import { TokenContext } from '../context/token'
import { sessionProfile } from '../services/session'

/** The identity bootstrap completes before the authenticated tree is exposed. */
export const useProfile = (): void => {
  const { token } = useContext(TokenContext)
  const { setProfile } = useContext(ProfileContext)
  useEffect(() => {
    const profile = sessionProfile()
    if (token && profile) setProfile(profile)
  }, [token, setProfile])
}
