import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../context/token'
import { logoutSession } from '../services/session'

const useIsLoggedIn = (): boolean | undefined => {
  const { token } = useContext(TokenContext)
  return typeof token === 'string' && token.length > 0
}
const useLogout = (): () => void => {
  const navigate = useNavigate()
  return () => {
    void logoutSession()
    navigate('/login', { replace: true })
  }
}
export { useIsLoggedIn, useLogout }
