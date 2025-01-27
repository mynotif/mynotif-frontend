import { FileUpIcon } from "lucide-react"

interface InputFieldProps {
  value?: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  type?: string
  name: string
  file?: string
  id?: string
}

export const InputField = ({ value, onChange, placeholder, type = 'text', name, file, id }: InputFieldProps): JSX.Element => (
  <>
    {type === 'file' ? (
      <>
        <div className="bg-white/10 backdrop-blur-sm border border-gray-400 rounded-lg p-4">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <FileUpIcon className="mx-auto h-12 w-12 text-colorprimary mb-4" />
              <div className="flex flex-col items-center text-sm text-gray-600">
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-colorprimary hover:underline"
                >
                  <span>{file ? file : "Capture l'ordonnance"}</span>
                  <input
                    className="sr-only"
                    name={name}
                    type={type}
                    id="fileInput"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF jusqu'à 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <input
        id={id}
        className="block flex-1 border-0 bg-transparent py-1.5 pl-2 pr-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={name}
      />
    )}
  </>
)
