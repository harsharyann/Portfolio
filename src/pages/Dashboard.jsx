import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { useAuth } from '../context/AuthContext';
import {
  Lock, LogOut, Terminal, Activity, Shield, User, Briefcase,
  FolderOpen, Award, Link, Home, ChevronDown, ChevronUp,
  Plus, Trash2, Save, RefreshCw, Eye, EyeOff
} from 'lucide-react';

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
    className="w-full bg-black border border-white/10 text-white font-mono text-sm px-5 py-4 focus:outline-none focus:border-white/30 tracking-wider transition-all placeholder:text-white/10"
  />
);

const Select = ({ value, onChange, options }) => (
  <select
    value={value || ''}
    onChange={e => onChange(e.target.value)}
    className="w-full bg-black border border-white/10 text-white font-mono text-sm px-5 py-4 focus:outline-none focus:border-white/30 tracking-wider transition-all"
  >
    <option value="" disabled className="text-white/20">Select an Icon</option>
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
    className="w-full bg-black border border-white/10 text-white font-mono text-sm px-5 py-4 focus:outline-none focus:border-white/30 tracking-wider transition-all placeholder:text-white/10 resize-y"
  />
);

const SaveBtn = ({ saved, label = 'SAVE_CHANGES' }) => (
  <button type="submit"
    className="w-full py-4 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white/80 transition-all flex items-center justify-center gap-3 font-mono">
    <Save size={13} />
    {saved ? '✓ SAVED' : label}
  </button>
);

/* ─── Collapsible Section Wrapper ───────────────────────── */
const AdminSection = ({ id, label, icon: Icon, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <section className="border border-white/10 bg-white/[0.01] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-8 py-5 border-b border-white/5 hover:bg-white/[0.02] transition-all group"
      >
        <div className="flex items-center gap-4">
          <Icon size={14} className="text-white/30 group-hover:text-white transition-colors" />
          <div className="text-left">
            <div className="text-[7px] tracking-[0.5em] uppercase text-white/20 mb-0.5 font-mono">[{id}]</div>
            <div className="text-[12px] font-black tracking-widest text-white uppercase font-mono">{label}</div>
          </div>
        </div>
        {open ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
      </button>
      {open && <div className="p-8">{children}</div>}
    </section>
  );
};

/* ─── Experience Item Editor ─────────────────────────────── */
const ExpEditor = ({ exp, onChange, onDelete }) => (
  <div className="border border-white/5 p-6 relative space-y-4 bg-black/20">
    <button type="button" onClick={onDelete} className="absolute top-4 right-4 text-white/10 hover:text-white transition-colors">
      <Trash2 size={14} />
    </button>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Job Title">
        <Input value={exp.title} onChange={v => onChange({ ...exp, title: v })} placeholder="Role / Position..." />
      </Field>
      <Field label="Company">
        <Input value={exp.company} onChange={v => onChange({ ...exp, company: v })} placeholder="Company Name..." />
      </Field>
    </div>
    <Field label="Period (e.g. 2022 - PRESENT)">
      <Input value={exp.period} onChange={v => onChange({ ...exp, period: v })} placeholder="2022 - PRESENT" />
    </Field>
    <Field label="Description Bullet Points (one per line)">
      <Textarea
        rows={4}
        value={(exp.description || []).join('\n')}
        onChange={v => onChange({ ...exp, description: v.split('\n') })}
        placeholder="Each line becomes a bullet point..."
      />
    </Field>
  </div>
);

/* ─── Project Item Editor ────────────────────────────────── */
const ProjEditor = ({ proj, onChange, onDelete }) => (
  <div className="border border-white/5 p-6 relative space-y-4 bg-black/20">
    <button type="button" onClick={onDelete} className="absolute top-4 right-4 text-white/10 hover:text-white transition-colors">
      <Trash2 size={14} />
    </button>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Project Title">
        <Input value={proj.title} onChange={v => onChange({ ...proj, title: v })} placeholder="Project Name..." />
      </Field>
      <Field label="Category">
        <Input value={proj.category} onChange={v => onChange({ ...proj, category: v })} placeholder="Category..." />
      </Field>
    </div>
    <Field label="Description Bullet Points (one per line)">
      <Textarea
        rows={3}
        value={Array.isArray(proj.description) ? proj.description.join('\n') : (proj.description || '')}
        onChange={v => onChange({ ...proj, description: v.split('\n') })}
        placeholder="Each line becomes a bullet point..."
      />
    </Field>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="GitHub URL">
        <Input value={proj.github} onChange={v => onChange({ ...proj, github: v })} placeholder="https://github.com/..." />
      </Field>
      <Field label="Live URL">
        <Input value={proj.link} onChange={v => onChange({ ...proj, link: v })} placeholder="https://..." />
      </Field>
    </div>
    <Field label="Tags (comma separated)">
      <Input
        value={(proj.tags || []).join(', ')}
        onChange={v => onChange({ ...proj, tags: v.split(',').map(t => t.trim()).filter(Boolean) })}
        placeholder="React, Node.js, Python..."
      />
    </Field>
  </div>
);

/* ─── Certificate Item Editor ─────────────────────────────── */
const CertEditor = ({ cert, onChange, onDelete }) => (
  <div className="border border-white/5 p-6 relative space-y-4 bg-black/20">
    <button type="button" onClick={onDelete} className="absolute top-4 right-4 text-white/10 hover:text-white transition-colors">
      <Trash2 size={14} />
    </button>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Certificate Name">
        <Input value={cert.name} onChange={v => onChange({ ...cert, name: v })} placeholder="Certificate Title..." />
      </Field>
      <Field label="Issuing Authority">
        <Input value={cert.issuer} onChange={v => onChange({ ...cert, issuer: v })} placeholder="Organization..." />
      </Field>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Date (e.g. 2024.01)">
        <Input value={cert.date} onChange={v => onChange({ ...cert, date: v })} placeholder="2024.01" />
      </Field>
      <Field label="Credential / Verification URL">
        <Input value={cert.link} onChange={v => onChange({ ...cert, link: v })} placeholder="https://..." />
      </Field>
    </div>
    <Field label="Certificate Image URL (Google Drive or direct link)">
      <Input value={cert.image} onChange={v => onChange({ ...cert, image: v })} placeholder="https://drive.google.com/..." />
    </Field>
  </div>
);

/* ─── Social Link Editor ─────────────────────────────────── */
const SocialEditor = ({ link, onChange, onDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-white/5 p-5 bg-black/20 relative">
    <button type="button" onClick={onDelete} className="absolute top-3 right-3 text-white/10 hover:text-white transition-colors">
      <Trash2 size={12} />
    </button>
    <Field label="Platform Name">
      <Input value={link.platform} onChange={v => onChange({ ...link, platform: v })} placeholder="GitHub..." />
    </Field>
    <Field label="Icon Select">
      <Select 
        value={link.icon} 
        onChange={v => onChange({ ...link, icon: v })} 
        options={[
          { label: 'GitHub', value: 'github' },
          { label: 'Instagram', value: 'instagram' },
          { label: 'Discord', value: 'discord' },
          { label: 'WhatsApp', value: 'whatsapp' },
          { label: 'YouTube', value: 'youtube' },
          { label: 'Gmail', value: 'gmail' },
          { label: 'Email', value: 'email' },
          { label: 'LinkedIn', value: 'linkedin' },
          { label: 'Reddit', value: 'reddit' },
          { label: 'Facebook', value: 'facebook' },
          { label: 'X (Twitter)', value: 'x' },
          { label: 'Twitter', value: 'twitter' },
        ]} 
      />
    </Field>
    <Field label="URL">
      <Input value={link.url} onChange={v => onChange({ ...link, url: v })} placeholder="https://..." />
    </Field>
  </div>
);

/* ─── Skill Category Editor ─────────────────────────────── */
const SkillCatEditor = ({ cat, onChange, onDelete }) => {
  const updateSkill = (idx, newSkill) => {
    const newSkills = [...(cat.skills || [])];
    newSkills[idx] = newSkill;
    onChange({ ...cat, skills: newSkills });
  };
  const deleteSkill = (idx) => {
    onChange({ ...cat, skills: (cat.skills || []).filter((_, i) => i !== idx) });
  };
  const addSkill = () => {
    onChange({ ...cat, skills: [...(cat.skills || []), { name: '', icon: '' }] });
  };

  return (
    <div className="border border-white/5 p-6 relative space-y-4 bg-black/20">
      <button type="button" onClick={onDelete} className="absolute top-4 right-4 text-white/10 hover:text-white transition-colors">
        <Trash2 size={14} />
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Category Label">
          <Input value={cat.label} onChange={v => onChange({ ...cat, label: v })} placeholder="CORE_LANGUAGES..." />
        </Field>
        <Field label="Category Tag">
          <Input value={cat.tag} onChange={v => onChange({ ...cat, tag: v })} placeholder="[LANG_NODE_01]..." />
        </Field>
      </div>
      
      <div className="mt-6 space-y-3 border-l-2 border-white/10 pl-4 py-2">
        <div className="text-[8px] uppercase tracking-widest text-white/40 font-mono mb-2">Category Skills</div>
        {(cat.skills || []).map((skill, i) => (
          <div key={i} className="flex gap-4 items-center">
            <div className="flex-1">
              <Input value={skill.name} onChange={v => updateSkill(i, { ...skill, name: v })} placeholder="Skill Name..." />
            </div>
            <div className="flex-[2]">
              <Input value={skill.icon} onChange={v => updateSkill(i, { ...skill, icon: v })} placeholder="Icon URL (e.g. devicons CDN)..." />
            </div>
            <button
               type="button"
               onClick={() => updateSkill(i, { ...skill, isHidden: !skill.isHidden })}
               className={`p-2 transition-all border ${skill.isHidden ? 'text-white/20 hover:text-white/40 border-transparent' : 'text-green-500 hover:text-green-400 border-green-500/20 bg-green-500/5'}`}
               title={skill.isHidden ? "Click to Show" : "Click to Hide"}
            >
               {skill.isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            <button type="button" onClick={() => deleteSkill(i)} className="p-2 text-white/20 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/20">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button type="button" onClick={addSkill} className="text-[9px] uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2 mt-2">
          <Plus size={10} /> Add Skill
        </button>
      </div>
    </div>
  );
};


/* ─── Main Dashboard ─────────────────────────────────────── */
const Dashboard = () => {
  const { config, updateConfig } = useConfig();
  const { isAuthenticated, login, logout } = useAuth();
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [saved, setSaved] = useState({});

  const flash = (key) => { setSaved(s => ({ ...s, [key]: true })); setTimeout(() => setSaved(s => ({ ...s, [key]: false })), 2000); };

  // ── AUTH ──────────────────────────────────────────
  const handleHandshake = (e) => {
    e.preventDefault();
    if (login(password)) setAuthError(false);
    else { setAuthError(true); setTimeout(() => setAuthError(false), 2000); }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#050505]">
        <div className="w-full max-w-sm border border-white/10 p-10 space-y-8 text-center bg-black">
          <Lock size={28} className="mx-auto text-white/40 animate-pulse" />
          <h1 className="font-headline text-xl tracking-[0.4em] font-black text-white uppercase">Ghost_Admin</h1>
          <form onSubmit={handleHandshake} className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="text-[9px] font-mono text-white/40 tracking-[0.4em] uppercase block">Access_Key</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                autoFocus placeholder="········"
                className={`w-full bg-black border-b-2 ${authError ? 'border-red-500' : 'border-white/10'} py-3 px-2 font-mono text-lg tracking-[0.5em] text-white outline-none focus:border-white transition-all`}
              />
            </div>
            <button type="submit" className="w-full py-4 bg-white text-black font-headline font-black text-[11px] tracking-[0.4em] uppercase hover:bg-white/80 transition-all">
              INITIATE_UPLINK
            </button>
          </form>
          <div className="text-[12px] font-mono text-white/10">key: ghost77</div>
        </div>
      </div>
    );
  }

  // ── LOCAL DRAFT STATE ──────────────────────────────
  const [profile, setProfile] = useState({ ...config.profile });
  const [home, setHome] = useState({ ...config.home });
  const [pageHeaders, setPageHeaders] = useState({ ...config.pageHeaders });
  const [experience, setExperience] = useState([...(config.experience || [])]);
  const [projects, setProjects] = useState([...(config.projects || [])]);
  const [certificates, setCertificates] = useState([...(config.certificates || [])]);
  const [social, setSocial] = useState([...(config.social?.links || [])]);
  const [skills, setSkills] = useState([...(config.skills || [])]);
  const [theme, setTheme] = useState(config.theme || 'AGENT_SPECTER');

  const { THEME_PRESETS } = useConfig();

  // ── SAVE HANDLERS ──────────────────────────────────
  const saveProfile = (e) => { e.preventDefault(); updateConfig({ profile }); flash('profile'); };
  const saveHome = (e) => { e.preventDefault(); updateConfig({ home }); flash('home'); };
  const savePageHeaders = (e) => { e.preventDefault(); updateConfig({ pageHeaders }); flash('pageHeaders'); };
  const saveExperience = (e) => { e.preventDefault(); updateConfig({ experience }); flash('experience'); };
  const saveProjects = (e) => { e.preventDefault(); updateConfig({ projects }); flash('projects'); };
  const saveCertificates = (e) => { e.preventDefault(); updateConfig({ certificates }); flash('certificates'); };
  const saveSocial = (e) => { e.preventDefault(); updateConfig({ social: { links: social } }); flash('social'); };
  const saveSkills = (e) => { e.preventDefault(); updateConfig({ skills }); flash('skills'); };
  const saveTheme = (e) => { e.preventDefault(); updateConfig({ theme }); flash('theme'); };

  const resetAll = () => {
    if (window.confirm('Reset ALL data to defaults?')) {
      localStorage.removeItem('portfolio_config');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-mono bg-[#050505] text-white/50">

      {/* ── TOP BAR ── */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-5 border-b border-white/5 bg-[#050505]/95 backdrop-blur">
        <div className="flex items-center gap-4">
          <Terminal size={18} className="text-white" />
          <span className="text-[11px] font-black tracking-[0.6em] uppercase text-white">ADMIN_CONTROL_PANEL</span>
          <div className="flex items-center gap-2 ml-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff8d] animate-pulse shadow-[0_0_6px_#00ff8d]" />
            <span className="text-[8px] tracking-widest text-[#00ff8d] uppercase">LIVE_MODE</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={resetAll} className="flex items-center gap-2 px-4 py-2 border border-white/10 text-white/30 hover:text-white hover:border-white/30 transition-all text-[9px] tracking-widest uppercase">
            <RefreshCw size={12} /> RESET
          </button>
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2 border border-white/10 text-white/30 hover:text-white hover:border-white/30 transition-all text-[9px] tracking-widest uppercase">
            <LogOut size={12} /> LOGOUT
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full px-6 py-16 space-y-4">

        <div className="mb-12">
          <div className="text-[8px] tracking-[0.8em] uppercase text-white/20 mb-2 font-mono">CONTROL_MATRIX // v2.0</div>
          <h1 className="font-headline text-3xl font-black text-white uppercase tracking-tighter">MISSION_CONTROL_ADMIN</h1>
          <p className="text-[10px] text-white/20 tracking-widest uppercase mt-2">Click any section to expand and edit. All changes are saved live.</p>
        </div>

          {/* ── THEME_00: SYSTEM THEME ── */}
          <AdminSection id="THEME_00" label="Visual Architecture" icon={Activity}>
             <form onSubmit={saveTheme} className="space-y-6">
                <Field label="System Preset Theme">
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.keys(THEME_PRESETS).map((key) => (
                         <button
                            key={key}
                            type="button"
                            onClick={() => setTheme(key)}
                            className={`p-4 border text-left transition-all relative overflow-hidden group ${
                               theme === key 
                               ? 'border-white bg-white/10' 
                               : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                            }`}
                         >
                            <div className="text-[7px] tracking-[0.3em] uppercase text-white/40 mb-1">Theme_ID: {key}</div>
                            <div className="text-[10px] font-black tracking-widest text-white uppercase">{THEME_PRESETS[key].name}</div>
                            
                            {/* Theme Color Preview Nodes */}
                            <div className="flex gap-2 mt-3">
                               <div className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME_PRESETS[key].accent }} />
                               <div className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME_PRESETS[key].glow }} />
                               <div className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME_PRESETS[key].navy }} />
                            </div>
                         </button>
                      ))}
                   </div>
                </Field>
                <SaveBtn saved={saved.theme} />
             </form>
          </AdminSection>

          {/* ── 1. PROFILE ── */}
        <AdminSection id="PROF_01" label="Profile & Identity" icon={User}>
          <form onSubmit={saveProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Full Name">
                <Input value={profile.name} onChange={v => setProfile(p => ({ ...p, name: v }))} placeholder="Your Name..." />
              </Field>
              <Field label="Status Tag">
                <Input value={profile.status} onChange={v => setProfile(p => ({ ...p, status: v }))} placeholder="ACTIVE_ANALYST..." />
              </Field>
              <Field label="Company">
                <Input value={profile.company} onChange={v => setProfile(p => ({ ...p, company: v }))} placeholder="Company Name..." />
              </Field>
              <Field label="Position / Role">
                <Input value={profile.position} onChange={v => setProfile(p => ({ ...p, position: v }))} placeholder="Lead Architect..." />
              </Field>
            </div>
            <Field label="Profile Image URL">
              <Input value={profile.image} onChange={v => setProfile(p => ({ ...p, image: v }))} placeholder="https://... or Google Drive ID..." />
            </Field>
            <Field label="Philosophy / Bio (use double newline for paragraphs)">
              <Textarea rows={6} value={profile.philosophy} onChange={v => setProfile(p => ({ ...p, philosophy: v }))} placeholder="Your philosophy..." />
            </Field>
            <Field label="Quote / Thought (shown in About section)">
              <Textarea rows={2} value={profile.thought} onChange={v => setProfile(p => ({ ...p, thought: v }))} placeholder="Your signature quote..." />
            </Field>
            <SaveBtn saved={saved.profile} />
          </form>
        </AdminSection>

        {/* ── 2. HOME ── */}
        <AdminSection id="HOME_02" label="Home Details" icon={Home}>
          <form onSubmit={saveHome} className="space-y-6">
            <Field label="Mission Description (typewriter text under hero)">
              <Textarea rows={2} value={home.missionDescription} onChange={v => setHome(h => ({ ...h, missionDescription: v }))} placeholder="Synthesizing high-fidelity architectures..." />
            </Field>
            <Field label="Welcome Text (mission station bar)">
              <Textarea rows={2} value={home.welcomeText} onChange={v => setHome(h => ({ ...h, welcomeText: v }))} placeholder="Mission station text..." />
            </Field>
            <SaveBtn saved={saved.home} />
          </form>
        </AdminSection>

        {/* ── 2B. PAGE HEADERS ── */}
        <AdminSection id="HEAD_02B" label="Section Hero Titles" icon={Terminal}>
          <form onSubmit={savePageHeaders} className="space-y-8">
            {['home', 'about', 'experience', 'projects', 'skills', 'connect'].map((page) => (
               <div key={page} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-white/5 bg-black/20 relative">
                 <div className="absolute -top-3 left-4 bg-[#050505] px-2 text-[8px] tracking-[0.4em] uppercase text-white/40">[{page.toUpperCase()}_HERO]</div>
                 <Field label="Line 1">
                   <Input 
                      value={pageHeaders?.[page]?.line1 || ''} 
                      onChange={v => setPageHeaders(p => ({ ...p, [page]: { ...p[page], line1: v } }))} 
                      placeholder="Line 1..." 
                   />
                 </Field>
                 <Field label="Line 2 (Accent)">
                   <Input 
                      value={pageHeaders?.[page]?.line2 || ''} 
                      onChange={v => setPageHeaders(p => ({ ...p, [page]: { ...p[page], line2: v } }))} 
                      placeholder="Line 2..." 
                   />
                 </Field>
               </div>
            ))}
            <SaveBtn saved={saved.pageHeaders} />
          </form>
        </AdminSection>

        {/* ── 3. EXPERIENCE ── */}
        <AdminSection id="EXP_03" label="Experience Timeline" icon={Briefcase}>
          <form onSubmit={saveExperience} className="space-y-4">
            {experience.map((exp, i) => (
              <ExpEditor
                key={i}
                exp={exp}
                onChange={val => setExperience(arr => arr.map((e, j) => j === i ? val : e))}
                onDelete={() => setExperience(arr => arr.filter((_, j) => j !== i))}
              />
            ))}
            <button type="button"
              onClick={() => setExperience(arr => [...arr, { title: '', company: '', period: '', description: [''] }])}
              className="w-full py-3 border border-dashed border-white/10 text-white/30 hover:text-white hover:border-white/30 transition-all text-[9px] tracking-widest uppercase flex items-center justify-center gap-2">
              <Plus size={12} /> ADD_EXPERIENCE_NODE
            </button>
            <SaveBtn saved={saved.experience} />
          </form>
        </AdminSection>

        {/* ── 4. PROJECTS ── */}
        <AdminSection id="PROJ_04" label="Projects Registry" icon={FolderOpen}>
          <form onSubmit={saveProjects} className="space-y-4">
            {projects.map((proj, i) => (
              <ProjEditor
                key={i}
                proj={proj}
                onChange={val => setProjects(arr => arr.map((p, j) => j === i ? val : p))}
                onDelete={() => setProjects(arr => arr.filter((_, j) => j !== i))}
              />
            ))}
            <button type="button"
              onClick={() => setProjects(arr => [...arr, { id: Date.now(), title: '', category: '', description: [''], tags: [], github: '', link: '' }])}
              className="w-full py-3 border border-dashed border-white/10 text-white/30 hover:text-white hover:border-white/30 transition-all text-[9px] tracking-widest uppercase flex items-center justify-center gap-2">
              <Plus size={12} /> ADD_PROJECT_MODULE
            </button>
            <SaveBtn saved={saved.projects} />
          </form>
        </AdminSection>

        {/* ── 5. CERTIFICATES ── */}
        <AdminSection id="CERT_05" label="Certificates Archive" icon={Award}>
          <form onSubmit={saveCertificates} className="space-y-4">
            {certificates.map((cert, i) => (
              <CertEditor
                key={i}
                cert={cert}
                onChange={val => setCertificates(arr => arr.map((c, j) => j === i ? val : c))}
                onDelete={() => setCertificates(arr => arr.filter((_, j) => j !== i))}
              />
            ))}
            <button type="button"
              onClick={() => setCertificates(arr => [...arr, { id: Date.now(), name: '', issuer: '', date: '', link: '', image: '' }])}
              className="w-full py-3 border border-dashed border-white/10 text-white/30 hover:text-white hover:border-white/30 transition-all text-[9px] tracking-widest uppercase flex items-center justify-center gap-2">
              <Plus size={12} /> ADD_CERTIFICATE
            </button>
            <SaveBtn saved={saved.certificates} />
          </form>
        </AdminSection>

        {/* ── 6. SOCIAL LINKS ── */}
        <AdminSection id="SOCI_06" label="Social Link Nodes" icon={Link}>
          <form onSubmit={saveSocial} className="space-y-4">
            {social.map((link, i) => (
              <SocialEditor
                key={i}
                link={link}
                onChange={val => setSocial(arr => arr.map((l, j) => j === i ? val : l))}
                onDelete={() => setSocial(arr => arr.filter((_, j) => j !== i))}
              />
            ))}
            <button type="button"
              onClick={() => setSocial(arr => [...arr, { id: Date.now(), platform: '', icon: '', url: '' }])}
              className="w-full py-3 border border-dashed border-white/10 text-white/30 hover:text-white hover:border-white/30 transition-all text-[9px] tracking-widest uppercase flex items-center justify-center gap-2">
              <Plus size={12} /> ADD_SOCIAL_NODE
            </button>
            <SaveBtn saved={saved.social} />
          </form>
        </AdminSection>

        {/* ── 7. SKILLS MATRIX ── */}
        <AdminSection id="SKIL_07" label="Skills Matrix" icon={Activity}>
          <form onSubmit={saveSkills} className="space-y-4">
            {skills.map((cat, i) => (
              <SkillCatEditor
                key={i}
                cat={cat}
                onChange={val => setSkills(arr => arr.map((c, j) => j === i ? val : c))}
                onDelete={() => setSkills(arr => arr.filter((_, j) => j !== i))}
              />
            ))}
            <button type="button"
              onClick={() => setSkills(arr => [...arr, { id: Date.now().toString(), label: '', tag: '', skills: [] }])}
              className="w-full py-3 border border-dashed border-white/10 text-white/30 hover:text-white hover:border-white/30 transition-all text-[9px] tracking-widest uppercase flex items-center justify-center gap-2">
              <Plus size={12} /> ADD_SKILL_CATEGORY
            </button>
            <SaveBtn saved={saved.skills} />
          </form>
        </AdminSection>

        {/* ── FOOTER NOTE ── */}
        <div className="pt-10 border-t border-white/5 flex items-center justify-between">
          <div className="text-[8px] tracking-[0.5em] text-white/10 uppercase font-mono">Data persisted in localStorage</div>
          <div className="text-[8px] tracking-[0.5em] text-white/10 uppercase font-mono">MISSION_CONTROL_v2.0</div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
