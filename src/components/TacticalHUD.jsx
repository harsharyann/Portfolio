import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TacticalHUD = () => {
    const [scrollPercent, setScrollPercent] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollPercent(Math.round(scrolled));
        };

        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="fixed bottom-8 left-8 z-[100] pointer-events-none hidden md:block">
            <div className="flex flex-col gap-4">
                {/* Scroll Telemetry */}
                <div className="flex flex-col gap-1 font-mono">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[var(--cmd-accent)] animate-pulse" />
                        <span className="text-[10px] text-[var(--cmd-accent)]/60 tracking-widest">DATA_FEED_SCROLL</span>
                    </div>
                    <div className="text-xl font-bold text-[var(--cmd-accent)]">
                        {scrollPercent.toString().padStart(3, '0')}%
                    </div>
                    <div className="w-32 h-[2px] bg-white/10 relative overflow-hidden">
                        <motion.div 
                            className="absolute inset-y-0 left-0 bg-[var(--cmd-accent)]"
                            animate={{ width: `${scrollPercent}%` }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        />
                    </div>
                </div>

                {/* System Stats */}
                <div className="flex flex-col gap-1 font-mono">
                    <span className="text-[10px] text-[var(--cmd-accent)]/60 tracking-widest uppercase">Uplink_Timestamp</span>
                    <span className="text-[10px] text-[var(--cmd-accent)]">
                        {currentTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                    <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map(i => (
                            <motion.div 
                                key={i}
                                className="w-2 h-1 bg-[var(--cmd-accent)]/20"
                                animate={{ 
                                    backgroundColor: i <= (scrollPercent / 20) + 1 ? 'var(--cmd-accent)' : 'rgba(255,255,255,0.2)'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Corner Bracket Decor */}
            <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-2 border-l-2 border-[var(--cmd-accent)]/20 pointer-events-none" />
        </div>
    );
};

export default TacticalHUD;
