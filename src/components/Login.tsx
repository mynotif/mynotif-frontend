import React, { useCallback, useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { login } from '../services/api'
import { TokenContext } from '../context/token'
import { ErrorContext, ErrorType } from '../context/error'
import { setTokenLocalStorage } from '../utils/helpers'

const Login = (): JSX.Element => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { setToken } = useContext(TokenContext)
  const { addError } = useContext(ErrorContext)

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
    } catch (error) {
      console.error(error)
      if (error.response.status === 400) {
        addErrorCallback({ body: 'Invalid credentials' })
      } else {
        addErrorCallback({ body: 'Unknown login error' })
      }
    }
  }

  const onFormSubmit = (e: React.FormEvent): void => e.preventDefault()

  return (
    <Form className='d-flex mb-2' onSubmit={onFormSubmit}>
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
      <Button className='me-2' type='submit' onClick={onLogin}>
        Login
      </Button>
    </Form>
  )
}

export default Login
