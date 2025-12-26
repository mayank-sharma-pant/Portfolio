'use client';

import React, { useEffect, useRef } from 'react';
import { useSystem } from '@/context/SystemContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function LogStream() {
    const { logs } = useSystem();
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <div className="h-48 w-full border-t border-border bg-black/40 backdrop-blur-sm p-4 font-mono text-xs overflow-y-auto font-medium shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="space-y-1">
                <AnimatePresence initial={false}>
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex gap-3 ${log.type === 'ERROR' ? 'text-red-500' :
                                    log.type === 'WARNING' ? 'text-yellow-500' :
                                        log.type === 'SUCCESS' ? 'text-green-500' :
                                            log.type === 'SYSTEM' ? 'text-primary' :
                                                'text-muted'
                                }`}
                        >
                            <span className="opacity-50">[{log.timestamp}]</span>
                            <span>{'>'}</span>
                            <span>{log.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
