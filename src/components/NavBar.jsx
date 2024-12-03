import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-60 backdrop-blur-md shadow-lg z-50 transition-all duration-500">
      <div className="max-w-5xl mx-auto p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">GitHub Showdown</div>
        <div className="flex items-center md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <X className="text-gray-800" size={24} /> : <Menu className="text-gray-800" size={24} />}
          </button>
        </div>
        <div className={`hidden md:flex space-x-4`}>
          <Link to="/" className="py-2 text-gray-800 hover:text-blue-600">Home</Link>
          <Link to="/about" className="py-2 text-gray-800 hover:text-blue-600">About</Link>
          <Link to="/contact" className="py-2 text-gray-800 hover:text-blue-600">Contact</Link>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col space-y-1 p-4 bg-white bg-opacity-70 backdrop-blur-md shadow-lg">
          <Link to="/" className="block py-2 text-gray-800 hover:text-blue-600">Home</Link>
          <Link to="/about" className="block py-2 text-gray-800 hover:text-blue-600">About</Link>
          <Link to="/contact" className="block py-2 text-gray-800 hover:text-blue-600">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
