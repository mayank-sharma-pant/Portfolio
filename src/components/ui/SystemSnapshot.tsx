'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, Code2, Cpu, Zap } from 'lucide-react';
import { useSystem } from '@/context/SystemContext';

const tiles = [
    {
        icon: Activity,
        label: "CURRENT_ROLE",
        value: "BACKEND LEAD",
        sub: "SCALING SYSTEMS",
        extra: "Ops-first architecture"
    },
    {
        icon: Code2,
        label: "ACTIVE_STACK",
        value: "GO / NODE / K8S",
        sub: "DISTRIBUTED ARCH",
        extra: "Streaming + queues"
    },
    {
        icon: Zap,
        label: "PRIMARY_FOCUS",
        value: "PERFORMANCE",
        sub: "LATENCY < 50MS",
        extra: "Auto-scale at peak"
    },
    {
        icon: Cpu,
        label: "CURRENT_STATE",
        value: "BUILDING",
        sub: "SYSTEM V2.0",
        extra: "Shipping upgrades"
    }
];

export default function SystemSnapshot() {
    const { pushLog } = useSystem();
    const lastHoverRef = useRef<Record<string, number>>({});

    const handleHover = (label: string, message: string) => {
        const now = Date.now();
        if ((lastHoverRef.current[label] || 0) + 1800 > now) return;
        lastHoverRef.current[label] = now;
        pushLog(message, 'SYSTEM');
    };

    return (
        <div className="relative w-full border-y border-white/10 bg-black/25 backdrop-blur-sm overflow-hidden">
            <div className="panel-shimmer" />
            <div className="px-4 py-2 text-[10px] font-mono uppercase tracking-[0.35em] text-muted/80">
                SYSTEM_CAPABILITY_OVERVIEW
            </div>
            <div className="grid grid-cols-12 gap-x-6">
                {tiles.map((tile, i) => {
                    const needsTopBorder = i > 1;
                    const needsLeftBorder = i % 2 === 1;
                    const logMessage = `Benchmarking ${tile.label.toLowerCase().replace(/_/g, ' ')} module...`;
                    return (
                        <motion.div
                            key={tile.label}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.06 * i }}
                            className={[
                                'relative col-span-12 sm:col-span-6 lg:col-span-3 px-4 py-3 flex items-center gap-3 group transition-transform duration-200 group-hover:-translate-y-0.5',
                                'max-h-24 min-h-[72px]',
                                needsTopBorder ? 'sm:border-t lg:border-t-0 border-white/10' : '',
                                needsLeftBorder ? 'sm:border-l border-white/10' : '',
                                i > 0 ? 'lg:border-l border-white/10' : '',
                            ].join(' ')}
                            onMouseEnter={() => handleHover(tile.label, logMessage)}
                        >
                            <div className="scanline-sweep opacity-10" />
                            <tile.icon className="w-4 h-4 text-primary/80" />
                            <div className="flex flex-col gap-1 leading-tight">
                                <div className="text-[10px] uppercase tracking-[0.2em] text-muted font-mono">
                                    {tile.label}
                                </div>
                                <div className="text-sm font-bold text-foreground font-mono tracking-tight">
                                    {tile.value}
                                </div>
                                <div className="text-[9px] text-muted/60 uppercase tracking-[0.25em]">
                                    [{tile.sub}]
                                </div>
                                <div className="text-[10px] text-foreground/70 font-mono opacity-0 max-h-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:max-h-6 group-hover:translate-y-0">
                                    {tile.extra}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
