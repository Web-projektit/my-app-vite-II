import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useRouteError, Outlet, NavLink } from 'react-router-dom'
import { AuthContext } from './context/Auth';  
import { Nav,NavLinks,Logo,MenuButton } from "./Navbar.style";
import { Anecdotes, anecdotesLoader } from './pages/Anecdotes' 
import { Principles, principlesLoader } from './pages/Principles'
import { Login } from './pages/Login'
import { LoginCloseButton } from './pages/PrivateLink'
import { closeFetch } from './components/functions'
import { AgGrid, aggridLoader } from './pages/AgGrid'
import { FaBars,FaTimes } from "react-icons/fa"
import logo from './assets/omniavalkea_eitaustaa.png'
import { loaderCsrfToken } from './components/functions'    

const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Contact = () => <h2>Contact</h2>

const Navbar = () => {
  const [openmenu, setOpenmenu] = useState(false)
  let menu = openmenu ? "flex" : ""
  console.log("rendering Navbar,menu:",menu)

  return (
  <Nav>
    <Logo src={logo}></Logo>
    <NavLinks menu={menu}>
      <NavLink to="/" activeclassname="active">Home</NavLink>
      <NavLink to="/about" activeclassname="active">About</NavLink>
      <NavLink to="/contact" activeclassname="active">Contact</NavLink>
      <NavLink to="/anecdotes" activeclassname="active">Anecdotes</NavLink>
      <NavLink to="/principles" activeclassname="active">Principles</NavLink>
      <NavLink to="/aggrid" activeclassname="active">AgGrid</NavLink>
      <LoginCloseButton/> 
    </NavLinks>
    <MenuButton onClick={() => setOpenmenu(!openmenu)}>
      {openmenu ? <FaTimes/> : <FaBars/>}
    </MenuButton>
  </Nav>
  )
}

const Footer = () => (
  <footer>
  <span>&copy; 2024</span>
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
  const error = useRouteError()
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
    <Route path="aggrid" element={<AgGrid />} loader={aggridLoader} />
    <Route path="login" element={<Login/>} loader={loaderCsrfToken} />
    <Route path="*" element={<h2>404</h2>} />
  </Route>
  ))

const App = () => {
  const [authTokens, setAuthTokens] = useState(sessionStorage.getItem('tokens'));
  const [authConfirm, setAuthConfirm] = useState(localStorage.getItem('confirm'));
  //const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);

  const setTokens = data => {
    console.log('setTokens:',data)
    /* Huom. logout kutsuu setTokens-funktiota ilman dataa,
       jolloin authTokens-alkuarvoksi tulisi merkkijono 'undefined'. 
       Tässä removeItem tuottaa authTokens-alkuarvoksi null,
       jolloin sen boolean arvo on oikein false. */
    if (data) sessionStorage.setItem("tokens", JSON.stringify(data));
    else {
      closeFetch();
      sessionStorage.removeItem("tokens");
      /* 
      Pyritään estetään kirjautuminen samalle sivulle, jolta poistuttiin
      tyhjentämällä react-router-domin useLocation state. Samoin
      myös Kirjaudu-painikkeen yhteydessä. 
      */  
      navigate('/',{})  
      }   
    setAuthTokens(data);
    }

    const setConfirm = data => {
      console.log('setConfirm:',data)
      if (data) localStorage.setItem("confirm", JSON.stringify(data));
      else localStorage.removeItem("confirm");  
      setAuthConfirm(data);
      }

  return (
  <AuthContext.Provider value={ {authTokens,setAuthTokens:setTokens,authConfirm,setAuthConfirm:setConfirm }}>  
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  </AuthContext.Provider>
  )
}

export default App
