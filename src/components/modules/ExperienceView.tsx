'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '@/data/experience';
import { Terminal } from 'lucide-react';

export default function ExperienceView() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Module Header */}
            <div className="flex flex-col gap-2 border-b border-primary/20 pb-4">
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="text-primary">{'>'}</span> SYSTEM_LOGS: EXPERIENCE
                </h2>
                <div className="flex items-center gap-4 text-xs font-mono text-muted">
                    <span>KERNEL_HISTORY_FOUND: {experience.length}</span>
                    <span>MODE: READ_ONLY</span>
                </div>
            </div>

            <div className="relative border-l border-border/40 ml-3 pl-8 py-2 md:ml-6">
                {experience.map((log, index) => (
                    <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="mb-10 relative group"
                    >
                        {/* Timeline Node */}
                        <div className="absolute -left-[38px] top-1 w-4 h-4 bg-background border border-primary/50 group-hover:border-primary transition-colors flex items-center justify-center z-10">
                            <div className="w-1.5 h-1.5 bg-primary/50 group-hover:bg-primary transition-colors" />
                        </div>

                        {/* Content Card - More Minimal/Terminal Style */}
                        <div className="bg-black/20 border border-border/50 p-5 group-hover:border-primary/30 transition-all relative overflow-hidden panel-glow">
                            {/* Decorative Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/20 pb-3 mb-3 gap-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-primary text-xs font-mono">[{log.period}]</span>
                                    <h2 className="text-base font-bold text-foreground font-mono tracking-tight">{log.role}</h2>
                                </div>
                                <div className="font-mono text-xs text-muted flex items-center gap-2">
                                    <span className="opacity-50">@</span>
                                    <span className="text-foreground">{log.company}</span>
                                </div>
                            </div>

                            {/* Log Details */}
                            <ul className="space-y-2 font-mono text-xs sm:text-sm text-muted/80">
                                {log.details.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="text-primary/40 mt-1">{">"}</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </div>

                        {/* Meta ID */}
                        <div className="absolute -right-0 -top-5 text-[9px] font-mono text-border group-hover:text-primary/40 transition-colors">
                            REF::{log.id}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
