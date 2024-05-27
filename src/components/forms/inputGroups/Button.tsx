import clsx from 'clsx'
import { ClipLoader } from 'react-spinners'

interface ButtonProps {
  size?: 'small' | 'medium' | 'large'
  variant?: 'accent' | 'secondary' | 'disabled' | 'icon'
  text: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
  isLoading?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export const Button = ({ text, onClick, isLoading, type = 'button', disabled, variant = 'accent', size = 'medium' }: ButtonProps): JSX.Element => {
  let variantStyle: string = ''
  let sizeStyle: string = ''

  switch (variant) {
    case 'accent': // default
      variantStyle = 'bg-colorprimary hover:bg-shade2 text-white rounded-lg'
      break
    case 'secondary':
      variantStyle = 'bg-colorsecondary hover:bg-shade3 text-colorprimary rounded-lg'
      break
    case 'disabled':
      variantStyle = 'bg-gray-200 border border-gray-300 text-gray-600 cursor-not-allowed rounded-lg'
      break
    case 'icon':
      variantStyle = ''
      break
  }

  switch (size) {
    case 'small':
      sizeStyle = 'text-body-sm font-medium px-14 py-2'
      break
    case 'medium': // default
      sizeStyle = 'text-body-base font-medium px-16 py-3'
      break
    case 'large':
      sizeStyle = 'text-body-lg font-medium px-20 py-4'
      break
  }

  return (
    <div className='flex justify-center items-center mt-4'>
      <button
        type={type}
        className={clsx(variantStyle, sizeStyle)}
        onClick={onClick}
        disabled={disabled}
      >
        {isLoading !== null && isLoading &&
          <div>
            <ClipLoader color='#fff' size={30} />
          </div>}
        {text}
      </button>
    </div>
  )
}
