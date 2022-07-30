import { useCallback, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useIsLoggedIn } from '../utils/hooks'
import { getTokenLocalStorage } from '../utils/helpers'
import { ErrorContext, ErrorType } from '../context/error'
import { ProfileContext } from '../context/profile'
import { TokenContext } from '../context/token'
import { getProfile } from '../services/api'
import { BACKEND_URL } from '../services/constants'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'

const Header = (): JSX.Element => {
  const { token, setToken } = useContext(TokenContext)
  const { profile, setProfile } = useContext(ProfileContext)
  const { addError } = useContext(ErrorContext)

  const addErrorCallback = useCallback(
    (error: ErrorType) => addError(error),
    // eslint-disable-next-line
    []
  )

  const fetchProfileCallback = useCallback(async (token: string): Promise<void> => {
    try {
      const data = await getProfile(token)
      setProfile(data)
    } catch (error) {
      console.error(error)
      addErrorCallback({ body: 'Error fetching profile data' })
    }
    // eslint-disable-next-line
  }, [addErrorCallback])

  // fetch profile
  useEffect(() => {
    if (token === null || token === undefined) return
    // eslint-disable-next-line no-void
    void (async () => await fetchProfileCallback(token))()
  }, [token, fetchProfileCallback])

  useEffect(() => {
    setToken(getTokenLocalStorage())
  }, [setToken])

  return (
    <Navbar bg='dark' variant='dark' expand='sm'>
      <Container>
        <Navbar.Brand as={Link} to={process.env.PUBLIC_URL}>
          <FontAwesomeIcon icon={['fas', 'user-nurse']} /> MyNotif
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className='mr-auto'>
            <Nav.Link as={Link} to={process.env.PUBLIC_URL}>
              <FontAwesomeIcon icon={['fas', 'home']} /> Home
            </Nav.Link>
          </Nav>
          {useIsLoggedIn() === true ? (
            <>
              {profile.is_staff && (
                <Nav className='mr-auto'>
                  <Nav.Link href={`${BACKEND_URL}/admin`}>
                    <FontAwesomeIcon icon={['fas', 'user-shield']} /> Admin
                  </Nav.Link>
                </Nav>
              )}
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
