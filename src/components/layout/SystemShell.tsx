'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SystemShell({ children }: { children: React.ReactNode }) {
    const [booted, setBooted] = useState(false);
    const [time, setTime] = useState('');

    // Mock boot sequence & Clock
    useEffect(() => {
        const timer = setTimeout(() => setBooted(true), 1500);
        const clockInterval = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour12: false }));
        }, 1000);
        setTime(new Date().toLocaleTimeString([], { hour12: false }));

        return () => {
            clearTimeout(timer);
            clearInterval(clockInterval);
        };
    }, []);

    return (
        <div className="min-h-screen w-full bg-background text-foreground font-mono selection:bg-primary selection:text-background overflow-hidden relative">

            {/* Background Grid */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Top Status Bar */}
            <header className="fixed top-0 left-0 right-0 h-10 border-b border-border bg-background/90 backdrop-blur-sm z-50 flex items-center justify-between px-6 text-xs font-bold tracking-[0.2em] text-muted select-none">
                <div className="flex items-center gap-6">
                    <span className="text-primary">SYSTEM_HVY.OS</span>
                    <span className="hidden sm:inline-block opacity-50">KERNEL_VER: 4.9.2</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                        <span className="text-foreground">CONN_EST</span>
                    </div>
                    <span className="w-16 text-right">{time}</span>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 pt-20 px-4 pb-20 max-w-7xl mx-auto min-h-screen flex flex-col">
                <AnimatePresence mode="wait">
                    {booted ? (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(10px)' }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="w-full flex-1"
                        >
                            {children}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center flex-1 h-[80vh] text-primary gap-4"
                        >
                            <div className="text-sm tracking-widest animate-pulse">
                                INITIALIZING CORE MODULES...
                            </div>
                            <div className="w-64 h-1 bg-secondary overflow-hidden">
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                    className="w-full h-full bg-primary"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Corner Decorative Elements */}
            <div className="fixed bottom-4 left-4 z-40 text-[10px] text-muted opacity-40 font-mono">
                <div>MEM: 64TB</div>
                <div>CPU: QUANTUM-X</div>
            </div>
        </div>
    );
}
