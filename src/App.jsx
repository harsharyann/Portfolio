import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Connect from './pages/Connect';
import Skills from './pages/Skills';
import Dashboard from './pages/Dashboard';

import { LogProvider } from './context/LogContext';
import { AuthProvider } from './context/AuthContext';
import { ConfigProvider, useConfig } from './context/ConfigContext';
import SpaceEngine from './components/SpaceEngine';
import GlobalFX from './components/GlobalFX';
import GlobalAmbient from './components/GlobalAmbient';

/* ── THEME MANAGER ── */
const ThemeManager = () => {
  const { config, THEME_PRESETS } = useConfig();
  
  useEffect(() => {
    const themeKey = config.theme || 'AGENT_SPECTER';
    const theme = THEME_PRESETS[themeKey] || THEME_PRESETS.AGENT_SPECTER;
    
    const root = document.documentElement;
    root.style.setProperty('--cmd-navy', theme.navy);
    root.style.setProperty('--cmd-accent', theme.accent);
    root.style.setProperty('--cmd-glow', theme.glow);
    root.style.setProperty('--cmd-border', theme.border);
    root.style.setProperty('--cmd-grid-color', theme.grid);
    root.style.setProperty('--cmd-panel', theme.panel);
    
    // Adaptive Attributes
    root.style.setProperty('--cmd-font', theme.font || "'Inter', sans-serif");
    root.style.setProperty('--cmd-noise', theme.fx?.noise ? theme.fx.noise.toString() : '0.02');
    root.setAttribute('data-segment', theme.segment || 'VOID');
    
    // Global FX toggles via CSS variables (read by GlobalAmbient/GlobalFX)
    root.style.setProperty('--fx-stars', theme.fx?.stars ? '1' : '0');
    root.style.setProperty('--fx-nebula', theme.fx?.nebula ? '1' : '0');
    root.style.setProperty('--fx-scanlines', theme.fx?.scanlines ? '1' : '0');
    
    document.body.style.backgroundColor = theme.navy;
    document.body.style.fontFamily = theme.font || "'Inter', sans-serif";
  }, [config.theme]);

  return null;
};

// Unified Single Page Portfolio Layout
const PortfolioLayout = () => {
  // Bypassing authorization lock by default
  const [siteUnlocked] = useState(true);

  return (
    <div className="flex flex-col relative overflow-x-hidden">
      <Navbar />
      
      {/* Scrollable Content Node */}
      <main className="flex-1 min-w-0 relative z-10">
        <section id="home" className="min-h-screen border-b border-white/5">
          <Home onUnlock={() => {}} isUnlocked={true} />
        </section>
        
        <div className="animate-fade-in">
          <section id="profile" className="min-h-screen border-b border-white/5">
            <About />
          </section>
          
          <section id="commit_history" className="min-h-screen border-b border-white/5">
            <Experience />
          </section>
          
          <section id="system_modules" className="min-h-screen border-b border-white/5">
            <Projects />
          </section>
          
          <section id="skills" className="min-h-screen border-b border-white/5">
            <Skills />
          </section>


          <section id="uplink" className="min-h-screen border-b border-white/5 mb-32">
            <Connect />
          </section>

          {/* Operational Footer */}
          <Footer />
        </div>
      </main>
    </div>
  );
};

import CustomCursor from './components/CustomCursor';
import TacticalHUD from './components/TacticalHUD';

/* Inner app component structure */
const AppInner = () => {
  return (
    <Router>
      <div className="min-h-screen text-[var(--cmd-accent)] overflow-x-hidden selection:bg-[var(--cmd-accent)] selection:text-black transition-colors duration-1000 bg-[var(--cmd-navy)]">
        <CustomCursor />
        <TacticalHUD />
        <GlobalAmbient />
        <ThemeManager />
        <GlobalFX />
        <div className="crt-overlay pointer-events-none" />

        <Routes>
          <Route path="/dashboard" element={
            <div className="flex flex-col relative h-screen overflow-hidden">
              <main className="flex-1 min-w-0 relative z-10 overflow-y-auto scrollbar-none">
                <Dashboard />
              </main>
            </div>
          } />
          <Route path="/" element={<PortfolioLayout />} />
          <Route path="*" element={<PortfolioLayout />} />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <ConfigProvider>
      <AuthProvider>
        <LogProvider>
          <AppInner />
        </LogProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
