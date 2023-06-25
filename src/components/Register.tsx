import { FunctionComponent, useCallback, useContext, useState } from 'react'
import { Button, Col, Form, Modal, Nav, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { TokenContext } from '../context/token'
import { ErrorContext, ErrorType } from '../context/error'
import { setTokenLocalStorage } from '../utils/helpers'
import { login, register } from '../services/api'
import useTranslationHook from '../hook/TranslationHook'

interface RegisterFormProps {
  handleClose: () => void
  handleRegister: () => void
  setUsername: (username: string) => void
  setPassword: (password: string) => void
}
const RegisterForm: FunctionComponent<RegisterFormProps> = ({ handleClose, handleRegister, setUsername, setPassword }) => {
  const onFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    handleRegister()
  }
  const { t } = useTranslationHook()

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setUsername(e.target.value)

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value)

  return (
    <Form className='d-flex' onSubmit={onFormSubmit}>
      <Row>
        <Col xs={12}>
          <Form.Control
            placeholder='Username'
            className='me-2'
            autoComplete='off'
            onChange={onUsernameChange}
          />
        </Col>
        <Col xs={12} className='mt-2'>
          <Form.Control
            type='password'
            placeholder='Password'
            className='me-2'
            aria-label='Password'
            autoComplete='off'
            onChange={onPasswordChange}
          />
        </Col>
        {/* The button is there, but hidden so the submit event still works */}
        <Button className='d-none' type='submit' onClick={() => null}>
          {t('navigation.register')}
        </Button>
      </Row>
    </Form>
  )
}

interface RegisterModalProps extends RegisterFormProps {
  show: boolean
}
const RegisterModal: FunctionComponent<RegisterModalProps> = ({ show, handleClose, handleRegister, setUsername, setPassword }) => {
  const { t } = useTranslationHook()

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('navigation.register')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegisterForm handleClose={handleClose} handleRegister={handleRegister} setUsername={setUsername} setPassword={setPassword} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleRegister}>
          {t('navigation.register')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const Register = (): JSX.Element => {
  const [show, setShow] = useState(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { setToken } = useContext(TokenContext)
  const { addError } = useContext(ErrorContext)

  const addErrorCallback = useCallback(
    (error: ErrorType) => addError(error),
    // eslint-disable-next-line
    []
  )

  const handleClose = (): void => setShow(false)
  const handleShow = (): void => setShow(true)
  const { t } = useTranslationHook()

  const handleRegister = async (): Promise<void> => {
    try {
      await register(username, password)
      const response = await login(username, password)
      const { token } = response
      setTokenLocalStorage(token)
      setToken(token)
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error)) {
        addErrorCallback({ title: 'Error registering', body: JSON.stringify((error).response?.data) })
      } else {
        addErrorCallback({ body: 'Error registering' })
      }
    }
    handleClose()
  }

  return (
    <>
      <RegisterModal show={show} handleClose={handleClose} handleRegister={handleRegister} setUsername={setUsername} setPassword={setPassword} />
      <Nav className='mr-auto me-2'>
        <Nav.Link onClick={handleShow}>
          <FontAwesomeIcon icon={['fas', 'user']} /> {t('navigation.register')}
        </Nav.Link>
      </Nav>
    </>
  )
}

export default Register
