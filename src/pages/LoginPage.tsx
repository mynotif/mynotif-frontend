import React from 'react'
import useTranslationHook from '../hook/TranslationHook'
import LoginForm from '../components/LoginForm'
import { useIsLoggedIn } from '../utils/hooks'
import { Navigate } from 'react-router-dom'

const LoginPage = (): JSX.Element => {
  const { t } = useTranslationHook()
  const isLoggedIn = useIsLoggedIn()

  // If the user is already logged in, redirect to another page
  if (isLoggedIn === true) {
    return <Navigate to='/patients' replace />
  }

  return (
    <>
      <h1>{t('title.login')}</h1>
      <div className='container mt-4'>
        <LoginForm />
      </div>
    </>
  )
}

export default LoginPage
