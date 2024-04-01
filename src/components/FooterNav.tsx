import { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

interface FooterNavProps {
  url: string
  icon: IconName
  title: string
  isExternal?: boolean
}

const FooterNav = ({ url, icon, title, isExternal = false }: FooterNavProps): JSX.Element => {
  const location = useLocation()
  const highlightOnPathname = (pathname: string): string => location.pathname === pathname ? 'text-primary' : ''

  const linkContent = (
    <div className={`d-flex flex-column align-items-center ${highlightOnPathname(url)}`}>
      <FontAwesomeIcon icon={['fas', icon]} className='fa-lg' />
      <div className='mt-1'>{title}</div>
    </div>
  )

  return (
    <Nav className='me-auto'>
      {isExternal ? (
        <Nav.Link as='a' href={url} target='_blank' rel='noopener noreferrer'>
          {linkContent}
        </Nav.Link>
      ) : (
        <Nav.Link as={Link} to={url}>
          {linkContent}
        </Nav.Link>
      )}
    </Nav>
  )
}

export default FooterNav
