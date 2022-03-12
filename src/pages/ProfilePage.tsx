import { strict as assert } from 'assert'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Profile } from '../types'
import { TokenContext } from '../context/token'
import { getProfile } from '../services/api'

const ProfilePage = (): JSX.Element => {
  const { token } = useContext(TokenContext)

  const defaultProfile = {
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
      console.error(error.response)
    }
  }, [token])

  useEffect(() => {
    if (token === null) return
    // eslint-disable-next-line no-void
    void (async () => await fetchProfileCallback())()
  }, [token, fetchProfileCallback])

  return (
    <div>
      <h1>Profile</h1>
      <ul>
        {Object.keys(defaultProfile).map((key) => (<li key={key}>{key}: {profile[key as keyof Profile]}</li>))}
      </ul>
    </div>
  )
}

export default ProfilePage
