import React, { createContext, useContext, useState, useEffect } from 'react';

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
        { name: 'Vite',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg' },
        { name: 'Tailwind',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Three.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg' },
        { name: 'Redux',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg' },
      ]
    },
    {
      id: 'backend',
      label: 'BACKEND_INFRA',
      tag: '[BACK_NODE_03]',
      skills: [
        { name: 'Node.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
        { name: 'Express',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
        { name: 'MongoDB',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
        { name: 'PostgreSQL',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
        { name: 'Redis',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
        { name: 'GraphQL',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg' },
        { name: 'Docker',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
      ]
    },
    {
      id: 'tools',
      label: 'TOOLS_&_DEVOPS',
      tag: '[TOOL_NODE_04]',
      skills: [
        { name: 'Git',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
        { name: 'GitHub',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
        { name: 'VS Code',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
        { name: 'Linux',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
        { name: 'AWS',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
        { name: 'Firebase',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
        { name: 'Postman',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
      ]
    },
    {
      id: 'design',
      label: 'DESIGN_SYSTEMS',
      tag: '[DSIGN_NODE_05]',
      skills: [
        { name: 'Figma',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
        { name: 'Canva',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg' },
        { name: 'Illustrator', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg' },
        { name: 'Photoshop',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg' },
        { name: 'Premiere',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg' },
        { name: 'After Effects',icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg' },
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
    const saved = localStorage.getItem('portfolio_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem('portfolio_config', JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
