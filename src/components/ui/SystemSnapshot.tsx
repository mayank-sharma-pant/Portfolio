'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Code2, Cpu, Zap } from 'lucide-react';

const tiles = [
    {
        icon: Activity,
        label: "CURRENT_ROLE",
        value: "BACKEND LEAD",
        sub: "SCALING SYSTEMS"
    },
    {
        icon: Code2,
        label: "ACTIVE_STACK",
        value: "GO / NODE / K8S",
        sub: "DISTRIBUTED ARCH"
    },
    {
        icon: Zap,
        label: "PRIMARY_FOCUS",
        value: "PERFORMANCE",
        sub: "LATENCY < 50MS"
    },
    {
        icon: Cpu,
        label: "CURRENT_STATE",
        value: "BUILDING",
        sub: "SYSTEM V2.0"
    }
];

export default function SystemSnapshot() {
    return (
        <div className="w-full border-y border-white/10 bg-black/25 backdrop-blur-sm">
            <div className="grid grid-cols-12 gap-x-6">
                {tiles.map((tile, i) => {
                    const needsTopBorder = i > 1;
                    const needsLeftBorder = i % 2 === 1;
                    return (
                        <motion.div
                            key={tile.label}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.06 * i }}
                            className={[
                                'col-span-12 sm:col-span-6 lg:col-span-3 px-4 py-3 flex items-center gap-3',
                                'max-h-24 min-h-[72px]',
                                needsTopBorder ? 'sm:border-t lg:border-t-0 border-white/10' : '',
                                needsLeftBorder ? 'sm:border-l border-white/10' : '',
                                i > 0 ? 'lg:border-l border-white/10' : '',
                            ].join(' ')}
                        >
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
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
