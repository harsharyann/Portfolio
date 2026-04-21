import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TextScramble from './TextScramble';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  const navLinks = [
    { name: 'HOME',      path: 'home' },
    { name: 'PROFILE',   path: 'profile' },
    { name: 'TIMELINE',  path: 'commit_history' },
    { name: 'ARTIFACTS', path: 'system_modules' },
    { name: 'UPLINK',    path: 'uplink' },
  ];

  /* ── Live Clock For Navbar Branding ── */
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));
  useEffect(() => {
    const iv = setInterval(() => setTime(new Date().toLocaleTimeString('en-US', { hour12: false })), 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map(l => document.getElementById(l.path));
      const current = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        // Wider threshold for better detection
        return rect.top <= 150 && rect.bottom >= 150;
      });
      if (current) setActiveSection(current.id);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [navLinks]);

  const scrollTo = (id) => {
    if (isDashboard) return;
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div className="fixed top-4 inset-x-0 z-[100] flex justify-center px-4 pointer-events-none">
        <motion.nav 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`pointer-events-auto flex items-center justify-between w-full max-w-[95%] lg:max-w-7xl px-4 sm:px-8 py-3 rounded-sm border transition-all duration-700 relative overflow-hidden ${
            scrolled
              ? 'bg-[var(--cmd-navy)]/95 border-[var(--cmd-border)] shadow-[0_32px_80px_rgba(0,0,0,0.8)]'
              : 'bg-[var(--cmd-navy)]/20 border-[var(--cmd-border)] backdrop-blur-xl'
          }`}
        >
          {/* ── BRANDING (Now Inside Navbar to prevent overlap) ── */}
          <div className="flex flex-col min-w-0 flex-shrink">
            <h2 className="font-headline font-black text-[11px] sm:text-base tracking-tighter text-[var(--cmd-accent)] uppercase flex items-center gap-2 truncate">
              Harsh <span className="text-[var(--cmd-accent)] opacity-30 hidden sm:inline">Aryan</span>
            </h2>
            <div className="flex items-center gap-2 font-mono text-[6px] sm:text-[7px] text-[var(--cmd-accent)] opacity-30 tracking-[0.3em] uppercase">
                <span>{time}</span>
                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity }} className="w-0.5 h-0.5 bg-[var(--cmd-glow)] rounded-full shadow-[0_0_8px_var(--cmd-glow)]" />
            </div>
          </div>
          {/* Scanning Radar Line (Alive Factor) */}
          <motion.div 
             animate={{ x: ['-200%', '300%'] }}
             transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
             className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[30deg] pointer-events-none"
          />



          {/* Desktop Links (Hidden on Mobile) */}
          {!isDashboard && (
            <div className="hidden md:flex items-center gap-0.5 sm:gap-1">
              {navLinks.map(link => (
                  <button
                    key={link.name}
                    id={`nav-btn-${link.path}`}
                    onClick={() => scrollTo(link.path)}
                    className={`px-3 sm:px-6 py-3 text-[9px] sm:text-[10px] font-mono font-black tracking-[0.4em] transition-all uppercase relative group touch-manipulation ${
                      activeSection === link.path ? 'text-[var(--cmd-accent)]' : 'text-[var(--cmd-accent)] opacity-20 hover:opacity-100'
                    }`}
                  >
                    <span className="relative z-10">
                      <TextScramble text={link.name} />
                    </span>
                    {activeSection === link.path && (
                      <motion.div layoutId="nav-active-pill" className="absolute inset-x-2 inset-y-2 bg-[var(--cmd-accent)]/5 border border-[var(--cmd-border)] rounded-sm" />
                    )}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[var(--cmd-accent)] opacity-20 group-hover:w-1/2 transition-all duration-500" />
                  </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden flex flex-col gap-1 px-3 py-4 group/ham ml-2 flex-shrink-0"
          >
            <motion.div 
               animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
               className="w-5 h-[1.5px] bg-[var(--cmd-accent)] opacity-40 group-hover/ham:opacity-100 transition-all" 
            />
            <motion.div 
               animate={mobileOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
               className="w-3 h-[1.5px] bg-[var(--cmd-accent)] opacity-40 group-hover/ham:opacity-100 self-end transition-all" 
            />
            <motion.div 
               animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
               className="w-5 h-[1.5px] bg-[var(--cmd-accent)] opacity-40 group-hover/ham:opacity-100 transition-all" 
            />
          </button>
        </motion.nav>
      </div>

      {/* ── MOBILE FULLSCREEN HUD (Touch-Optimized) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[110] lg:hidden bg-[#050505] flex flex-col items-center justify-center p-10"
          >
            <div className="absolute inset-0 tech-grid-complex opacity-10 pointer-events-none" />
            <button onClick={() => setMobileOpen(false)} className="absolute top-10 right-10 text-white/40 border border-white/10 p-4 rounded-full touch-manipulation">
              <X size={28} />
            </button>
            <div className="flex flex-col w-full">
               {navLinks.map((link, i) => (
                 <button 
                  key={link.name} 
                  onClick={() => scrollTo(link.path)} 
                  className="w-full text-left"
                 >
                  <div className={`px-8 py-10 flex flex-col gap-2 border-b border-[var(--cmd-border)] ${activeSection === link.path ? 'bg-[var(--cmd-accent)]/5' : ''}`}>
                    <span className="text-[10px] font-mono text-[var(--cmd-accent)]/40 tracking-widest">{`0${i + 1}`}</span>
                    <span className={`text-2xl font-headline font-black tracking-tighter ${activeSection === link.path ? 'text-[var(--cmd-accent)]' : 'text-[var(--cmd-accent)]/40'}`}>
                      {link.name}
                    </span>
                  </div>
                 </button>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
