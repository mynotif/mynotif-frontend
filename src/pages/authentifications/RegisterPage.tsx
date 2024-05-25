import React from 'react'
import useTranslationHook from '../../hook/TranslationHook'
import RegisterForm from '../../components/forms/RegisterForm'
import { Link } from 'react-router-dom'
import { HeaderAuth } from '../../components/authentifications/HeaderAuth'
import { WelcomeAuth } from '../../components/authentifications/WelcomeAuth'

const RegisterPage = (): JSX.Element => {
  const { t } = useTranslationHook()

  return (
    <div className='min-h-screen flex flex-col'>
      <HeaderAuth />
      <div className='bg-gray-50 p-4 flex-grow z-10 -mt-72 rounded-t-2xl overflow-y-auto'>
        <WelcomeAuth title={t('title.welcomeApp')} description={t('title.register')} />
        <RegisterForm />
        <div className='flex justify-end mr-6'>
          <Link to='/login' className='text-gray-500 text-sm no-underline hover:text-colorprimary'>
            <span>{t('text.alreadyAccount')} {t('navigation.login')}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
