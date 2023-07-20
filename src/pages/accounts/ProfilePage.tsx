import { strict as assert } from 'assert'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Profile } from '../../types'
import { TokenContext } from '../../context/token'
import { ProfileContext } from '../../context/profile'
import { FlashMessageContext, FlashMessageType } from '../../context/flashmessage'
import { updateUser } from '../../services/api'
import useTranslationHook from '../../hook/TranslationHook'
import { useNavigate } from 'react-router-dom'
import TitlePage from '../../components/TitlePage'

const ProfilePage = (): JSX.Element => {
  const { token } = useContext(TokenContext)
  const { addErrorMessage } = useContext(FlashMessageContext)
  const { profile: profileContext, setProfile: setProfileContext } = useContext(ProfileContext)
  // local unsaved profile state so we only hit the profile context after saving
  const [profile, setProfile] = useState<Profile>(profileContext)
  const { t } = useTranslationHook()
  const navigate = useNavigate()

  // update the local profile state when the profile context is ready
  useEffect(() => {
    setProfile(profileContext)
  }, [profileContext])

  const addErrorMessageCallback = useCallback(
    (flashMessage: FlashMessageType) => addErrorMessage(flashMessage),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const onFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
  }

  const onUpdate = async (): Promise<void> => {
    assert(token)
    try {
      const data = await updateUser(token, profile)
      setProfileContext(data)
      navigate('/account')
    } catch (error) {
      addErrorMessageCallback({ body: t('error.userUpdated') })
    }
  }

  return (
    <div>
      <TitlePage title={t('title.profile')} />
      <Form onSubmit={onFormSubmit}>
        <Form.Label>{t('form.emailAddress')}</Form.Label>
        <Form.Control
          placeholder='Email'
          className='me-2'
          aria-label='Email'
          autoComplete='off'
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          value={profile.email}
        />
        <Form.Label>{t('form.userName')}</Form.Label>
        <Form.Control
          placeholder='Username'
          className='me-2'
          autoComplete='off'
          value={profile.username}
          disabled
        />
        <Form.Label>{t('form.firstName')}</Form.Label>
        <Form.Control
          placeholder='Firstname'
          className='me-2'
          autoComplete='off'
          onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
          value={profile.first_name}
        />
        <Form.Label>{t('form.lastName')}</Form.Label>
        <Form.Control
          placeholder='Lastname'
          className='me-2'
          autoComplete='off'
          onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
          value={profile.last_name}
        />
        <Button className='mt-2' type='submit' variant='success' onClick={onUpdate}>
          {t('navigation.update')}
        </Button>
      </Form>
    </div>
  )
}

export default ProfilePage
