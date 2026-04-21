import React, { useState, useEffect, useCallback } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+';

const TextScramble = ({ text, autostart = false, speed = 40 }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);

    const scramble = useCallback(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(prev => 
                text.split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, speed);
    }, [text, speed]);

    useEffect(() => {
        if (autostart) scramble();
    }, [autostart, scramble]);

    return (
        <span 
            onMouseEnter={() => {
                setIsHovering(true);
                scramble();
            }}
            onMouseLeave={() => setIsHovering(false)}
            className="font-mono transition-colors duration-300"
        >
            {displayText}
        </span>
    );
};

export default TextScramble;
