import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { TokenContext } from '../context/token'
import { removeTokenLocalStorage } from '../utils/helpers'

const Logout = (): JSX.Element => {
  const { setToken } = useContext(TokenContext)
  // TODO: ideally hit the backend to invalidate the token too
  const navigate = useNavigate()
  const onLogout = (): void => {
    removeTokenLocalStorage()
    setToken(null)
    navigate('/')
  }

  const onLogoutClick = (e: React.MouseEvent<HTMLElement>): void => onLogout()

  return (
    <Button type='submit' onClick={onLogoutClick}>
      Logout
    </Button>
  )
}

export default Logout
