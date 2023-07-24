import { useProfile } from '../hook/profile.hook'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import PageHeader from './PageHeader'
import NavigationLinks from './NavigationLinks'
import { useLocation } from 'react-router-dom'
import { PAGE_CONFIG } from '../utils/constants'
import HeaderProfile from './HeaderProfile'
import { useIsLoggedIn } from '../utils/hooks'
import { useState } from 'react'
import Sidebar from './Sidebar'

const Header = (): JSX.Element => {
  const location = useLocation()
  const currentPage = PAGE_CONFIG.find(page => location.pathname.includes(page.path))
  const [showSidebar, setShowSidebar] = useState(false)
  const handleCloseSidebar = (): void => setShowSidebar(false)

  useProfile()

  return (
    <>
      {useIsLoggedIn() === true && (
        <Navbar className='shadow-sm mb-5' fixed='top' bg='body' data-bs-theme='light'>
          <Container fluid>
            <Row className='bg-light shadow-sm mx-1 w-100'>
              <Col className='d-flex align-items-center justify-content-between'>
                {location.pathname === '/home' && (
                  <HeaderProfile />
                )}
                {(currentPage != null) && (
                  <PageHeader url='/home' title={currentPage.title} />
                )}
                <NavigationLinks onMenuClick={() => setShowSidebar(true)} />
              </Col>
            </Row>
          </Container>
        </Navbar>
      )}
      <Sidebar show={showSidebar} handleClose={handleCloseSidebar} />
    </>
  )
}

export default Header
