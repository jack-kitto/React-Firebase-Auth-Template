import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'

export default function NavBar() {
  return (
      <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="profile">Profile</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
      </>
  )
}
