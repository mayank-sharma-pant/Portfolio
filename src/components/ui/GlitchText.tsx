'use client';

import React, { useState, useEffect, useRef } from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
    reveal?: boolean; // If true, triggers on mount. If false, text is static until hovered/triggered
    hover?: boolean;  // If true, glitches on hover
    intensity?: 'low' | 'medium' | 'high';
}

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const GLITCH_CHARS = '░▒▓█▄▀■□▪▫▬▭▮▯▰▱▲►▼◄◊○●◘◙◚◛◜◝◞◟◠◡◢◣◤◥◦◧◨◩◪◫◬◭◮◯◰◱◲◳◴◵◶◷◸◹◺◻◼◽◾◿';

export default function GlitchText({
    text,
    className = "",
    reveal = true,
    hover = false,
    intensity = 'medium'
}: GlitchTextProps) {
    const [displayText, setDisplayText] = useState(reveal ? '' : text);
    const [isGlitching, setIsGlitching] = useState(false);
    const [glitchLayers, setGlitchLayers] = useState<string[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const intensitySettings = {
        low: { duration: 800, steps: 12, glitchChance: 0.02 },
        medium: { duration: 1000, steps: 15, glitchChance: 0.05 },
        high: { duration: 1200, steps: 20, glitchChance: 0.08 }
    };

    const settings = intensitySettings[intensity];

    useEffect(() => {
        if (reveal) {
            runGlitchEffect();
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
        };
    }, [text]);

    const generateGlitchText = (originalText: string, progress: number) => {
        return originalText
            .split('')
            .map((char, index) => {
                if (index < progress) return char;

                // Random glitch effects
                if (Math.random() < settings.glitchChance) {
                    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                }

                return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('');
    };

    const runGlitchEffect = () => {
        if (isGlitching) return;
        setIsGlitching(true);

        let iteration = 0;
        const maxIterations = text.length * 2;

        intervalRef.current = setInterval(() => {
            const progress = (iteration / maxIterations) * text.length;

            setDisplayText(prev => generateGlitchText(text, progress));

            // Create glitch layers for visual effect
            if (Math.random() < 0.3) {
                setGlitchLayers(prev => [
                    ...prev.slice(-2), // Keep only last 2 layers
                    generateGlitchText(text, progress)
                ]);
            }

            iteration++;

            if (iteration >= maxIterations) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplayText(text);
                setGlitchLayers([]);
                setIsGlitching(false);

                // Occasional sustained glitch
                if (Math.random() < 0.1) {
                    glitchTimeoutRef.current = setTimeout(() => {
                        runSustainedGlitch();
                    }, Math.random() * 3000 + 1000);
                }
            }
        }, settings.duration / settings.steps);
    };

    const runSustainedGlitch = () => {
        if (isGlitching) return;
        setIsGlitching(true);

        let glitchCount = 0;
        const maxGlitches = 3 + Math.random() * 5;

        const glitchInterval = setInterval(() => {
            setGlitchLayers(prev => [
                generateGlitchText(text, text.length),
                generateGlitchText(text, text.length)
            ]);

            glitchCount++;
            if (glitchCount >= maxGlitches) {
                clearInterval(glitchInterval);
                setGlitchLayers([]);
                setIsGlitching(false);
            }
        }, 100);
    };

    const handleMouseEnter = () => {
        if (hover && !isGlitching) {
            runGlitchEffect();
        }
    };

    return (
        <span
            className={`inline-block font-mono relative ${className}`}
            onMouseEnter={handleMouseEnter}
        >
            {/* Main text */}
            <span className="relative z-10">{displayText}</span>

            {/* Glitch layers */}
            {glitchLayers.map((layerText, index) => (
                <span
                    key={index}
                    className={`absolute inset-0 z-${9 - index} animate-pulse`}
                    style={{
                        color: index === 0 ? '#ff0080' : '#00ffff',
                        transform: `translate(${index === 0 ? '-2px' : '2px'}, ${index === 0 ? '-1px' : '1px'})`,
                        clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                        opacity: 0.8 - index * 0.3,
                        filter: 'blur(0.5px)',
                        animation: `glitch-${index} 0.1s infinite alternate`
                    }}
                >
                    {layerText}
                </span>
            ))}

            {/* RGB shift effect */}
            {isGlitching && (
                <>
                    <span
                        className="absolute inset-0 z-8"
                        style={{
                            color: '#ff0080',
                            transform: 'translateX(-1px)',
                            clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                            opacity: 0.6,
                            filter: 'blur(0.3px)'
                        }}
                    >
                        {displayText}
                    </span>
                    <span
                        className="absolute inset-0 z-7"
                        style={{
                            color: '#00ffff',
                            transform: 'translateX(1px)',
                            clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                            opacity: 0.6,
                            filter: 'blur(0.3px)'
                        }}
                    >
                        {displayText}
                    </span>
                </>
            )}
        </span>
    );
}
