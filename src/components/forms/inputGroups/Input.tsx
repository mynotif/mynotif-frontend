import { t } from 'i18next'

interface InputProps {
  placeholder?: string
  type?: 'text' | 'email' | 'password'
  register: any
  errorMsgRequired?: string
  errorMsgMinLength?: string
  id: string
  required?: true
  disabled?: boolean
  minLength?: number
}

export const Input = ({
  placeholder,
  type = 'text',
  register,
  errorMsgRequired,
  id,
  required,
  disabled,
  errorMsgMinLength,
  minLength
}: InputProps): JSX.Element => {
  return (
    <input
      {...register(
        id,
        {
          required: required === true ? { value: true, message: errorMsgRequired ?? '' } : undefined,
          minLength: minLength != null ? { value: minLength, message: t(errorMsgMinLength ?? '', { count: minLength }) } : undefined
        })
      }
      placeholder={placeholder}
      type={type}
      className='flex-grow w-12 h-12'
      disabled={disabled}
    />
  )
}
