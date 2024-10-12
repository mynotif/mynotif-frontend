import React, { useEffect, useContext } from 'react'
import { strict as assert } from 'assert'
import OneSignal from 'react-onesignal'
import { ProfileContext } from '../../context/profile'
import { TokenContext } from '../../context/token'
import { createOneSignalSubscriptionId, getOneSignalSubscriptionId } from '../api'

const OneSignalManager: React.FC<any> = ({ children }) => {
  const { profile } = useContext(ProfileContext)
  const { token } = useContext(TokenContext)

  useEffect(() => {
    if (profile.id === 0 || token == null || token.trim() === '') return

    // Initialze once and then listen for changes in the subscription.
    const initializeOneSignal = async (): Promise<void> => {
      const result = await getOneSignalSubscriptionId(token)
      if (result.length > 0) return

      await OneSignal.init({
        appId: process.env.REACT_APP_ONE_SIGNAL_ID as string,
        safari_web_id: process.env.REACT_APP_SAFARI_WEB_ID as string,
        allowLocalhostAsSecureOrigin: true,
        notifyButton: { enable: true, offset: { 'bottom': '58px', 'right': '10px' }},
        size: 'small',
      })

      // Send the OneSignal subscription ID to the backend once it's ready
      OneSignal?.User?.PushSubscription.addEventListener('change', async function (event) {
        assert(profile.id, 'Profile ID is not defined')
        assert(token, 'token is not defined')
        await OneSignal.login(profile.id.toString())
        await createOneSignalSubscriptionId(token, event?.current?.id as string)
      });
    }
    // eslint-disable-next-line no-void
    void initializeOneSignal()
  }, [profile.id, token])

  return <>{children}</>
}

export default OneSignalManager
