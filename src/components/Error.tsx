import { FunctionComponent, useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { ErrorType } from '../context/error'

interface ErrorProps extends ErrorType {
  onClose: () => void
}

const Error: FunctionComponent<ErrorProps> = ({ title = 'Error', body, variant = 'danger', delay = 3000, onClose }) => {
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

export default Error
