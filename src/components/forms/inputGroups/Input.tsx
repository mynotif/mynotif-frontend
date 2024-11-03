import clsx from "clsx"

interface InputProps {
  placeholder?: string
  type?: 'text' | 'email' | 'password'
  register: any
  disabled?: boolean
  id: string
  className?: string
}

export const Input = ({
  placeholder,
  type = 'text',
  register,
  disabled,
  id,
  className
}: InputProps): JSX.Element => {
  return (
    <input
      {...register(id)}
      placeholder={placeholder}
      type={type}
      className={clsx(className, 'flex-grow outline-none text-gray-600 w-12 h-12')}
      disabled={disabled}
    />
  )
}
