import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function PrivateNavBar() {
  return (
      <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav className="me-auto" >
                    <Nav.Link href='dashboard'>Dashboard</Nav.Link>
                    <Nav.Link href='profile'>Profile</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
      </>
  )
}
