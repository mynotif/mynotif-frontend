import React from 'react'
import { Link } from 'react-router-dom'

interface FooterNavProps {
  icon: any
  url: string
  location: any
}

export const FooterNav = ({icon: Icon, url, location}: FooterNavProps): JSX.Element => {
  const isActive = location.pathname === url
  return (
    <Link to={url} className={`flex flex-col items-center ${isActive ? 'text-colorprimary' : ''}`}>
      <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''}`} />
    </Link>
  )
}
