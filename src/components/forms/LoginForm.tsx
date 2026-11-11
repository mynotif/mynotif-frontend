import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useTranslationHook from '../../hook/TranslationHook'
import { sessionErrorMessage, sessionSnapshot } from '../../services/session'
import { login } from '../../services/api'
import { FlashMessageContext } from '../../context/flashmessage'
import { InputFieldContainer } from './inputGroups/InputFieldContainer'
import { Button } from './inputGroups/Button'
import { useForm } from 'react-hook-form'
import { AuthFormType } from '../../types'
import { resolver } from './validations/ValidationAuth'
import { Input } from './inputGroups/Input'

const LoginForm = (): JSX.Element => {
  const { addSuccessMessage } = useContext(FlashMessageContext)
  const navigate = useNavigate()
  const { t } = useTranslationHook()
  const [loading, setLoading] = useState<boolean>(false)
  const {register, formState: {errors} , handleSubmit} = useForm<AuthFormType>({resolver})

  const inFlight = useRef(false)
  const [loginError, setLoginError] = useState('')

  const onLogin = async (data: AuthFormType): Promise<void> => {
    if (inFlight.current) return
    inFlight.current = true
    setLoginError('')
    setLoading(true)
    const {email, password} = data;
    try {
      const result = await login(email.toLowerCase(), password)
      if (sessionSnapshot().token !== result.token) return
      navigate('/home')
      addSuccessMessage({ body: t('text.userLogin') })
    } catch (error: unknown) {
      setLoginError(sessionErrorMessage(error))
    } finally {
      inFlight.current = false
      setLoading(false)
    }
  }

  return (
    <form className='mt-1 p-1 space-y-4 ' onSubmit={handleSubmit(onLogin)}>
      <InputFieldContainer icon={['fas', 'user']}>
       <Input
          type='email'
          register={register}
          id='email'
          placeholder={t('form.emailAddress')}
          disabled={loading}
        />
      </InputFieldContainer>
      {errors?.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}

      <InputFieldContainer icon={['fas', 'lock']}>
       <Input
          type='password'
          register={register}
          id='password'
          placeholder={t('form.password')}
          disabled={loading}
        />
      </InputFieldContainer>
      {errors?.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}

      {loginError && <p role='alert' className='text-red-500 text-sm'>{loginError}</p>}
      <Button disabled={loading} isLoading={loading} size='medium' type='submit'>
        {t('navigation.login')}
      </Button>
    </form>
  )
}

export default LoginForm
