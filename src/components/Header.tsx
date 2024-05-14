import { useProfile } from '../hook/profile.hook'
import { Button, Col, Container, Navbar, Row } from 'react-bootstrap'
import PageHeader from './PageHeader'
import NavigationLinks from './NavigationLinks'
import { useLocation } from 'react-router-dom'
import { PAGE_CONFIG } from '../utils/constants'
import HeaderProfile from './HeaderProfile'
import { useIsLoggedIn } from '../utils/hooks'
import { useState } from 'react'
import Sidebar from './Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = (): JSX.Element => {
  const location = useLocation()

  const paths = location.pathname.split('/')
  const id = paths[2] === 'edit' ? 'NaN' : parseInt(paths[paths.length - 1], 10)

  const currentPage = PAGE_CONFIG.find(page => location.pathname.includes(page.path))
  const [showSidebar, setShowSidebar] = useState(false)
  const handleCloseSidebar = (): void => setShowSidebar(false)

  useProfile()

  return (
    <>
      {useIsLoggedIn() === true && (
        <Navbar className='shadow-sm mb-5' fixed='top'>
          <Container fluid>
            <Row className='mx-1 w-100'>
              <Col className='d-flex align-items-center justify-content-between'>
                {location.pathname === '/home' && (
                  <>
                    <HeaderProfile />
                    <NavigationLinks onMenuClick={() => setShowSidebar(true)} />
                  </>
                )}

                {(currentPage != null) && (
                  <>
                    <PageHeader url='/home' title={currentPage.title} />
                    {(location.pathname.includes('/patients/')) && typeof id === 'number' && (
                      <Button variant='light' href={`/patients/edit/${id}`} className='position-absolute top-5 end-0'>
                        <FontAwesomeIcon icon={['fas', 'pencil-alt']} size='lg' style={{ cursor: 'pointer' }} />
                      </Button>
                    )}
                  </>
                )}
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
