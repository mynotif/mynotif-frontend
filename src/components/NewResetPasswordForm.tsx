import React, { FunctionComponent } from 'react'
import { Form, Button } from 'react-bootstrap'
import useTranslationHook from '../hook/TranslationHook'

interface ResetPasswordFormProps {
  newPassword: string
  confirmNewPassword: string
  passwordError: string
  onNewPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onConfirmNewPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
}

const NewResetPasswordForm: FunctionComponent<ResetPasswordFormProps> = ({
  newPassword,
  confirmNewPassword,
  passwordError,
  onNewPasswordChange,
  onConfirmNewPasswordChange,
  onSubmit
}) => {
  const { t } = useTranslationHook()
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className='mb-3'>
        <Form.Control
          required
          type='password'
          placeholder={t('form.newPassword')}
          value={newPassword}
          onChange={onNewPasswordChange}
          minLength={8}
          isInvalid={Boolean(passwordError)}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Control
          required
          type='password'
          placeholder={t('form.confirmNewPassword')}
          value={confirmNewPassword}
          onChange={onConfirmNewPasswordChange}
          minLength={8}
          isInvalid={Boolean(passwordError)}
        />
        {passwordError !== '' && (
          <Form.Control.Feedback type='invalid'>{passwordError}</Form.Control.Feedback>
        )}
      </Form.Group>
      <Button variant='success' type='submit' className='w-100'>
        {t('navigation.resetPassword')}
      </Button>
    </Form>
  )
}

export default NewResetPasswordForm
