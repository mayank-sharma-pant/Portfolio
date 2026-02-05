'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SystemStatusStrip() {
    const items = [
        { label: 'ROLE', value: 'BACKEND_ENGINEER', color: 'text-primary' },
        { label: 'FOCUS', value: 'SYSTEM_ARCHITECTURE', color: 'text-foreground' },
        { label: 'MODE', value: 'BUILDING', color: 'text-green-500' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-center gap-8 md:gap-16 py-8 border-y border-white/5 bg-black/20 backdrop-blur-sm"
        >
            {items.map((item, index) => (
                <div key={item.label} className="relative group">
                    {/* Label */}
                    <div className="text-[9px] font-mono tracking-[0.3em] text-muted mb-1 flex items-center gap-2">
                        <span className={`w-1 h-1 rounded-full ${item.color} ${index === 2 ? 'animate-pulse' : 'opacity-50'}`} />
                        {item.label}
                    </div>
                    {/* Value */}
                    <div className={`text-xs md:text-sm font-bold tracking-[0.15em] ${item.color} group-hover:opacity-80 transition-opacity`}>
                        {item.value}
                    </div>

                    {/* Hover line */}
                    <div className="absolute -bottom-2 left-0 w-0 h-px bg-current opacity-50 group-hover:w-full transition-all duration-300" />
                </div>
            ))}
        </motion.div>
    );
}
