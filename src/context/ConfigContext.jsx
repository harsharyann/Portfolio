import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export const THEME_PRESETS = {
  /* ─── SEGMENT: DEEP_SPACE_VOID ─── */
  AGENT_SPECTER: {
    segment: 'VOID',
    name: 'Agent Specter',
    navy: '#050505',
    accent: '#ffffff',
    glow: '#00ff8d',
    border: 'rgba(255,255,255,0.12)',
    grid: 'rgba(255,255,255,0.015)',
    panel: 'rgba(255,255,255,0.03)',
    font: "'Inter', sans-serif",
    fx: { stars: true, nebula: true, scanlines: false, noise: 0.02 }
  },
  NEBULA_RECON: {
    segment: 'VOID',
    name: 'Nebula Recon',
    navy: '#050512',
    accent: '#9d00ff',
    glow: '#00ccff',
    border: 'rgba(157,0,255,0.2)',
    grid: 'rgba(0,204,255,0.02)',
    panel: 'rgba(157,0,255,0.05)',
    font: "'Inter', sans-serif",
    fx: { stars: true, nebula: true, scanlines: false, noise: 0.02 }
  },

  /* ─── SEGMENT: MINIMALIST_ARCHITECT ─── */
  ARCHITECT_BONE: {
    segment: 'ARCHITECT',
    name: 'Architect Bone',
    navy: '#fcfaf7',
    accent: '#1a1a1a',
    glow: '#ff4d00',
    border: 'rgba(0,0,0,0.1)',
    grid: 'rgba(0,0,0,0.03)',
    panel: 'rgba(0,0,0,0.02)',
    font: "'Outfit', sans-serif",
    fx: { stars: false, nebula: false, scanlines: false, noise: 0.05 }
  },
  BLUEPRINT_CAD: {
    segment: 'ARCHITECT',
    name: 'Blueprint CAD',
    navy: '#e8edf3',
    accent: '#0047ab',
    glow: '#0047ab',
    border: 'rgba(0,71,171,0.1)',
    grid: 'rgba(0,71,171,0.05)',
    panel: 'rgba(0,71,171,0.02)',
    font: "'Space Mono', monospace",
    fx: { stars: false, nebula: false, scanlines: false, noise: 0.03 }
  },

  /* ─── SEGMENT: NEON_OVERRIDE ─── */
  QUANTUM_JUNGLE: {
    segment: 'NEON',
    name: 'Quantum Jungle',
    navy: '#06010f',
    accent: '#00ffa3',
    glow: '#cc00ff',
    border: 'rgba(0,255,163,0.18)',
    grid: 'rgba(204,0,255,0.02)',
    panel: 'rgba(204,0,255,0.04)',
    font: "'Inter', sans-serif",
    fx: { stars: false, nebula: false, scanlines: true, noise: 0.08 }
  },
  TOKYO_NIGHT: {
    segment: 'NEON',
    name: 'Tokyo Night',
    navy: '#1a1b26',
    accent: '#7aa2f7',
    glow: '#f7768e',
    border: 'rgba(122,162,247,0.2)',
    grid: 'rgba(247,118,142,0.02)',
    panel: 'rgba(122,162,247,0.04)',
    font: "'Inter', sans-serif",
    fx: { stars: true, nebula: false, scanlines: true, noise: 0.04 }
  },

  /* ─── SEGMENT: CARBON_STEALTH ─── */
  VOID_WHISPER: {
    segment: 'CARBON',
    name: 'Void Whisper',
    navy: '#010101',
    accent: '#7b00ff',
    glow: '#ffffff',
    border: 'rgba(123,0,255,0.3)',
    grid: 'rgba(123,0,255,0.03)',
    panel: 'rgba(255,255,255,0.01)',
    font: "'Inter', sans-serif",
    fx: { stars: false, nebula: false, scanlines: false, noise: 0.1 }
  },
  STEALTH_TITAN: {
    segment: 'CARBON',
    name: 'Stealth Titan',
    navy: '#0a0a0a',
    accent: '#d1d1d1',
    glow: '#ffffff',
    border: 'rgba(255,255,255,0.05)',
    grid: 'rgba(255,255,255,0.01)',
    panel: 'rgba(255,255,255,0.02)',
    font: "'Outfit', sans-serif",
    fx: { stars: false, nebula: false, scanlines: false, noise: 0.15 }
  },

  /* ─── SEGMENT: NATURAL_NODE ─── */
  SILICON_FLORA: {
    segment: 'NATURAL',
    name: 'Silicon Flora',
    navy: '#0a0b0a',
    accent: '#d1d1d1',
    glow: '#7fff00',
    border: 'rgba(255,255,255,0.1)',
    grid: 'rgba(127,255,0,0.02)',
    panel: 'rgba(255,255,255,0.02)',
    font: "'Inter', sans-serif",
    fx: { stars: false, nebula: false, scanlines: false, noise: 0.04 }
  },
  TERRA_COA: {
    segment: 'NATURAL',
    name: 'Terra Coa',
    navy: '#120805',
    accent: '#ff6347',
    glow: '#d2b48c',
    border: 'rgba(255,99,71,0.2)',
    grid: 'rgba(210,180,140,0.02)',
    panel: 'rgba(255,99,71,0.04)',
    font: "'Inter', sans-serif",
    fx: { stars: false, nebula: false, scanlines: false, noise: 0.02 }
  }
};

const ConfigContext = createContext();

export const INITIAL_CONFIG = {
  profile: {
    name: "HARSH ARYAN",
    status: "ACTIVE_ANALYST",
    company: "NeuroTech Systems",
    position: "Lead Architect & Founder",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000",
    philosophy: "Architecting the unseen logic through structural iterations and technological evolution. Focus on performance, security, and neural data synthesis.\n\nBuilding the future, one node at a time.",
    thought: "Engineering the unseen logic of tomorrow through neural data synthesis.",
    workHistory: { active: "NeuroTech Systems" },
    directives: [
        { title: "SYSTEM_OPTIMIZATION", desc: "Achieving 99.9% uptime in architectural nodes." },
        { title: "NEURAL_INTERFACE", desc: "Developing next-gen data streaming UI." }
    ]
  },
  home: {
    hero: {
      tag: "Agent_Specter",
      title: "Tactical UI Architect",
      desc: "Building high-performance, data-driven interfaces for the next generation of mission control systems.",
    },
    feed: ['SYSTEM_READY', 'WAITING_FOR_DATA...']
  },
  experience: [
    {
      title: "Lead Architect",
      company: "NeuroTech Systems",
      period: "2022 - PRESENT",
      description: [
        "Architecting high-performance neural interfaces for real-time data processing.",
        "Engineering scalable micro-frontend architectures with 40% increased throughput.",
        "Leading a mission-critical team of 15+ developers on global infrastructure."
      ]
    },
    {
      title: "Senior Developer",
      company: "CyberNode Solutions",
      period: "2020 - 2022",
      description: [
        "Developed responsive dashboard systems for high-density telemetric visualization.",
        "Integrated advanced security protocols and blockchain-based authentication.",
        "Refactored legacy UI components into a modular atomic design system."
      ]
    },
    {
      title: "Junior Engineer",
      company: "DataSync Global",
      period: "2018 - 2020",
      description: [
        "Constructed low-latency frontend modules using modern React frameworks.",
        "Automated deployment pipelines reducing delivery cycles by 30%.",
        "Optimized database queries and frontend state management for large datasets."
      ]
    }
  ],
  social: {
    links: [
      { id: 1, platform: 'LinkedIn', icon: 'linkedin', url: '#' },
      { id: 2, platform: 'GitHub', icon: 'github', url: '#' },
      { id: 3, platform: 'X', icon: 'x', url: '#' }
    ]
  },
  theme: 'AGENT_SPECTER',
  skills: [
    {
      id: 'languages',
      label: 'CORE_LANGUAGES',
      tag: '[LANG_NODE_01]',
      skills: [
        { name: 'Python',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
        { name: 'JavaScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
        { name: 'Rust',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg' },
        { name: 'C++',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
        { name: 'Java',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
        { name: 'Go',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg' },
        { name: 'PHP',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
        { name: 'Swift',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg' },
        { name: 'HTML5',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
        { name: 'CSS3',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      ]
    },
    {
      id: 'frontend',
      label: 'FRONTEND_STACK',
      tag: '[FRONT_NODE_02]',
      skills: [
        { name: 'React',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
        { name: 'Next.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
        { name: 'Vue',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
        { name: 'Svelte',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg' },
        { name: 'Tailwind',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Three.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg' },
        { name: 'Redux',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg' },
        { name: 'Framer Motion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg' },
        { name: 'Bootstrap',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },
      ]
    },
    {
      id: 'backend',
      label: 'BACKEND_INFRA',
      tag: '[BACK_NODE_03]',
      skills: [
        { name: 'Node.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
        { name: 'Express',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
        { name: 'Django',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg' },
        { name: 'Flask',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg' },
        { name: 'MongoDB',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
        { name: 'PostgreSQL',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
        { name: 'MySQL',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
        { name: 'Redis',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
        { name: 'GraphQL',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg' },
        { name: 'Firebase',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
        { name: 'Supabase',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
      ]
    },
    {
      id: 'tools',
      label: 'TOOLS_&_DEVOPS',
      tag: '[TOOL_NODE_04]',
      skills: [
        { name: 'Git',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
        { name: 'GitHub',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
        { name: 'Docker',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
        { name: 'Kubernetes',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg' },
        { name: 'Vercel',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },
        { name: 'AWS',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
        { name: 'Linux',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
        { name: 'VS Code',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
      ]
    },
    {
      id: 'design',
      label: 'DESIGN_SYSTEMS',
      tag: '[DSIGN_NODE_05]',
      skills: [
        { name: 'Figma',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
        { name: 'Adobe XD',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/adobexd/adobexd-original.svg' },
        { name: 'Photoshop',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg' },
        { name: 'Illustrator', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg' },
        { name: 'Blender',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg' },
      ]
    },
  ],
  projects: [
    {
      id: 1,
      title: "Neural Dashboard",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      tags: ["React", "WebGL", "Rust"],
      link: "#"
    },
    {
      id: 2,
      title: "Specter Logic",
      category: "Security",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      tags: ["Next.js", "Solidity"],
      link: "#"
    }
  ],
  pageHeaders: {
    home:       { line1: 'DESIGNING', line2: 'SYSTEMS' },
    about:      { line1: 'DATA_DRIVEN', line2: 'IDENTITY' },
    experience: { line1: 'OPERATIONAL_', line2: 'ARC' },
    projects:   { line1: 'ARTIFACT_', line2: 'REGISTRY' },
    skills:     { line1: 'SKILL_', line2: 'SET' },
    connect:    { line1: 'UPLINK_', line2: 'SIGNAL' },
  }
};

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    // Try to load local first for immediate render
    const saved = localStorage.getItem('portfolio_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_config')
          .select('data')
          .eq('id', 1)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Supabase fetch error:', error);
          return;
        }

        if (data && data.data && Object.keys(data.data).length > 0) {
          setConfig(data.data);
          localStorage.setItem('portfolio_config', JSON.stringify(data.data));
        } else {
          // If DB is empty, sync INITIAL_CONFIG to Supabase
          console.log("Empty DB detected, syncing initial config...");
          await supabase
            .from('portfolio_config')
            .upsert({ id: 1, data: INITIAL_CONFIG });
        }
      } catch (err) {
        console.error('Error loading config:', err);
      }
    };

    loadConfig();
  }, []);

  const updateConfig = (newConfig) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      
      // Update local storage for immediate persistence
      localStorage.setItem('portfolio_config', JSON.stringify(updated));
      
      // Sync to Supabase
      supabase
        .from('portfolio_config')
        .upsert({ id: 1, data: updated })
        .then(({ error }) => {
          if (error) console.error("Supabase Save Error:", error);
        });

      return updated;
    });
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, THEME_PRESETS }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
