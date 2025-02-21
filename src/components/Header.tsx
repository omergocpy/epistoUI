// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="py-4 bg-gray-800 text-white text-center">
      <h1 className="text-2xl font-bold">My React App</h1>
      <nav className="mt-2">
        <Link to="/" className="text-blue-400 hover:underline mx-2">Home</Link>
        <Link to="/about" className="text-blue-400 hover:underline mx-2">About</Link>
      </nav>
    </header>
  );
};

export default Header;
