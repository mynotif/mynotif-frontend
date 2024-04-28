import React, { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { TokenContext } from '../../context/token'
import useTranslationHook from '../../hook/TranslationHook'
import { login } from '../../services/api'
import { setTokenLocalStorage } from '../../utils/helpers'
import { FlashMessageContext, FlashMessageType } from '../../context/flashmessage'
import { useForm } from 'react-hook-form'
import { LoginFormType } from '../../types'

const LoginForm = (): JSX.Element => {
  const { setToken } = useContext(TokenContext)
  const { addErrorMessage, addSuccessMessage } = useContext(FlashMessageContext)
  const navigate = useNavigate()
  const { t } = useTranslationHook()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormType>()
  const minLengthPassword = 6 // Minimum length of the password required
  const minLengthUsername = 2 // Minimum length of the username required

  const addErrorMessageCallback = useCallback(
    (flashMessage: FlashMessageType) => addErrorMessage(flashMessage),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const onLogin = async (data: LoginFormType): Promise<void> => {
    const { username, password } = data

    try {
      const response = await login(username, password) // Call the login function from the api file
      const { token } = response
      setTokenLocalStorage(token)
      setToken(token)
      navigate('/home')
      addSuccessMessage({ body: t('text.userLogin') })
    } catch (error) {
      console.error(error)
      addErrorMessageCallback({ body: t('error.userLogin') })
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onLogin)}>
        <Form.Group className='mb-3'>
          <Form.Label>{t('form.userName')}</Form.Label>
          <Form.Control
            {...register(
              'username',
              {
                required: { value: true, message: t('error.requiredField') },
                minLength: { value: minLengthUsername, message: t('error.minLengthError', { count: minLengthUsername }) }
              })
            }
            type='text'
          />
          {(errors.username != null) &&
            <span className='mt-4 text-danger'>
              {errors.username.message}
            </span>}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>{t('form.password')}</Form.Label>
          <Form.Control
            {...register(
              'password',
              {
                required: { value: true, message: t('error.requiredField') },
                minLength: { value: minLengthPassword, message: t('error.minLengthError', { count: minLengthPassword }) }
              })
            }
            type='password'
          />
          {(errors.password != null) &&
            <span className='mt-4 text-danger'>
              {errors.password.message}
            </span>}
        </Form.Group>
        <Button variant='success' type='submit' className='w-100'>
          {t('navigation.login')}
        </Button>
      </Form>
    </>
  )
}

export default LoginForm
