'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion'; // Removed Activity, Shield, Zap imports as they used widely
import { useSystem } from '@/context/SystemContext';

export default function HealioraView() {
    const { pushLog } = useSystem();

    useEffect(() => {
        // Initial log sequence on mount
        const timer1 = setTimeout(() => pushLog('Loading PRODUCT_NODE: HEALIORA', 'SYSTEM'), 100);
        const timer2 = setTimeout(() => pushLog('Status: ACTIVE', 'SYSTEM'), 400);
        const timer3 = setTimeout(() => pushLog('Incubation verified', 'SYSTEM'), 800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [pushLog]);

    // Parent container variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Slower stagger
                delayChildren: 0.3    // Initial delay
            }
        }
    };

    // Item variants for "Heavy" feel
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8, // Slower transition
                ease: [0.2, 0.65, 0.3, 0.9] // Custom heavy ease
            }
        }
    };

    return (
        <div className="min-h-full flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden">

            {/* Background Focus Glow - Subtle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                className="max-w-2xl w-full border-l-2 border-primary/20 pl-8 md:pl-12 py-8 space-y-12 relative"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 1. PRODUCT IDENTITY BLOCK */}
                <motion.div variants={itemVariants} className="space-y-2">
                    <div className="text-xs font-mono text-muted tracking-widest mb-1">PRODUCT_NODE</div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                        Healiora
                    </h1>
                    <div className="flex flex-col gap-1 font-mono text-xs md:text-sm text-muted/80">
                        <div className="flex items-center gap-4">
                            <span className="w-20 opacity-50">DOMAIN:</span>
                            <span className="text-foreground">HealthTech</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-20 opacity-50">STATUS:</span>
                            <span className="text-primary flex items-center gap-2">
                                In Development
                                <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-pulse" />
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* 2. CURRENT STATE (VERY IMPORTANT) */}
                <motion.div variants={itemVariants} className="relative">
                    <div className="absolute -left-[49px] md:-left-[65px] top-0 w-3 h-3 bg-primary/20 border border-primary/50" />
                    <h2 className="text-xs font-bold text-foreground tracking-widest mb-4 uppercase border-b border-primary/10 pb-2 w-max text-primary/80">
                        Current_State
                    </h2>
                    <ul className="space-y-3 font-mono text-sm text-muted">
                        <li className="flex items-start gap-3">
                            <span className="text-primary mt-1">→</span>
                            <span className="text-foreground/90">Actively building the Healiora platform</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary mt-1">→</span>
                            <span className="text-foreground/90">Preparing for initial public launch</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary mt-1">→</span>
                            <span className="text-foreground/90">Iterating based on early validation</span>
                        </li>
                    </ul>
                </motion.div>

                {/* 3. INCUBATION */}
                <motion.div variants={itemVariants}>
                    <h2 className="text-xs font-bold text-muted tracking-widest mb-3 uppercase opacity-70">
                        Incubation
                    </h2>
                    <div className="p-4 border border-primary/10 bg-primary/5 backdrop-blur-sm">
                        <ul className="space-y-2 font-mono text-xs text-muted/80">
                            <li>• Incubated under CU-TBI (Chandigarh University)</li>
                            <li>• Supported through mentorship and guidance</li>
                            <li>• Focused on building a viable healthcare MVP</li>
                        </ul>
                    </div>
                </motion.div>

                {/* 4. PRODUCT SCOPE */}
                <motion.div variants={itemVariants}>
                    <h2 className="text-xs font-bold text-foreground tracking-widest mb-4 uppercase border-b border-primary/10 pb-2 w-max text-primary/80">
                        Product_Scope
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 font-mono text-xs text-muted">
                        <div className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary/40" /> Patient-side application
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary/40" /> Hospital / provider interface
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary/40" /> Secure backend systems
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary/40" /> Focus on clean workflows
                        </div>
                    </div>
                </motion.div>

                {/* 5. ROLE & RESPONSIBILITY */}
                <motion.div variants={itemVariants} className="relative">
                    <div className="absolute -left-[49px] md:-left-[65px] top-1 w-2 h-2 rounded-full bg-muted/20" />
                    <h2 className="text-xs font-bold text-foreground tracking-widest mb-4 uppercase border-b border-primary/10 pb-2 w-max text-primary/80">
                        Role & Responsibility
                    </h2>
                    <ul className="space-y-2 font-mono text-xs text-muted/90">
                        <li>• Co-founder and product-focused engineer</li>
                        <li>• Responsible for product direction</li>
                        <li>• Backend system design and APIs</li>
                        <li>• Involved in application flows and UX decisions</li>
                    </ul>
                </motion.div>

                {/* 6. WHAT'S NEXT */}
                <motion.div variants={itemVariants}>
                    <h2 className="text-xs font-bold text-foreground tracking-widest mb-4 uppercase border-b border-primary/10 pb-2 w-max text-primary/80">
                        Next_Phase
                    </h2>
                    <ul className="space-y-2 font-mono text-xs text-muted italic opacity-70">
                        <li>.. Completing core MVP flows</li>
                        <li>.. Preparing for wider release</li>
                        <li>.. Refining system stability and UX</li>
                    </ul>
                </motion.div>

                {/* 7. STATUS FOOTER */}
                <motion.div variants={itemVariants} className="pt-8 mt-4 border-t border-primary/10">
                    <div className="flex items-center justify-between font-mono text-[10px] text-muted tracking-wider uppercase">
                        <div>
                            NODE_STATE: <span className="text-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">ACTIVE</span>
                        </div>
                        <div>
                            LAUNCH_PHASE: UPCOMING
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}
