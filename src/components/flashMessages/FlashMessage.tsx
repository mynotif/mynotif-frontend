import { FunctionComponent, useEffect, useState } from 'react'
import { FlashMessageType } from '../../context/flashmessage'

interface FlashMessageProps extends FlashMessageType {
  onClose: () => void
}

const FlashMessage: FunctionComponent<FlashMessageProps> = ({ title, body, className, delay = 3000, onClose }) => {
  const [showToast, setShowToast] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowToast(false)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [delay, onClose])

  if (!showToast) return null;

  return (
    <div className={`${className} ${showToast ? 'visible' : 'hidden'}`} role="alert">
      <p>{title}</p>
      <p>{body}</p>
    </div>
  )
}

export default FlashMessage
