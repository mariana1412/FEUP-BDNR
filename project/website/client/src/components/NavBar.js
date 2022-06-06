import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar expand="md" className="navbar">
      <Container>
        <Navbar.Brand>
          <img src="/images/logo_without_background.png" width="90" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="text-white">Search</Nav.Link>
            <Nav.Link href="/purchases" className="text-white">Purchases</Nav.Link>
            <Nav.Link href="/clients" className="text-white">Clients</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
