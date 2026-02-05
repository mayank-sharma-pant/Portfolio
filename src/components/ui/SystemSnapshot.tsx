'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Code2, Cpu, Zap } from 'lucide-react';

const tiles = [
    {
        icon: Activity,
        label: "CURRENT ROLE",
        value: "BACKEND LEAD",
        sub: "SCALING SYSTEMS"
    },
    {
        icon: Code2,
        label: "CORE STACK",
        value: "GO / NODE / K8S",
        sub: "DISTRIBUTED ARCH"
    },
    {
        icon: Zap,
        label: "ACTIVE FOCUS",
        value: "PERFORMANCE",
        sub: "LATENCY < 50MS"
    },
    {
        icon: Cpu,
        label: "MODE",
        value: "BUILDING",
        sub: "SYSTEM V2.0"
    }
];

export default function SystemSnapshot() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {tiles.map((tile, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="group relative overflow-hidden bg-secondary/50 border border-white/5 hover:border-primary/30 p-4 transition-all duration-300"
                >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full justify-between gap-3">
                        <div className="flex items-center justify-between">
                            <tile.icon className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors" />
                        </div>

                        <div>
                            <div className="text-[10px] uppercase tracking-wider text-muted mb-1 font-mono">
                                {tile.label}
                            </div>
                            <div className="text-sm font-bold text-foreground font-mono tracking-tight">
                                {tile.value}
                            </div>
                            <div className="text-[9px] text-muted/60 mt-1 uppercase tracking-widest">
                                [{tile.sub}]
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
