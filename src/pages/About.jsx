import React, { useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';
import { motion } from 'framer-motion';
import { getDriveImageUrl } from '../utils/driveHelper';
import { Shield, Activity, Cpu } from 'lucide-react';

/* ── Scroll-Triggered Typewriter Engine ── */
const DataTypist = ({ text, delay = 18 }) => {
  const [out, setOut] = useState('');
  const [started, setStarted] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setOut(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [started, text, delay]);

  const done = started && out.length === text.length;
  return (
    <span ref={ref} className="opacity-90">
      {out}
      <span className={`inline-block w-[1px] h-[10px] bg-white/60 ml-0.5 ${done ? 'opacity-0' : 'animate-pulse'}`} />
    </span>
  );
};

const About = () => {
  const { config } = useConfig();
  const photoUrl = getDriveImageUrl(config.profile?.image);
  const philosophy = config.profile?.philosophy || '';
  const thought = config.profile?.thought || 'Architecting logic at the edge of chaos.';
  const name = config.profile?.name || 'HARSH ARYAN';

  return (
    <main id="profile" className="pt-32 pb-40 px-6 lg:px-12 min-h-screen relative overflow-hidden bg-[#050505]">

      {/* ── Background Grid ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-[1700px] mx-auto w-full relative z-10 flex flex-col gap-10">

        {/* ── MAIN HERO HEADER [HERO_MAIN] ── */}
            <section className="w-full blueprint-panel p-6 sm:p-10 lg:p-16 bg-white/[0.01] border-white/5 relative group">
           <div className="absolute top-4 right-6 text-[8px] font-mono text-white/20 tracking-[0.5em] uppercase">SECTION_ID: [HERO_MAIN]</div>

           <div className="flex flex-col gap-8">
               <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none text-center lg:text-left">
                  {config.pageHeaders?.about?.line1 || 'DATA_DRIVEN'}<br/>{config.pageHeaders?.about?.line2 || 'IDENTITY'}
               </h1>

              {/* SUB HERO [SUB_HERO_V1] */}
              <div className="flex flex-col lg:flex-row items-center gap-6 pt-8 border-t border-white/5">
                 <div className="flex items-center gap-4 text-white/40">
                    <div className="w-10 h-[1px] bg-white/20" />
                    <span className="text-[10px] font-mono tracking-[0.4em] uppercase font-bold text-white">OPERATIONAL_CORE</span>
                 </div>
                 <p className="text-[11px] font-mono text-white/30 tracking-widest uppercase italic max-w-xl text-center lg:text-left">
                    "Architecting future systems through neural logic and high-performance data synthesis."
                 </p>
                 <div className="lg:ml-auto flex items-center gap-6">
                    <div className="flex flex-col items-end">
                       <span className="text-[8px] font-mono text-white/10 uppercase">Node_Status</span>
                       <span className="text-[10px] font-mono text-[#00ff8d] tracking-widest">ACTIVE_v9</span>
                    </div>
                    <Cpu size={20} className="text-white/20" />
                 </div>
              </div>
           </div>
        </section>

        {/* ── DOSSIER GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">

           {/* 1. PERSONNEL IDENTIFIER [IDENT_CARD] */}
           <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="lg:col-span-3 flex flex-col gap-6">
              <div className="relative group p-[1px] bg-white/10 border border-white/5">
                 <div className="absolute top-2 right-4 text-[7px] font-mono text-white/30 tracking-widest uppercase z-20">IDENT_CARD</div>
                 <div className="relative bg-black p-2 border border-white/10 overflow-hidden">
                    <div className="relative w-full aspect-[3/4] overflow-hidden grayscale brightness-50 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-1000">
                       <img src={photoUrl} alt="" className="w-full h-full object-cover" />
                       <motion.div animate={{ y: ['-100%', '300%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-white/5 to-transparent z-20 pointer-events-none" />
                    </div>
                 </div>
              </div>

              <div className="blueprint-panel p-6 bg-white/[0.02] border-white/10 relative">
                 <div className="absolute top-2 right-4 text-[7px] font-mono text-white/20 uppercase tracking-widest">[ID_CORE]</div>
                 <h2 className="text-3xl font-headline font-black text-white uppercase tracking-tighter leading-none mb-4">{name}</h2>
                 <div className="flex flex-wrap gap-2 uppercase font-black text-[8px]">
                    {['CEO', 'FOUNDER', 'ARCHITECT'].map((r) => (
                       <span key={r} className="px-2 py-1 border border-white/20 text-white/40 tracking-widest">{r}</span>
                    ))}
                 </div>
              </div>
           </motion.div>

           {/* 2. CORE PROCESSING FEED [SYSTEM_NARRATIVE] */}
           <div className="lg:col-span-6">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="blueprint-panel bg-white/[0.01] border-white/5 p-10 h-full flex flex-col relative">
                 <div className="absolute top-4 right-8 text-[7px] font-mono text-white/20 tracking-[0.5em] uppercase">[SYSTEM_NARRATIVE]</div>

                 {/* Typing text paragraphs */}
                 <div className="text-xs md:text-sm font-mono leading-loose text-white/50 tracking-wider uppercase italic space-y-10 py-6 flex-1">
                    {philosophy.split('\n\n').map((para, i) => (
                       <p key={i} className="border-l border-white/10 pl-8">
                          <DataTypist text={para} delay={18} />
                       </p>
                    ))}
                 </div>


              </motion.div>
           </div>

           {/* 3. ETHOS / QUOTE MODULE [VISION_DATA] */}
           <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="lg:col-span-3 flex flex-col gap-6">
              <div className="blueprint-panel bg-black border-l-4 border-white/40 p-10 flex-1 flex flex-col justify-between relative">
                 <div className="absolute top-4 right-6 text-[7px] font-mono text-white/30 tracking-widest uppercase">[VISION_DATA]</div>

                 {/* Quote Block with typing effect */}
                 <div className="flex flex-col gap-3 pt-4">
                    <span className="text-5xl font-headline text-white/10 leading-none select-none">&ldquo;</span>
                    <p className="text-lg md:text-xl font-headline font-black italic text-white leading-snug tracking-tight">
                       <DataTypist text={thought} delay={35} />
                    </p>
                    <span className="text-5xl font-headline text-white/10 leading-none self-end select-none">&rdquo;</span>
                 </div>

                 {/* Author Signature */}
                 <div className="border-t border-white/10 pt-5 text-[8px] font-mono text-white/30 tracking-[0.4em] uppercase">
                    &mdash; {name}
                 </div>
              </div>

              {/* Executive Status Card [EXEC_CARD] */}
              <div className="relative bg-white/[0.02] border border-white/10 px-6 py-5 flex items-center justify-between group hover:border-white/30 transition-all">
                 <div className="absolute top-2 right-4 text-[6px] font-mono text-white/10 tracking-[0.4em] uppercase">[EXEC_STATUS]</div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">Current Position</span>
                    <span className="text-[13px] font-headline font-black text-white uppercase tracking-tight leading-none">
                       {config.profile?.position || 'POSITION_UNSET'}
                    </span>
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest mt-1">
                       @ {config.profile?.company || 'COMPANY_UNSET'}
                    </span>
                 </div>
                 <motion.div
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-[#00ff8d] shadow-[0_0_8px_#00ff8d]"
                 />
              </div>

           </motion.div>

        </div>
      </div>
    </main>
  );
};

export default About;
