'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';
import { synth } from '@/utils/audio-engine';

export default function SystemOverview() {
    const { pushLog } = useSystem();
    const [mounted, setMounted] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
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

    // Stagger delays for sections
    const sectionVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (delay: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay }
        })
    };

    return (
        <div className="h-full w-full flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
            <div className="max-w-5xl w-full space-y-6 font-mono text-sm">

                {/* Page Title */}
                <div className="border-b border-primary/20 pb-4 mb-8">
                    <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        <span className="text-primary">{'>'}</span> SYSTEM_OVERVIEW
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* SYSTEM_ID Card */}
                    <motion.div
                        custom={0}
                        initial="hidden"
                        animate={mounted ? "visible" : "hidden"}
                        variants={sectionVariants}
                        onMouseEnter={() => handleCardHover('SYSTEM_ID')}
                        onMouseLeave={handleCardLeave}
                        className={`
                            border p-4 transition-all duration-300 cursor-crosshair
                            ${hoveredCard === 'SYSTEM_ID'
                                ? 'bg-black/60 border-primary/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                : 'bg-black/40 border-primary/20'
                            }
                            ${hoveredCard && hoveredCard !== 'SYSTEM_ID' ? 'opacity-50' : 'opacity-100'}
                        `}
                    >
                        <h2 className="text-xs uppercase tracking-widest text-primary mb-4">
                            SYSTEM_ID
                        </h2>
                        <div className="space-y-2 text-xs">
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
                    </motion.div>

                    {/* CAPABILITIES Card */}
                    <motion.div
                        custom={0.1}
                        initial="hidden"
                        animate={mounted ? "visible" : "hidden"}
                        variants={sectionVariants}
                        onMouseEnter={() => handleCardHover('CAPABILITIES')}
                        onMouseLeave={handleCardLeave}
                        className={`
                            border p-4 transition-all duration-300 cursor-crosshair
                            ${hoveredCard === 'CAPABILITIES'
                                ? 'bg-black/60 border-primary/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                : 'bg-black/40 border-primary/20'
                            }
                            ${hoveredCard && hoveredCard !== 'CAPABILITIES' ? 'opacity-50' : 'opacity-100'}
                        `}
                    >
                        <h2 className="text-xs uppercase tracking-widest text-primary mb-4">
                            CAPABILITIES
                        </h2>
                        <ul className="space-y-1.5 text-xs text-foreground/80">
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
                    </motion.div>

                    {/* CURRENT_ROLE Card */}
                    <motion.div
                        custom={0.2}
                        initial="hidden"
                        animate={mounted ? "visible" : "hidden"}
                        variants={sectionVariants}
                        onMouseEnter={() => handleCardHover('CURRENT_ROLE')}
                        onMouseLeave={handleCardLeave}
                        className={`
                            border p-4 transition-all duration-300 cursor-crosshair
                            ${hoveredCard === 'CURRENT_ROLE'
                                ? 'bg-black/60 border-primary/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                : 'bg-black/40 border-primary/20'
                            }
                            ${hoveredCard && hoveredCard !== 'CURRENT_ROLE' ? 'opacity-50' : 'opacity-100'}
                        `}
                    >
                        <h2 className="text-xs uppercase tracking-widest text-primary mb-4">
                            CURRENT_ROLE
                        </h2>
                        <ul className="space-y-1.5 text-xs text-foreground/80">
                            <li className="flex items-start gap-2">
                                <span className="text-primary/50 mt-0.5">›</span>
                                <span>Backend Developer Intern — Enterprise APIs</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary/50 mt-0.5">›</span>
                                <span>Product-Focused Engineer — Healiora MVP</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* EXECUTION_CONTEXT Card */}
                    <motion.div
                        custom={0.3}
                        initial="hidden"
                        animate={mounted ? "visible" : "hidden"}
                        variants={sectionVariants}
                        onMouseEnter={() => handleCardHover('EXECUTION_CONTEXT')}
                        onMouseLeave={handleCardLeave}
                        className={`
                            border p-4 transition-all duration-300 cursor-crosshair
                            ${hoveredCard === 'EXECUTION_CONTEXT'
                                ? 'bg-black/60 border-primary/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                : 'bg-black/40 border-primary/20'
                            }
                            ${hoveredCard && hoveredCard !== 'EXECUTION_CONTEXT' ? 'opacity-50' : 'opacity-100'}
                        `}
                    >
                        <h2 className="text-xs uppercase tracking-widest text-primary mb-4">
                            EXECUTION_CONTEXT
                        </h2>
                        <ul className="space-y-1.5 text-xs text-foreground/80">
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
                    </motion.div>

                    {/* SYSTEM_FOCUS Card */}
                    <motion.div
                        custom={0.4}
                        initial="hidden"
                        animate={mounted ? "visible" : "hidden"}
                        variants={sectionVariants}
                        onMouseEnter={() => handleCardHover('SYSTEM_FOCUS')}
                        onMouseLeave={handleCardLeave}
                        className={`
                            border p-4 transition-all duration-300 cursor-crosshair
                            ${hoveredCard === 'SYSTEM_FOCUS'
                                ? 'bg-black/60 border-primary/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                : 'bg-black/40 border-primary/20'
                            }
                            ${hoveredCard && hoveredCard !== 'SYSTEM_FOCUS' ? 'opacity-50' : 'opacity-100'}
                        `}
                    >
                        <h2 className="text-xs uppercase tracking-widest text-primary mb-4">
                            SYSTEM_FOCUS
                        </h2>
                        <ul className="space-y-1.5 text-xs text-foreground/80">
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
                    </motion.div>

                    {/* SYSTEM_SIGNALS Card */}
                    <motion.div
                        custom={0.5}
                        initial="hidden"
                        animate={mounted ? "visible" : "hidden"}
                        variants={sectionVariants}
                        onMouseEnter={() => handleCardHover('SYSTEM_SIGNALS')}
                        onMouseLeave={handleCardLeave}
                        className={`
                            border p-4 transition-all duration-300 cursor-crosshair
                            ${hoveredCard === 'SYSTEM_SIGNALS'
                                ? 'bg-black/60 border-primary/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                : 'bg-black/40 border-primary/20'
                            }
                            ${hoveredCard && hoveredCard !== 'SYSTEM_SIGNALS' ? 'opacity-50' : 'opacity-100'}
                        `}
                    >
                        <h2 className="text-xs uppercase tracking-widest text-primary mb-4">
                            SYSTEM_SIGNALS
                        </h2>
                        <div className="space-y-2 text-xs text-foreground/80">
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
                    </motion.div>

                    {/* EXTERNAL_INTERFACES Card */}
                    <motion.div
                        custom={0.6}
                        initial="hidden"
                        animate={mounted ? "visible" : "hidden"}
                        variants={sectionVariants}
                        onMouseEnter={() => handleCardHover('EXTERNAL_INTERFACES')}
                        onMouseLeave={handleCardLeave}
                        className={`
                            border p-4 transition-all duration-300 cursor-crosshair
                            ${hoveredCard === 'EXTERNAL_INTERFACES'
                                ? 'bg-black/60 border-primary/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                : 'bg-black/40 border-primary/20'
                            }
                            ${hoveredCard && hoveredCard !== 'EXTERNAL_INTERFACES' ? 'opacity-50' : 'opacity-100'}
                        `}
                    >
                        <h2 className="text-xs uppercase tracking-widest text-primary mb-4">
                            EXTERNAL_INTERFACES
                        </h2>
                        <div className="space-y-1.5 text-xs text-foreground/80">
                            <a
                                href="https://github.com/mayank-sharma-pant"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-3 hover:text-primary transition-colors group"
                            >
                                <span className="text-muted w-20">GITHUB</span>
                                <span className="group-hover:underline">→ github.com/mayank-sharma-pant</span>
                            </a>
                            <a
                                href="https://linkedin.com/in/mayank-sharma-a747ba275/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-3 hover:text-primary transition-colors group"
                            >
                                <span className="text-muted w-20">LINKEDIN</span>
                                <span className="group-hover:underline">→ linkedin.com/in/mayank-sharma-a747ba275/</span>
                            </a>
                            <a
                                href="https://x.com/nullbytez"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-3 hover:text-primary transition-colors group"
                            >
                                <span className="text-muted w-20">X</span>
                                <span className="group-hover:underline">→ x.com/nullbytez</span>
                            </a>
                            <a
                                href="mailto:mayanksharmarrk01@gmail.com"
                                className="flex gap-3 hover:text-primary transition-colors group"
                            >
                                <span className="text-muted w-20">EMAIL</span>
                                <span className="group-hover:underline">→ mayanksharmarrk01@gmail.com</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* SYSTEM_STATUS Card */}
                    <motion.div
                        custom={0.7}
                        initial="hidden"
                        animate={mounted ? "visible" : "hidden"}
                        variants={sectionVariants}
                        onMouseEnter={() => handleCardHover('SYSTEM_STATUS')}
                        onMouseLeave={handleCardLeave}
                        className={`
                            border p-4 transition-all duration-300 cursor-crosshair
                            ${hoveredCard === 'SYSTEM_STATUS'
                                ? 'bg-black/60 border-primary/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                : 'bg-black/40 border-primary/20'
                            }
                            ${hoveredCard && hoveredCard !== 'SYSTEM_STATUS' ? 'opacity-50' : 'opacity-100'}
                        `}
                    >
                        <h2 className="text-xs uppercase tracking-widest text-primary mb-4">
                            SYSTEM_STATUS
                        </h2>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                                <span className="text-muted block mb-1">MODE</span>
                                <span className="text-foreground tracking-wider">LEARNING + BUILDING</span>
                            </div>
                            <div>
                                <span className="text-muted block mb-1">LAST_ACTIVITY</span>
                                <span className="text-primary/90">Active modules running</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
