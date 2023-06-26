import React from 'react'
import useTranslationHook from '../hook/TranslationHook'
import RegisterForm from '../components/RegisterForm'

const RegisterPage = (): JSX.Element => {
  const { t } = useTranslationHook()

  return (
    <>
      <h1>{t('title.register')}</h1>
      <div className='container mt-4'>
        <RegisterForm />
      </div>
    </>
  )
}

export default RegisterPage
