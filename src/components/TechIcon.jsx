import React, { useState } from 'react';

export const TechIcon = ({ name, size = 16, className = "", color = "white" }) => {
  const [error, setError] = useState(false);
  if (!name) return null;
  const normalizedKey = name.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  
  // Custom mapping for common aliases to match simple-icons IDs
  const aliasMap = {
    'c++': 'cplusplus',
    'cpp': 'cplusplus',
    'js': 'javascript',
    'ts': 'typescript',
    'nodejs': 'nodedotjs',
    'vue': 'vuedotjs',
    'premiere': 'premierepro',
  };

  const iconName = aliasMap[normalizedKey] || normalizedKey;
  // Simple Icons CDN format: .../iconName/colorHex (without #)
  const hexColor = color.startsWith('#') ? color.slice(1) : color;
  const cdnUrl = `https://cdn.simpleicons.org/${iconName}/${hexColor}`;

  if (error) {
    return (
      <div className={`flex items-center justify-center font-mono text-[9px] border border-white/20 px-1 rounded bg-white/5 uppercase tracking-widest ${className}`} style={{ height: size, minWidth: size }}>
        {name.substring(0, 3)}
      </div>
    );
  }

  return (
    <img 
      src={cdnUrl} 
      alt={name} 
      className={className} 
      style={{ width: size, height: size, objectFit: 'contain' }}
      onError={() => setError(true)}
    />
  );
};

export const parseTechStack = (techStackString) => {
  if (!techStackString) return [];
  return techStackString.split(',').map(s => s.trim()).filter(Boolean);
};
