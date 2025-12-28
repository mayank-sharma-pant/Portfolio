'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Starfield from '@/components/ui/Starfield';
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
import { useRouter } from 'next/navigation';

// Sub-components for cleanliness
const ModuleButton = ({ id, label, icon: Icon, active, onClick }: any) => (
    <button
        onClick={onClick}
        onMouseEnter={() => synth.playHover()}
        className={`w-full flex items-center gap-4 p-4 transition-all duration-300 border-l-2 relative overflow-hidden group ${active
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-transparent text-muted hover:text-foreground hover:bg-white/5'
            }`}
    >
        <Icon className={`w-5 h-5 ${active ? 'animate-pulse' : ''}`} />
        <span className="font-mono text-sm tracking-wider">{label}</span>

        {/* Hover Scanline */}
        <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 pointer-events-none" />
    </button>
);

export default function SystemShell({ children }: { children: React.ReactNode }) {
    const { state, activeModule, mountModule, bootSystem } = useSystem();
    const router = useRouter();

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
        <div className="min-h-screen w-full bg-background text-foreground font-mono selection:bg-primary selection:text-background overflow-hidden relative flex flex-col">

            {/* Background & Effects */}
            <Starfield />
            <div className="fixed inset-0 z-50 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
            <div className="fixed inset-0 z-50 pointer-events-none" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>
            <div className="fixed inset-0 z-50 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]"></div>

            {/* BOOT SCREEN OVERLAY */}
            <AnimatePresence>
                {state === 'BOOT' && (
                    <motion.div
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                        transition={{ duration: 1 }}
                        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8"
                    >
                        <Lock className="w-16 h-16 text-primary mb-8 animate-pulse" />
                        <div className="text-primary font-mono text-xl tracking-[0.5em] mb-4">SYSTEM BOOT SEQUENCE</div>
                        <div className="w-full max-w-md">
                            <LogStream />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top Status Bar */}
            <header className="h-12 border-b border-border bg-background/80 backdrop-blur-md z-40 flex items-center justify-between px-6 text-xs font-bold tracking-[0.2em] text-muted select-none shrink-0">
                <button onClick={handleSystemReset} className="flex items-center gap-6 hover:opacity-80 transition-opacity">
                    <span className="text-primary drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">SYSTEM_HVY.OS</span>
                    <span className="hidden sm:inline-block opacity-50">KERNEL: 5.0.0-rc1</span>
                </button>
                <div className="flex items-center gap-4">
                    <span className="text-green-500 animate-pulse">● ONLINE</span>
                </div>
            </header>

            {/* Main Console Grid */}
            <div className="flex-1 flex overflow-hidden relative z-10">

                {/* Left Sidebar (Module Selector) */}
                <aside className="w-64 border-r border-border bg-black/20 backdrop-blur-sm hidden md:flex flex-col">
                    <div className="p-4 text-xs font-mono text-muted uppercase tracking-widest opacity-50 mb-2">Modules</div>

                    {/* HOME Button */}
                    <ModuleButton
                        id="HOME"
                        label="SYSTEM_OVERVIEW"
                        icon={Home}
                        active={!activeModule}
                        onClick={handleSystemReset}
                    />

                    <div className="h-px bg-border my-2 mx-4"></div>

                    <ModuleButton
                        id="PROJECTS"
                        label="PROJECTS"
                        icon={Database}
                        active={activeModule === 'PROJECTS'}
                        onClick={() => mountModule('PROJECTS')}
                    />
                    <ModuleButton
                        id="EXPERIENCE"
                        label="SYS_LOGS"
                        icon={Terminal}
                        active={activeModule === 'EXPERIENCE'}
                        onClick={() => mountModule('EXPERIENCE')}
                    />
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
                            label="PRI_NODE: HEALIORA"
                            icon={Activity}
                            active={activeModule === 'HEALIORA'}
                            onClick={() => mountModule('HEALIORA')}
                        />
                    </div>
                </aside>

                {/* Center Viewport */}
                <main className="flex-1 relative flex flex-col">
                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-8 relative scrollbar-hide">
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

                    {/* Bottom Log Console */}
                    <LogStream />
                </main>

            </div>
        </div>
    );
}
