import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useTranslationHook from '../../hook/TranslationHook'
import { resetPassword } from '../../services/api'
import { HeaderAuth } from '../../components/authentifications/HeaderAuth'
import { InputFieldContainer } from '../../components/forms/inputGroups/InputFieldContainer'
import { InputField } from '../../components/forms/inputGroups/InputField'
import { Button } from '../../components/forms/inputGroups/Button'

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
      await resetPassword(email)
      navigate('/login')
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <HeaderAuth />
      <div className='bg-gray-50 p-4 flex-grow z-10 -mt-72 rounded-t-2xl overflow-y-auto'>
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
            {t('navigation.resetPassword')}
          </Button>
        </form>

        <div className='flex justify-end m-6'>
          <Link to='/login' className='text-gray-500 text-sm no-underline hover:text-colorprimary'>
            <span>{t('text.alreadyAccount')} {t('navigation.login')}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
