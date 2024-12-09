import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1rem;
  background-color: #333;
  color: white;
  padding: 1rem;
`;

export const NavLinks = styled.div.attrs((props) => ({menu: undefined,}))`
  display: ${({ menu }) => (menu === "true" ? "flex" : "none")};
  width: 100%; 
  flex-direction: column;
  padding: 0 125px;
  margin: 40px 0 20px 0;
  @media (min-width: 700px) {
    flex-direction: row;
    display: flex;
    margin: 20px 0;
  }
`;

export const NavItem = styled(NavLink)`
color: white;
font-size: x-large; 
text-decoration: none;
font-family: Arial, Helvetica, sans-serif;
margin-right: 15px;
white-space:nowrap;
&.active {
  color: #ccc;
}
`;

export const Logo = styled.img`
  margin: 0 0 40px 10px;
  height: 80px;
  position: absolute;
  left: 10px;
`;

export const MenuButton = styled.button`
  width: 70px;
  height: 70px;
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
  position: absolute;
  right: 0;
  @media (min-width: 700px) {
    display: none;
  }
`;

export const Button = styled.button`
  margin-top:10px;
  min-width:100px;
  @media (min-width: 700px) {
    margin-top:0;
    margin-right:20px;
    position:absolute;
    right:0;
  }
`;


export default Nav;
