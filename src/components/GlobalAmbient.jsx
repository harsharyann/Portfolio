import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Satellite, Zap, Plane } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

const GlobalAmbient = () => {
    const { config } = useConfig();
    const themeKey = config.theme || 'AGENT_SPECTER';

    // Generate static nodes once to avoid re-renders
    const nodes = useMemo(() => {
        return Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 10 + 20,
            delay: Math.random() * 10
        }));
    }, []);

    const assets = useMemo(() => {
        return [
            { icon: Rocket, delay: 0, duration: 25, y: 15 },
            { icon: Satellite, delay: 8, duration: 35, y: 65 },
            { icon: Plane, delay: 15, duration: 45, y: 40 },
            { icon: Zap, delay: 4, duration: 20, y: 80 }
        ];
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[var(--cmd-navy)]">
            {/* ── DYNAMIC STELLAR GRID ── */}
            <div style={{ opacity: 'var(--fx-stars)' }}>
                {nodes.map(node => (
                    <motion.div
                        key={node.id}
                        initial={{ opacity: 0.1 }}
                        animate={{ 
                            opacity: [0.1, 0.5, 0.1],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{ 
                            duration: node.duration / 4, 
                            repeat: Infinity, 
                            delay: node.delay,
                            ease: "easeInOut" 
                        }}
                        style={{
                            position: 'absolute',
                            left: `${node.x}%`,
                            top: `${node.y}%`,
                            width: `${node.size}px`,
                            height: `${node.size}px`,
                            backgroundColor: 'var(--cmd-accent)',
                            borderRadius: '50%',
                            boxShadow: '0 0 10px var(--cmd-accent)',
                        }}
                    />
                ))}
            </div>

            {/* ── ORBITAL ASSETS (Ships/Aircrafts) ── */}
            <div style={{ opacity: 'var(--fx-stars)' }}>
                {assets.map((Asset, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: '-10%', opacity: 0 }}
                        animate={{ 
                            x: '110%',
                            opacity: [0, 0.4, 0.4, 0],
                        }}
                        transition={{ 
                            duration: Asset.duration, 
                            repeat: Infinity, 
                            delay: Asset.delay,
                            ease: "linear" 
                        }}
                        style={{
                            position: 'absolute',
                            top: `${Asset.y}%`,
                        }}
                        className="flex flex-col items-center gap-2"
                    >
                        <Asset.icon size={16} className="text-[var(--cmd-accent)] -rotate-45" style={{ filter: 'drop-shadow(0 0 8px var(--cmd-glow))' }} />
                        <div className="w-[1px] h-20 bg-gradient-to-t from-transparent via-[var(--cmd-accent)]/20 to-transparent" />
                    </motion.div>
                ))}
            </div>

            {/* ── NEBULA BLOBS (Follows Palette) ── */}
            <div style={{ opacity: 'var(--fx-nebula)' }}>
                <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.03, 0.08, 0.03],
                    x: ['-10%', '0%', '-10%'],
                    y: ['-10%', '0%', '-10%']
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full opacity-5 pointer-events-none"
                style={{ 
                    background: 'radial-gradient(circle, var(--cmd-glow) 0%, transparent 70%)',
                    filter: 'blur(100px)' 
                }} 
                />
                
                <motion.div 
                animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.02, 0.05, 0.02],
                    x: ['10%', '0%', '10%'],
                    y: ['10%', '0%', '10%']
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] rounded-full opacity-5 pointer-events-none"
                style={{ 
                    background: 'radial-gradient(circle, var(--cmd-accent) 0%, transparent 70%)',
                    filter: 'blur(120px)' 
                }} 
                />
            </div>

            {/* Scanning Line */}
            <motion.div 
                animate={{ y: ['-100%', '300%'] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--cmd-accent)]/10 to-transparent z-[1] shadow-[0_0_15px_var(--cmd-accent)]"
                style={{ opacity: 'calc(var(--fx-scanlines) * 0.2)' }}
            />
        </div>
    );
};

export default GlobalAmbient;
