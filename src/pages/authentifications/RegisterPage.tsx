import React from 'react'
import useTranslationHook from '../../hook/TranslationHook'
import RegisterForm from '../../components/forms/RegisterForm'
import { WelcomeAuth } from '../../components/authentifications/WelcomeAuth'
import { Separator } from '../../components/module/Separator'
import { AuthLink } from '../../components/authentifications/AuthLink'
import { ContainerAuth } from '../../components/authentifications/ContainerAuth'
import { LogoSvg } from '../../components/module/LogoSvg'

const RegisterPage = (): JSX.Element => {
  const { t } = useTranslationHook()

  return (
    <ContainerAuth>
    <LogoSvg />
        <WelcomeAuth title={t('title.welcomeApp')} description={t('title.register')} />
        <RegisterForm />
        <Separator />
        <AuthLink textcontent={t('text.alreadyAccount')} textAnchor={t('navigation.login')} urlRedirect='login' />
    </ContainerAuth>
  )
}

export default RegisterPage
