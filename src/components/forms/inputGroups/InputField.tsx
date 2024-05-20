interface InputFieldProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  type?: string
  name: string
}

export const InputField = ({ value, onChange, placeholder, type = 'text', name }: InputFieldProps): JSX.Element => (
  <input
    className='flex-grow outline-none text-gray-600'
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
)
