'use client';

import React, { useState } from 'react';
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
}

export default function SystemPanel({
    children,
    title,
    id,
    className = '',
    noLift = false,
    active = false,
    onClick
}: SystemPanelProps) {
    const { pushLog } = useSystem();
    const [isHovered, setIsHovered] = useState(false);

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

    return (
        <motion.div
            className={`
                relative bg-card 
                border border-border 
                transition-all duration-[280ms] ease-out
                ${className}
                ${isHovered || active ? 'elevation-mid border-primary/40' : 'elevation-low'}
                ${active ? 'ring-1 ring-primary/30' : ''}
                group
            `}
            initial={false}
            animate={{
                y: !noLift && (isHovered || active) ? -6 : 0,
                scale: !noLift && (isHovered || active) ? 1.005 : 1,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {/* Glow Effect Layer */}
            <div
                className={`
                    absolute inset-0 pointer-events-none transition-opacity duration-300
                    bg-[radial-gradient(circle_at_center,rgba(63,185,224,0.08),transparent_70%)]
                    ${isHovered || active ? 'opacity-100' : 'opacity-0'}
                `}
            />

            {/* Title Header (Optional) */}
            {title && (
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 group-hover:border-primary/20 transition-colors">
                    <span className="text-xs font-mono font-bold tracking-widest text-primary/80 group-hover:text-primary transition-colors">
                        {title}
                    </span>
                    {/* Decorative Status Dot */}
                    <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isHovered || active ? 'bg-primary shadow-[0_0_8px_rgba(63,185,224,0.8)]' : 'bg-muted/20'}`} />
                </div>
            )}

            {/* Content Content */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Corner Accents (Technical Feel) */}
            <div className={`absolute top-0 left-0 w-2 h-2 border-l border-t transition-colors ${isHovered ? 'border-primary' : 'border-transparent'}`} />
            <div className={`absolute top-0 right-0 w-2 h-2 border-r border-t transition-colors ${isHovered ? 'border-primary' : 'border-transparent'}`} />
            <div className={`absolute bottom-0 left-0 w-2 h-2 border-l border-b transition-colors ${isHovered ? 'border-primary' : 'border-transparent'}`} />
            <div className={`absolute bottom-0 right-0 w-2 h-2 border-r border-b transition-colors ${isHovered ? 'border-primary' : 'border-transparent'}`} />

        </motion.div>
    );
}
