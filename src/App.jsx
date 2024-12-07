import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Anecdotes } from './Anecdotes' 
import { Principles } from './Principles'

const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Contact = () => <h2>Contact</h2>

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/anecdotes">Anecdotes</Link></li>
          <li><Link to="/principles">Principles</Link></li>
           
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/anecdotes" element={<Anecdotes />} />
        <Route path="/principles" element={<Principles />} />
      </Routes>
    </Router>
  )
}

export default App
