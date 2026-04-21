import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfig } from '../context/ConfigContext';
import { TechIcon } from '../components/TechIcon';
import { Layers, Activity, Cpu } from 'lucide-react';

// ── HEXAGON CONSTANTS ──────────────────────────────────────────────────
const HEX_WIDTH = 130;
const HEX_HEIGHT = 145;

// ── HEXAGON NODE ───────────────────────────────────────────────────────
const HexNode = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const amber = '#FFB300';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.02, duration: 0.5 }}
      className="relative cursor-crosshair group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: HEX_WIDTH,
        height: HEX_HEIGHT,
        margin: '0 -10px -25px -10px' 
      }}
    >
      <div className="w-full h-full relative flex items-center justify-center">
        {/* Main Body */}
        <div 
          className="w-[90%] h-[90%] relative transition-all duration-300 z-10"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: isHovered ? 'rgba(255, 179, 0, 0.08)' : 'rgba(255, 255, 255, 0.02)',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {/* Inner Core */}
          <div 
            className="absolute inset-[1px] bg-[#030508] opacity-95"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          />

          {/* Border SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-current" viewBox="0 0 100 100">
             <path 
                d="M50 2 L98 26 L98 74 L50 98 L2 74 L2 26 Z" 
                fill="none" 
                strokeWidth="1.5"
                className={`transition-colors duration-500 ${isHovered ? 'text-[var(--cmd-yellow)]' : 'text-white/5'}`}
                style={{ filter: isHovered ? 'drop-shadow(0 0 8px #FFB300)' : 'none' }}
             />
          </svg>

          {/* Icon & Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 z-30">
            <div className={`transition-all duration-500 ${isHovered ? 'scale-110 text-[var(--cmd-yellow)]' : 'text-white/20'}`}>
               <TechIcon name={skill.name} size={isHovered ? 36 : 30} />
            </div>
            <div className={`mt-2 font-mono text-[7px] tracking-[0.3em] uppercase transition-colors ${isHovered ? 'text-white/90' : 'text-white/10'}`}>
               {skill.name}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Analytics = () => {
  const { config } = useConfig();
  const skills = config.skills_matrix || [];

  return (
    <main className="pt-28 pb-32 px-4 md:px-8 min-h-screen relative tech-grid-complex">
      <div className="max-w-[1500px] mx-auto w-full relative z-20">
        
        {/* Header (Architectural Style) */}
        <header className="max-w-[1000px] mx-auto mb-20 w-full animate-fade-in text-center flex flex-col items-center">
          <div className="flex items-center gap-4 mb-3">
             <div className="w-2 h-2 bg-[var(--cmd-yellow)] rotate-45 animate-pulse" />
             <p className="font-mono text-[var(--cmd-yellow)] text-[9px] uppercase tracking-[0.5em]">
               NEURAL_GROWTH_METRICS
             </p>
             <div className="w-2 h-2 bg-[var(--cmd-yellow)] rotate-45 animate-pulse" />
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none mb-6">
            {config.pageHeaders?.analytics?.title || 'SKILLS'}
          </h1>
          <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-white/10 to-transparent relative">
             <div className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[var(--cmd-yellow)]/30 rotate-45" />
          </div>
        </header>

        {/* The Nexus Field */}
        <div className="blueprint-panel p-12 lg:p-20 relative bg-blueprint overflow-hidden">
           {/* Architectural Decor */}
           <div className="absolute top-4 right-4 flex items-center gap-2 opacity-20">
              <span className="font-mono text-[7px] text-white tracking-[0.4em] uppercase">Status: ACTIVE_LOGIC</span>
              <div className="w-2 h-2 bg-[var(--cmd-yellow)] rounded-full animate-pulse" />
           </div>
           
           <div className="flex flex-wrap justify-center items-center max-w-5xl mx-auto gap-x-2 gap-y-12">
              {skills.map((skill, i) => (
                <HexNode 
                  key={i} 
                  skill={skill} 
                  index={i} 
                />
              ))}
           </div>

           {/* Perspective Markers */}
           <div className="absolute bottom-10 left-10 opacity-10 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                 <Cpu size={14} className="text-white" />
                 <span className="font-mono text-[8px] tracking-[0.5em] text-white">SYSTEM_ID: OMEGA_01</span>
              </div>
           </div>
        </div>

        {/* Stats Summary Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="blueprint-panel p-6 bg-white/[0.01]">
              <div className="text-[7px] font-mono text-[var(--cmd-yellow)] opacity-50 uppercase tracking-[0.4em] mb-2">Cognition_Rating</div>
              <div className="text-2xl font-headline text-white font-black tracking-widest">98.4%</div>
           </div>
           <div className="blueprint-panel p-6 bg-white/[0.01]">
              <div className="text-[7px] font-mono text-[var(--cmd-yellow)] opacity-50 uppercase tracking-[0.4em] mb-2">Ingestion_Cycles</div>
              <div className="text-2xl font-headline text-white font-black tracking-widest">1,402+</div>
           </div>
           <div className="blueprint-panel p-6 bg-white/[0.01]">
              <div className="text-[7px] font-mono text-[var(--cmd-yellow)] opacity-50 uppercase tracking-[0.4em] mb-2">Aesthetic_Logic</div>
              <div className="text-2xl font-headline text-white font-black tracking-widest">OPTIMIZED</div>
           </div>
        </div>

      </div>
    </main>
  );
};

export default Analytics;
