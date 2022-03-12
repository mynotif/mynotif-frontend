import { FunctionComponent, createContext, useState } from 'react'

interface TokenContextType {
  token: string|null
  setToken: (token: string|null) => void
};

const defaultToken: (string|null) = null
const tokenContextDefault = {
  token: defaultToken,
  setToken: () => {}
}

const TokenContext = createContext<TokenContextType>(tokenContextDefault)

const TokenContextProvider: FunctionComponent = ({ children }) => {
  const [token, setToken] = useState<(string|null)>(defaultToken)
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}

export { TokenContext, TokenContextProvider }
