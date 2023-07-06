import { FunctionComponent, createContext, useState } from 'react'

interface MessageType {
  title?: string
  text: string
  variant: 'danger' | 'success'
}
interface MessageContextType {
  messages: MessageType[]
  setMessages: (messages: MessageType[]) => void
  addMessage: (message: MessageType) => void
}

const defaultMessages: MessageType[] = []

const messagesContextDefault = {
  messages: defaultMessages,
  setMessages: () => {},
  addMessage: () => {}
}

const messagesEqual = (message1: MessageType, message2: MessageType): boolean => (
  JSON.stringify(message1) === JSON.stringify(message2)
)

const containsMessage = (messages: MessageType[], message: MessageType): boolean => (
  messages.map((m) => messagesEqual(m, message)).reduce<boolean>((acc, cur) => acc || cur, false)
)

const MessageContext = createContext<MessageContextType>(messagesContextDefault)

const MessageContextProvider: FunctionComponent = ({ children }) => {
  const [messages, setMessages] = useState<MessageType[]>(defaultMessages)

  const addMessage = (message: MessageType): void => (
    // eslint-disable-next-line no-void
    void (containsMessage(messages, message) || setMessages([...messages, message]))
  )
  return (
    <MessageContext.Provider value={{ messages, setMessages, addMessage }}>
      {children}
    </MessageContext.Provider>
  )
}

export type { MessageType }
export { MessageContext, MessageContextProvider, containsMessage, messagesEqual }
