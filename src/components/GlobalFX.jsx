import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlobalFX: High-fidelity post-processing layer.
 * Injects film grain noise and CRT scanlines based on the adaptive theme engine.
 */
const GlobalFX = () => {
    return (
        <div className="fixed inset-0 z-[999] pointer-events-none select-none overflow-hidden">
            
            {/* ── FILM GRAIN / NOISE LAYER ── */}
            <div 
                className="absolute inset-0 grayscale opacity-[var(--cmd-noise)] mix-blend-overlay"
                style={{ 
                    backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
                    pointerEvents: 'none'
                }} 
            />

            {/* ── CRT SCANLINES ── */}
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{ 
                    background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                    backgroundSize: '100% 2px, 3px 100%',
                    opacity: 'calc(var(--fx-scanlines) * 0.4)',
                    pointerEvents: 'none'
                }} 
            />

            {/* ── DYNAMIC VIGNETTE ── */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.4)_100%)] mix-blend-multiply opacity-50" />

            {/* ── ADAPTIVE GLOW BLOOM (Only for high-glow segments like NEON) ── */}
            <motion.div 
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-[var(--cmd-glow)]/5 mix-blend-screen pointer-events-none"
                style={{ opacity: 'calc(var(--fx-scanlines) * 0.1)' }} // Only visible when scanlines are active
            />

        </div>
    );
};

export default GlobalFX;
