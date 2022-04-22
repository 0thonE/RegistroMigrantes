import React/* , { useState, useEffect, useRef }  */ from "react";

import {
  Navbar,
  Container,
} from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" sticky='top'>
      <Container className="nav-wrapper">
        <Navbar.Brand href="/">
          Registro Migrantes
        </Navbar.Brand>
      </Container>
    </Navbar>

  )
};

export default NavBar;
