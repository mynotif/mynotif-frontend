import React, { useState } from 'react'
import useTranslationHook from '../../hook/TranslationHook'
import { useNavigate, useParams } from 'react-router-dom'
import { confirmResetPassword } from '../../services/api'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import assert from 'assert'
import NewResetPasswordForm from '../../components/forms/NewResetPasswordForm'

const NewResetPassword = (): JSX.Element => {
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const { t } = useTranslationHook()
  const { uid, token } = useParams()
  const navigate = useNavigate()

  const onNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewPassword(e.target.value)
    setPasswordError('')
  }

  const onConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setConfirmNewPassword(e.target.value)
    setPasswordError('')
  }

  const errorsCases = (newPassword: string, confirmNewPassword: string): string | null => {
    const emptyFieldError = t('error.emptyFieldError')
    const passwordsMismatchError = t('error.passwordsMismatchError')
    const passwordLengthError = t('error.passwordLengthError')
    const minLength = 8

    if (newPassword.trim() === '') {
      return emptyFieldError
    } else if (newPassword !== confirmNewPassword) {
      return passwordsMismatchError
    } else if (newPassword.length < minLength) {
      return passwordLengthError
    }
    return null
  }

  const handleResetPassword = async (): Promise<void> => {
    try {
      const errorCase = errorsCases(newPassword, confirmNewPassword)
      if (errorCase !== null) {
        setPasswordError(errorCase)
        console.error(errorCase)
      } else {
        assert(token)
        assert(uid)
        await confirmResetPassword(uid, token, newPassword)
        navigate('/login')
      }
    } catch (error) {
      console.error({ error })
    }
  }

  const onFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    await handleResetPassword()
  }

  return (
    <Container className='d-flex flex-column align-items-center justify-items-center mt-4'>
      <FontAwesomeIcon size='7x' icon={['fas', 'user-nurse']} />
      <h1>{t('title.welcomeApp')}</h1>
      <p>{t('text.createNewPassword')}</p>
      <NewResetPasswordForm
        newPassword={newPassword}
        confirmNewPassword={confirmNewPassword}
        passwordError={passwordError}
        onNewPasswordChange={onNewPasswordChange}
        onConfirmNewPasswordChange={onConfirmNewPasswordChange}
        onSubmit={onFormSubmit}
      />
    </Container>
  )
}

export default NewResetPassword
