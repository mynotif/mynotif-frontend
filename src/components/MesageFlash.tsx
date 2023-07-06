import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

interface MessageFlashProps {
  variant: string
  text: string
  delay?: number
}

const MessageFlash = ({ variant, text, delay = 3000 }: MessageFlashProps): JSX.Element => {
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
      {text}
    </Alert>
  )
}

export default MessageFlash
