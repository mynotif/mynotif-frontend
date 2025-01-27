import { WelcomeAuth } from '../../components/authentifications/WelcomeAuth'
import LoginForm from '../../components/forms/LoginForm'
import { ResetPasswordLink } from '../../components/authentifications/ResetPasswordLink'
import { Separator } from '../../components/module/Separator'
import useTranslationHook from '../../hook/TranslationHook'
import { useIsLoggedIn } from '../../utils/hooks'
import { Navigate } from 'react-router-dom'
import { AuthLink } from '../../components/authentifications/AuthLink'
import { LogoSvg } from '../../components/module/LogoSvg'
import { Container } from '../../components/home/Container'

const LoginPage = (): JSX.Element => {
  const { t } = useTranslationHook()
  const isLoggedIn = useIsLoggedIn()

  // If the user is already logged in, redirect to another page
  if (isLoggedIn === true) {
    return <Navigate to='/home' replace />
  }

  return (
    <Container className='flex flex-col items-center'>
      <LogoSvg />
        <WelcomeAuth title={t('title.welcomeApp')} description={t('title.login')} />
        <LoginForm />
        <ResetPasswordLink content={t('navigation.resetPassword')} />
        <Separator />
        <AuthLink textcontent={t('text.notAlreadyAccount')} textAnchor={t('navigation.register')} urlRedirect='register' />
    </Container>
  )
}

export default LoginPage
