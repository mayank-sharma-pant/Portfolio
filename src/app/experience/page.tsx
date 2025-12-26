'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '@/data/experience';
import { ArrowLeft, Terminal, Activity } from 'lucide-react';
import Link from 'next/link';

export default function ExperiencePage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors group">
                    <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                        <span className="text-primary">/</span> SYSTEM_LOGS: EXPERIENCE
                    </h1>
                    <p className="text-muted font-mono text-xs mt-1">
                        RETRIEVING KERNEL HISTORY... FOUND {experience.length} ENTRIES
                    </p>
                </div>
            </div>

            <div className="relative border-l border-border ml-3 pl-8 py-2 md:ml-6">
                {experience.map((log, index) => (
                    <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="mb-12 relative group"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[41px] top-1 w-5 h-5 bg-background border-2 border-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        </div>

                        {/* Content Card */}
                        <div className="bg-card/50 border border-border p-6 relative overflow-hidden group-hover:border-primary/50 transition-colors">
                            {/* Decorative Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border/50 pb-4 mb-4 gap-2">
                                <div className="flex items-center gap-3">
                                    <Terminal className="w-4 h-4 text-primary" />
                                    <h2 className="text-lg font-bold text-foreground font-mono">{log.role}</h2>
                                </div>
                                <div className="font-mono text-xs text-muted flex items-center gap-4">
                                    <span>@{log.company}</span>
                                    <span className="text-primary">[{log.period}]</span>
                                </div>
                            </div>

                            {/* Log Details */}
                            <ul className="space-y-3 font-mono text-sm text-muted">
                                {log.details.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="text-primary mt-1">{">"}</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Background Scanline */}
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </div>

                        {/* Meta ID */}
                        <div className="absolute -right-2 -top-4 text-[10px] font-mono text-border group-hover:text-primary/30 transition-colors">
                            ID::{log.id}
                        </div>
                    </motion.div>
                ))}

                {/* End of Log Marker */}
                <div className="absolute -left-[37px] bottom-0 w-3 h-3 bg-muted/20 rounded-full" />
            </div>
        </div>
    );
}
