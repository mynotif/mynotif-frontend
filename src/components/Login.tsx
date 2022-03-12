import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { login } from '../services/api'
import { TokenContext } from '../context/token'
import { setTokenLocalStorage } from '../utils/helpers'

const Login = (): JSX.Element => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { setToken } = useContext(TokenContext)

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
        Login
      </Button>
    </Form>
  )
}

export default Login
