import React from 'react'
import useTranslationHook from '../../hook/TranslationHook'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RegisterForm from '../../components/forms/RegisterForm'

const RegisterPage = (): JSX.Element => {
  const { t } = useTranslationHook()

  return (
    <>
      <Container>
        <div className='container d-flex flex-column align-items-center justify-items-center mt-4'>
          <FontAwesomeIcon size='7x' icon={['fas', 'user-nurse']} />
          <h1>{t('title.welcomeApp')}</h1>
          <p>{t('title.register')}</p>
          <RegisterForm />
        </div>
      </Container>
      <div className='container d-flex flex-column text-center align-items-center justify-items-center mt-4'>
        <small className='text-decoration-none text-dark'>
          {t('text.alreadyAccount')}
          <a href='/login' className='text-decoration-none ms-1'>
            {t('navigation.login')}
          </a>
        </small>
      </div>
    </>
  )
}

export default RegisterPage
