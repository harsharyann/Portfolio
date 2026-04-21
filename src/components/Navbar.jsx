import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
          className={`pointer-events-auto flex items-center justify-between w-full max-w-[95%] sm:max-w-none sm:w-auto px-4 sm:px-6 py-2 rounded-sm border transition-all duration-700 relative overflow-hidden ${
            scrolled
              ? 'bg-black/95 border-white/20 shadow-[0_32px_80px_rgba(0,0,0,1)]'
              : 'bg-black/20 border-white/10 backdrop-blur-lg'
          }`}
        >
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
                    activeSection === link.path ? 'text-white' : 'text-white/20 hover:text-white/60'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {activeSection === link.path && (
                    <motion.div layoutId="nav-active-pill" className="absolute inset-x-2 inset-y-2 bg-white/[0.03] border border-white/5 rounded-sm" />
                  )}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white/20 group-hover:w-1/2 transition-all duration-500" />
                </button>
              ))}
            </div>
          )}

          {/* ── UNIQUE TACTICAL TRIGGER (Mobile Only) ── */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden flex flex-col gap-1.5 p-3 group/ham"
          >
            <motion.div 
               animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
               className="w-6 h-[1.5px] bg-white/40 group-hover/ham:bg-white transition-colors" 
            />
            <motion.div 
               animate={mobileOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
               className="w-4 h-[1.5px] bg-white/40 group-hover/ham:bg-white self-end transition-colors" 
            />
            <motion.div 
               animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
               className="w-6 h-[1.5px] bg-white/40 group-hover/ham:bg-white transition-colors" 
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
            <div className="flex flex-col items-center gap-10">
               {navLinks.map((link, idx) => (
                 <button 
                  key={link.name} 
                  onClick={() => scrollTo(link.path)} 
                  className="flex flex-col items-center group py-4 min-w-[200px] touch-manipulation"
                 >
                    <span className="text-[10px] font-mono text-white/10 mb-2 font-black tracking-widest uppercase">NODE_0{idx + 1}</span>
                    <span className="text-4xl font-headline font-black text-white/30 group-hover:text-white uppercase tracking-tighter transition-all">
                       {link.name}
                    </span>
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
