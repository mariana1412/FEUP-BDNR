import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar expand="md" className="navbar">
      <Container>
        <Navbar.Brand>
          <img src="/images/logo_without_background.png" width="90" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/search">Search</Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}
