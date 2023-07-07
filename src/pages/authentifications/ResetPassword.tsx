import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useTranslationHook from '../../hook/TranslationHook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { resetPassword } from '../../services/api'

const ResetPassword = (): JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const navigate = useNavigate()
  const { t } = useTranslationHook()

  const onFormSubmit = (e: React.FormEvent): void => e.preventDefault()

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value)

  const handleResetPasswort = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    try {
      await resetPassword(email)
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Container>
        <div className='container d-flex flex-column align-items-center justify-items-center mt-4'>
          <FontAwesomeIcon size='7x' icon={['fas', 'user-nurse']} />
          <h1>{t('title.welcomeApp')}</h1>
          <p>{t('text.resetPasswordEmail')}</p>
          <Form onSubmit={onFormSubmit}>

            <Form.Group className='mb-3'>
              <Form.Label>{t('form.emailAddress')}</Form.Label>
              <Form.Control
                required
                type='email'
                onChange={onEmailChange}
              />
            </Form.Group>

            <Button variant='success' type='submit' onClick={handleResetPasswort} className='w-100'>
              {t('navigation.resetPassword')}
            </Button>
          </Form>
        </div>
      </Container>
    </>
  )
}

export default ResetPassword
