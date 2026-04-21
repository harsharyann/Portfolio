import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { motion } from 'framer-motion';
import { Zap, MapPin, Calendar, Terminal, Activity } from 'lucide-react';

const ExperienceNode = ({ exp, index }) => (
  <motion.div 
    initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    className={`relative mb-16 sm:mb-24 flex flex-col ${index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} group`}
  >
    {/* Node Connector (Electric Pulse Point) */}
    <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#fff]"
        />
    </div>

    {/* Experience Card */}
    <div className="w-full md:w-[45%] blueprint-panel p-8 bg-white/[0.01] border-white/5 relative group hover:border-white/20 transition-all duration-500 overflow-hidden">
       {/* Layout Name Tag */}
       <div className={`absolute top-2 ${index % 2 === 0 ? 'right-4' : 'left-4'} text-[7px] font-mono text-white/20 uppercase tracking-[0.4em]`}>
          [EXP_NODE_0{index + 1}]
       </div>

       {/* Lightning Sparkle Corner (Thematic Fill) */}
       <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.03] group-hover:opacity-10 transition-opacity">
          <Zap size={60} />
       </div>

       {/* Header: Post & Date */}
       <div className="flex flex-col gap-1 mb-6">
          <div className="flex items-center gap-3 mb-2 text-white/40 font-mono text-[9px] uppercase tracking-widest">
             <Calendar size={12} />
             <span>{exp.period || "Current"}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-headline font-black text-white uppercase tracking-tighter leading-none">
             {exp.title}
          </h3>
          <div className="flex items-center gap-2 mt-2">
             <MapPin size={12} className="text-white/20" />
             <span className="text-[11px] font-mono font-bold text-white/60 tracking-widest uppercase">{exp.company}</span>
          </div>
       </div>

       {/* Description (Bullet Points) */}
       <ul className={`space-y-4 font-mono text-[11px] leading-relaxed text-white/40 uppercase tracking-wider italic border-t border-white/5 pt-6 list-none`}>
          {(Array.isArray(exp.description) ? exp.description : [exp.description]).map((point, i) => (
             <li key={i} className="flex gap-4 group/item items-start">
                <span className="text-white opacity-20 mt-1 min-w-[20px]">▸</span>
                <span className="group-hover/item:text-white/80 transition-colors">{point}</span>
             </li>
          ))}
       </ul>
    </div>
  </motion.div>
);

const LightningWire = () => (
    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10 z-0">
        {/* The Lightning Core */}
        <motion.div 
            animate={{ 
                height: ["0%", "100%"],
                opacity: [0.1, 0.5, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 w-full bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        />
        
        {/* Thunderstorm Pulses */}
        {[...Array(5)].map((_, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: [0, 1, 0], scaleY: [0, 1, 0] }}
                transition={{ duration: 0.1, delay: Math.random() * 5, repeat: Infinity, repeatDelay: Math.random() * 8 }}
                className="absolute w-[2px] bg-white blur-[1px]"
                style={{ top: `${i * 25}%`, height: '20%', left: '-1px' }}
            />
        ))}
    </div>
);

const Experience = () => {
  const { config } = useConfig();
  const experiences = config.experience || [];

  return (
    <main id="experience" className="pt-32 pb-40 px-6 lg:px-12 min-h-screen relative overflow-hidden bg-[#050505]">
      
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        
        {/* ── EXP HERO ── */}
        <header className="mb-20 sm:mb-32 relative text-center px-4">

           <div className="flex items-center justify-center gap-4 mb-4">
              <Zap size={14} className="text-white/40 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-mono text-white/40 tracking-[0.4em] sm:tracking-[0.8em] uppercase font-bold text-white">CHRONICLE_01</span>
           </div>
           <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
              {config.pageHeaders?.experience?.line1 || 'OPERATIONAL_'}<span className="text-white/20">{config.pageHeaders?.experience?.line2 || 'ARC'}</span>
           </h1>
           <p className="text-[10px] sm:text-[12px] font-mono text-white/30 tracking-[0.2em] sm:tracking-[0.4em] uppercase max-w-xl mx-auto italic">
              Tracing the signal through structural iterations and technological evolution.
           </p>
        </header>

        {/* ── HIGH-VOLTAGE TIMELINE ── */}
        <div className="relative">
           <LightningWire />
           <div className="flex flex-col">
              {experiences.map((exp, index) => (
                <ExperienceNode key={index} exp={exp} index={index} />
              ))}
           </div>
        </div>

        {/* ── FOOTER STATUS ── */}
        <div className="mt-20 border-t border-white/5 pt-12 flex flex-col items-center gap-6">
           <div className="flex items-center gap-8">
              <Activity className="text-white/20 animate-pulse" size={20} />
              <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">TIMELINE_STATUS: SECURE_HISTORY</div>
           </div>
        </div>

      </div>

    </main>
  );
};

export default Experience;
