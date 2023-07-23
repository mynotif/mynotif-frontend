import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface NavigationLinkProps {
  url: string
  icon: IconProp
  onClick?: () => void
}
const NavigationLink = ({ url, icon, onClick }: NavigationLinkProps): JSX.Element => (
  <Nav>
    <Nav.Link as={Link} to={url} onClick={onClick}>
      <div className='d-flex flex-column align-items-center'>
        <FontAwesomeIcon icon={icon} className='text-primary' />
      </div>
    </Nav.Link>
  </Nav>
)

export default NavigationLink
