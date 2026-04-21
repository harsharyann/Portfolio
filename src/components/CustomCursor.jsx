import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 450 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const ringSpringConfig = { damping: 35, stiffness: 250 };
    const ringX = useSpring(mouseX, ringSpringConfig);
    const ringY = useSpring(mouseY, ringSpringConfig);

    useEffect(() => {
        const moveMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('button, a, .interactive')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999] hidden lg:block">
            {/* Main Dot */}
            <motion.div
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                className="absolute w-1.5 h-1.5 bg-[var(--cmd-accent)] rounded-full shadow-[0_0_10px_var(--cmd-accent)]"
            />

            {/* Tactical Ring */}
            <motion.div
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovered ? 2 : 1,
                    rotate: isHovered ? 90 : 0,
                    opacity: isHovered ? 0.8 : 0.4,
                }}
                className="absolute w-8 h-8 border border-[var(--cmd-accent)] rounded-full"
            >
                {/* Crosshairs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-[var(--cmd-accent)]/50" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-[var(--cmd-accent)]/50" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-[var(--cmd-accent)]/50" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-[var(--cmd-accent)]/50" />
            </motion.div>

            {/* Trailing Label */}
            <motion.div
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '20px',
                    translateY: '20px',
                }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.8,
                }}
                className="absolute whitespace-nowrap font-mono text-[10px] text-[var(--cmd-accent)] bg-black/80 px-1.5 py-0.5 border border-[var(--cmd-accent)]/30 backdrop-blur-sm"
            >
                INTERACTIVE_LINK_NODE
            </motion.div>
        </div>
    );
};

export default CustomCursor;
