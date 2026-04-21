import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfig } from '../context/ConfigContext';
import { getDriveImageUrl } from '../utils/driveHelper';
import { Globe, Database, ShieldCheck, ExternalLink, Box, Activity, Terminal, ChevronRight, Code2, Scan, Eye } from 'lucide-react';

/* ── Final Typewriter Engine ── */
const DataTypist = ({ text, delay = 20 }) => {
  const [out, setOut] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
        setOut(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [text]);
  return <span className="opacity-80">{out}</span>;
};

const ProjectCard = ({ proj, index }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="blueprint-panel group relative flex flex-col bg-black border border-white/5 p-6 sm:p-10 transition-all duration-500 hover:border-white hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]"
    >
      <div className="absolute top-4 right-8 flex items-center gap-3">
         <motion.div 
            animate={{ opacity: [0.2, 1, 0.2] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-[#00ff8d] rounded-full shadow-[0_0_8px_#00ff8d]"
         />
         <span className="text-[7px] font-mono text-white/20 tracking-[0.5em] uppercase font-black">STREAM_ACTIVE</span>
      </div>

      <div className="flex flex-col h-full pl-6">
        <div className="mb-10">
           <div className="flex items-center gap-2 font-mono text-[8px] text-white/20 tracking-[0.4em] uppercase mb-1">
              <Terminal size={10} /> // ID_MOD_0{index + 1}
           </div>
            <h3 className="font-headline text-2xl sm:text-4xl text-white font-black tracking-tighter uppercase leading-none">
              {proj.title}
           </h3>
        </div>

        <div className="flex-1 mt-6">
           <ul className="space-y-6 list-none font-mono text-[11px] leading-relaxed text-white/40 tracking-wider uppercase italic">
              {(Array.isArray(proj.description) ? proj.description : [proj.description]).map((point, i) => (
                 <li key={i} className="flex gap-4 group/item items-start">
                    <motion.span whileHover={{ x: 5 }} className="text-white opacity-20 group-hover/item:opacity-100 transition-all cursor-default">
                       <ChevronRight size={14} />
                    </motion.span>
                    <span className="group-hover/item:text-white transition-colors duration-500">{point}</span>
                 </li>
              ))}
           </ul>
        </div>

        <div className="flex flex-wrap gap-2 my-10 py-6 border-y border-white/5">
           {(proj.tags || []).map((tag, i) => (
              <span key={i} className="text-[7px] font-mono text-white/40 uppercase tracking-widest px-3 py-1 bg-white/[0.03] border border-white/10 group-hover:border-white/30 transition-colors">
                 {tag}
              </span>
           ))}
        </div>

        <div className="flex gap-4">
          <a href={proj.github || "#"} className="flex-1 blueprint-panel px-6 py-4 bg-white/[0.03] text-white/40 hover:text-black hover:bg-white transition-all duration-500 flex items-center justify-center gap-4 font-mono text-[9px] uppercase tracking-[0.3em] font-black group/git">
             <Code2 size={14} /> REPOSITORY
          </a>
          {proj.link && (
            <a href={proj.link} className="blueprint-panel px-8 border border-white/10 text-white/40 hover:text-white hover:border-white flex items-center justify-center transition-all group/live shadow-[inset_0_0_0_0_white] hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]">
               <Globe size={18} className="group-hover/live:rotate-12 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const CertificateCard = ({ cred, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    className="blueprint-panel group relative bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all hover:border-white/20"
  >
     {/* ── IMAGE SECTION ── */}
     <div className="h-[200px] relative overflow-hidden bg-black border-b border-white/10">
        <img 
          src={getDriveImageUrl(cred.image) || "https://images.unsplash.com/photo-1546410531-bb4caa1b424d?auto=format&fit=crop&q=80"} 
          alt={cred.name} 
          className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
        
        {/* Section Label */}
        <div className="absolute top-4 right-6 text-[7px] font-mono text-white/30 tracking-[0.4em] uppercase z-20 bg-black/40 px-2 py-1">CERT_SYSTEM_ARCHIV_REG</div>
     </div>

     <div className="p-8">
        <div className="flex justify-between items-start mb-6">
           <ShieldCheck size={20} className="text-[#00ff8d] opacity-40 group-hover:opacity-100 transition-opacity" />
           <div className="text-right">
              <div className="font-mono text-[7px] text-white/20 tracking-[0.4em] uppercase mb-1">VER_NODE</div>
              <div className="font-mono text-[9px] text-[#00ff8d] font-black tracking-widest uppercase">STABLE_v1</div>
           </div>
        </div>
        
        <div className="mb-10">
           <h3 className="font-headline text-2xl text-white font-black tracking-tighter uppercase mb-2 leading-none group-hover:text-white transition-colors">{cred.name}</h3>
           <p className="font-mono text-[8px] text-white/30 tracking-[0.3em] uppercase italic">
              {cred.issuer} // {cred.date}
           </p>
        </div>

        {/* ── ACTION NODES (Visibility Fix) ── */}
        <div className="flex gap-3 pt-6 border-t border-white/5">
           <a href={cred.image || "#"} target="_blank" rel="noreferrer" className="flex-1 border border-white/10 py-3 flex items-center justify-center gap-3 bg-white/[0.03] text-white hover:bg-white hover:text-black transition-all text-[8px] font-mono uppercase tracking-[0.2em] font-black">
              <Eye size={12} /> REVIEW
           </a>
           <a href={cred.link || "#"} target="_blank" rel="noreferrer" className="flex-1 border border-white/40 py-3 flex items-center justify-center gap-3 bg-white text-black hover:bg-white/80 transition-all text-[8px] font-mono uppercase tracking-[0.2em] font-black">
              <ExternalLink size={12} /> CREDENTIALS
           </a>
        </div>
     </div>
  </motion.div>
);

const Projects = () => {
  const { config } = useConfig();
  const [activeTab, setActiveTab] = useState('projects');
  const projects = config.projects || [];
  const certificates = config.certificates || [
    { id: 1, name: "Advanced Neural Computing", issuer: "DataNode Academy", date: "2023.10", link: "#", image: null },
    { id: 2, name: "Cybersecurity Protocol S", issuer: "NetShield Org", date: "2023.05", link: "#", image: null },
    { id: 3, name: "Full Stack Systems Eng", issuer: "DevRegistry", date: "2022.12", link: "#", image: null }
  ];

  return (
    <main id="artifacts" className="pt-32 pb-40 px-6 lg:px-12 min-h-screen relative overflow-hidden bg-[#050505]">
      
      {/* Structural Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:200px_200px] pointer-events-none" />

      <div className="max-w-[1700px] mx-auto w-full relative z-10">
        <header className="mb-24 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10">
           <div className="max-w-4xl text-center lg:text-left">

              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                 {config.pageHeaders?.projects?.line1 || 'ARTIFACT_'}<span className="text-white/20">{config.pageHeaders?.projects?.line2 || 'REGISTRY'}</span>
              </h1>
           </div>

            <div className="flex bg-white/[0.02] border border-white/10 p-1 w-full sm:w-auto">
              {[
                { id: 'projects', label: 'PROJECTS', icon: Database },
                { id: 'certificates', label: 'CERTIFICATES', icon: ShieldCheck }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 sm:flex-none px-6 sm:px-10 py-4 sm:py-5 flex items-center justify-center gap-3 transition-all duration-300 relative ${
                    activeTab === tab.id ? 'bg-white text-black font-black' : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  <tab.icon size={12} className="sm:size-[14px]" />
                  <span className="font-mono text-[8.5px] sm:text-[10px] uppercase tracking-widest font-bold">{tab.label}</span>
                </button>
              ))}
            </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'projects' ? (
            <motion.section key="projects" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {projects.map((proj, idx) => (
                <ProjectCard key={proj.id} proj={proj} index={idx} />
              ))}
            </motion.section>
          ) : (
            <motion.section key="certificates" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {certificates.map((cred, idx) => (
                <CertificateCard key={cred.id} cred={cred} index={idx} />
              ))}
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <motion.div animate={{ x: ['-200%', '200%'] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} className="fixed top-0 bottom-0 w-px bg-white/10 z-0 pointer-events-none" />
    </main>
  );
};

export default Projects;
