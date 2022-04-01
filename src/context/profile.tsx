import { FC, createContext, useState } from 'react'
import { Profile } from '../types'

interface ProfileContextType {
  profile: Profile
  setProfile: (profile: Profile) => void
};

const defaultProfile = {
  id: 0,
  email: '',
  username: '',
  first_name: '',
  last_name: ''
}
const profileContextDefault = {
  profile: defaultProfile,
  setProfile: () => {}
}

const ProfileContext = createContext<ProfileContextType>(profileContextDefault)

const ProfileContextProvider: FC = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile)
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export { ProfileContext, ProfileContextProvider }
