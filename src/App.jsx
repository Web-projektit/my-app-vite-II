import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useRouteError, NavLink, Outlet } from 'react-router-dom'
import Nav from './Navbar'
import { Anecdotes, anecdotesLoader } from './Anecdotes' 
import { Principles, principlesLoader } from './Principles'

const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Contact = () => <h2>Contact</h2>

const Navbar = () => (
  <Nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/anecdotes">Anecdotes</NavLink>
      <NavLink to="/principles">Principles</NavLink>
  </Nav>
)

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
