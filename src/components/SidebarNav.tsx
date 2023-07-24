import { Nav } from 'react-bootstrap'
import SidebarNavItem from './SidebarNavItem'

const SidebarNav = (): JSX.Element => (
  <Nav id='main-nav' className='flex-column'>
    <SidebarNavItem icon='house' href='/home' text='Homepage' />
    <SidebarNavItem icon='file-medical' href='/prescriptions' text='Prescriptions' />
    <SidebarNavItem icon='users' href='/patients' text='Patients' />
    <SidebarNavItem icon='user-nurse' href='/account' text='My Account' />
    <SidebarNavItem icon='bell' href='#' text='Notifications' />
    <SidebarNavItem icon='headset' href='#' text='Help & Support' />
    <SidebarNavItem icon='scale-balanced' href='#' text='Legal Notices' />
  </Nav>
)

export default SidebarNav
