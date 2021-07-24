import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = (): JSX.Element => (
  <Navbar bg='dark' variant='dark' expand='sm'>
    <Container>
      <Navbar.Brand href={process.env.PUBLIC_URL}>
        <FontAwesomeIcon icon={['fas', 'user-nurse']} /> MyNotif
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className='mr-auto'>
          <Nav.Link href={process.env.PUBLIC_URL}>
            <FontAwesomeIcon icon={['fas', 'home']} /> Home
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

export default Header
