import { useContext } from 'react'
import MessageFlash from './MesageFlash'
import { MessageContext } from '../context/message'

const Messages = (): JSX.Element => {
  const { messages } = useContext(MessageContext)

  return (
    <>
      {messages.map(({ title, text, variant }) => (
        <MessageFlash
          key={text}
          text={text}
          variant={variant}
        />
      ))}
    </>
  )
}

export default Messages
