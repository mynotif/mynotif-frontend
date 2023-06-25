import React, { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { login } from '../services/api'
import { TokenContext } from '../context/token'
import { ErrorContext, ErrorType } from '../context/error'
import { setTokenLocalStorage } from '../utils/helpers'
import useTranslationHook from '../hook/TranslationHook'

const Login = (): JSX.Element => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { setToken } = useContext(TokenContext)
  const { addError } = useContext(ErrorContext)
  const navigate = useNavigate()
  const { t } = useTranslationHook()

  const addErrorCallback = useCallback(
    (error: ErrorType) => addError(error),
    // eslint-disable-next-line
    []
  )

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
      navigate('/patients')
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error) && (error.response?.status === 400)) {
        addErrorCallback({ body: 'Invalid credentials' })
      } else {
        addErrorCallback({ body: 'Unknown login error' })
      }
    }
  }

  const onFormSubmit = (e: React.FormEvent): void => e.preventDefault()

  return (
    <Form className='d-flex' onSubmit={onFormSubmit}>
      <Form.Control
        placeholder='Username'
        className='me-2'
        aria-label='Email'
        onChange={onUsernameChange}
      />
      <Form.Control
        type='password'
        placeholder='Password'
        className='me-2'
        aria-label='Password'
        onChange={onPasswordChange}
      />
      <Button type='submit' onClick={onLogin}>
        {t('navigation.login')}
      </Button>
    </Form>
  )
}

export default Login
