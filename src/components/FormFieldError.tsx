import React from 'react'

interface FormFieldErrorProps {
  errorMessage: string | undefined
}

const FormFieldError: React.FC<FormFieldErrorProps> = ({ errorMessage }) => (
  <>
    {((errorMessage) != null) && (
      <span className='text-red-500 text-sm'>
        {errorMessage}
      </span>
    )}
  </>
)

export default FormFieldError
