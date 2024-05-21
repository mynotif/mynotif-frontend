interface InputFieldProps {
  value?: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  type?: string
  name: string
  file?: string
}

export const InputField = ({ value, onChange, placeholder, type = 'text', name, file }: InputFieldProps): JSX.Element => (
  <>
    {type === 'file' ? (
      <>
        <label
          htmlFor='fileInput' className={`flex-grow outline-none ${file !== null && file !== undefined && file !== '' ? 'text-gray-600' : 'text-gray-400'}`}
        >
          <span id='fileName'>{file ?? 'Clique pour capture l\'ordonnance'}</span>
        </label>
        <input
          className='hidden'
          name={name}
          type={type}
          id='fileInput'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </>
    ) : (
      <input
        className='flex-grow outline-none text-gray-600'
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    )}
  </>
)
