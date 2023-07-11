import { FunctionComponent, createContext, useState } from 'react'

interface ErrorType {
  title?: string
  body: string
  variant?: string
  delay?: number
}
interface ErrorContextType {
  errors: ErrorType[]
  setErrors: (errors: ErrorType[]) => void
  addError: (error: ErrorType) => void
}

const defaultErrors: ErrorType[] = []
const errorsContextDefault = {
  errors: defaultErrors,
  setErrors: () => {},
  addError: () => {}
}

const errorsEqual = (error1: ErrorType, error2: ErrorType): boolean => (
  JSON.stringify(error1) === JSON.stringify(error2)
)

const containsError = (errors: ErrorType[], error: ErrorType): boolean => (
  errors.map(
    e => errorsEqual(e, error)
  ).reduce<boolean>(
    (acc, cur) => acc || cur, false
  )
)

const ErrorContext = createContext<ErrorContextType>(errorsContextDefault)

const ErrorContextProvider: FunctionComponent = ({ children }) => {
  const [errors, setErrors] = useState<ErrorType[]>(defaultErrors)
  const addError = (error: ErrorType): void => (
    // eslint-disable-next-line no-void
    void (containsError(errors, error) || setErrors([...errors, error]))
  )
  return (
    <ErrorContext.Provider value={{ errors, setErrors, addError }}>
      {children}
    </ErrorContext.Provider>
  )
}

export type { ErrorType }
export { ErrorContext, ErrorContextProvider, containsError, errorsEqual }
