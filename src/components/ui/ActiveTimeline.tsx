'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SKILLS = [
    "JAVA", "SPRING_BOOT", "MICROSERVICES", "AWS", "DOCKER", "KUBERNETES",
    "REACT", "NEXT.JS", "TYPESCRIPT", "SYSTEM_DESIGN", "REDIS", "POSTGRESQL"
];

export default function ActiveTimeline() {
    return (
        <div className="w-full overflow-hidden border-t border-white/5 bg-black/30 backdrop-blur-md">
            <div className="flex items-center py-4">
                {/* Static Label */}
                <div className="px-6 border-r border-white/10 z-10 bg-[#050505] hidden md:block">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-muted">ACTIVE_MODULES</span>
                </div>

                {/* Scrolling Content */}
                <motion.div
                    className="flex items-center gap-8 px-8"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                >
                    {[...SKILLS, ...SKILLS].map((skill, i) => ( // Duplicate for infinite scroll
                        <div key={`${skill}-${i}`} className="flex items-center gap-2 shrink-0 group cursor-default">
                            <div className="w-1.5 h-1.5 border border-primary/40 group-hover:bg-primary transition-colors rotate-45" />
                            <span className="text-xs font-mono tracking-widest text-muted/80 group-hover:text-primary transition-colors">
                                {skill}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
