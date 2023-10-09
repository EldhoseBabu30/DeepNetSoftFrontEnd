import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>Products Listing </Navbar.Brand>
        <Navbar.Toggle />
     
      </Container>
    </Navbar>
  );
}

export default Header;
