import React from 'react'

interface PatientContainerProps {
  children: React.ReactNode
}

export const PatientContainer = ({ children }: PatientContainerProps): JSX.Element => (
  <div className='bg-gray-50 min-h-screen flex flex-col'>{children}</div>
)
