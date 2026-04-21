import React, { useState, useEffect, useMemo } from 'react';

/* ─────────────────────────────────────
   DEFAULT boot messages (fallback if
   config isn't loaded yet)
───────────────────────────────────── */
export const DEFAULT_BOOT_MESSAGES = [
  'KERNEL_INIT: LOADING_MODULES...',
  'SYSCALL: ALLOCATING_MEMORY_BUFFERS',
  'NET_IFACE: ESTABLISHING_UPLINK...',
  'CRYPTO: GENERATING_SESSION_KEYS',
  'AUTH: VALIDATING_NODE_IDENTITY...',
  'DNS_RESOLVER: NODE_ALPHA_77_FOUND',
  'TLS_HANDSHAKE: ENCRYPTION_ACTIVE',
  'FIREWALL: ALL_PORTS_SECURED',
  'GPU_CORE: 3D_ENGINE_INITIALISED',
  'ACCESS_GRANTED: WELCOME_OPERATIVE',
];



/* ─────────────────────────────────────
   Glitch text hook
───────────────────────────────────── */
const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?<>';
const useGlitchText = (text, active = true) => {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let frame = 0;
    const itr = setInterval(() => {
      if (frame > 6) { setDisplay(text); clearInterval(itr); return; }
      setDisplay(text.split('').map((c, i) =>
        i < frame * 2 ? c : (Math.random() > 0.5 ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] : c)
      ).join(''));
      frame++;
    }, 40);
    return () => clearInterval(itr);
  }, [text, active]);
  return display;
};

/* ─────────────────────────────────────
   Matrix rain column
───────────────────────────────────── */
const MatrixColumn = ({ x, speed, chars }) => {
  const [offset, setOffset] = useState(Math.random() * -100);
  useEffect(() => {
    const id = setInterval(() => setOffset(o => o + speed), 60);
    return () => clearInterval(id);
  }, [speed]);

  const col = Math.floor(chars.length * Math.random());
  return (
    <div
      className="absolute text-[8px] font-mono text-[#00E5FF]/20 select-none leading-[1.2]"
      style={{ left: x, top: 0, transform: `translateY(${offset % window.innerHeight}px)`, writingMode: 'vertical-lr' }}
    >
      {chars.slice(col, col + 15).join('')}
    </div>
  );
};

/* ─────────────────────────────────────
   Main Loading Screen
───────────────────────────────────── */
const LoadingScreen = ({ onComplete, bootMessages }) => {
  const messages = (Array.isArray(bootMessages) && bootMessages.length > 0)
    ? bootMessages
    : DEFAULT_BOOT_MESSAGES;

  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [currentMsg, setCurrentMsg] = useState('INITIALIZING...');
  const [showMatrix, setShowMatrix] = useState(true);

  const glitched = useGlitchText(currentMsg, logs.length > 0 && logs.length % 3 === 0);

  /* Matrix columns */
  const columns = useMemo(() => {
    const cols = [];
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const GLITCH_POOL = '01アイウエオカキクケコサシスセソABCDE<>{}[];:#$'.split('');
    for (let x = 0; x < w; x += 24) {
      cols.push({ x, speed: 1 + Math.random() * 3, chars: GLITCH_POOL });
    }
    return cols;
  }, []);

  /* Boot sequence */
  useEffect(() => {
    let idx = 0;
    const run = () => {
      if (idx < messages.length) {
        const msg = messages[idx];
        setLogs(prev => [...prev, { text: msg, idx }]);
        setCurrentMsg(msg);
        setProgress(Math.floor(((idx + 1) / messages.length) * 100));
        idx++;
        setTimeout(run, 200 + Math.random() * 120);
      } else {
        setTimeout(() => { setIsFinished(true); setShowMatrix(false); }, 400);
        setTimeout(() => { if (typeof onComplete === 'function') onComplete(); }, 1400);
      }
    };
    const t = setTimeout(run, 300);
    return () => clearTimeout(t);
  }, [messages, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020810] overflow-hidden select-none">

      {/* ── Matrix rain background ── */}
      <div className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${showMatrix ? 'opacity-100' : 'opacity-0'}`}>
        {columns.map((c, i) => <MatrixColumn key={i} {...c} />)}
      </div>


      {/* ── Scan lines ── */}
      <div className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
        }}
      />

      {/* ── Terminal Panel ── */}
      <div className="absolute inset-0 z-30 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">

          {/* Header bar */}
          <div className="flex items-center gap-2 bg-[#00E5FF]/10 border border-[#00E5FF]/20 px-4 py-2 mb-0">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="ml-3 text-[9px] font-mono text-[#00E5FF]/50 tracking-widest uppercase">
              GHOST_TERMINAL — SECURE_BOOT_v5.0
            </span>
          </div>

          {/* Terminal body */}
          <div className="bg-black/80 border border-[#00E5FF]/20 border-t-0 p-6 backdrop-blur-xl">

            {/* Glitch title */}
            <div className="text-[11px] font-mono text-[#FFB300] tracking-[0.5em] uppercase mb-5 flex items-center gap-3">
              <span className="animate-pulse">▶</span>
              <span>{glitched}</span>
            </div>

            {/* Log feed */}
            <div className="h-44 overflow-y-auto scrollbar-none space-y-1 mb-5 font-mono text-[10px]">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-3 items-start" style={{ animation: 'fade-in 0.2s ease-out' }}>
                  <span className="text-[#00E5FF]/30 tabular-nums shrink-0">[{String(i).padStart(2,'0')}]</span>
                  <span className="text-[#00E5FF]/30">$</span>
                  <span className={
                    log.text.includes('GRANTED') || log.text.includes('WELCOME')
                      ? 'text-[#FFB300] font-bold'
                      : log.text.includes('ERROR') || log.text.includes('FAIL')
                      ? 'text-red-400'
                      : 'text-[#00E5FF]/70'
                  }>
                    {log.text}
                  </span>
                </div>
              ))}
              {/* blinking cursor */}
              {!isFinished && (
                <div className="flex gap-3 items-center">
                  <span className="text-[#00E5FF]/30 tabular-nums">[{String(logs.length).padStart(2,'0')}]</span>
                  <span className="text-[#00E5FF]/30">$</span>
                  <span className="w-2 h-3 bg-[#00E5FF] animate-pulse"></span>
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest">
                <span className="text-white/20">LOADING_KERNEL</span>
                <span className="text-[#FFB300] font-bold tabular-nums">{progress}%</span>
              </div>
              <div className="w-full h-[3px] bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-[#00E5FF] shadow-[0_0_12px_#00E5FF] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {/* chunky block progress */}
              <div className="flex gap-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-1 transition-all duration-200"
                    style={{
                      background: i < Math.floor(progress / 5)
                        ? '#FFB300'
                        : 'rgba(255,255,255,0.05)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom status */}
          <div className="flex justify-between items-center px-4 py-2 bg-[#FFB300]/5 border border-[#FFB300]/10 border-t-0">
            <span className="text-[8px] font-mono text-white/15 uppercase tracking-widest">
              SYS::HARSH_ARYAN // NODE_ALPHA_77
            </span>
            <span className="text-[8px] font-mono text-[#FFB300]/40 uppercase tracking-widest animate-pulse">
              {isFinished ? 'ACCESS_GRANTED ✓' : 'AUTHENTICATING...'}
            </span>
          </div>

          {/* Final message */}
          {isFinished && (
            <div className="text-center py-8 animate-fade-in">
              <div className="text-4xl md:text-6xl font-mono font-black text-[#FFB300] tracking-[0.2em] uppercase drop-shadow-[0_0_30px_rgba(255,179,0,0.6)]">
                ACCESS<br/>GRANTED
              </div>
              <div className="text-[10px] font-mono text-white/30 tracking-[0.6em] uppercase mt-4">
                // Initializing_Mission_Control //
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
