import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './components/home';
import { About } from './components/about';
import { Contact } from './components/contact';
import './App.css';

function App() {
 

  return (
    <div>
    <h1>Welcome to React Router </h1>
    <BrowserRouter>

    <Link to="/">Home</Link>{' '}
    <Link to="/about">About</Link>{' '}
    <Link to="/contact">Contact</Link>{' '}
    
    <Routes>

      <Route path="/"element={<Home />} />
      <Route path="/about"element={<About />} />
      <Route path="/contact"element={<Contact />} />
      
    </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
