'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';
import { synth } from '@/utils/audio-engine';

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

            <div className="max-w-5xl w-full space-y-8 font-mono text-sm">

                {/* Page Title */}
                <div className="border-b border-primary/20 pb-6 mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
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
                            border p-5 cursor-crosshair panel-glow backdrop-blur-sm
                            transition-all duration-[280ms] ease-in-out
                            ${hoveredCard === 'SYSTEM_ID'
                                ? 'bg-black/70 border-primary/60 elevation-mid scale-[1.02]'
                                : 'bg-black/40 border-primary/20 elevation-low'
                            }
                            ${hoveredCard && hoveredCard !== 'SYSTEM_ID' ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
                        `}
                        style={{
                            transitionDelay: '20ms',
                        }}
                    >
                        <h2 className="text-xs uppercase tracking-widest text-primary mb-4 font-bold font-bold">
                            SYSTEM_ID
                        </h2>
                        <div className="space-y-2.5 text-xs">
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
                            border p-5 cursor-crosshair panel-glow backdrop-blur-sm transition-all duration-[280ms] ease-in-out
                            ${hoveredCard === 'CAPABILITIES'
                                ? 'bg-black/70 border-primary/60 elevation-mid scale-[1.02]'
                                : 'bg-black/40 border-primary/20 elevation-low'
                            }
                            ${hoveredCard && hoveredCard !== 'CAPABILITIES' ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
                        `}
                        style={{
                            transitionDelay: '20ms',
                        }}
                    >
                        <h2 className="text-xs uppercase tracking-widest text-primary mb-4 font-bold">
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
                            border p-5 cursor-crosshair panel-glow backdrop-blur-sm transition-all duration-[280ms] ease-in-out
                            ${hoveredCard === 'CURRENT_ROLE'
                                ? 'bg-black/70 border-primary/60 elevation-mid scale-[1.02]'
                                : 'bg-black/40 border-primary/20 elevation-low'
                            }
                            ${hoveredCard && hoveredCard !== 'CURRENT_ROLE' ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
                        `}
                        style={{
                            transitionDelay: '20ms',
                        }}
                    >
                        <h2 className="text-xs uppercase tracking-widest text-primary mb-4 font-bold">
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
                            border p-5 cursor-crosshair panel-glow backdrop-blur-sm
                            transition-all duration-[280ms] ease-in-out
                            ${hoveredCard === 'EXECUTION_CONTEXT'
                                ? 'bg-black/70 border-primary/60 elevation-mid scale-[1.02]'
                                : 'bg-black/40 border-primary/20 elevation-low'
                            }
                            ${hoveredCard && hoveredCard !== 'EXECUTION_CONTEXT' ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
                        `}
                        style={{
                            transitionDelay: '20ms',
                        }}
                    >
                        <h2 className="text-xs uppercase tracking-widest text-primary mb-4 font-bold">
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
                            border p-5 cursor-crosshair panel-glow backdrop-blur-sm transition-all duration-[280ms] ease-in-out
                            ${hoveredCard === 'SYSTEM_FOCUS'
                                ? 'bg-black/70 border-primary/60 elevation-mid scale-[1.02]'
                                : 'bg-black/40 border-primary/20 elevation-low'
                            }
                            ${hoveredCard && hoveredCard !== 'SYSTEM_FOCUS' ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
                        `}
                        style={{
                            transitionDelay: '20ms',
                        }}
                    >
                        <h2 className="text-xs uppercase tracking-widest text-primary mb-4 font-bold">
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
                            border p-5 cursor-crosshair panel-glow backdrop-blur-sm transition-all duration-[280ms] ease-in-out
                            ${hoveredCard === 'SYSTEM_SIGNALS'
                                ? 'bg-black/70 border-primary/60 elevation-mid scale-[1.02]'
                                : 'bg-black/40 border-primary/20 elevation-low'
                            }
                            ${hoveredCard && hoveredCard !== 'SYSTEM_SIGNALS' ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
                        `}
                        style={{
                            transitionDelay: '20ms',
                        }}
                    >
                        <h2 className="text-xs uppercase tracking-widest text-primary mb-4 font-bold">
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
                            border p-5 cursor-crosshair panel-glow backdrop-blur-sm transition-all duration-[280ms] ease-in-out
                            ${hoveredCard === 'EXTERNAL_INTERFACES'
                                ? 'bg-black/70 border-primary/60 elevation-mid scale-[1.02]'
                                : 'bg-black/40 border-primary/20 elevation-low'
                            }
                            ${hoveredCard && hoveredCard !== 'EXTERNAL_INTERFACES' ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
                        `}
                        style={{
                            transitionDelay: '20ms',
                        }}
                    >
                        <h2 className="text-xs uppercase tracking-widest text-primary mb-4 font-bold">
                            EXTERNAL_INTERFACES
                        </h2>
                        <div className="space-y-1.5 text-xs text-foreground/80">
                            <a
                                href="https://github.com/mayank-sharma-pant"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-3 hover:text-primary transition-all duration-[280ms] ease-in-out group relative"
                                style={{ transitionDelay: '20ms' }}
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
                                className="flex gap-3 hover:text-primary transition-all duration-[280ms] ease-in-out group relative" style={{ transitionDelay: '20ms' }}
                            >
                                <span className="text-muted w-20">LINKEDIN</span>
                                <span className="relative">→ linkedin.com/in/mayank-sharma-a747ba275/</span>
                            </a>
                            <a
                                href="https://x.com/nullbytez"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-3 hover:text-primary transition-all duration-[280ms] ease-in-out group relative" style={{ transitionDelay: '20ms' }}
                            >
                                <span className="text-muted w-20">X</span>
                                <span className="relative">→ x.com/nullbytez</span>
                            </a>
                            <a
                                href="mailto:mayanksharmarrk01@gmail.com"
                                className="flex gap-3 hover:text-primary transition-all duration-[280ms] ease-in-out group relative" style={{ transitionDelay: '20ms' }}
                            >
                                <span className="text-muted w-20">EMAIL</span>
                                <span className="relative">→ mayanksharmarrk01@gmail.com</span>
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
                            border p-5 cursor-crosshair panel-glow backdrop-blur-sm transition-all duration-[280ms] ease-in-out
                            ${hoveredCard === 'SYSTEM_STATUS'
                                ? 'bg-black/70 border-primary/60 elevation-mid scale-[1.02]'
                                : 'bg-black/40 border-primary/20 elevation-low'
                            }
                            ${hoveredCard && hoveredCard !== 'SYSTEM_STATUS' ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
                        `}
                    >
                        <h2 className="text-xs uppercase tracking-widest text-primary mb-4 font-bold">
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


