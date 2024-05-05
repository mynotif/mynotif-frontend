import { useCallback, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FlashMessageContext, FlashMessageType } from '../../context/flashmessage'
import useTranslationHook from '../../hook/TranslationHook'
import { register as createUser } from '../../services/api'
import { useForm } from 'react-hook-form'
import { RegisterFormType } from '../../types'
import FormFieldError from '../FormFieldError'

const RegisterForm = (): JSX.Element => {
  const { addErrorMessage, addSuccessMessage } = useContext(FlashMessageContext)
  const navigate = useNavigate()
  const { t } = useTranslationHook()
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormType>()

  const minLengthPassword = 6 // Minimum length of the password required
  const minLengthUsername = 2 // Minimum length of the username required

  const addErrorMessageCallback = useCallback(
    (flashMessage: FlashMessageType) => addErrorMessage(flashMessage),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleRegister = async (data: RegisterFormType): Promise<void> => {
    const { username, password, email } = data
    try {
      await createUser(username, password, email)
      navigate('/login')
      addSuccessMessage({ body: t('text.userRegister') })
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error)) {
        addErrorMessageCallback({ title: t('error.errorRegister'), body: JSON.stringify((error).response?.data) })
      } else {
        addErrorMessageCallback({ body: t('error.errorRegister') })
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit(handleRegister)}>
      <Form.Group className='mb-3'>
        <Form.Label>{t('form.userName')}</Form.Label>
        <Form.Control
          {...register(
            'username',
            {
              required: { value: true, message: t('error.requiredField') },
              minLength: { value: minLengthUsername, message: t('error.minLengthError', { count: minLengthUsername }) }
            })
          }
          type='text'
        />
        <FormFieldError errorMessage={errors.username?.message} />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>{t('form.emailAddress')}</Form.Label>
        <Form.Control
          {...register(
            'email',
            {
              required: { value: true, message: t('error.requiredField') }
            })
          }
          type='email'
        />
        <FormFieldError errorMessage={errors.email?.message} />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>{t('form.password')}</Form.Label>
        <Form.Control
          {...register(
            'password',
            {
              required: { value: true, message: t('error.requiredField') },
              minLength: { value: minLengthPassword, message: t('error.minLengthError', { count: minLengthPassword }) }
            })
          }
          type='password'
        />
        <FormFieldError errorMessage={errors.password?.message} />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Button variant='success' type='submit' className='w-100'>
          {t('navigation.register')}
        </Button>
      </Form.Group>
    </Form>
  )
}

export default RegisterForm
