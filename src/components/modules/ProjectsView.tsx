'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { useSystem } from '@/context/SystemContext';
import { synth } from '@/utils/audio-engine';
import { ChevronRight, ChevronDown, Activity, Terminal } from 'lucide-react';

export default function ProjectsView() {
    const { pushLog } = useSystem();
    const [expandedProject, setExpandedProject] = useState<string | null>(null);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    // Initial load logs
    useEffect(() => {
        const timer1 = setTimeout(() => pushLog('> Loading PROJECT_REGISTRY', 'SYSTEM'), 100);
        const timer2 = setTimeout(() => pushLog('> Resolving active and completed nodes', 'SYSTEM'), 600);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [pushLog]);

    const handleProjectHover = (projectId: string, projectName: string) => {
        if (hoveredProject !== projectId) {
            synth.playHover();
            pushLog(`Inspecting project: ${projectName}`, 'SYSTEM');
            setHoveredProject(projectId);
        }
    };

    const handleProjectClick = (projectId: string, projectName: string) => {
        if (expandedProject === projectId) return; // Already open

        synth.playClick();
        pushLog(`Opening project node: ${projectName}`, 'SYSTEM');
        setExpandedProject(projectId);
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="border-b border-primary/20 pb-6">
                <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                    <span className="text-primary">{'>'}</span> PROJECT_REGISTRY
                </h1>
                <div className="mt-2 flex items-center gap-4 text-xs font-mono text-muted">
                    <span>TOTAL_NODES: {projects.length}</span>
                    <span className="text-primary flex items-center gap-2">
                        <span className="animate-pulse w-1.5 h-1.5 bg-primary rounded-full" />
                        SYSTEM_ACTIVE
                    </span>
                </div>
            </div>

            {/* Project Nodes List */}
            <div className="space-y-4">
                {projects.map((project, index) => {
                    const isExpanded = expandedProject === project.id;
                    const isHealiora = project.name === 'Healiora';

                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 }}
                            onMouseEnter={() => handleProjectHover(project.id, project.name)}
                            onClick={() => handleProjectClick(project.id, project.name)}
                            className={`
                                group relative overflow-hidden transition-all duration-300
                                border ${isExpanded ? 'border-primary/60 bg-primary/5' : 'border-white/10 bg-black/40 hover:border-white/20 hover:bg-white/5'}
                                ${isHealiora ? 'border-l-4 border-l-primary' : ''}
                            `}
                        >
                            {/* Node Header (Always Visible) */}
                            <div className="p-4 sm:p-5 flex flex-col md:flex-row gap-4 md:items-center justify-between cursor-pointer">

                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs font-mono ${isExpanded ? 'text-primary' : 'text-muted'}`}>
                                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                        </span>
                                        <h3 className={`font-bold tracking-wide text-lg ${isHealiora ? 'text-white' : 'text-foreground'}`}>
                                            {project.name}
                                        </h3>
                                        {project.status === 'ACTIVE' && (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 animate-pulse">
                                                LIVE
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs font-mono text-muted pl-7">
                                        <span className="flex items-center gap-2">
                                            <span className="w-1 h-1 bg-primary/50 rounded-full" />
                                            {project.type}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <span className="w-1 h-1 bg-primary/50 rounded-full" />
                                            {project.context}
                                        </span>
                                    </div>
                                </div>

                                <div className="pl-7 md:pl-0 md:text-right text-xs font-mono text-primary/80">
                                    {project.status}
                                </div>
                            </div>

                            {/* Node Details (Expandable) */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-black/20"
                                    >
                                        <div className="p-5 pt-0 pl-11 space-y-6 text-sm">

                                            {/* Stack */}
                                            <div className="space-y-2">
                                                <div className="text-xs font-mono text-muted uppercase tracking-wider">Tech Stack</div>
                                                <div className="font-mono text-primary/90">{project.tech}</div>
                                            </div>

                                            {/* Focus Points */}
                                            <div className="space-y-2">
                                                <div className="text-xs font-mono text-muted uppercase tracking-wider">Engineering Focus</div>
                                                <ul className="space-y-1">
                                                    {project.focus.map((point, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-foreground/80">
                                                            <span className="mt-1.5 w-1 h-1 bg-primary rounded-full" />
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Description */}
                                            <div className="space-y-2">
                                                <div className="text-xs font-mono text-muted uppercase tracking-wider">Context</div>
                                                <p className="text-muted leading-relaxed max-w-3xl">
                                                    {project.description}
                                                </p>
                                            </div>

                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer Status */}
            <div className="mt-8 text-[10px] font-mono text-muted/40 text-right border-t border-white/5 pt-4">
                SYSTEM_REGISTRY_V1.0 // ALL_NODES_LOADED
            </div>
        </div>
    );
}
