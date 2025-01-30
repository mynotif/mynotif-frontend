import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { Spinner } from '../../module/Spinner'

interface ButtonProps {
  size?: 'small' | 'medium' | 'large'
  variant?: 'accent' | 'secondary' | 'disabled' | 'icon'
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>) | (() => void | string);
  isLoading?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
  children?: React.ReactNode
  icon?: IconProp
  iconTheme?: 'accent' | 'secondary'
  iconPosition?: 'left' | 'right'
  className?: string
}

export const Button = ({ icon, iconTheme = 'accent', iconPosition = 'right', children, onClick, isLoading, type = 'button', disabled, variant = 'accent', size = 'medium', className }: ButtonProps): JSX.Element => {
  let variantStyle: string = ''; let sizeStyle: string = ''; let iconSize: SizeProp

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
      if (iconTheme === 'accent') {
        variantStyle = 'bg-colorprimary hover:bg-shade2 text-white rounded-full'
      } else if (iconTheme === 'secondary') {
        variantStyle = 'bg-colorsecondary hover:bg-shade3 text-colorprimary rounded-full'
      }
      break
  }

  switch (size) {
    case 'small':
      sizeStyle = `text-body-sm font-medium ${variant === 'icon' ? 'flex items-center justify-center w-10 h-10' : ' px-14 py-2'}`
      iconSize = 'xs'
      break
    case 'medium': // default
      sizeStyle = `text-body-base font-medium ${variant === 'icon' ? 'flex items-center justify-center w-12 h-12' : 'px-16 py-3'}`
      iconSize = 'sm'
      break
    case 'large':
      sizeStyle = `text-body-lg font-medium ${variant === 'icon' ? 'flex items-center justify-center w-14 h-14' : 'px-20 py-4'} `
      iconSize = 'lg'
      break
  }

  return (
    <div className='flex justify-center items-center mt-4'>
      <button
        type={type}
        className={clsx(variantStyle, sizeStyle, isLoading && 'cursor-wait', disabled && 'cursor-not-allowed', 'relative', className)}
        onClick={onClick}
        disabled={disabled}
      >

        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
                {variant === 'accent' || variant === 'icon' ? (<Spinner size="small" variant="white" />) : (<Spinner size="small" />)}
            </div>
        )}
        <div className={clsx(isLoading && 'invisible')}>
        {icon && variant === 'icon' ? (
          <>
            <FontAwesomeIcon icon={icon} size={iconSize} />
          </>
        ) : (
          <div className={clsx(icon && 'flex items-center gap-1')}>
            {icon && iconPosition === 'left' && <FontAwesomeIcon icon={icon} size={iconSize} />}
            {children}
            {icon && iconPosition === 'right' && <FontAwesomeIcon icon={icon} size={iconSize} />}
          </div>
        )}
        </div>
      </button>
    </div>
  )
}
