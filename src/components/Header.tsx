import { useProfile } from '../hook/profile.hook'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import PageHeader from './PageHeader'
import NavigationLinks from './NavigationLinks'
import { useLocation } from 'react-router-dom'
import { PAGE_CONFIG } from '../utils/constants'
import HeaderProfile from './HeaderProfile'
import { useIsLoggedIn } from '../utils/hooks'

const Header = (): JSX.Element => {
  const location = useLocation()
  const currentPage = PAGE_CONFIG.find(page => location.pathname.includes(page.path))

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
                  <PageHeader url='#' title={currentPage.title} />
                )}
                <NavigationLinks />
              </Col>
            </Row>
          </Container>
        </Navbar>
      )}
    </>
  )
}

export default Header
