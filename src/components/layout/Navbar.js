// src/components/layout/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <Link to="/" className="flex items-center py-4 px-2">
              <span className="font-semibold text-gray-500 text-lg">IQ Challenge Pro</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/" className="py-2 px-4 text-gray-500 hover:text-gray-900">Home</Link>
            <Link to="/game" className="py-2 px-4 text-gray-500 hover:text-gray-900">Play</Link>
            <Link to="/leaderboard" className="py-2 px-4 text-gray-500 hover:text-gray-900">Leaderboard</Link>
            {user ? (
              <>
                <Link to="/profile" className="py-2 px-4 text-gray-500 hover:text-gray-900">Profile</Link>
                <button onClick={logout} className="py-2 px-4 text-gray-500 hover:text-gray-900">Logout</button>
              </>
            ) : (
              <Link to="/login" className="py-2 px-4 text-gray-500 hover:text-gray-900">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;