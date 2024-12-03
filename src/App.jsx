import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Home from './pages/Home';
 import Navbar from './components/NavBar';
import './App.css'; // Import custom styles

function App() {
  return (
    <Router>
      <div className="relative">
        <Navbar /> {/* Include Navbar here */}
        <div className="pt-16"> {/* Adjust padding to account for sticky navbar height */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
