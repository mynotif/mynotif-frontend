import { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useIsLoggedIn } from '../utils/hooks'
import { getTokenLocalStorage } from '../utils/helpers'
import { TokenContext } from '../context/token'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'

const Header = (): JSX.Element => {
  const { setToken } = useContext(TokenContext)

  useEffect(() => {
    setToken(getTokenLocalStorage())
  }, [setToken])

  return (
    <Navbar bg='dark' variant='dark' expand='sm'>
      <Container>
        <Navbar.Brand href={process.env.PUBLIC_URL}>
          <FontAwesomeIcon icon={['fas', 'user-nurse']} /> MyNotif
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className='mr-auto'>
            <Nav.Link as={Link} to={process.env.PUBLIC_URL}>
              <FontAwesomeIcon icon={['fas', 'home']} /> Home
            </Nav.Link>
          </Nav>
          {useIsLoggedIn() ? (
            <>
              <Nav className='mr-auto'>
                <Nav.Link as={Link} to='/profile'>
                  <FontAwesomeIcon icon={['fas', 'user']} /> Profile
                </Nav.Link>
              </Nav>
              <Nav className='mr-auto'>
                <Nav.Link as={Link} to='/patients'>
                  <FontAwesomeIcon icon={['fas', 'user-injured']} /> Patients
                </Nav.Link>
              </Nav>
              <Nav className='mr-auto'>
                <Nav.Link as={Link} to='/prescriptions'>
                  <FontAwesomeIcon icon={['fas', 'file-medical']} /> Prescriptions
                </Nav.Link>
              </Nav>
              <div className='ms-auto'>
                <Logout />
              </div>
            </>
          ) : (
            <>
              <Register />
              <Login />
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
