import { FunctionComponent, createContext, useState } from 'react'

interface FlashMessageType {
  title?: string
  body: string
  variant?: string
  delay?: number
}
interface FlashMessageContextType {
  flashMessages: FlashMessageType[]
  setFlashMessages: (flashMessages: FlashMessageType[]) => void
  addFlashMessage: (flash: FlashMessageType) => void
  addErrorMessage: (flash: FlashMessageType) => void
  addSuccessMessage: (flash: FlashMessageType) => void
}

const flashDefault: FlashMessageType[] = []
const flashMessagesContextDefault = {
  flashMessages: flashDefault,
  setFlashMessages: () => { },
  addFlashMessage: () => { },
  addErrorMessage: () => { },
  addSuccessMessage: () => { }
}

const flashMessagesEqual = (flash1: FlashMessageType, flash2: FlashMessageType): boolean => (
  JSON.stringify(flash1) === JSON.stringify(flash2)
)

const containsFlashMessage = (flashMessages: FlashMessageType[], flash: FlashMessageType): boolean => (
  flashMessages.map(
    e => flashMessagesEqual(e, flash)
  ).reduce<boolean>(
    (acc, cur) => acc || cur, false
  )
)

const FlashMessageContext = createContext<FlashMessageContextType>(flashMessagesContextDefault)

const FlashMessageContextProvider: FunctionComponent = ({ children }) => {
  const [flashMessages, setFlashMessages] = useState<FlashMessageType[]>(flashDefault)

  const addFlashMessage = (flash: FlashMessageType): void => (
    // eslint-disable-next-line no-void
    void (containsFlashMessage(flashMessages, flash) || setFlashMessages([...flashMessages, flash]))
  )

  const addErrorMessage = (flash: FlashMessageType): void => addFlashMessage({ ...flash, title: 'Error', variant: 'danger' })
  const addSuccessMessage = (flash: FlashMessageType): void => addFlashMessage({ ...flash, title: 'Success', variant: 'success' })

  return (
    <FlashMessageContext.Provider value={{ flashMessages, setFlashMessages, addFlashMessage, addErrorMessage, addSuccessMessage }}>
      {children}
    </FlashMessageContext.Provider>
  )
}

export type { FlashMessageType }
export { FlashMessageContext, FlashMessageContextProvider, containsFlashMessage, flashMessagesEqual }
