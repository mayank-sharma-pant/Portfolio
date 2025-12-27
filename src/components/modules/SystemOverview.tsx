'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SystemOverview() {
    const [lineCount, setLineCount] = useState(0);

    // Sequential text appearance
    useEffect(() => {
        const interval = setInterval(() => {
            setLineCount(prev => (prev < 20 ? prev + 1 : prev));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const show = (idx: number) => lineCount > idx;

    return (
        <div className="h-full w-full flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 font-mono text-sm">

                {/* Left Column: Identity & Context */}
                <div className="space-y-12">
                    
                    {/* 1. SYSTEM IDENTITY */}
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: show(1) ? 1 : 0 }}
                        className="space-y-4"
                    >
                        <h2 className="text-xs uppercase tracking-widest text-muted border-b border-white/10 pb-2 mb-4">
                            SYSTEM_ID
                        </h2>
                        <div className="space-y-1">
                            <div className="flex gap-4">
                                <span className="text-muted w-24">NAME:</span>
                                <span className="text-foreground font-bold">Mayank Sharma</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-muted w-24">TYPE:</span>
                                <span className="text-primary">Backend-Focused Engineering System</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-muted w-24">STATE:</span>
                                <span className="text-green-500 flex items-center gap-2">
                                    ACTIVE <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. ROLE & CONTEXT */}
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: show(4) ? 1 : 0 }}
                        className="space-y-4"
                    >
                         <h2 className="text-xs uppercase tracking-widest text-muted border-b border-white/10 pb-2 mb-4">
                            CURRENT_ROLE
                        </h2>
                        <ul className="space-y-2 text-foreground/80">
                            <li className="flex items-center gap-2">
                                <span className="text-primary/50">›</span> Backend Developer Intern
                            </li>
                             <li className="flex items-center gap-2">
                                <span className="text-primary/50">›</span> Product-Focused Engineer
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Right Column: Execution & Focus */}
                <div className="space-y-12">

                    {/* 3. EXECUTION CONTEXT */}
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: show(7) ? 1 : 0 }}
                        className="space-y-4"
                    >
                        <h2 className="text-xs uppercase tracking-widest text-muted border-b border-white/10 pb-2 mb-4">
                            EXECUTION_CONTEXT
                        </h2>
                        <ul className="space-y-2 text-foreground/80">
                            <li className="flex items-start gap-3">
                                <span className="text-primary/50 mt-1">•</span>
                                <span>Backend Intern — SunEdge IT Solutions</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary/50 mt-1">•</span>
                                <span>Co-founder — Healiora (CU-TBI Incubated)</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <span className="text-primary/50 mt-1">•</span>
                                <span>B.Tech CSE — Chandigarh University</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* 4. SYSTEM FOCUS */}
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: show(12) ? 1 : 0 }}
                        className="space-y-4"
                    >
                         <h2 className="text-xs uppercase tracking-widest text-muted border-b border-white/10 pb-2 mb-4">
                            SYSTEM_FOCUS
                        </h2>
                         <ul className="space-y-2 text-foreground/80">
                            <li className="flex items-start gap-3">
                                <span className="text-primary/50 mt-1">›</span>
                                <span>Backend APIs & clean architecture</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary/50 mt-1">›</span>
                                <span>Real-world product development</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <span className="text-primary/50 mt-1">›</span>
                                <span>Learning frontend systems & UI behavior</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* 5. FOOTER STATUS */}
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: show(15) ? 1 : 0 }}
                        className="pt-8 border-t border-dashed border-white/10 text-xs text-muted font-mono"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="opacity-50 block mb-1">MODE</span>
                                <span className="text-foreground tracking-wider">LEARNING + BUILDING</span>
                            </div>
                            <div>
                                <span className="opacity-50 block mb-1">LAST_ACTIVITY</span>
                                <span className="text-primary">Active modules running</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
