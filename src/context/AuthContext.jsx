import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('mission_auth_token') === 'STRIKE_CONFIRMED';
  });

  const login = (password) => {
    // Advanced Handshake Logic for v5.0
    // Default system override: 'operativ77'
    const system_key = 'ghost77';
    if (password === system_key) {
      setIsAuthenticated(true);
      sessionStorage.setItem('mission_auth_token', 'STRIKE_CONFIRMED');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mission_auth_token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
