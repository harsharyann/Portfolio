import React, { useState, useEffect, useRef } from 'react';
import { useConfig } from '../context/ConfigContext';
import BrandIcon from '../components/BrandIcon';
import { Radio, Activity, Rocket, Zap, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Typewriter ── */
const Typewriter = ({ text, delay = 32 }) => {
  const [out, setOut] = useState('');
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (idx < text.length) {
      const t = setTimeout(() => { setOut(p => p + text[idx]); setIdx(p => p + 1); }, delay);
      return () => clearTimeout(t);
    }
  }, [idx, delay, text]);
  useEffect(() => { setOut(''); setIdx(0); }, [text]);
  return (
    <span className="relative">
      {out}
      <span className="inline-block w-[1.5px] h-[12px] bg-white ml-0.5 animate-pulse" />
    </span>
  );
};

/* ── Live Clock ── */
const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));
  useEffect(() => {
    const iv = setInterval(() => setTime(new Date().toLocaleTimeString('en-US', { hour12: false })), 1000);
    return () => clearInterval(iv);
  }, []);
  return <>{time}</>;
};

/* ── Space Engine ── */
const SpaceTrafficEngine = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <motion.div
               animate={{ x: ["0%", "90%", "90%", "0%", "0%"], y: ["20%", "20%", "80%", "80%", "20%"], rotate: [0, 45, 135, 225, 360] }}
               transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
               className="absolute w-8 h-8 flex items-center justify-center"
            >
                <div className="relative">
                   <div className="absolute inset-0 bg-white/20 blur-xl rounded-full animate-pulse" />
                   <Rocket size={12} className="text-white opacity-40 -rotate-45" />
                </div>
            </motion.div>
            {[1, 2, 3].map((star) => (
                <motion.div
                    key={star}
                    initial={{ x: "-20%", y: `${20 + star * 15}%`, opacity: 0 }}
                    animate={{ x: "120%", opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 3 + star, repeat: Infinity, delay: star * 4, ease: "easeIn" }}
                    className="absolute w-20 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
            ))}
            <div className="absolute inset-x-[30%] inset-y-[30%] bg-black/10 backdrop-blur-[4px] rounded-full z-[1]" />
        </div>
    );
};

/* ── Home Branding ── */
const TopLeftBranding = () => {
    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="absolute top-8 left-6 sm:top-10 sm:left-10 z-[60] group pointer-events-none"
        >
            <div className="relative pointer-events-auto">
                <div className="absolute -left-4 top-1 h-full w-[1.5px] bg-white/20 group-hover:h-[120%] transition-all duration-500" />
                <h2 className="font-headline font-black text-xl sm:text-2xl tracking-tighter text-white uppercase group-hover:ml-2 transition-all">
                    Harsh <span className="text-white/30 group-hover:text-white transition-colors">Aryan</span>
                </h2>
                <div className="flex items-center gap-3 mt-1.5 font-mono text-[8px] sm:text-[9px] text-white/40 tracking-[0.4em] uppercase">
                    <Clock />
                    <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity }} className="w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_8px_#fff]" />
                </div>
            </div>
        </motion.div>
    );
};

/* ── Home ── */
const Home = () => {
  const { config } = useConfig();

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 lg:px-12 relative tech-grid-complex overflow-hidden bg-[#050505]">
      <TopLeftBranding />

      <div className="max-w-[1700px] mx-auto w-full flex flex-col gap-10 relative z-10">

        {/* HERO SECTION */}
        <section className="w-full lg:h-[500px] flex flex-col">
           <div className="blueprint-panel flex-1 bg-blueprint relative group overflow-hidden border-white/10 shadow-2xl transition-all duration-700 hover:border-white/20">
              <SpaceTrafficEngine />
              <div className="absolute inset-0 border-[1px] border-white/5 pointer-events-none m-4" />
               <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-12 text-center pointer-events-none">
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="relative px-6 sm:px-12 py-8 sm:py-10 pointer-events-auto">
                    <div className="absolute top-0 left-0 w-8 h-8 sm:w-10 sm:h-10 border-t border-l border-white/30" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 border-b border-r border-white/30" />
                    <h1 className="font-headline font-black uppercase text-white leading-[0.8] tracking-tighter" style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)' }}>
                       {config.pageHeaders?.home?.line1 || 'DESIGNING'}<br/>
                       <span className="text-transparent px-2 sm:px-4 inline-block mt-4" style={{ WebkitTextStroke: '1px #ffffff' }}>
                          {config.pageHeaders?.home?.line2 || 'SYSTEMS'}
                       </span>
                    </h1>
                  </motion.div>

                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="max-w-xl mt-12 pointer-events-auto flex flex-col items-center gap-8">
                    <p className="font-mono text-[11px] text-white/40 tracking-[0.5em] leading-relaxed uppercase font-bold min-h-[40px]">
                       <Typewriter text={config.home?.missionDescription || 'Synthesizing high-fidelity architectures...'} delay={40} />
                    </p>

                    {/* ── CTA BUTTON [VIEW_PROJECTS] ── */}
                    <motion.button
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 1.2 }}
                       onClick={() => document.getElementById('system_modules')?.scrollIntoView({ behavior: 'smooth' })}
                       className="group flex items-center gap-4 px-10 py-4 border border-white/20 bg-white/[0.03] hover:bg-white hover:text-black text-white transition-all duration-500 font-mono font-black text-[10px] uppercase tracking-[0.4em]"
                    >
                       <Zap size={14} className="group-hover:scale-125 transition-transform" />
                       VIEW_PROJECTS
                       <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
                    </motion.button>
                 </motion.div>
              </div>
              <motion.div animate={{ y: ['-100%', '400%'] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent pointer-events-none z-[2]" />
           </div>
        </section>

        {/* UNIFIED HUB */}
        <div className="w-full">
           <div className="blueprint-panel bg-black/40 border-white/10 p-4 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden group">
              <div className="flex-1 w-full lg:max-w-4xl relative z-10">
                 <div className="flex items-center gap-4 mb-6">
                    <Radio size={14} className="text-white animate-pulse" />
                    <span className="text-[10px] font-mono tracking-[0.6em] text-white/40 uppercase font-black">MISSION_STATION_ALPHA</span>
                 </div>
                 <div className="text-[13px] font-mono text-white/60 leading-relaxed uppercase tracking-[0.2em] border-l-2 border-white/10 pl-6 lg:pl-10">
                    <Typewriter text={config.home?.welcomeText || ''} delay={25} />
                 </div>
              </div>

              {/* TACTICAL DOCK */}
              <div className="flex items-center gap-2 relative z-10">
                 {config.social?.links?.map((link, idx) => (
                   <motion.a
                     key={idx}
                     href={link.url}
                     target="_blank"
                     rel="noreferrer"
                     className="relative group/icon"
                   >
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1px] h-0 bg-white/20 group-hover/icon:h-10 transition-all duration-500" />
                      <div className="w-14 h-14 border border-white/10 flex items-center justify-center bg-black/80 group-hover/icon:border-white group-hover/icon:bg-white/[0.05] group-hover/icon:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/0 group-hover/icon:border-white transition-all" />
                         <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/0 group-hover/icon:border-white transition-all" />
                         <BrandIcon type={link.icon} size={18} colorFill={true} />
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/icon:opacity-100 transition-opacity">
                         <span className="text-[6px] font-mono text-white/40 tracking-widest uppercase">{link.platform}</span>
                      </div>
                   </motion.a>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </main>
  );
};

export default Home;
