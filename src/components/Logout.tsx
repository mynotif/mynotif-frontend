import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { TokenContext } from '../context/token'
import { removeTokenLocalStorage } from '../utils/helpers'

const Logout = (): JSX.Element => {
  const { setToken } = useContext(TokenContext)
  // TODO: ideally hit the backend to invalidate the token too
  const onLogout = (): void => {
    removeTokenLocalStorage()
    setToken(null)
  }

  const onLogoutClick = (e: React.MouseEvent<HTMLElement>): void => onLogout()

  return (
    <Button type='submit' onClick={onLogoutClick}>
      Logout
    </Button>
  )
}

export default Logout
