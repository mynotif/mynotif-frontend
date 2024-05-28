import { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FlashMessageContext, FlashMessageType } from '../../context/flashmessage'
import useTranslationHook from '../../hook/TranslationHook'
import { register as createUser } from '../../services/api'
import { useForm } from 'react-hook-form'
import { InputFieldContainer } from './inputGroups/InputFieldContainer'
import { Button } from './inputGroups/Button'
import { RegisterFormType } from '../../types'
import FormFieldError from '../FormFieldError'
import { Input } from './inputGroups/Input'

const RegisterForm = (): JSX.Element => {
  const { addErrorMessage, addSuccessMessage } = useContext(FlashMessageContext)
  const navigate = useNavigate()
  const { t } = useTranslationHook()
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormType>()
  const [loading, setLoading] = useState<boolean>(false)

  const minLengthPassword = 6 // Minimum length of the password required
  const minLengthUsername = 2 // Minimum length of the username required

  const addErrorMessageCallback = useCallback(
    (flashMessage: FlashMessageType) => addErrorMessage(flashMessage),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleRegister = async (data: RegisterFormType): Promise<void> => {
    setLoading(true)
    const { username, password, email } = data
    try {
      await createUser(username, password, email)
      navigate('/login')
      addSuccessMessage({ body: t('text.userRegister') })
    } catch (error) {
      setLoading(false)
      console.error(error)
      if (axios.isAxiosError(error)) {
        addErrorMessageCallback({ title: t('error.errorRegister'), body: JSON.stringify((error).response?.data) })
      } else {
        addErrorMessageCallback({ body: t('error.errorRegister') })
      }
    }
  }

  return (
    <form className='mt-1 p-1 space-y-4 ' onSubmit={handleSubmit(handleRegister)}>
      <InputFieldContainer icon={['fas', 'user']}>
        <Input
          type='text'
          register={register}
          errorMsgRequired={t('error.requiredField')}
          errorMsgMinLength={t('error.minLengthError')}
          id='username'
          placeholder="Nom d'utilisateur"
          disabled={loading}
          minLength={minLengthUsername}
        />
      </InputFieldContainer>
      <FormFieldError errorMessage={errors.username?.message} />
      <InputFieldContainer icon={['fas', 'envelope']}>
        <Input
          type='email'
          register={register}
          errorMsgRequired={t('error.requiredField')}
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
          errorMsgRequired={t('error.requiredField')}
          errorMsgMinLength={t('error.minLengthError')}
          id='password'
          placeholder='Mot de passe'
          disabled={loading}
          minLength={minLengthPassword}
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
