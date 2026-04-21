import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

/* ─────────────────────────────────────────────────────────────
   All skill icons use devicons CDN — no package install needed
   https://devicons.dev/
───────────────────────────────────────────────────────────── */



const SkillChip = ({ skill, i }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-4 p-6 border border-white/5 bg-white/[0.01] hover:border-white/30 hover:bg-white/[0.04] transition-all duration-500 cursor-default group relative overflow-hidden"
    >
      {/* Scan sweep on hover */}
      <motion.div
        animate={hovered ? { x: ['-100%', '200%'] } : { x: '-100%' }}
        transition={{ duration: 0.6 }}
        className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
      />

      {/* Icon — full colour on hover, grayscale by default */}
      <div className={`w-12 h-12 flex items-center justify-center transition-all duration-500 ${hovered ? '' : 'grayscale opacity-40'}`}>
        <img
          src={skill.icon}
          alt={skill.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      <span className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">
        {skill.name}
      </span>
    </motion.div>
  );
};

const CategoryBlock = ({ cat, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: idx * 0.1 }}
    className="relative"
  >
    {/* Category Header */}
    <div className="flex items-center gap-6 mb-6">
      <div className="text-[7px] font-mono text-white/20 tracking-[0.5em] uppercase">{cat.tag}</div>
      <div className="flex-1 h-[1px] bg-white/5" />
      <h2 className="text-[11px] font-mono font-black text-white/50 uppercase tracking-[0.5em]">
        {cat.label}
      </h2>
    </div>

    {/* Skill Grid */}
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
      {(cat.skills || []).filter(s => !s.isHidden).map((skill, i) => (
        <SkillChip key={skill.name || i} skill={skill} i={i} />
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const { config } = useConfig();
  return (
  <main id="skills" className="pt-32 pb-40 px-6 lg:px-12 min-h-screen relative overflow-hidden bg-[#050505]">
    
    {/* Background grid */}
    <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

    <div className="max-w-[1700px] mx-auto w-full relative z-10">

      {/* ── HERO ── */}
      <header className="mb-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-[1px] bg-white/20" />
          <Terminal size={12} className="text-white/40" />
          <span className="text-[10px] font-mono text-white/40 tracking-[0.8em] uppercase">TECH_MATRIX_v9.0</span>
        </div>
        <div className="flex flex-col lg:flex-row items-end justify-between gap-6">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none">
            {config.pageHeaders?.skills?.line1 || 'SKILL_'}<span className="text-transparent" style={{ WebkitTextStroke: '1px #ffffff20' }}>{config.pageHeaders?.skills?.line2 || 'SET'}</span>
          </h1>
          <p className="text-[11px] font-mono text-white/30 tracking-[0.3em] uppercase max-w-md text-right italic">
            Full-stack capability registry. Hover to reveal active tech nodes.
          </p>
        </div>
        <div className="mt-8 h-[1px] w-full bg-white/5" />
      </header>

      {/* ── ALL SKILL CATEGORIES ── */}
      <div className="flex flex-col gap-20">
        {(config.skills || []).map((cat, idx) => (
          <CategoryBlock key={cat.id || idx} cat={cat} idx={idx} />
        ))}
      </div>

    </div>
  </main>
  );
};

export default Skills;
