'use client';

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LogStream from '@/components/system/LogStream';
import { useSystem } from '@/context/SystemContext';
import { Lock } from 'lucide-react';
import ProjectsView from '@/components/modules/ProjectsView';
import ExperienceView from '@/components/modules/ExperienceView';
import StackView from '@/components/modules/StackView';
import HealioraView from '@/components/modules/HealioraView';
import SystemCommandsView from '@/components/modules/SystemCommandsView';
import AccessView from '@/components/modules/AccessView';
import LayoutContainer from '@/components/layout/LayoutContainer';

import { synth } from '@/utils/audio-engine';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Lenis from 'lenis';

export default function SystemShell({ children }: { children: React.ReactNode }) {
    const { state, activeModule, mountModule, bootSystem } = useSystem();
    const pathname = usePathname();
    const isHomeView = pathname === '/' && !activeModule;
    const scrollWrapperRef = useRef<HTMLDivElement>(null);
    const scrollContentRef = useRef<HTMLDivElement>(null);

    const handleSystemReset = () => {
        synth.playClick();
        if (activeModule) {
            mountModule('RESET'); // Internal signal to clear
        }
    };

    // Trigger boot on mount
    useEffect(() => {
        bootSystem();
    }, [bootSystem]);

    useEffect(() => {
        // Attempt to start ambient sound on load (will no-op if blocked).
        synth.start();
    }, []);

    useEffect(() => {
        if (!scrollWrapperRef.current || !scrollContentRef.current) return;

        const lenis = new Lenis({
            wrapper: scrollWrapperRef.current,
            content: scrollContentRef.current,
            duration: 1.2,
            smoothWheel: true,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
        });

        let rafId = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);


    // Central Router Logic
    const renderActiveModule = () => {
        switch (activeModule) {
            case 'PROJECTS':
                return <ProjectsView />;
            case 'EXPERIENCE':
                return <ExperienceView />;
            case 'STACK':
                return <StackView />;
            case 'HEALIORA':
                return <HealioraView />;
            case 'SYSTEM_COMMANDS':
                return <SystemCommandsView />;
            case 'ACCESS':
                return <AccessView />;
            default:
                // By default, if no specific module is active but state is active (edge case), 
                // we could show children or empty state.
                return null;
        }
    };

    return (
        <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-background overflow-hidden relative flex flex-col theme-home">

            {/* BOOT SCREEN OVERLAY */}
            <AnimatePresence>
                {state === 'BOOT' && (
                    <motion.div
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                        transition={{ duration: 1 }}
                        className="fixed inset-0 z-[100] bg-[#0b0b0b] flex flex-col items-center justify-center p-8"
                    >
                        {/* Boot wash (no gradients) */}
                        <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                        <div className="absolute inset-0">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 bg-primary/30 animate-ping"
                                    style={{
                                        // Deterministic layout to avoid hydration mismatches in SSR.
                                        left: `${(i * 37) % 100}%`,
                                        top: `${(i * 53) % 100}%`,
                                        animationDelay: `${((i * 0.17) % 2).toFixed(2)}s`,
                                        animationDuration: `${(2 + (i * 0.19) % 2).toFixed(2)}s`
                                    }}
                                />
                            ))}
                        </div>

                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="relative z-10"
                        >
                            <Lock className="w-16 h-16 text-primary mb-8 animate-pulse drop-shadow-[0_0_18px_rgba(225,91,91,0.55)]" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-primary font-mono text-xl tracking-[0.5em] mb-4 relative z-10"
                        >
                            SYSTEM BOOT SEQUENCE
                        </motion.div>

                        <div className="text-primary/80 flex flex-col items-center gap-3 relative z-10 w-full max-w-md">
                            <div className="anime-runner-track text-primary/80">
                                <div className="anime-runner">
                                    <span className="trail" />
                                    <span className="head" />
                                    <span className="band" />
                                    <span className="body" />
                                    <span className="arm" />
                                    <span className="leg" />
                                </div>
                            </div>
                            <div className="text-[11px] tracking-[0.45em] uppercase text-muted">
                                Running checks...
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="w-full max-w-md relative z-10"
                        >
                            <LogStream />
                        </motion.div>

                        {/* Boot Progress Indicator */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2, delay: 0.8, ease: 'easeInOut' }}
                            className="absolute bottom-8 left-8 right-8 h-0.5 bg-primary/70 rounded-full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* TOP SYSTEM NAVIGATION (Unified) */}
            <nav className="fixed top-0 left-0 right-0 z-[70] h-14 border-b border-border bg-[#0b0b0b]/90 backdrop-blur-md">
                <LayoutContainer className="h-full flex items-center">
                    <div className="flex items-center gap-6">
                        <Link
                            href="/"
                            onClick={() => {
                                synth.playClick();
                                mountModule('RESET');
                            }}
                            className="flex items-center gap-2 group"
                        >
                            <div className={`w-3 h-3 rounded-full ${isHomeView ? 'bg-primary animate-pulse' : 'bg-muted group-hover:bg-primary/50'}`} />
                            <span className="font-mono text-xs font-bold tracking-widest text-foreground">
                                SYSTEM_HVY
                            </span>
                        </Link>

                        {/* Desktop Tabs */}
                        <div className="hidden md:flex items-center h-full ml-8">
                            {[
                                { label: 'WORK', path: '/work' },
                                { label: 'SYSTEMS', path: '/systems' },
                                { label: 'LOGS', path: '/logs' },
                                { label: 'CONTACT', path: '/contact' }
                            ].map((item) => {
                                const isActive = pathname.startsWith(item.path);
                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        onMouseEnter={() => synth.playHover()}
                                        onClick={() => synth.playClick()}
                                        className={`relative h-14 px-6 flex items-center justify-center text-[10px] tracking-[0.2em] font-mono uppercase transition-all duration-300
                                            ${isActive
                                                ? 'text-primary bg-primary/5 border-b-2 border-primary'
                                                : 'text-muted hover:text-foreground hover:bg-white/5 border-b-2 border-transparent'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Side Status */}
                    <div className="ml-auto flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[9px] font-mono text-muted tracking-wider">ONLINE</span>
                        </div>
                    </div>
                </LayoutContainer>
            </nav>

            {/* Main Console */}
            <div className="flex-1 overflow-hidden relative z-10 pt-14">
                <LayoutContainer className="h-full">
                    <main className="relative flex flex-col min-h-0 min-w-0">
                        {/* Content Area */}
                        <div
                            ref={scrollWrapperRef}
                            data-scroll-wrapper
                            className={`flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide ${isHomeView ? 'py-0' : 'py-6'}`}
                        >
                            <div
                                ref={scrollContentRef}
                                data-scroll-content
                                className="relative min-h-full"
                            >
                                <AnimatePresence mode="wait">
                                    {state === 'LOADING_MODULE' ? (
                                        <motion.div
                                            key="loader"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                                        >
                                            <div className="w-64 h-1 bg-secondary overflow-hidden relative">
                                                <motion.div
                                                    className="absolute inset-0 bg-primary"
                                                    initial={{ x: '-100%' }}
                                                    animate={{ x: '100%' }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                />
                                            </div>
                                            <p className="mt-4 font-mono text-xs text-primary/70 animate-pulse">MOUNTING PROCESS...</p>
                                        </motion.div>
                                    ) : state === 'ACTIVE_MODULE' && activeModule ? (
                                        <motion.div
                                            key={activeModule}
                                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                            className="w-full min-w-0"
                                        >
                                            <div className="grid grid-cols-12 gap-x-6">
                                                <div className="col-span-12 min-w-0">
                                                    {renderActiveModule()}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="h-full w-full">
                                            <div className="grid grid-cols-12 gap-x-6">
                                                <div className="col-span-12 min-w-0">
                                                    {children}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </main>
                </LayoutContainer>
            </div>
        </div>
    );
}
