import React from 'react';
import { Link } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import BrandIcon from './BrandIcon';
import { Terminal } from 'lucide-react';

const Footer = () => {
  const { config } = useConfig();
  const footer = config.footer || {};

  return (
    <footer className="w-full bg-[var(--cmd-navy)] border-t-2 border-white/5 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      />
      {/* Animated scan line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--cmd-yellow)]/40 to-transparent animate-scan-slow" />



      {/* Bottom bar */}
      <div className="border-t border-white/5 px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 bg-black/20 backdrop-blur-3xl">

        {/* Status */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <span className="font-mono text-[9px] tracking-[0.4em] text-white/40 uppercase">
              {footer.statusLine || 'Mission_Status: Active'}
            </span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
          <div className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase hidden lg:block italic">
            // {footer.protocol || 'Protocol_v5.0_STRIKE // Node: Alpha_Sigma_77'}
          </div>
        </div>

        {/* Social links from config */}
        <div className="flex items-center gap-5">
          {(config.social?.links || []).slice(0, 5).map(link => (
            <a
              key={link.id}
              href={link.url.startsWith('http') || link.url.startsWith('mailto') ? link.url : `https://${link.url}`}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-1 transition-all"
            >
              <div 
                className="w-8 h-8 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-all relative"
                title={link.platform}
              >
                <BrandIcon type={link.icon} size={15} colorFill={false} />
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-full scale-110 group-hover:scale-100 transition-all" />
              </div>
            </a>
          ))}
        </div>

        {/* Version badge + Admin link */}
        <div className="flex items-center gap-3">

          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-3 py-2 border border-[var(--cmd-yellow)]/20 text-[var(--cmd-yellow)]/50 hover:text-[var(--cmd-yellow)] hover:border-[var(--cmd-yellow)]/60 hover:bg-[var(--cmd-yellow)]/5 transition-all rounded-sm"
            title="Ghost Admin"
          >
            <Terminal size={13} />
            <span className="text-[8px] font-mono tracking-widest uppercase hidden sm:block">Admin</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
