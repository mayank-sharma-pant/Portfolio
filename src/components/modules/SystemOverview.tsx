'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';
import { synth } from '@/utils/audio-engine';
import SystemPanel from '@/components/ui/SystemPanel';
import SoundToggle from '@/components/ui/SoundToggle';

export default function SystemOverview() {
    const { pushLog } = useSystem();
    const [mounted, setMounted] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [lightSweepComplete, setLightSweepComplete] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Light sweep animation (wow moment)
        const timer = setTimeout(() => {
            setLightSweepComplete(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleCardHover = (cardName: string) => {
        if (hoveredCard !== cardName) {
            synth.playHover();
            pushLog(`Inspecting ${cardName}`, 'SYSTEM');
            setHoveredCard(cardName);
        }
    };

    const handleCardLeave = () => {
        setHoveredCard(null);
    };

    // Weighted stagger delays for sections
    const sectionVariants = {
        hidden: { opacity: 0, y: 15, scale: 0.98 },
        visible: (delay: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                delay: delay + 0.02,
                ease: [0.4, 0, 0.2, 1]
            }
        })
    };

    return (
        <div className="h-full w-full flex items-center justify-center p-6 sm:p-12 overflow-y-auto relative">
            {/* Light Sweep - Wow Moment */}
            {!lightSweepComplete && (
                <motion.div
                    className="absolute inset-0 pointer-events-none z-50"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, ease: 'linear' }}
                >
                    <div className="h-full w-[200px] bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-xl" />
                </motion.div>
            )}

            <SoundToggle />

            <div className="max-w-5xl w-full space-y-8 font-mono text-sm">

                {/* Page Title */}
                <div className="border-b border-primary/20 pb-6 mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                        <span className="text-primary">{'>'}</span> SYSTEM_OVERVIEW
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">

                    {/* SYSTEM_ID Card */}
                    <SystemPanel
                        id="SYSTEM_ID"
                        title="SYSTEM_ID"
                        className="p-0 overflow-hidden backdrop-blur-sm bg-black/40"
                    >
                        <div className="p-5 space-y-2.5 text-xs text-foreground/80 font-mono">
                            <div className="flex gap-4">
                                <span className="text-muted w-20">NAME:</span>
                                <span className="text-foreground font-bold">Mayank Sharma</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-muted w-20">TYPE:</span>
                                <span className="text-primary/90">Backend Engineer</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-muted w-20">STATE:</span>
                                <span className="text-green-500 flex items-center gap-2">
                                    ACTIVE <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                </span>
                            </div>
                        </div>
                    </SystemPanel>

                    {/* CAPABILITIES Card */}
                    <SystemPanel
                        id="CAPABILITIES"
                        title="CAPABILITIES"
                        className="p-0 overflow-hidden backdrop-blur-sm bg-black/40"
                    >
                        <div className="p-5">
                            <ul className="space-y-1.5 text-xs text-foreground/80 font-mono">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary/50 mt-0.5">•</span>
                                    <span>Design and build REST APIs</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary/50 mt-0.5">•</span>
                                    <span>Implement clean backend architecture</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary/50 mt-0.5">•</span>
                                    <span>Develop Android applications</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary/50 mt-0.5">•</span>
                                    <span>Ship MVPs with real users</span>
                                </li>
                            </ul>
                        </div>
                    </SystemPanel>

                    {/* CURRENT_ROLE Card */}
                    <SystemPanel
                        id="CURRENT_ROLE"
                        title="CURRENT_ROLE"
                        className="p-0 overflow-hidden backdrop-blur-sm bg-black/40"
                    >
                        <div className="p-5">
                            <ul className="space-y-1.5 text-xs text-foreground/80 font-mono">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary/50 mt-0.5">›</span>
                                    <span>Backend Developer Intern — Enterprise APIs</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary/50 mt-0.5">›</span>
                                    <span>Product-Focused Engineer — Healiora MVP</span>
                                </li>
                            </ul>
                        </div>
                    </SystemPanel>

                    {/* EXECUTION_CONTEXT Card */}
                    <SystemPanel
                        id="EXECUTION_CONTEXT"
                        title="EXECUTION_CONTEXT"
                        className="p-0 overflow-hidden backdrop-blur-sm bg-black/40"
                    >
                        <div className="p-5">
                            <ul className="space-y-1.5 text-xs text-foreground/80 font-mono">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary/50 mt-0.5">•</span>
                                    <span>Backend Intern — SunEdge IT Solutions</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary/50 mt-0.5">•</span>
                                    <span>Co-founder — Healiora (CU-TBI Incubated)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary/50 mt-0.5">•</span>
                                    <span>B.Tech CSE — Chandigarh University</span>
                                </li>
                            </ul>
                        </div>
                    </SystemPanel>

                    {/* SYSTEM_FOCUS Card */}
                    <SystemPanel
                        id="SYSTEM_FOCUS"
                        title="SYSTEM_FOCUS"
                        className="p-0 overflow-hidden backdrop-blur-sm bg-black/40"
                    >
                        <div className="p-5">
                            <ul className="space-y-1.5 text-xs text-foreground/80 font-mono">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary/50 mt-0.5">›</span>
                                    <span>Backend APIs & clean architecture</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary/50 mt-0.5">›</span>
                                    <span>Real-world product development</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary/50 mt-0.5">›</span>
                                    <span>Frontend fundamentals & interaction systems</span>
                                </li>
                            </ul>
                        </div>
                    </SystemPanel>

                    {/* SYSTEM_SIGNALS Card */}
                    <SystemPanel
                        id="SYSTEM_SIGNALS"
                        title="SYSTEM_SIGNALS"
                        className="p-0 overflow-hidden backdrop-blur-sm bg-black/40"
                    >
                        <div className="p-5 space-y-2 text-xs text-foreground/80 font-mono">
                            <div className="flex gap-3">
                                <span className="text-muted w-28">ACTIVE_MODULES:</span>
                                <span>Projects, Dependencies, Sys Logs</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-muted w-28">PRIMARY_STACK:</span>
                                <span className="text-primary/90">Java / Spring Boot / SQL</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-muted w-28">CURRENT_PHASE:</span>
                                <span>Skill Expansion (Frontend)</span>
                            </div>
                        </div>
                    </SystemPanel>

                    {/* EXTERNAL_INTERFACES Card */}
                    <SystemPanel
                        id="EXTERNAL_INTERFACES"
                        title="EXTERNAL_INTERFACES"
                        className="p-0 overflow-hidden backdrop-blur-sm bg-black/40"
                    >
                        <div className="p-5 space-y-1.5 text-xs text-foreground/80 font-mono">
                            <a
                                href="https://github.com/mayank-sharma-pant"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-3 hover:text-primary transition-colors group relative"
                            >
                                <span className="text-muted w-20">GITHUB</span>
                                <span className="relative">
                                    → github.com/mayank-sharma-pant
                                    <span className="absolute bottom-0 left-0 h-[1px] bg-primary w-0 group-hover:w-full transition-all duration-200" />
                                </span>
                            </a>
                            <a
                                href="https://linkedin.com/in/mayank-sharma-a747ba275/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-3 hover:text-primary transition-colors group relative"
                            >
                                <span className="text-muted w-20">LINKEDIN</span>
                                <span className="relative">→ linkedin.com/in/mayank-sharma-a747ba275/</span>
                            </a>
                            <a
                                href="https://x.com/nullbytez"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-3 hover:text-primary transition-colors group relative"
                            >
                                <span className="text-muted w-20">X</span>
                                <span className="relative">→ x.com/nullbytez</span>
                            </a>
                            <a
                                href="mailto:mayanksharmarrk01@gmail.com"
                                className="flex gap-3 hover:text-primary transition-colors group relative"
                            >
                                <span className="text-muted w-20">EMAIL</span>
                                <span className="relative">→ mayanksharmarrk01@gmail.com</span>
                            </a>
                        </div>
                    </SystemPanel>

                    {/* SYSTEM_STATUS Card */}
                    <SystemPanel
                        id="SYSTEM_STATUS"
                        title="SYSTEM_STATUS"
                        className="p-0 overflow-hidden backdrop-blur-sm bg-black/40"
                    >
                        <div className="p-5 grid grid-cols-2 gap-4 text-xs font-mono">
                            <div>
                                <span className="text-muted block mb-1">MODE</span>
                                <span className="text-foreground tracking-wider">LEARNING + BUILDING</span>
                            </div>
                            <div>
                                <span className="text-muted block mb-1">LAST_ACTIVITY</span>
                                <span className="text-primary/90">Active modules running</span>
                            </div>
                        </div>
                    </SystemPanel>

                </div>
            </div>
        </div>
    );
}


