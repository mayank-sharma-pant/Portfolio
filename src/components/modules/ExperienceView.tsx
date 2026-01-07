import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '@/data/experience';
import SystemPanel from '@/components/ui/SystemPanel';

export default function ExperienceView() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-12">
            {/* Module Header */}
            <div className="flex flex-col gap-2 border-b border-primary/20 pb-4 mb-8">
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="text-primary">{'>'}</span> SYSTEM_LOGS: EXPERIENCE
                </h2>
                <div className="flex items-center gap-4 text-xs font-mono text-muted">
                    <span>KERNEL_HISTORY_FOUND: {experience.length}</span>
                    <span>MODE: READ_ONLY</span>
                </div>
            </div>

            <div className="relative border-l border-border/40 ml-3 pl-8 py-2 md:ml-6 space-y-12">
                {experience.map((log, index) => (
                    <LogItem key={log.id} log={log} index={index} />
                ))}
            </div>
        </div>
    );
}

function LogItem({ log, index }: { log: any, index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative"
        >
            {/* Timeline Node */}
            <div className="absolute -left-[45px] top-6 w-3 h-3 bg-background border border-primary/50 flex items-center justify-center z-10 rounded-full">
                <div className="w-1 h-1 bg-primary/50" />
            </div>

            <SystemPanel
                id={`EXP_${log.id}`}
                className="backdrop-blur-sm bg-black/40"
            >
                <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/20 pb-4 mb-4 gap-2">
                        <div className="flex items-center gap-3">
                            <span className="text-primary text-xs font-mono px-2 py-0.5 bg-primary/10 rounded-sm">
                                {log.period}
                            </span>
                            <h2 className="text-base font-bold text-foreground font-mono tracking-tight">
                                {log.role}
                            </h2>
                        </div>
                        <div className="font-mono text-xs text-muted flex items-center gap-2">
                            <span className="opacity-50">@</span>
                            <span className="text-foreground">{log.company}</span>
                        </div>
                    </div>

                    {/* Log Details */}
                    <ul className="space-y-2.5 font-mono text-xs sm:text-sm text-muted/80">
                        {log.details.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="text-primary/40 mt-1.5 w-1 h-1 bg-primary/40 rounded-full relative top-0.5"></span>
                                <span className="leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Meta ID */}
                <div className="absolute right-4 top-4 text-[9px] font-mono text-border opacity-50">
                    REF::{log.id}
                </div>
            </SystemPanel>
        </motion.div>
    );
}
