import { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Nav } from 'react-bootstrap'

interface SidebarNavItemProps {
  icon: IconName
  href: string
  text: string
}

const SidebarNavItem = ({ icon, href, text }: SidebarNavItemProps): JSX.Element => (
  <Nav.Link href={href} className='nav-sublink'>
    <div className='d-flex align-items-center'>
      <FontAwesomeIcon icon={['fas', icon]} className='me-4 text-black' fixedWidth />
      <div className='text-black'>{text}</div>
    </div>
  </Nav.Link>
)

export default SidebarNavItem
