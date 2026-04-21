import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { useAuth } from '../context/AuthContext';
import {
  Lock, LogOut, Terminal, Activity, Shield, User, Briefcase,
  FolderOpen, Award, Link, Monitor, ChevronDown, ChevronUp,
  Plus, Trash2, Save, RefreshCw, Eye, EyeOff, Layers, Code, Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── TECHNICAL ICON LIBRARY ─────────────────────────── */
const ICON_LIBRARY = [
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Next.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'Django', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg' },
  { name: 'MongoDB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'Tailwind', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'GitHub', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
  { name: 'Figma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
  { name: 'VS Code', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
  { name: 'Vercel', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },
  { name: 'Firebase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
  { name: 'C++', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'AWS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'Three.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg' },
  { name: 'Redux', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg' },
];

/* ─── Reusable Field Components ─────────────────────────── */
const Field = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-[8px] uppercase tracking-[0.5em] text-white/20 block font-mono">// {label}</label>
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder, type = 'text' }) => (
  <input
    type={type}
    value={value || ''}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder || ''}
    className="w-full bg-black/40 border border-white/10 text-white font-mono text-sm px-5 py-4 focus:outline-none focus:border-white/30 tracking-wider transition-all placeholder:text-white/10"
  />
);

const Select = ({ value, onChange, options }) => (
  <select
    value={value || ''}
    onChange={e => onChange(e.target.value)}
    className="w-full bg-black/40 border border-white/10 text-white font-mono text-sm px-5 py-4 focus:outline-none focus:border-white/30 tracking-wider transition-all"
  >
    <option value="" disabled className="text-white/20">Select Option</option>
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

const Textarea = ({ value, onChange, placeholder, rows = 4 }) => (
  <textarea
    rows={rows}
    value={value || ''}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder || ''}
    className="w-full bg-black/40 border border-white/10 text-white font-mono text-sm px-5 py-4 focus:outline-none focus:border-white/30 tracking-wider transition-all placeholder:text-white/10 resize-y"
  />
);

const SaveBtn = ({ saved, label = 'SAVE_CHANGES' }) => (
  <button type="submit"
    className="w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white/80 transition-all flex items-center justify-center gap-3 font-mono">
    <Save size={13} />
    {saved ? '✓ DATA_SYNC_COMPLETE' : label}
  </button>
);

/* ─── Item Editors ────────────────────────────────────────── */
const ExpEditor = ({ exp, onChange, onDelete }) => (
  <div className="border border-white/5 p-6 relative space-y-4 bg-black/20">
    <button type="button" onClick={onDelete} className="absolute top-4 right-4 text-white/10 hover:text-red-500 transition-colors">
      <Trash2 size={14} />
    </button>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Assignment_Node">
        <Input value={exp.title} onChange={v => onChange({ ...exp, title: v })} placeholder="Job Title..." />
      </Field>
      <Field label="Deployment_Nexus">
        <Input value={exp.company} onChange={v => onChange({ ...exp, company: v })} placeholder="Company..." />
      </Field>
    </div>
    <Field label="Operational_Timeline">
      <Input value={exp.period} onChange={v => onChange({ ...exp, period: v })} placeholder="2022 - PRESENT" />
    </Field>
    <Field label="Directives (one per line)">
      <Textarea rows={4} value={(exp.description || []).join('\n')} onChange={v => onChange({ ...exp, description: v.split('\n') })} />
    </Field>
  </div>
);

const ProjEditor = ({ proj, onChange, onDelete }) => (
  <div className="border border-white/5 p-6 relative space-y-4 bg-black/20">
    <button type="button" onClick={onDelete} className="absolute top-4 right-4 text-white/10 hover:text-red-500 transition-colors">
      <Trash2 size={14} />
    </button>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Artifact_Title">
        <Input value={proj.title} onChange={v => onChange({ ...proj, title: v })} />
      </Field>
      <Field label="Classification">
        <Input value={proj.category} onChange={v => onChange({ ...proj, category: v })} />
      </Field>
    </div>
    <Field label="Payload_URI (Image)">
      <Input value={proj.image} onChange={v => onChange({ ...proj, image: v })} />
    </Field>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="GitHub_Sync">
        <Input value={proj.github} onChange={v => onChange({ ...proj, github: v })} />
      </Field>
      <Field label="Live_Uplink">
        <Input value={proj.link} onChange={v => onChange({ ...proj, link: v })} />
      </Field>
    </div>
  </div>
);

const SkillCatEditor = ({ cat, onChange, onDelete }) => (
  <div className="border border-white/5 p-6 relative space-y-4 bg-black/20">
    <button type="button" onClick={onDelete} className="absolute top-4 right-4 text-white/10 hover:text-red-500 transition-colors">
      <Trash2 size={14} />
    </button>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Module_Label">
        <Input value={cat.label} onChange={v => onChange({ ...cat, label: v })} />
      </Field>
      <Field label="Tactical_Tag">
        <Input value={cat.tag} onChange={v => onChange({ ...cat, tag: v })} />
      </Field>
    </div>
    <div className="space-y-2 mt-4">
       <div className="text-[8px] uppercase tracking-widest text-white/20 mb-2">Attached_Nodes</div>
       {(cat.skills || []).map((skill, i) => (
         <div key={i} className="flex gap-2 items-center bg-black/40 border border-white/5 p-3">
           <div className="flex-1">
              <input value={skill.name} onChange={e => {
                const n = [...cat.skills]; n[i].name = e.target.value; onChange({...cat, skills: n});
              }} className="w-full bg-transparent border-b border-white/10 p-2 text-[10px] text-white font-mono focus:border-white transition-all outline-none" placeholder="Skill Name" />
           </div>
           
           <div className="flex-[2] flex items-center gap-2">
              <select 
                value={ICON_LIBRARY.find(ic => ic.url === skill.icon)?.url || 'CUSTOM'} 
                onChange={e => {
                   const n = [...cat.skills];
                   if (e.target.value === 'CUSTOM') {
                      // Keep it as is or empty
                   } else {
                      n[i].icon = e.target.value;
                      if (!n[i].name) n[i].name = ICON_LIBRARY.find(ic => ic.url === e.target.value)?.name || '';
                   }
                   onChange({...cat, skills: n});
                }}
                className="bg-black border border-white/10 text-[9px] text-white/60 p-2 font-mono"
              >
                <option value="CUSTOM">-- Select Icon --</option>
                {ICON_LIBRARY.map(lib => (
                  <option key={lib.url} value={lib.url}>{lib.name}</option>
                ))}
              </select>
              <input value={skill.icon} onChange={e => {
                const n = [...cat.skills]; n[i].icon = e.target.value; onChange({...cat, skills: n});
              }} className="flex-1 bg-transparent border-b border-white/10 p-2 text-[9px] text-white/40 font-mono outline-none" placeholder="Manual Icon URL..." />
           </div>

           <button onClick={() => {
             const n = cat.skills.filter((_, j) => j !== i); onChange({...cat, skills: n});
           }} className="p-2 text-white/10 hover:text-red-400 transition-colors"><Trash2 size={12} /></button>
         </div>
       ))}
       <button onClick={() => onChange({...cat, skills: [...(cat.skills||[]), {name:'', icon:''}]})} className="w-full py-3 border border-dashed border-white/5 text-[9px] text-white/20 hover:text-white hover:border-white/10 transition-all uppercase tracking-widest mt-2 flex items-center justify-center gap-2">
         <Plus size={10} /> Add_Node_Dependency
       </button>
    </div>
  </div>
);

/* ─── Dashboard Component ─────────────────────────────────── */
const Dashboard = () => {
  const { config, updateConfig, THEME_PRESETS } = useConfig();
  const { isAuthenticated, login, logout } = useAuth();
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [saved, setSaved] = useState({});
  const [activeTab, setActiveTab] = useState('INTERFACE');

  const flash = (key) => { setSaved(s => ({ ...s, [key]: true })); setTimeout(() => setSaved(s => ({ ...s, [key]: false })), 2000); };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#030303] tech-grid-complex">
        <div className="w-full max-w-sm glass-panel-tactical p-10 space-y-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <Lock size={32} className="mx-auto text-white animate-pulse shadow-[0_0_20px_white]" />
          <h1 className="font-headline text-2xl tracking-[0.4em] font-black text-white uppercase italic">Command_Handshake</h1>
          <form onSubmit={(e) => { e.preventDefault(); if(login(password)) setAuthError(false); else setAuthError(true); }} className="space-y-6 text-left">
            <Field label="Access_Token">
              <input 
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                className={`w-full bg-black/40 border-b-2 ${authError ? 'border-red-500' : 'border-white/10'} py-4 px-2 font-mono text-xl tracking-[0.5em] text-white outline-none focus:border-white transition-all`}
                autoFocus
              />
            </Field>
            <button type="submit" className="w-full py-5 bg-white text-black font-headline font-black text-[11px] tracking-[0.4em] uppercase hover:bg-[var(--cmd-glow)] transition-all">
              EXECUTE_UPLINK
            </button>
          </form>
          <p className="text-[10px] text-white/5 font-mono">ROOT_LEVEL_AUTHORITY_REQUIRED</p>
        </div>
      </div>
    );
  }

  // ── LOCAL DRAFT STATE ──
  const [profile, setProfile] = useState({ ...config.profile });
  const [home, setHome] = useState({ ...config.home });
  const [pageHeaders, setPageHeaders] = useState({ ...config.pageHeaders });
  const [experience, setExperience] = useState([...(config.experience || [])]);
  const [projects, setProjects] = useState([...(config.projects || [])]);
  const [social, setSocial] = useState([...(config.social?.links || [])]);
  const [skills, setSkills] = useState([...(config.skills || [])]);
  const [theme, setTheme] = useState(config.theme || 'AGENT_SPECTER');

  const save = (key, data) => { updateConfig({ [key]: data }); flash(key); };

  const tabs = [
    { id: 'INTERFACE', label: 'Site_Headers', icon: Monitor },
    { id: 'IDENTITY', label: 'User_Profile', icon: User },
    { id: 'TIMELINE', label: 'Exp_Matrix', icon: Layers },
    { id: 'REGISTRY', label: 'Proj_Vault', icon: Code },
    { id: 'MODULES', label: 'Skill_Nodes', icon: Terminal },
    { id: 'SIGNAL', label: 'Comms_Uplink', icon: Share2 },
    { id: 'THEME', label: 'Visual_Core', icon: Activity }
  ];

  return (
    <div className="min-h-screen flex flex-col font-mono bg-[var(--cmd-navy)] text-white">
      
      {/* ── PERSISTENT HEADER ── */}
      <header className="sticky top-0 z-50 bg-[var(--cmd-navy)]/90 backdrop-blur-xl border-b border-[var(--cmd-border)] px-6 lg:px-10 py-5 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-8 h-8 border border-white/20 flex items-center justify-center">
               <Shield size={16} className="text-[var(--cmd-glow)] animate-pulse" />
            </div>
            <div>
               <h2 className="text-sm font-black tracking-widest uppercase">Agent_Control_Nexus</h2>
               <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-green-500 animate-ping" />
                  <span className="text-[8px] text-white/40 tracking-[0.3em] uppercase">Status: Connection_Active</span>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-4">
            <button onClick={() => { if(window.confirm('Wipe all local data?')) { localStorage.clear(); window.location.reload(); } }} className="text-[9px] text-white/20 hover:text-red-400 uppercase tracking-widest transition-all">Clear_Buffer</button>
            <button onClick={logout} className="px-6 py-2 bg-white/5 border border-white/10 hover:border-white text-[10px] font-black uppercase tracking-widest transition-all">Logout</button>
         </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-8 p-6 lg:p-10 max-w-[1800px] mx-auto w-full">
        
        {/* ── SIDEBAR NAVIGATION ── */}
        <nav className="lg:w-72 space-y-2 shrink-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 border transition-all text-left relative overflow-hidden group ${
                activeTab === tab.id 
                ? 'bg-white/5 border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                : 'border-transparent text-white/30 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              {activeTab === tab.id && <motion.div layoutId="nav-glow" className="absolute inset-0 bg-gradient-to-r from-[var(--cmd-glow)]/10 to-transparent pointer-events-none" />}
              <tab.icon size={14} className={activeTab === tab.id ? 'text-[var(--cmd-glow)]' : 'group-hover:text-white'} />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase">{tab.label}</span>
              {activeTab === tab.id && <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-[var(--cmd-glow)] shadow-[0_0_10px_var(--cmd-glow)]" />}
            </button>
          ))}
        </nav>

        {/* ── ACTIVE PANEL AREA ── */}
        <div className="flex-1 min-w-0 glass-panel-tactical bg-[var(--cmd-panel)] border-[var(--cmd-border)] p-8 lg:p-12 relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-10"
            >
              
              {/* THEME EDITOR */}
              {activeTab === 'THEME' && (
                <form onSubmit={(e) => { e.preventDefault(); save('theme', theme); }} className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic">Architecture_Core</h3>
                    <p className="text-[10px] text-white/30 tracking-[0.3em] mt-2 font-mono ml-1 uppercase">Select visual configuration preset.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {Object.keys(THEME_PRESETS).map(key => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setTheme(key)}
                        className={`p-5 border text-left transition-all relative group overflow-hidden ${
                          theme === key ? 'bg-white/10 border-white' : 'bg-black/20 border-white/5 hover:border-white/20'
                        }`}
                      >
                         <div className="text-[7px] tracking-widest text-white/40 mb-1">ID: {key}</div>
                         <div className="text-[11px] font-black tracking-widest uppercase">{THEME_PRESETS[key].name}</div>
                         <div className="flex gap-1.5 mt-4">
                            <div className="w-4 h-4 border border-white/10" style={{ backgroundColor: THEME_PRESETS[key].navy }} />
                            <div className="w-4 h-4 border border-white/10" style={{ backgroundColor: THEME_PRESETS[key].accent }} />
                            <div className="w-4 h-4 border border-white/10" style={{ backgroundColor: THEME_PRESETS[key].glow }} />
                         </div>
                      </button>
                    ))}
                  </div>
                  <SaveBtn saved={saved.theme} />
                </form>
              )}

              {/* IDENTITY EDITOR */}
              {activeTab === 'IDENTITY' && (
                <form onSubmit={(e) => { e.preventDefault(); save('profile', profile); }} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic">Identity_Matrix</h3>
                    <p className="text-[10px] text-white/30 tracking-[0.3em] mt-2 font-mono ml-1 uppercase">Modify behavioral and biographical metadata.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Full_Legal_Alias">
                      <Input value={profile.name} onChange={v => setProfile({...profile, name: v})} />
                    </Field>
                    <Field label="Operational_Status">
                      <Input value={profile.status} onChange={v => setProfile({...profile, status: v})} />
                    </Field>
                    <Field label="Current_Node (Company)">
                      <Input value={profile.company} onChange={v => setProfile({...profile, company: v})} />
                    </Field>
                    <Field label="Assigned_Position">
                      <Input value={profile.position} onChange={v => setProfile({...profile, position: v})} />
                    </Field>
                    <div className="md:col-span-2">
                       <Field label="Avatar_Visual_Payload">
                         <Input value={profile.image} onChange={v => setProfile({...profile, image: v})} />
                       </Field>
                    </div>
                    <div className="md:col-span-2">
                       <Field label="Operational_Philosophy">
                         <Textarea rows={4} value={profile.philosophy} onChange={v => setProfile({...profile, philosophy: v})} />
                       </Field>
                    </div>
                  </div>
                  <SaveBtn saved={saved.profile} />
                </form>
              )}

              {/* INTERFACE EDITOR */}
              {activeTab === 'INTERFACE' && (
                <form onSubmit={(e) => { e.preventDefault(); updateConfig({ home, pageHeaders }); flash('interface'); }} className="space-y-10">
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic">Interface_Layer</h3>
                    <p className="text-[10px] text-white/30 tracking-[0.3em] mt-2 font-mono ml-1 uppercase">Top-level headers and situational telemetrics.</p>
                  </div>
                  <div className="space-y-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="Hero_Line_1">
                          <Input value={pageHeaders.home.line1} onChange={v => setPageHeaders({...pageHeaders, home:{...pageHeaders.home, line1: v}})} />
                        </Field>
                        <Field label="Hero_Line_2 (Outline)">
                          <Input value={pageHeaders.home.line2} onChange={v => setPageHeaders({...pageHeaders, home:{...pageHeaders.home, line2: v}})} />
                        </Field>
                        <Field label="Callsign_Tag">
                          <Input value={home.hero.tag} onChange={v => setHome({...home, hero:{...home.hero, tag: v}})} />
                        </Field>
                     </div>
                     <div className="grid grid-cols-1 gap-6">
                        <Field label="System_Mission_Statement">
                           <Textarea rows={2} value={home.missionDescription} onChange={v => setHome({...home, missionDescription: v})} />
                        </Field>
                        <Field label="Active_Uplink_Welcome_Text">
                           <Textarea rows={2} value={home.welcomeText} onChange={v => setHome({...home, welcomeText: v})} />
                        </Field>
                     </div>
                  </div>
                  <SaveBtn saved={saved.interface} />
                </form>
              )}

              {/* TIMELINE EDITOR */}
              {activeTab === 'TIMELINE' && (
                <form onSubmit={(e) => { e.preventDefault(); save('experience', experience); }} className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter italic">Experience_Arc</h3>
                      <p className="text-[10px] text-white/30 tracking-[0.3em] mt-2 font-mono ml-1 uppercase">Chronological log of operational deployments.</p>
                    </div>
                    <button type="button" onClick={() => setExperience([{title:'', company:'', period:'', description:['']}, ...experience])} className="px-4 py-2 bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest">+ Add_Node</button>
                  </div>
                  <div className="space-y-6">
                    {experience.map((exp, i) => (
                      <ExpEditor key={i} exp={exp} onChange={val => { const n = [...experience]; n[i]=val; setExperience(n); }} onDelete={() => setExperience(experience.filter((_,j)=>j!==i))} />
                    ))}
                  </div>
                  <SaveBtn saved={saved.experience} />
                </form>
              )}

              {/* REGISTRY EDITOR */}
              {activeTab === 'REGISTRY' && (
                <form onSubmit={(e) => { e.preventDefault(); save('projects', projects); }} className="space-y-6">
                   <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter italic">Artifact_Registry</h3>
                      <p className="text-[10px] text-white/30 tracking-[0.3em] mt-2 font-mono ml-1 uppercase">Stored repositories and architectural assets.</p>
                    </div>
                    <button type="button" onClick={() => setProjects([{title:'', category:'', image:'', description:[''], github:'', link:''}, ...projects])} className="px-4 py-2 bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest">+ Create_Artifact</button>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {projects.map((proj, i) => (
                      <ProjEditor key={i} proj={proj} onChange={val => { const n = [...projects]; n[i]=val; setProjects(n); }} onDelete={() => setProjects(projects.filter((_,j)=>j!==i))} />
                    ))}
                  </div>
                  <SaveBtn saved={saved.projects} />
                </form>
              )}

              {/* MODULES EDITOR */}
              {activeTab === 'MODULES' && (
                <form onSubmit={(e) => { e.preventDefault(); save('skills', skills); }} className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter italic">Skill_Modules</h3>
                      <p className="text-[10px] text-white/30 tracking-[0.3em] mt-2 font-mono ml-1 uppercase">Proficiency node clusters and technical stacks.</p>
                    </div>
                    <button type="button" onClick={() => setSkills([{label:'', tag:'', skills:[]}, ...skills])} className="px-4 py-2 bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest">+ Deploy_Cluster</button>
                  </div>
                  <div className="space-y-8">
                    {skills.map((cat, i) => (
                      <SkillCatEditor key={i} cat={cat} onChange={val => { const n = [...skills]; n[i]=val; setSkills(n); }} onDelete={() => setSkills(skills.filter((_,j)=>j!==i))} />
                    ))}
                  </div>
                  <SaveBtn saved={saved.skills} />
                </form>
              )}

              {/* SIGNAL EDITOR */}
              {activeTab === 'SIGNAL' && (
                <form onSubmit={(e) => { e.preventDefault(); save('social', { links: social }); }} className="space-y-6">
                   <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic">Signal_Uplink</h3>
                    <p className="text-[10px] text-white/30 tracking-[0.3em] mt-2 font-mono ml-1 uppercase">Communication nodes and external channel metadata.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {social.map((link, i) => (
                      <div key={i} className="border border-white/5 bg-black/20 p-6 space-y-4">
                        <Field label={link.platform}>
                           <Input value={link.url} onChange={v => { const n = [...social]; n[i].url = v; setSocial(n); }} />
                        </Field>
                      </div>
                    ))}
                  </div>
                  <SaveBtn saved={saved.social} />
                </form>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* ── STATUS FOOTER ── */}
      <footer className="px-8 py-4 border-t border-[var(--cmd-border)] flex items-center justify-between text-[7px] text-white/10 tracking-[0.5em] uppercase">
         <span>Operational Status: ALL_NODES_GO</span>
         <span>System_Authority: ROOT_ADMIN</span>
         <span>Latency: ~{Math.floor(Math.random() * 20) + 12}ms</span>
      </footer>
    </div>
  );
};

export default Dashboard;
