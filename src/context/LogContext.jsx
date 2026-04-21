import React, { createContext, useContext, useState, useEffect } from 'react';
import { useConfig } from './ConfigContext';

const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const { config } = useConfig();
  const [activeLogs, setActiveLogs] = useState([]);

  // Simulate "Always Running" using config telemetry
  useEffect(() => {
    if (!config.telemetry || !config.telemetry.feed) return;

    const interval = setInterval(() => {
      const logs = config.telemetry.feed;
      const randomLogText = logs[Math.floor(Math.random() * logs.length)];
      
      const newEntry = {
        id: Date.now(),
        text: randomLogText,
        timestamp: new Date().toLocaleTimeString([], { hour12: false }),
        type: Math.random() > 0.7 ? 'yellow' : 'dim'
      };
      
      setActiveLogs(prev => [newEntry, ...prev].slice(0, 30));
    }, Math.max(300, (config.telemetry.speed || 1000) * 0.7)); // Accelerate feed by 30%

    return () => clearInterval(interval);
  }, [config.telemetry]);

  return (
    <LogContext.Provider value={{ activeLogs }}>
      {children}
    </LogContext.Provider>
  );
};

export const useMissionLogs = () => useContext(LogContext);
