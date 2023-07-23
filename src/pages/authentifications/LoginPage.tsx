import React from 'react'
import useTranslationHook from '../../hook/TranslationHook'
import { useIsLoggedIn } from '../../utils/hooks'
import { Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LoginForm from '../../components/forms/LoginForm'

const LoginPage = (): JSX.Element => {
  const { t } = useTranslationHook()
  const isLoggedIn = useIsLoggedIn()

  // If the user is already logged in, redirect to another page
  if (isLoggedIn === true) {
    return <Navigate to='/home' replace />
  }

  return (
    <>
      <Container>
        <div className='container d-flex flex-column align-items-center justify-items-center mt-4'>
          <FontAwesomeIcon size='7x' icon={['fas', 'user-nurse']} />
          <h1>{t('title.welcomeApp')}</h1>
          <p>{t('title.login')}</p>
          <LoginForm />
        </div>
      </Container>
      <div className='container d-flex flex-column text-center align-items-center justify-items-center mt-4'>
        <small className='text-decoration-none text-dark'>
          {t('text.notAlreadyAccount')}
          <a href='/register' className='text-decoration-none ms-1'>
            {t('navigation.register')}
          </a>
        </small>
      </div>
      <div className='container d-flex flex-column text-center align-items-center justify-items-center mt-4'>
        <small className='text-decoration-none text-dark'>
          {t('text.forgotPassword')}
          <a href='/reset/password' className='text-decoration-none ms-1'>
            {t('navigation.resetPassword')}
          </a>
        </small>
      </div>
    </>
  )
}

export default LoginPage
