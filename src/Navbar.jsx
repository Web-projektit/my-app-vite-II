import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Nav, NavLinks, NavItem, Logo, MenuButton, Button } from './Navbar.style';

const Navbar = () => {
  return (
    <Nav>
      <Logo src="path/to/logo.png" alt="Logo" />
      <MenuButton><FaBars /></MenuButton>
      <NavLinks menu="true">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/contact">Contact</NavItem>
      </NavLinks>
      <Button>Sign In</Button>
    </Nav>
  );
};

export default Navbar;