import { useContext, useEffect } from 'react'
import { getTokenLocalStorage } from '../utils/helpers'
import { TokenContext } from '../context/token'
import LoginOrRegister from './LoginOrRegister'
import Logout from './Logout'

const LoginOrLogout = (): JSX.Element => {
  const { token, setToken } = useContext(TokenContext)
  const tokenValid = (token: string|null): boolean => typeof token === 'string' ? token.length > 0 : false

  useEffect(() => {
    setToken(getTokenLocalStorage())
  }, [setToken])

  return tokenValid(token) ? <Logout /> : <LoginOrRegister />
}

export default LoginOrLogout
