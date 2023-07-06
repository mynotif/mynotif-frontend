import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { TokenContext } from '../../context/token'
import useTranslationHook from '../../hook/TranslationHook'
import { login } from '../../services/api'
import { setTokenLocalStorage } from '../../utils/helpers'
import { MessageContext } from '../../context/message'

const LoginForm = (): JSX.Element => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { setToken } = useContext(TokenContext)
  const navigate = useNavigate()
  const { t } = useTranslationHook()
  const { addMessage } = useContext(MessageContext)

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setUsername(e.target.value)

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value)

  const onLogin = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    try {
      const response = await login(username, password)
      const { token } = response
      setTokenLocalStorage(token)
      setToken(token)
      navigate('/prescriptions')
      addMessage({ text: 'You have successfully logged in!', variant: 'success' })
    } catch (error) {
      addMessage({ text: 'Invalid username or password. Please try again.', variant: 'danger' })
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
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>{t('form.password')}</Form.Label>
        <Form.Control
          required
          type='password'
          onChange={onPasswordChange}
        />
      </Form.Group>
      <Button variant='success' type='submit' onClick={onLogin} className='w-100'>
        {t('navigation.login')}
      </Button>
    </Form>
  )
}

export default LoginForm
