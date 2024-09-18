import { HeaderAuth } from '../../components/authentifications/HeaderAuth'
import { WelcomeAuth } from '../../components/authentifications/WelcomeAuth'
import LoginForm from '../../components/forms/LoginForm'
import { ResetPasswordLink } from '../../components/authentifications/ResetPasswordLink'
import { Separator } from '../../components/module/Separator'
import useTranslationHook from '../../hook/TranslationHook'
import { useIsLoggedIn } from '../../utils/hooks'
import { Navigate } from 'react-router-dom'
import { AuthLink } from '../../components/authentifications/AuthLink'

const LoginPage = (): JSX.Element => {
  const { t } = useTranslationHook()
  const isLoggedIn = useIsLoggedIn()

  // If the user is already logged in, redirect to another page
  if (isLoggedIn === true) {
    return <Navigate to='/home' replace />
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <HeaderAuth />
      <div className='bg-gray-50 px-4 pt-4 flex-grow z-10 -mt-72 rounded-t-2xl overflow-y-auto'>
        <WelcomeAuth title={t('title.welcomeApp')} description={t('title.login')} />
        <LoginForm />
        <ResetPasswordLink content={t('navigation.resetPassword')} />
        <Separator />
        <AuthLink textcontent={t('text.notAlreadyAccount')} textAnchor={t('navigation.register')} urlRedirect='register' />
      </div>
    </div>
  )
}

export default LoginPage
