import React from 'react'
import useTranslationHook from '../../hook/TranslationHook'
import RegisterForm from '../../components/forms/RegisterForm'
import { HeaderAuth } from '../../components/authentifications/HeaderAuth'
import { WelcomeAuth } from '../../components/authentifications/WelcomeAuth'
import { Separator } from '../../components/module/Separator'
import { AuthLink } from '../../components/authentifications/AuthLink'

const RegisterPage = (): JSX.Element => {
  const { t } = useTranslationHook()

  return (
    <div className='min-h-screen flex flex-col'>
      <HeaderAuth />
      <div className='bg-gray-50 px-4 pt-4 flex-grow z-10 -mt-72 rounded-t-2xl overflow-y-auto'>
        <WelcomeAuth title={t('title.welcomeApp')} description={t('title.register')} />
        <RegisterForm />
        <Separator />
        <AuthLink textcontent={t('text.alreadyAccount')} textAnchor={t('navigation.login')} urlRedirect='login' />
      </div>
    </div>
  )
}

export default RegisterPage
