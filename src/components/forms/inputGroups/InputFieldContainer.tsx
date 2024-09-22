import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface InputFieldContainerProps {
  children: React.ReactNode
  icon: IconProp
}

export const InputFieldContainer = ({ children, icon }: InputFieldContainerProps): JSX.Element => (
  <div className='flex items-center bg-white rounded-lg border border-gray-300 p-3 w-full'>
    <div className='bg-colorsecondary rounded-full w-12 h-12 flex items-center justify-center mr-3'>
      <FontAwesomeIcon icon={icon} className='text-colorprimary' />
    </div>
    {children}
  </div>
)
