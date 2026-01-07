'use client';

import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
    reveal?: boolean; // If true, triggers on mount. If false, text is static until hovered/triggered
    hover?: boolean;  // If true, glitches on hover
}

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function GlitchText({
    text,
    className = "",
    reveal = true,
    hover = false
}: GlitchTextProps) {
    const [displayText, setDisplayText] = useState(reveal ? '' : text);
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        if (reveal) {
            runGlitchEffect();
        }
    }, [text]);

    const runGlitchEffect = () => {
        if (isGlitching) return;
        setIsGlitching(true);

        const duration = 1000; // ms
        const steps = 15;
        const speed = duration / steps;
        let iteration = 0;

        const interval = setInterval(() => {
            setDisplayText(prev =>
                text
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) return text[index];
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join('')
            );

            iteration += 1 / 2; // Slow down the reveal

            if (iteration >= text.length) {
                clearInterval(interval);
                setDisplayText(text);
                setIsGlitching(false);
            }
        }, 50);

        // Cleanup
        return () => clearInterval(interval);
    };

    const handleMouseEnter = () => {
        if (hover && !isGlitching) {
            runGlitchEffect();
        }
    };

    return (
        <span
            className={`${className} inline-block font-mono`}
            onMouseEnter={handleMouseEnter}
        >
            {displayText}
        </span>
    );
}
