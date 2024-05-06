import React, { useEffect, useState, useContext } from 'react'
import { strict as assert } from 'assert'
import OneSignal from 'react-onesignal'
import { ProfileContext } from '../../context/profile'
import { TokenContext } from '../../context/token'
import { createOneSignalSubscriptionId, getOneSignalSubscriptionId } from '../api'

const OneSignalManager: React.FC<any> = ({ children }) => {
  const { profile } = useContext(ProfileContext)
  const { token } = useContext(TokenContext)
  const [oneSignalInitialized, setOneSignalInitialized] = useState<boolean>(false)

  useEffect(() => {
    if (profile.id === 0 || token == null || token.trim() === '' || oneSignalInitialized) return

    const initializeOneSignal = async (): Promise<void> => {
      const result = await getOneSignalSubscriptionId(token)
      if (result.length > 0) return

      await OneSignal.init({
        appId: process.env.REACT_APP_ONE_SIGNAL_ID as string,
        safari_web_id: process.env.REACT_APP_SAFARI_WEB_ID as string,
        allowLocalhostAsSecureOrigin: true,
        notifyButton: { enable: true },
        size: 'small'
      })

      setOneSignalInitialized(true)

      try {
        await OneSignal.login(profile.id.toString())
        const subscriptionId = (window.OneSignal?.User as any).onesignalId
        assert(subscriptionId, 'Subscription ID is not defined')
        await createOneSignalSubscriptionId(token, subscriptionId)
      } catch (error) {
        console.error('Error creating subscription ID', error)
      }
    }
    // eslint-disable-next-line no-void
    void initializeOneSignal()
  }, [profile.id, oneSignalInitialized, token])

  return <>{children}</>
}

export default OneSignalManager
