import React, { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { TokenContext } from '../../context/token'
import useTranslationHook from '../../hook/TranslationHook'
import { login } from '../../services/api'
import { setTokenLocalStorage } from '../../utils/helpers'
import { FlashMessageContext, FlashMessageType } from '../../context/flashmessage'

const LoginForm = (): JSX.Element => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { setToken } = useContext(TokenContext)
  const { addErrorMessage, addSuccessMessage } = useContext(FlashMessageContext)
  const navigate = useNavigate()
  const { t } = useTranslationHook()
  const [error, setError] = useState<string>('')

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setUsername(e.target.value)

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value)

  const addErrorMessageCallback = useCallback(
    (flashMessage: FlashMessageType) => addErrorMessage(flashMessage),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const onLogin = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    try {
      const response = await login(username, password)
      const { token } = response
      setTokenLocalStorage(token)
      setToken(token)
      navigate('/home')
      addSuccessMessage({ body: t('text.userLogin') })
    } catch (error) {
      console.error(error)
      setError(t('error.errorLogin'))
      addErrorMessageCallback({ body: t('error.userLogin') })
    }
  }

  const onFormSubmit = (e: React.FormEvent): void => e.preventDefault()

  return (
    <Form onSubmit={onFormSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>{t('form.userName')}</Form.Label>
        <Form.Control
          required
          type='text'
          onChange={onUsernameChange}
          isInvalid={Boolean(error)}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>{t('form.password')}</Form.Label>
        <Form.Control
          required
          type='password'
          onChange={onPasswordChange}
          isInvalid={Boolean(error)}
        />
      </Form.Group>
      <Button variant='success' type='submit' onClick={onLogin} className='w-100'>
        {t('navigation.login')}
      </Button>
    </Form>
  )
}

export default LoginForm
