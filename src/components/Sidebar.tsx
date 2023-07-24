import { Offcanvas } from 'react-bootstrap'
import SidebarNav from './SidebarNav'
import SidebarTitleNav from './SidebarTitleNav'
import { t } from 'i18next'

interface SidebarProps {
  show: boolean
  handleClose: () => void
}

const Sidebar = ({ show, handleClose }: SidebarProps): JSX.Element => (
  <Offcanvas show={show} onHide={handleClose} placement='start'>
    <Offcanvas.Header className='bg-primary text-white' closeButton>
      <Offcanvas.Title>
        <SidebarTitleNav title={t('title.app')} />
      </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <SidebarNav />
    </Offcanvas.Body>
  </Offcanvas>
)

export default Sidebar
