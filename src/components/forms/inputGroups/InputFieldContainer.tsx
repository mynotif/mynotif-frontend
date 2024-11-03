import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import clsx from 'clsx'

interface InputFieldContainerProps {
  children: React.ReactNode
  icon: IconProp
  disabled?: boolean
}

export const InputFieldContainer = ({ 
  children,
  icon,
  disabled
}: InputFieldContainerProps): JSX.Element => (
  <div
    className={clsx(
      'flex items-center bg-white rounded-lg border border-gray-300 p-3 w-full',
      disabled && 'opacity-60 bg-gray-100 cursor-not-allowed'
    )}
  >
    <div
      className={clsx(
        'bg-colorsecondary rounded-full w-12 h-12 flex items-center justify-center mr-3',
      )}
    >
      <FontAwesomeIcon
        icon={icon}
        className={clsx(
          'text-colorprimary',
        )}
      />
    </div>
    {children}
  </div>
)