import { FunctionComponent, useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { FlashMessageType } from '../../context/flashmessage'

interface FlashMessageProps extends FlashMessageType {
  onClose: () => void
}

const FlashMessage: FunctionComponent<FlashMessageProps> = ({ title, body, variant, delay = 3000, onClose }) => {
  const [showToast, setShowToast] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowToast(false)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [delay])

  return (
    <Alert variant={variant} show={showToast} onClose={() => setShowToast(false)} dismissible>
      <Alert.Heading>{title}</Alert.Heading>
      <p>{body}</p>
    </Alert>
  )
}

export default FlashMessage
