import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useRouteError, Outlet } from 'react-router-dom'
import {
  Nav,NavLinks,NavItem as NavLink,
  Logo,MenuButton } from "./Navbar.style";
import { Anecdotes, anecdotesLoader } from './Anecdotes' 
import { Principles, principlesLoader } from './Principles'
import { FaBars,FaTimes } from "react-icons/fa"

const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Contact = () => <h2>Contact</h2>

const Navbar = () => {
  const [openmenu, setOpenmenu] = useState(false)
  let menu = openmenu ? "true" : "false"
  console.log("rendering Navbar")

  return (
  <Nav>
    <Logo src={''}></Logo>
    <NavLinks menu={menu}>    
      <NavLink to="/" activeclassname="active">Home</NavLink>
      <NavLink to="/about" activeclassname="active">About</NavLink>
      <NavLink to="/contact" activeclassname="active">Contact</NavLink>
      <NavLink to="/anecdotes" activeclassname="active">Anecdotes</NavLink>
      <NavLink to="/principles" activeclassname="active">Principles</NavLink>
    </NavLinks>
    <MenuButton onClick={() => setOpenmenu(!openmenu)}>
    {openmenu ? <FaTimes/> : <FaBars/>}
    </MenuButton>
  </Nav>
)
}

const Footer = () => (
  <footer>
  <p>&copy; 2024</p>
  </footer>
)

function Layout() {
  return (
    <>
      <Navbar />
      <main>
      <Outlet /> {/* Render the child route's element here */}
      </main> 
      <Footer />
    </>
  );
}

const ErrorBoundary = () => {
  const error = useRouteError();
  console.log('Virhe:', error)
  return (
    <div>
      <h2>Jokin meni pieleen!</h2>
      <p>{error.message}</p>
    </div>
  )
}

const router = createBrowserRouter( 
  createRoutesFromElements(
  <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
    <Route index element={<Home />} />
    <Route path="contact" element={<Contact />} />
    <Route path="about" element={<About />} />
    <Route path="anecdotes" element={<Anecdotes />} loader={anecdotesLoader} />
    <Route path="principles" element={<Principles />} loader={principlesLoader} />
  </Route>
  ))

const App = () => {
  return (
  <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  )
}

export default App
