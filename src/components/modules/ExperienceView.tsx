'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '@/data/experience';

export default function ExperienceView() {
    return (
        <div className="space-y-10 pb-12">
            <section className="relative border border-border bg-secondary px-8 py-8">
                <div className="absolute -inset-2 border border-border/40 pointer-events-none" />
                <div className="relative z-10">
                    <div className="text-[11px] uppercase tracking-[0.55em] text-muted">EP_03 — LAB NOTES</div>
                    <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-foreground">Experience</h1>
                    <div className="mt-4 text-xs font-mono text-muted">LOG_ENTRIES: {experience.length}</div>
                </div>
            </section>

            <section className="relative border border-border bg-background px-6 py-6">
                <div className="absolute -inset-2 border border-border/30 pointer-events-none" />
                <div className="space-y-10">
                    {experience.map((log, index) => (
                        <LogItem key={log.id} log={log} index={index} />
                    ))}
                </div>
            </section>
        </div>
    );
}

function LogItem({ log, index }: { log: any, index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="relative border border-border/60 bg-secondary/40 px-6 py-6"
        >
            <div className="absolute -inset-2 border border-border/30 pointer-events-none" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/50 pb-4 mb-4 gap-2">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2 py-0.5 bg-primary/10 text-primary border border-primary/30">
                        {log.period}
                    </span>
                    <h2 className="text-base font-semibold text-foreground">{log.role}</h2>
                </div>
                <div className="font-mono text-xs text-muted">
                    @{log.company}
                </div>
            </div>
            <ul className="space-y-2.5 font-mono text-xs sm:text-sm text-muted/80">
                {log.details.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                        <span className="text-primary/50 mt-1.5 w-1 h-1 bg-primary/40 rounded-full"></span>
                        <span className="leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}
