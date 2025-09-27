// src/contexts/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if user data exists in localStorage
    const savedUser = localStorage.getItem('iqGameUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    // Simple mock authentication
    const userData = { 
      email, 
      name: email.split('@')[0],
      id: Date.now().toString()
    };
    setUser(userData);
    localStorage.setItem('iqGameUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('iqGameUser');
  };

  const value = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};