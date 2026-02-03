'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';
import { synth } from '@/utils/audio-engine';

interface SystemPanelProps {
    children: React.ReactNode;
    title?: string;
    id: string; // Unique ID for terminal logs
    className?: string;
    noLift?: boolean; // Disable floating for specific panels
    active?: boolean; // Manually force active state
    onClick?: () => void;
    variant?: 'default' | 'cyber' | 'hologram' | 'matrix';
}

export default function SystemPanel({
    children,
    title,
    id,
    className = '',
    noLift = false,
    active = false,
    onClick,
    variant = 'default'
}: SystemPanelProps) {
    const { pushLog } = useSystem();
    const [isHovered, setIsHovered] = useState(false);
    const [dataStream, setDataStream] = useState<string[]>([]);
    const [scanLine, setScanLine] = useState(0);

    useEffect(() => {
        if (variant === 'matrix' && (isHovered || active)) {
            const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            const interval = setInterval(() => {
                setDataStream(prev => [
                    ...prev.slice(-15),
                    chars[Math.floor(Math.random() * chars.length)]
                ]);
            }, 50);
            return () => clearInterval(interval);
        }
    }, [isHovered, active, variant]);

    useEffect(() => {
        if (variant === 'cyber' && (isHovered || active)) {
            const interval = setInterval(() => {
                setScanLine(prev => (prev + 1) % 100);
            }, 30);
            return () => clearInterval(interval);
        }
    }, [isHovered, active, variant]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        synth.playHover();
        pushLog(`Focusing section: ${id}`, 'SYSTEM');
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        if (onClick) {
            synth.playClick();
            pushLog(`Activating section: ${id}`, 'SYSTEM');
            onClick();
        }
    };

    const getVariantStyles = () => {
        switch (variant) {
            case 'cyber':
                return {
                    borderColor: isHovered || active ? 'rgba(63, 185, 224, 0.6)' : 'rgba(120, 160, 200, 0.18)',
                    boxShadow: isHovered || active
                        ? '0 0 30px rgba(63, 185, 224, 0.3), 0 4px 16px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.4)'
                        : '0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)',
                    background: isHovered || active
                        ? 'linear-gradient(135deg, rgba(18, 24, 38, 0.9), rgba(7, 11, 20, 0.8))'
                        : 'rgba(18, 24, 38, 0.78)'
                };
            case 'hologram':
                return {
                    borderColor: isHovered || active ? 'rgba(147, 51, 234, 0.5)' : 'rgba(120, 160, 200, 0.18)',
                    boxShadow: isHovered || active
                        ? '0 0 25px rgba(147, 51, 234, 0.4), 0 0 50px rgba(63, 185, 224, 0.2), 0 4px 16px rgba(0, 0, 0, 0.5)'
                        : '0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)',
                    background: isHovered || active
                        ? 'linear-gradient(135deg, rgba(18, 24, 38, 0.85), rgba(88, 28, 135, 0.1))'
                        : 'rgba(18, 24, 38, 0.78)'
                };
            case 'matrix':
                return {
                    borderColor: isHovered || active ? 'rgba(34, 197, 94, 0.5)' : 'rgba(120, 160, 200, 0.18)',
                    boxShadow: isHovered || active
                        ? '0 0 25px rgba(34, 197, 94, 0.3), 0 4px 16px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.4)'
                        : '0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)',
                    background: isHovered || active
                        ? 'linear-gradient(135deg, rgba(18, 24, 38, 0.9), rgba(6, 78, 59, 0.1))'
                        : 'rgba(18, 24, 38, 0.78)'
                };
            default:
                return {};
        }
    };

    return (
        <motion.div
            className={`
                relative bg-card
                border border-border
                transition-all duration-[280ms] ease-out
                ${className}
                group overflow-hidden
            `}
            style={getVariantStyles()}
            initial={false}
            animate={{
                y: !noLift && (isHovered || active) ? -8 : 0,
                scale: !noLift && (isHovered || active) ? 1.01 : 1,
                rotateX: variant === 'hologram' && (isHovered || active) ? 2 : 0,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {/* Enhanced Glow Effect */}
            <div
                className={`
                    absolute inset-0 pointer-events-none transition-opacity duration-500
                    ${isHovered || active ? 'opacity-100' : 'opacity-0'}
                `}
                style={{
                    background: variant === 'cyber'
                        ? 'radial-gradient(circle at center, rgba(63, 185, 224, 0.1), transparent 70%)'
                        : variant === 'hologram'
                        ? 'radial-gradient(circle at center, rgba(147, 51, 234, 0.08), transparent 70%)'
                        : variant === 'matrix'
                        ? 'radial-gradient(circle at center, rgba(34, 197, 94, 0.08), transparent 70%)'
                        : 'radial-gradient(circle at center, rgba(63, 185, 224, 0.08), transparent 70%)'
                }}
            />

            {/* Cyber Scan Lines */}
            {variant === 'cyber' && (isHovered || active) && (
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                        style={{ top: `${scanLine}%` }}
                    />
                    <div
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm"
                        style={{ top: `${(scanLine + 10) % 100}%` }}
                    />
                </div>
            )}

            {/* Matrix Data Stream */}
            {variant === 'matrix' && (isHovered || active) && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute right-2 top-2 text-green-400 font-mono text-xs opacity-60">
                        {dataStream.map((char, i) => (
                            <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                                {char}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Holographic Interference */}
            {variant === 'hologram' && (isHovered || active) && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 animate-pulse" />
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
                </div>
            )}

            {/* Enhanced Holographic Scan Effect */}
            <div
                className={`
                    absolute inset-0 pointer-events-none overflow-hidden
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                `}
            >
                <div className="w-full h-[3px] bg-primary/40 blur-[1px] absolute top-0 -translate-y-full animate-[scan_2s_ease-in-out_infinite]" />
                <div className="w-full h-[20px] bg-gradient-to-b from-primary/15 to-transparent absolute top-0 -translate-y-full animate-[scan_2s_ease-in-out_infinite_0.1s]" />
            </div>

            {/* Title Header (Optional) */}
            {title && (
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 group-hover:border-primary/20 transition-colors relative z-10">
                    <span className={`text-xs font-mono font-bold tracking-widest transition-colors ${
                        variant === 'cyber' ? 'text-cyan-400' :
                        variant === 'hologram' ? 'text-purple-400' :
                        variant === 'matrix' ? 'text-green-400' :
                        'text-primary/80 group-hover:text-primary'
                    }`}>
                        {title}
                    </span>
                    {/* Enhanced Status Indicator */}
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isHovered || active
                            ? variant === 'cyber' ? 'bg-cyan-400 shadow-[0_0_12px_rgba(63,185,224,1)] animate-pulse' :
                              variant === 'hologram' ? 'bg-purple-400 shadow-[0_0_12px_rgba(147,51,234,1)] animate-pulse' :
                              variant === 'matrix' ? 'bg-green-400 shadow-[0_0_12px_rgba(34,197,94,1)] animate-pulse' :
                              'bg-primary shadow-[0_0_8px_rgba(63,185,224,0.8)]'
                            : 'bg-muted/20'
                    }`} />
                </div>
            )}

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Enhanced Corner Accents */}
            <div className={`absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 transition-colors ${
                isHovered || active
                    ? variant === 'cyber' ? 'border-cyan-400' :
                      variant === 'hologram' ? 'border-purple-400' :
                      variant === 'matrix' ? 'border-green-400' :
                      'border-primary'
                    : 'border-transparent'
            }`} />
            <div className={`absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 transition-colors ${
                isHovered || active
                    ? variant === 'cyber' ? 'border-cyan-400' :
                      variant === 'hologram' ? 'border-purple-400' :
                      variant === 'matrix' ? 'border-green-400' :
                      'border-primary'
                    : 'border-transparent'
            }`} />
            <div className={`absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 transition-colors ${
                isHovered || active
                    ? variant === 'cyber' ? 'border-cyan-400' :
                      variant === 'hologram' ? 'border-purple-400' :
                      variant === 'matrix' ? 'border-green-400' :
                      'border-primary'
                    : 'border-transparent'
            }`} />
            <div className={`absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 transition-colors ${
                isHovered || active
                    ? variant === 'cyber' ? 'border-cyan-400' :
                      variant === 'hologram' ? 'border-purple-400' :
                      variant === 'matrix' ? 'border-green-400' :
                      'border-primary'
                    : 'border-transparent'
            }`} />

        </motion.div>
    );
}
