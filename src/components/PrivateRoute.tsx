import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useIsLoggedIn } from '../utils/hooks'

const PrivateRoute = ({ redirectPath = '/' }): JSX.Element => {
  const isLoggedIn = useIsLoggedIn()

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

export default PrivateRoute
