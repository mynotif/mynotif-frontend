import { strict as assert } from 'assert'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Profile } from '../types'
import { TokenContext } from '../context/token'
import { ProfileContext } from '../context/profile'
import { ErrorContext, ErrorType } from '../context/error'
import { updateUser } from '../services/api'

const ProfilePage = (): JSX.Element => {
  const { token } = useContext(TokenContext)
  const { addError } = useContext(ErrorContext)
  const { profile: profileContext, setProfile: setProfileContext } = useContext(ProfileContext)
  // local unsaved profile state so we only hit the profile context after saving
  const [profile, setProfile] = useState<Profile>(profileContext)

  // update the local profile state when the profile context is ready
  useEffect(() => {
    setProfile(profileContext)
  }, [profileContext])

  const addErrorCallback = useCallback(
    (error: ErrorType) => addError(error),
    // eslint-disable-next-line
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
    } catch (error) {
      addErrorCallback({ body: 'Error updating profile' })
    }
  }

  return (
    <div>
      <h1>Profile</h1>
      <Form onSubmit={onFormSubmit}>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          placeholder='Email'
          className='me-2'
          aria-label='Email'
          autoComplete='off'
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          value={profile.email}
        />
        <Form.Label>Username</Form.Label>
        <Form.Control
          placeholder='Username'
          className='me-2'
          autoComplete='off'
          value={profile.username}
          disabled
        />
        <Form.Label>Firstname</Form.Label>
        <Form.Control
          placeholder='Firstname'
          className='me-2'
          autoComplete='off'
          onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
          value={profile.first_name}
        />
        <Form.Label>Lastname</Form.Label>
        <Form.Control
          placeholder='Lastname'
          className='me-2'
          autoComplete='off'
          onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
          value={profile.last_name}
        />
        <Button className='mt-2' type='submit' onClick={onUpdate}>
          Update
        </Button>
      </Form>
    </div>
  )
}

export default ProfilePage
