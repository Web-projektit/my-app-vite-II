import styled from 'styled-components';

export const Nav = styled.nav`
  background-color: #333;
  color: white;
  font-size: 1.25rem;
  min-height: 4.25rem; /* Suljettu korkeus */
  padding: 1rem 1rem 1rem 80px; /* Avattu täyte */
`;

export const NavLinks = styled.div`
  /* Huom. props = css-tyyli */
  display: ${(props) => (props.menu ? props.menu : "none")};
  flex-direction: column;
  align-items: flex-start;
  @media (min-width: 700px) {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
`;

export const Logo = styled.img`
  margin: 0;
  width: 70px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const MenuButton = styled.button`
  color: white;
  background-color: transparent;
  height: 70px;
  width: 70px;
  font-size: 1.75rem;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  @media (min-width: 700px) {
    display: none;
  }
  &:hover {
    border: none;
  }
`;

export default Nav;
