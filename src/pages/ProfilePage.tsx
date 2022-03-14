import { strict as assert } from 'assert'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Profile } from '../types'
import { TokenContext } from '../context/token'
import { ErrorContext, ErrorType } from '../context/error'
import { getProfile, updateUser } from '../services/api'

const ProfilePage = (): JSX.Element => {
  const { token } = useContext(TokenContext)
  const { addError } = useContext(ErrorContext)

  const addErrorCallback = useCallback(
    (error: ErrorType) => addError(error),
    // eslint-disable-next-line
    []
  )

  const defaultProfile = {
    id: 0,
    email: '',
    username: '',
    first_name: '',
    last_name: ''
  }
  const [profile, setProfile] = useState<Profile>(defaultProfile)

  const fetchProfileCallback = useCallback(async (): Promise<void> => {
    assert(token)
    try {
      const data = await getProfile(token)
      setProfile(data)
    } catch (error) {
      console.error(error)
      addErrorCallback({ body: 'Error fetching profile data' })
    }
  }, [token, addErrorCallback])

  useEffect(() => {
    if (token === null) return
    // eslint-disable-next-line no-void
    void (async () => await fetchProfileCallback())()
  }, [token, fetchProfileCallback])

  const onFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
  }

  const onUpdate = async (): Promise<void> => {
    assert(token)
    try {
      const data = await updateUser(token, profile)
      setProfile(data)
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
