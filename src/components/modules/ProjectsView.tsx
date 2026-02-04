'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { useSystem } from '@/context/SystemContext';
import { synth } from '@/utils/audio-engine';
import { ChevronRight, ChevronDown } from 'lucide-react';
import StaggerContainer, { StaggerItem } from '@/components/ui/StaggerContainer';

export default function ProjectsView() {
    const { pushLog } = useSystem();
    const [expandedProject, setExpandedProject] = useState<string | null>(null);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

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
        if (expandedProject === projectId) return;
        synth.playClick();
        pushLog(`Opening project node: ${projectName}`, 'SYSTEM');
        setExpandedProject(projectId);
    };

    return (
        <div className="space-y-10 pb-12">
            <section className="relative border border-border bg-secondary px-8 py-8">
                <div className="absolute -inset-2 border border-border/40 pointer-events-none" />
                <div className="relative z-10">
                    <div className="text-[11px] uppercase tracking-[0.55em] text-muted">EP_02 — PROJECT LOG</div>
                    <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-foreground">Projects</h1>
                    <div className="mt-4 text-xs font-mono text-muted flex items-center gap-4">
                        <span>TOTAL_NODES: {projects.length}</span>
                        <span className="text-primary">STATUS: ACTIVE</span>
                    </div>
                </div>
            </section>

            <section className="relative border border-border bg-background px-6 py-6">
                <div className="absolute -inset-2 border border-border/30 pointer-events-none" />
                <StaggerContainer className="space-y-4">
                    {projects.map((project) => {
                        const isExpanded = expandedProject === project.id;
                        return (
                            <StaggerItem
                                key={project.id}
                                className={`border border-border/60 bg-secondary/40 transition-colors ${isExpanded ? 'border-primary/60' : 'hover:border-border'}`}
                            >
                                <div
                                    onMouseEnter={() => handleProjectHover(project.id, project.name)}
                                    onClick={() => handleProjectClick(project.id, project.name)}
                                >
                                    <div className="p-5 flex flex-col md:flex-row gap-4 md:items-center justify-between cursor-pointer">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <span className={`text-xs font-mono ${isExpanded ? 'text-primary' : 'text-muted'}`}>
                                                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                                </span>
                                                <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                                                {project.status === 'ACTIVE' && (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] border border-primary/40 text-primary">
                                                        LIVE
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs font-mono text-muted pl-7">
                                                <span>{project.type}</span>
                                                <span>{project.context}</span>
                                            </div>
                                        </div>
                                        <div className="pl-7 md:pl-0 md:text-right text-xs font-mono text-muted">
                                            {project.status}
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-5 pt-0 pl-11 space-y-6 text-sm">
                                                    <div className="space-y-2">
                                                        <div className="text-xs font-mono text-muted uppercase tracking-wider">Tech Stack</div>
                                                        <div className="font-mono text-primary/90">{project.tech}</div>
                                                    </div>
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
                                </div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
            </section>
        </div>
    );
}
