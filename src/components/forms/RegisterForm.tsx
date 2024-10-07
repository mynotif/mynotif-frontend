import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FlashMessageContext } from '../../context/flashmessage'
import useTranslationHook from '../../hook/TranslationHook'
import { register as createUser } from '../../services/api'
import { useForm } from 'react-hook-form'
import { InputFieldContainer } from './inputGroups/InputFieldContainer'
import { Button } from './inputGroups/Button'
import { RegisterFormType } from '../../types'
import FormFieldError from '../FormFieldError'
import { Input } from './inputGroups/Input'
import { resolver } from './validations/ValidationRegister'

const RegisterForm = (): JSX.Element => {
  const { addSuccessMessage } = useContext(FlashMessageContext)
  const navigate = useNavigate()
  const { t } = useTranslationHook()
  const { register, handleSubmit, setError, formState: { errors } } = useForm<RegisterFormType>({resolver})
  const [loading, setLoading] = useState<boolean>(false)

  const handleRegister = async (data: RegisterFormType): Promise<void> => {
    setLoading(true)
    const { username, password, email } = data
    try {
      await createUser(username, password, email)
      navigate('/login')
      addSuccessMessage({ body: t('text.userRegister') })
    } catch (error: any) {
      if (error.response?.status === 400) {
        setError('password', { message: t('error.invalidCredentials') })
        setError('username', { message: t('error.invalidCredentials') })
        setError('email', { message: t('error.invalidCredentials') })
      }
      setLoading(false)
    }
  }

  return (
    <form className='w-9/12 mt-1 p-1 space-y-4 ' onSubmit={handleSubmit(handleRegister)}>
      <InputFieldContainer icon={['fas', 'user']}>
      <Input
          type='text'
          register={register}
          id='username'
          placeholder="Nom d'utilisateur"
          disabled={loading}
        />
      </InputFieldContainer>
      <FormFieldError errorMessage={errors.username?.message} />
      <InputFieldContainer icon={['fas', 'envelope']}>
      <Input
        type='email'
        register={register}
        id='email'
        placeholder='contact@ordopro.fr'
        disabled={loading}
      />
      </InputFieldContainer>
      <FormFieldError errorMessage={errors.email?.message} />
      <InputFieldContainer icon={['fas', 'lock']}>
      <Input
        type='password'
        register={register}
        id='password'
        placeholder={t('form.password')}
        disabled={loading}
      />
      </InputFieldContainer>
      <FormFieldError errorMessage={errors.password?.message} />
      <Button isLoading={loading} type='submit' >
        {t('navigation.register')}
      </Button>
    </form>
  )
}

export default RegisterForm
