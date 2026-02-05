'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import LogStream from '@/components/system/LogStream';
import { Terminal, Activity, Wifi } from 'lucide-react';
import { gsap } from 'gsap';

export default function HeroTerminal() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Subtle float animation
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                y: -8,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }
    }, []);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative z-20 w-full max-w-2xl mx-auto"
        >
            {/* Glass Panel Construction */}
            <div className="relative rounded-lg overflow-hidden border border-white/10 bg-[#050505]/90 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)]">

                {/* Header / Status Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <Terminal className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-muted">
                            SYSTEM_TERMINAL
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Activity className="w-3 h-3 text-muted/60" />
                            <span className="text-[9px] font-mono text-muted/60">IDLE</span>
                        </div>
                        <div className="w-px h-3 bg-white/10" />
                        <div className="flex items-center gap-2">
                            <Wifi className="w-3 h-3 text-primary/80" />
                            <span className="text-[9px] font-mono text-primary/80">CNTD</span>
                        </div>
                    </div>
                </div>

                {/* Inner Content - LogStream */}
                <div className="relative">
                    {/* Scanline overlay */}
                    <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />

                    <LogStream
                        variant="light"
                        heightClassName="h-[300px]"
                    />
                </div>

                {/* Footer / Decorative */}
                <div className="h-1 w-full bg-primary/20 relative">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-primary/40 blur-[2px]"
                    />
                </div>
            </div>

            {/* Depth Layers (Behind) */}
            <div className="absolute -inset-4 bg-primary/5 rounded-xl -z-10 blur-2xl opacity-20" />
        </motion.div>
    );
}
