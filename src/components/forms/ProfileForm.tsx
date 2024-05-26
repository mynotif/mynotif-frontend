import React, { useContext, useEffect, useState } from 'react'
import { Button } from './inputGroups/Button'
import { InputFieldContainer } from './inputGroups/InputFieldContainer'
import { Input } from './inputGroups/Input'
import { useForm } from 'react-hook-form'
import FormFieldError from '../FormFieldError'
import { Profile } from '../../types'
import useTranslationHook from '../../hook/TranslationHook'
import { useNavigate } from 'react-router-dom'
import assert from 'assert'
import { TokenContext } from '../../context/token'
import { updateUser } from '../../services/api'
import { ProfileContext } from '../../context/profile'
import { FlashMessageType } from '../../context/flashmessage'

interface ProfileFormProps {
  profile: Profile
  addErrorMessageCallback: (flashMessage: FlashMessageType) => void
}

export const ProfileForm = ({ profile, addErrorMessageCallback }: ProfileFormProps): JSX.Element => {
  const { token } = useContext(TokenContext)
  const { setProfile: setProfileContext } = useContext(ProfileContext)
  const { t } = useTranslationHook()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Profile>()
  const minLengthPassword = 6 // Minimum length of the password required
  const minLengthUsername = 2 // Minimum length of the username required
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (profile.username !== '') {
      setValue('username', profile.username)
      setValue('email', profile.email)
      setValue('first_name', profile.first_name)
      setValue('last_name', profile.last_name)
    }
  }, [profile, setValue])

  const handleProfile = async (data: Profile): Promise<void> => {
    setLoading(true)
    assert(token)
    try {
      const response = await updateUser(token, data)
      setProfileContext(response)
      navigate('/profile')
    } catch (error) {
      setLoading(false)
      addErrorMessageCallback({ body: t('error.userUpdated') })
    }
  }

  return (
    <>
      <div className='bg-gray-50 min-h-screen flex flex-col'>
        <form className='mt-4 p-4 space-y-4 ' onSubmit={handleSubmit(handleProfile)}>
          <InputFieldContainer icon={['fas', 'user']}>
            <Input
              type='text'
              register={register}
              errorMsgRequired={t('error.requiredField')}
              errorMsgMinLength={t('error.minLengthError')}
              id='username'
              placeholder="Nom d'utilisateur"
              disabled
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
              type='text'
              register={register}
              errorMsgRequired={t('error.requiredField')}
              errorMsgMinLength={t('error.minLengthError')}
              id='first_name'
              placeholder='Prénom'
              disabled={loading}
              minLength={minLengthPassword}
            />
          </InputFieldContainer>
          <FormFieldError errorMessage={errors.first_name?.message} />
          <InputFieldContainer icon={['fas', 'lock']}>
            <Input
              type='text'
              register={register}
              errorMsgRequired={t('error.requiredField')}
              errorMsgMinLength={t('error.minLengthError')}
              id='last_name'
              placeholder='Nom'
              disabled={loading}
              minLength={minLengthPassword}
            />
          </InputFieldContainer>
          <FormFieldError errorMessage={errors.last_name?.message} />
          <Button isLoading={loading} text={t('navigation.validate')} />
        </form>
      </div>
    </>
  )
}
