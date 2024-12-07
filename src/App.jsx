import { createBrowserRouter, RouterProvider, useRouteError } from 'react-router-dom'
import { Anecdotes } from './Anecdotes' 
import { Principles, principlesLoader } from './Principles'

const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Contact = () => <h2>Contact</h2>

const ErrorBoundary = () => {
  const error = useRouteError();
  console.log('Virhe:', error)
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
    </div>
  )
}

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/anecdotes", element: <Anecdotes /> },
  { path: "/principles", element: <Principles />, loader: principlesLoader, errorElement: <ErrorBoundary /> }
])

const App = () => {
  return (
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  )
}

export default App
