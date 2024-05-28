import React, { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../../context/token'
import useTranslationHook from '../../hook/TranslationHook'
import { login } from '../../services/api'
import { setTokenLocalStorage } from '../../utils/helpers'
import { FlashMessageContext, FlashMessageType } from '../../context/flashmessage'
import { InputFieldContainer } from './inputGroups/InputFieldContainer'
import { InputField } from './inputGroups/InputField'
import { Button } from './inputGroups/Button'

const LoginForm = (): JSX.Element => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { setToken } = useContext(TokenContext)
  const { addErrorMessage, addSuccessMessage } = useContext(FlashMessageContext)
  const navigate = useNavigate()
  const { t } = useTranslationHook()
  const [loading, setLoading] = useState<boolean>(false)

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setUsername(e.target.value)

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value)

  const addErrorMessageCallback = useCallback(
    (flashMessage: FlashMessageType) => addErrorMessage(flashMessage),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const onLogin = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    setLoading(true)
    try {
      const response = await login(username, password)
      const { token } = response
      setTokenLocalStorage(token)
      setToken(token)
      navigate('/home')
      addSuccessMessage({ body: t('text.userLogin') })
    } catch (error) {
      setLoading(false)
      console.error(error)
      addErrorMessageCallback({ body: t('error.userLogin') })
    }
  }

  const onFormSubmit = (e: React.FormEvent): void => e.preventDefault()

  return (
    <form className='mt-1 p-1 space-y-4 ' onSubmit={onFormSubmit}>
      <InputFieldContainer icon={['fas', 'user']}>
        <InputField
          name='userName'
          placeholder={t('form.userName')}
          value={username}
          onChange={onUsernameChange}
        />
      </InputFieldContainer>
      <InputFieldContainer icon={['fas', 'lock']}>
        <InputField
          name='password'
          type='password'
          placeholder={t('form.password')}
          value={password}
          onChange={onPasswordChange}
        />
      </InputFieldContainer>

      <Button isLoading={loading} size='medium' type='submit' onClick={onLogin}>
        {t('navigation.login')}
      </Button>
    </form>
  )
}

export default LoginForm
