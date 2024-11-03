import { useCallback, useContext, useEffect, useState } from 'react'
import { Profile } from '../../types'
import { ProfileContext } from '../../context/profile'
import { FlashMessageContext, FlashMessageType } from '../../context/flashmessage'
import { ProfileForm } from '../../components/forms/ProfileForm'

const ProfileEdit = (): JSX.Element => {
  const { profile: profileContext } = useContext(ProfileContext)
  const { addErrorMessage } = useContext(FlashMessageContext)
  // local unsaved profile state so we only hit the profile context after saving
  const [profile, setProfile] = useState<Profile>(profileContext)

  // update the local profile state when the profile context is ready
  useEffect(() => {
    setProfile(profileContext)
  }, [profileContext])

  const addErrorMessageCallback = useCallback(
    (flashMessage: FlashMessageType) => addErrorMessage(flashMessage),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return <ProfileForm addErrorMessageCallback={addErrorMessageCallback} profile={profile} />
}

export default ProfileEdit
