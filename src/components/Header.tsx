import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoginOrLogout from './LoginOrLogout'

const Header = (): JSX.Element => (
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
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/profile'>
            <FontAwesomeIcon icon={['fas', 'user']} /> Profile
          </Nav.Link>
        </Nav>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/patient'>
            <FontAwesomeIcon icon={['fas', 'user-injured']} /> Patient
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <LoginOrLogout />
    </Container>
  </Navbar>
)

export default Header
