'use client';

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LogStream from '@/components/system/LogStream';
import { useSystem } from '@/context/SystemContext';
import { Database, Terminal, Cpu, Activity, Lock, Home, Terminal as Terminal2, Mail } from 'lucide-react';
import ProjectsView from '@/components/modules/ProjectsView';
import ExperienceView from '@/components/modules/ExperienceView';
import StackView from '@/components/modules/StackView';
import HealioraView from '@/components/modules/HealioraView';
import SystemCommandsView from '@/components/modules/SystemCommandsView';
import AccessView from '@/components/modules/AccessView';

import { synth } from '@/utils/audio-engine';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Lenis from 'lenis';

// Sub-components for cleanliness
const ModuleButton = ({ id, label, icon: Icon, active, onClick }: any) => (
    <button
        onClick={onClick}
        onMouseEnter={() => synth.playHover()}
        className={`w-full flex items-center gap-4 p-4 relative overflow-hidden group
            border-l-2 transition-all duration-[280ms] ease-in-out
            ${active
                ? 'border-primary bg-primary/10 text-primary elevation-mid'
                : 'border-transparent text-muted hover:text-foreground hover:bg-white/5'
            }
        `}
        style={{
            transitionDelay: '20ms',
        }}
    >
        <Icon className={`w-5 h-5 transition-transform duration-200 ${active ? 'animate-pulse' : 'group-hover:scale-110'
            }`} />
        <span className="font-sans text-[11px] tracking-[0.2em] uppercase relative">
            {label}
            {/* Underline grow on hover */}
            <span className="absolute bottom-0 left-0 h-[1px] bg-primary w-0 group-hover:w-full transition-all duration-200" />
        </span>

        {/* Hover Scanline */}
        <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 pointer-events-none" />

        {/* Active glow */}
        {active && (
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        )}
    </button>
);

export default function SystemShell({ children }: { children: React.ReactNode }) {
    const { state, activeModule, mountModule, bootSystem } = useSystem();
    const pathname = usePathname();
    const isHomeView = pathname === '/' && !activeModule;
    const isProjectsRoute = pathname === '/projects';
    const isExperienceRoute = pathname === '/experience';
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
                        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8"
                    >
                        {/* Enhanced Boot Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent animate-pulse" />
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
                            className="absolute bottom-8 left-8 right-8 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top Status Bar (hidden on HOME to avoid "dashboard" framing) */}
            {!isHomeView && (
                <header className={`h-12 border-b border-border z-40 flex items-center justify-between px-6 text-xs font-bold tracking-[0.2em] text-muted select-none shrink-0 bg-background/80 backdrop-blur-md elevation-low`}>
                    <button
                        onClick={handleSystemReset}
                        className="flex items-center gap-6 hover:opacity-80 transition-all duration-[280ms] ease-in-out group"
                        style={{ transitionDelay: '20ms' }}
                    >
                        <span className={`text-primary relative drop-shadow-[0_0_10px_rgba(225,91,91,0.65)]`}>
                            SYSTEM_HVY.OS
                            <span className="absolute bottom-0 left-0 h-[1px] bg-primary w-0 group-hover:w-full transition-all duration-200" />
                        </span>
                        <span className="hidden sm:inline-block opacity-50">KERNEL: 5.0.0-rc1</span>
                    </button>
                    <div className="flex items-center gap-4">
                        <span className={`animate-pulse text-green-500`}>ONLINE</span>
                    </div>
                </header>
            )}

            {/* Main Console Grid */}
            <div className="flex-1 flex overflow-hidden relative z-10">

                {/* Left Sidebar (Module Selector) */}
                {!isHomeView && (
                <aside className="w-64 border-r border-border hidden md:flex flex-col bg-black/20 backdrop-blur-sm elevation-low">
                    <div className="p-4 text-xs font-sans text-muted uppercase tracking-widest opacity-50 mb-2">Navigate</div>

                    <Link
                        href="/"
                        className={`w-full flex items-center gap-4 p-4 relative overflow-hidden group border-l-2 transition-all duration-[280ms] ease-in-out ${isHomeView || (!isProjectsRoute && !isExperienceRoute && !activeModule) ? 'border-primary bg-primary/10 text-primary elevation-mid' : 'border-transparent text-muted hover:text-foreground hover:bg-white/5'}`}
                        onMouseEnter={() => synth.playHover()}
                    >
                        <Home className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                        <span className="font-sans text-[11px] tracking-[0.2em] uppercase relative">
                            SYSTEM_OVERVIEW
                            <span className="absolute bottom-0 left-0 h-[1px] bg-primary w-0 group-hover:w-full transition-all duration-200" />
                        </span>
                    </Link>

                    <Link
                        href="/projects"
                        className={`w-full flex items-center gap-4 p-4 relative overflow-hidden group border-l-2 transition-all duration-[280ms] ease-in-out ${isProjectsRoute ? 'border-primary bg-primary/10 text-primary elevation-mid' : 'border-transparent text-muted hover:text-foreground hover:bg-white/5'}`}
                        onMouseEnter={() => synth.playHover()}
                    >
                        <Database className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                        <span className="font-sans text-[11px] tracking-[0.2em] uppercase relative">
                            PROJECTS
                            <span className="absolute bottom-0 left-0 h-[1px] bg-primary w-0 group-hover:w-full transition-all duration-200" />
                        </span>
                    </Link>

                    <Link
                        href="/experience"
                        className={`w-full flex items-center gap-4 p-4 relative overflow-hidden group border-l-2 transition-all duration-[280ms] ease-in-out ${isExperienceRoute ? 'border-primary bg-primary/10 text-primary elevation-mid' : 'border-transparent text-muted hover:text-foreground hover:bg-white/5'}`}
                        onMouseEnter={() => synth.playHover()}
                    >
                        <Terminal className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                        <span className="font-sans text-[11px] tracking-[0.2em] uppercase relative">
                            SYS_LOGS
                            <span className="absolute bottom-0 left-0 h-[1px] bg-primary w-0 group-hover:w-full transition-all duration-200" />
                        </span>
                    </Link>

                    <div className="h-px bg-border my-2 mx-4"></div>

                    <ModuleButton
                        id="STACK"
                        label="DEPENDENCIES"
                        icon={Cpu}
                        active={activeModule === 'STACK'}
                        onClick={() => mountModule('STACK')}
                    />
                    <ModuleButton
                        id="SYSTEM_COMMANDS"
                        label="SYSTEM_COMMANDS"
                        icon={Terminal2}
                        active={activeModule === 'SYSTEM_COMMANDS'}
                        onClick={() => mountModule('SYSTEM_COMMANDS')}
                    />
                    <ModuleButton
                        id="ACCESS"
                        label="ACCESS"
                        icon={Mail}
                        active={activeModule === 'ACCESS'}
                        onClick={() => mountModule('ACCESS')}
                    />
                    <div className="mt-auto p-4 border-t border-border">
                        <ModuleButton
                            id="HEALIORA"
                            label="PRODUCT_NODE: HEALIORA"
                            icon={Activity}
                            active={activeModule === 'HEALIORA'}
                            onClick={() => mountModule('HEALIORA')}
                        />
                    </div>
                </aside>
                )}

                {/* Center Viewport */}
                <main className="flex-1 relative flex flex-col">
                    {/* Content Area */}
                    <div
                        ref={scrollWrapperRef}
                        className={`flex-1 overflow-y-auto relative scrollbar-hide ${isHomeView ? 'p-0' : 'p-8'}`}
                    >
                        <div ref={scrollContentRef} className="relative min-h-full">
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
                                        transition={{ duration: 0.2, ease: 'circOut' }}
                                        className="max-w-5xl mx-auto w-full"
                                    >
                                        {renderActiveModule()}
                                    </motion.div>
                                ) : (
                                    <div className="h-full w-full">
                                        {children}
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Bottom Log Console */}
                    {!isHomeView && (
                        <LogStream />
                    )}
                </main>

            </div>
        </div>
    );
}
