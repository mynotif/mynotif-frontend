import { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

interface FooterNavProps {
  url: string
  icon: IconName
  title: string
}

const FooterNav = ({ url, icon, title }: FooterNavProps): JSX.Element => {
  const location = useLocation()
  const highlightOnPathname = (pathname: string): string => location.pathname === pathname ? 'text-primary' : ''
  return (
    <Nav className='me-auto'>
      <Nav.Link as={Link} to={url}>
        <div className={`d-flex flex-column align-items-center ${highlightOnPathname(url)}`}>
          <FontAwesomeIcon icon={['fas', icon]} className='fa-lg' />
          <div className='mt-1'>{title}</div>
        </div>
      </Nav.Link>
    </Nav>
  )
}

export default FooterNav
