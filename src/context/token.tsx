import { FunctionComponent, createContext, useEffect, useState, Fragment } from 'react'
import { checkSessionExpiry, clearSession, removeLegacyToken, sessionSnapshot, subscribeSession } from '../services/session'

interface TokenContextType {
  token: string | null | undefined
  setToken: (token: string | null) => void
}
const TokenContext = createContext<TokenContextType>({ token: null, setToken: () => {} })
const TokenContextProvider: FunctionComponent = ({ children }) => {
  const [snapshot, setSnapshot] = useState(sessionSnapshot)
  useEffect(() => {
    removeLegacyToken()
    const unsubscribe = subscribeSession(() => setSnapshot(sessionSnapshot()))
    setSnapshot(sessionSnapshot())
    window.addEventListener('focus', checkSessionExpiry)
    document.addEventListener('visibilitychange', checkSessionExpiry)
    return () => { unsubscribe(); window.removeEventListener('focus', checkSessionExpiry); document.removeEventListener('visibilitychange', checkSessionExpiry) }
  }, [])
  return (
    <TokenContext.Provider value={{ token: snapshot.token, setToken: token => { if (token === null) clearSession() } }}>
      {snapshot.notice && <p role='alert' className='p-4 text-red-600'>{snapshot.notice}</p>}
      {snapshot.recovering && <p role='status'>Renouvellement de la session…</p>}
      <div hidden={snapshot.recovering}><Fragment key={snapshot.token ? snapshot.generation : 'anonymous'}>{children}</Fragment></div>
    </TokenContext.Provider>
  )
}
export { TokenContext, TokenContextProvider }
