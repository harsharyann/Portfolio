import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import BrandIcon from '../components/BrandIcon';
import { Mail, AlertCircle, X, Send, ShieldCheck, Activity, Zap, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Connect = () => {
  const { config, updateConfig } = useConfig();
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmitted, setTransmitted] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleTransmit = (e) => {
    e.preventDefault();
    const currentSignals = config.signals || [];
    if (currentSignals.length >= 10) { setShowLimitModal(true); return; }

    setIsTransmitting(true);
    setTransmitted(false);

    setTimeout(() => {
      setIsTransmitting(false);
      setTransmitted(true);
      const newSignal = { id: Date.now(), ...formData, timestamp: new Date().toLocaleString(), status: 'ENCRYPTED' };
      updateConfig({ signals: [...currentSignals, newSignal] });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setTransmitted(false), 4000);
    }, 2500);
  };

  const socialLinks = config.social?.links || [];

  return (
    <main id="uplink" className="pt-32 pb-40 px-6 lg:px-12 min-h-screen relative overflow-hidden bg-[#050505]">

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Limit Modal */}
      <AnimatePresence>
        {showLimitModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
          >
            <div className="max-w-md w-full bg-black border border-white/10 p-10 relative">
              <button onClick={() => setShowLimitModal(false)} className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors">
                <X size={20} />
              </button>
              <div className="flex flex-col items-center text-center">
                <AlertCircle size={32} className="text-white/30 animate-pulse mb-8" />
                <h2 className="font-headline text-2xl tracking-tighter text-white uppercase font-black mb-4">UPLINK_CAPACITY_FULL</h2>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-10 leading-relaxed">
                  Use priority mail channel for direct uplink.
                </p>
                <a href={`mailto:${config.contact?.email || 'harsh@domain.com'}`}
                  className="w-full py-4 bg-white text-black font-mono font-black text-[10px] tracking-[0.3em] uppercase hover:bg-white/80 transition-all flex items-center justify-center gap-3">
                  <Mail size={14} /> DIRECT_MAIL_UPLINK
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1500px] mx-auto w-full relative z-10">

        {/* ── CONNECT HERO [UPLINK_HERO] ── */}
        <header className="mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px] bg-white/20" />
            <Radio size={12} className="text-white/40 animate-pulse" />
            <span className="text-[10px] font-mono text-white/40 tracking-[0.8em] uppercase">SECURE_UPLINK_PROTOCOL</span>
          </div>
          <div className="flex flex-col lg:flex-row items-end justify-between gap-6">
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              {config.pageHeaders?.connect?.line1 || 'UPLINK_'}<span className="text-transparent" style={{ WebkitTextStroke: '1px #ffffff22' }}>{config.pageHeaders?.connect?.line2 || 'SIGNAL'}</span>
            </h1>
            <p className="text-[11px] font-mono text-white/30 tracking-[0.3em] uppercase max-w-md text-right italic leading-relaxed">
              All transmissions are encrypted and routed through secure architecture nodes.
            </p>
          </div>
          <div className="mt-10 h-[1px] w-full bg-white/5" />
        </header>

        {/* ── MAIN GRID [CONNECT_GRID] ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT: CONTACT FORM [SIGNAL_FORM] */}
          <div className="lg:col-span-7">
            <div className="relative bg-black border border-white/5 p-10 lg:p-14 h-full">
              <div className="absolute top-4 right-8 text-[7px] font-mono text-white/10 tracking-[0.5em] uppercase">[SIGNAL_FORM]</div>

              {/* Form Header */}
              <div className="flex items-center justify-between mb-12 pb-8 border-b border-white/5">
                <div>
                  <h2 className="font-headline text-2xl text-white font-black uppercase tracking-tighter mb-1">OUTBOUND_SIGNAL</h2>
                  <div className="flex items-center gap-3">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
                      className="w-1.5 h-1.5 bg-[#00ff8d] rounded-full shadow-[0_0_6px_#00ff8d]" />
                    <span className="text-[8px] font-mono text-white/30 tracking-[0.4em] uppercase">STATUS: READY_v9</span>
                  </div>
                </div>
                <ShieldCheck size={24} className="text-white/10" />
              </div>

              {/* Form */}
              <form onSubmit={handleTransmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">// Identity_Protocol</label>
                    <input
                      type="text" required disabled={isTransmitting}
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/[0.02] border border-white/5 p-5 text-white font-mono text-xs focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10 tracking-widest"
                      placeholder="NAME_OR_CLASS..."
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">// Return_Coordinates</label>
                    <input
                      type="email" required disabled={isTransmitting}
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/[0.02] border border-white/5 p-5 text-white font-mono text-xs focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10 tracking-widest"
                      placeholder="SECURE_EMAIL_ROUTE..."
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">// Intelligence_Payload</label>
                  <textarea
                    required rows="7" disabled={isTransmitting}
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/5 p-5 text-white font-mono text-xs focus:outline-none focus:border-white/20 transition-all resize-none placeholder:text-white/10 tracking-widest leading-relaxed"
                    placeholder="DETAIL_MISSION_PARAMETERS..."
                  />
                </div>

                {/* Submit Button */}
                <div className="relative overflow-hidden">
                  <button
                    type="submit" disabled={isTransmitting || transmitted}
                    className="w-full bg-white text-black font-mono font-black text-[11px] tracking-[0.4em] uppercase py-6 hover:bg-white/80 transition-all disabled:opacity-50 flex items-center justify-center gap-4 group"
                  >
                    {isTransmitting ? (
                      <><Activity size={16} className="animate-spin" /> ENCRYPTING_SIGNAL...</>
                    ) : transmitted ? (
                      <><ShieldCheck size={16} /> TRANSMISSION_SECURED</>
                    ) : (
                      <><Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> TRANSMIT_SIGNAL</>
                    )}
                  </button>

                  {/* Transmitted stamp */}
                  <AnimatePresence>
                    {transmitted && (
                      <motion.div initial={{ opacity: 0, scale: 2, rotate: -15 }} animate={{ opacity: 1, scale: 1, rotate: -15 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="border-4 border-white text-white px-10 py-4 font-headline font-black text-5xl tracking-[0.4em] uppercase bg-black/90">
                          SENT
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT: SOCIAL LINKS + INFO [LINK_PANEL] */}
          <div className="lg:col-span-5 flex flex-col gap-8">

            {/* Direct Links [SOCIAL_NODES] */}
            <div className="relative bg-black border border-white/5 p-10 flex flex-col gap-8">
              <div className="absolute top-4 right-8 text-[7px] font-mono text-white/10 tracking-[0.5em] uppercase">[SOCIAL_NODES]</div>
              <div>
                <h3 className="font-headline text-xl text-white font-black uppercase tracking-tighter mb-1">DIRECT_ACCESS</h3>
                <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">External network nodes</p>
              </div>

              <div className="flex flex-col gap-4">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={link.url} target="_blank" rel="noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex items-center justify-between px-6 py-5 border border-white/5 hover:border-white/30 bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-500"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-8 h-8 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <BrandIcon type={link.icon} size={22} colorFill />
                      </div>
                      <span className="font-mono font-black text-[11px] text-white/50 group-hover:text-white uppercase tracking-[0.3em] transition-colors">
                        {link.platform}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                      <span className="text-[7px] font-mono text-white/40 uppercase tracking-widest">ACCESS_NODE</span>
                      <Zap size={10} className="text-white/40" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Email Direct [EMAIL_NODE] */}
            <div className="relative bg-black border border-white/5 p-10 flex flex-col gap-6">
              <div className="absolute top-4 right-8 text-[7px] font-mono text-white/10 tracking-[0.5em] uppercase">[EMAIL_NODE]</div>
              <div>
                <h3 className="font-headline text-xl text-white font-black uppercase tracking-tighter mb-1">PRIORITY_MAIL</h3>
                <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Direct encrypted channel</p>
              </div>
              <a href={`mailto:${config.contact?.email || 'harsh@domain.com'}`}
                className="flex items-center justify-between px-6 py-5 bg-white text-black font-mono font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/80 transition-all group">
                <div className="flex items-center gap-4">
                  <Mail size={14} />
                  <span>{config.contact?.email || 'MAIL_UPLINK'}</span>
                </div>
                <Zap size={12} className="group-hover:scale-125 transition-transform" />
              </a>
            </div>

            {/* Footer Auth [AUTH_STATUS] */}
            <div className="border border-white/5 bg-white/[0.01] px-8 py-5 flex items-center justify-between">
              <div className="text-[7px] font-mono text-white/20 uppercase tracking-[0.4em]">[AUTH_STATUS]</div>
              <div className="flex items-center gap-3">
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-1 rounded-full bg-[#00ff8d]" />
                <span className="text-[7px] font-mono text-white/30 uppercase tracking-widest">UPLINK_ESTABLISHED</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default Connect;
