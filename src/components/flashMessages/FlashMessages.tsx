import { useContext } from 'react'
import FlashMessage from './FlashMessage'
import { FlashMessageContext } from '../../context/flashmessage'

const FlashMessages = (): JSX.Element => {
  const { flashMessages, setFlashMessages } = useContext(FlashMessageContext)
  const removeIndex = (index: number): void =>
    setFlashMessages(flashMessages.filter((e, i) => i !== index))

  return (
    <>
      {flashMessages.map(({ title, body, variant, delay }, index) => (
        <FlashMessage
          key={body}
          title={title}
          body={body}
          variant={variant}
          delay={delay}
          onClose={() => removeIndex(index)}
        />
      ))}
    </>
  )
}

export default FlashMessages
