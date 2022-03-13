import { useContext } from 'react'
import { TokenContext } from '../context/token'

const useIsLoggedIn = (): boolean => {
  const { token } = useContext(TokenContext)
  const tokenValid = typeof token === 'string' ? token.length > 0 : false
  return tokenValid
}

export { useIsLoggedIn }
