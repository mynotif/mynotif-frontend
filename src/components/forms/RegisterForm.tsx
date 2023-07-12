import { useCallback, useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FlashMessageContext, FlashMessageType } from '../../context/flashmessage'
import useTranslationHook from '../../hook/TranslationHook'
import { register } from '../../services/api'

const RegisterForm = (): JSX.Element => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { addErrorMessage } = useContext(FlashMessageContext)
  const navigate = useNavigate()
  const { t } = useTranslationHook()

  const addErrorMessageCallback = useCallback(
    (flashMessage: FlashMessageType) => addErrorMessage(flashMessage),
    // eslint-disable-next-line
    []
  )

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value)

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value)

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setUsername(e.target.value)

  const handleRegister = async (): Promise<void> => {
    try {
      await register(username, password, email)
      navigate('/login')
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error)) {
        addErrorMessageCallback({ title: t('error.errorRegister'), body: JSON.stringify((error).response?.data) })
      } else {
        addErrorMessageCallback({ body: t('error.errorRegister') })
      }
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
        <Form.Label>{t('form.emailAddress')}</Form.Label>
        <Form.Control
          required
          type='email'
          onChange={onEmailChange}
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

      <Form.Group className='mb-3'>
        <Button variant='success' type='submit' onClick={handleRegister} className='w-100'>
          {t('navigation.register')}
        </Button>
      </Form.Group>
    </Form>
  )
}

export default RegisterForm
