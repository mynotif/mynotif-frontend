import { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Nav } from 'react-bootstrap'

interface SidebarNavItemProps {
  icon: IconName
  href: string
  text: string
}

const SidebarNavItem = ({ icon, href, text }: SidebarNavItemProps): JSX.Element => (
  <>
    <Nav.Link href={href} className='nav-sublink'>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center text-black'>
          <FontAwesomeIcon icon={['fas', icon]} className='me-4' fixedWidth />
          <div>{text}</div>
        </div>
        <div>
          <FontAwesomeIcon icon={['fas', 'chevron-right']} className='text-black' />
        </div>
      </div>
    </Nav.Link>
    <hr className='border-top my-2' />
  </>
)

export default SidebarNavItem
