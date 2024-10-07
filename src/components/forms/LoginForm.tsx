import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../../context/token'
import useTranslationHook from '../../hook/TranslationHook'
import { login } from '../../services/api'
import { setTokenLocalStorage } from '../../utils/helpers'
import { FlashMessageContext } from '../../context/flashmessage'
import { InputFieldContainer } from './inputGroups/InputFieldContainer'
import { Button } from './inputGroups/Button'
import { useForm } from 'react-hook-form'
import { LoginFormType } from '../../types'
import { resolver } from './validations/ValidationLogin'

const LoginForm = (): JSX.Element => {
  const { setToken } = useContext(TokenContext)
  const { addSuccessMessage } = useContext(FlashMessageContext)
  const navigate = useNavigate()
  const { t } = useTranslationHook()
  const [loading, setLoading] = useState<boolean>(false)
  const {register, formState: {errors} , handleSubmit, setError} = useForm<LoginFormType>({resolver})

  const onLogin = async (data: LoginFormType): Promise<void> => {
    setLoading(true)
    const {username, password} = data;
    try {
      const response = await login(username, password)
      const { token } = response
      setTokenLocalStorage(token)
      setToken(token)
      navigate('/home')
      addSuccessMessage({ body: t('text.userLogin') })
    } catch (error: any) {
      if (error.response?.status === 400) {
        setError('password', { message: t('error.invalidCredentials') })
        setError('username', { message: t('error.invalidCredentials') })
      }
      setLoading(false)
    }
  }

  return (
    <form className='mt-1 p-1 space-y-4 ' onSubmit={handleSubmit(onLogin)}>
      <InputFieldContainer icon={['fas', 'user']}>
      <input
        className='flex-grow outline-none text-gray-600'
        {...register('username')}
          placeholder={t('form.userName')}
      />
      </InputFieldContainer>
      {errors?.username && <p className='text-red-500 text-sm'>{errors.username.message}</p>}

      <InputFieldContainer icon={['fas', 'lock']}>
      <input
      type='password'
        className='flex-grow outline-none text-gray-600'
        {...register('password')}
        placeholder={t('form.password')}
      />
      </InputFieldContainer>
      {errors?.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}

      <Button isLoading={loading} size='medium' type='submit'>
        {t('navigation.login')}
      </Button>
    </form>
  )
}

export default LoginForm
