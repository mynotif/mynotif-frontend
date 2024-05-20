import React from 'react'

interface ContainerPageProps {
  children: React.ReactNode
}

export const ContainerPage = ({ children }: ContainerPageProps): JSX.Element => (
  <div className='bg-gray-50 min-h-screen flex flex-col'>{children}</div>
)
