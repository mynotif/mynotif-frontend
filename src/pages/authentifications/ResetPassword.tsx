import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useTranslationHook from '../../hook/TranslationHook'
import { resetPassword } from '../../services/api'
import { InputFieldContainer } from '../../components/forms/inputGroups/InputFieldContainer'
import { InputField } from '../../components/forms/inputGroups/InputField'
import { Button } from '../../components/forms/inputGroups/Button'
import { ContainerAuth } from '../../components/authentifications/ContainerAuth'
import { AuthLink } from '../../components/authentifications/AuthLink'
import { WelcomeAuth } from '../../components/authentifications/WelcomeAuth'
import { LogoSvg } from '../../components/module/LogoSvg'

const ResetPassword = (): JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const navigate = useNavigate()
  const { t } = useTranslationHook()
  const [loading, setLoading] = useState<boolean>(false)

  const onFormSubmit = (e: React.FormEvent): void => e.preventDefault()

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value)

  const handleResetPasswort = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    setLoading(true)
    try {
      await resetPassword(email.toLowerCase())
      navigate('/login')
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  return (
    <ContainerAuth>
    <LogoSvg />
    <WelcomeAuth title={t('title.welcomeApp')} description={t('title.resetPassword')} />

        <form className='mt-1 p-1 space-y-4 ' onSubmit={onFormSubmit}>
          <InputFieldContainer icon={['fas', 'lock']}>
            <InputField
              name='email'
              type='email'
              placeholder={t('form.password')}
              value={email}
              onChange={onEmailChange}
            />
          </InputFieldContainer>

          <Button isLoading={loading} onClick={handleResetPasswort} type='submit' >
            {t('navigation.validate')}
          </Button>
        </form>

        <AuthLink textcontent={t('text.alreadyAccount')} textAnchor={t('navigation.login')} urlRedirect='login' />

    </ContainerAuth>
  )
}

export default ResetPassword
