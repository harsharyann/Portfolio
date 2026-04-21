import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('mission_auth_token') === 'NEXUS_ACCESS_GRANTED';
  });

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const login = (password) => {
    if (isLocked) return { success: false, error: 'SYSTEM_LOCKED_OUT' };

    const system_key = 'ghost77'; // Fallback key
    
    if (password === system_key) {
      setIsAuthenticated(true);
      setFailedAttempts(0);
      sessionStorage.setItem('mission_auth_token', 'NEXUS_ACCESS_GRANTED');
      return { success: true };
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 3) {
        setIsLocked(true);
        setTimeout(() => { setIsLocked(false); setFailedAttempts(0); }, 60000); // 1 min lockout
        return { success: false, error: 'LOCKOUT_INITIATED' };
      }
      return { success: false, error: `INVALID_KEY [${3 - newAttempts} REMAINING]` };
    }
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
