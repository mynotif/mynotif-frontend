import React, { useEffect } from 'react'
import OneSignal from 'react-onesignal'

// const OneSignalManager: React.FC = ({ children }) => {
//   useEffect(() => {
//     const initializeOneSignal = async (): Promise<void> => {
//       try {
//         await OneSignal.init({
//           appId: process.env.REACT_APP_ONE_SIGNAL_ID as string,
//           allowLocalhostAsSecureOrigin: true
//         })
//       } catch (error) {
//         console.error('Error initializing OneSignal:', error)
//       }
//     }
//     // eslint-disable-next-line @typescript-eslint/no-floating-promises
//     initializeOneSignal()
//   }, [])

//   return <>{children}</>
// }

export default OneSignalManager
