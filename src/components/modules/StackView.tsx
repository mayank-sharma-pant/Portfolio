'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { stackData, MaturityStatus } from '@/data/stack';
import { Server, Activity, ShieldCheck } from 'lucide-react';
import { useSystem } from '@/context/SystemContext';
import { synth } from '@/utils/audio-engine';

export default function StackView() {
    const { pushLog } = useSystem();

    const handleInspect = (category: string, name: string, status: MaturityStatus) => {
        synth.playHover();
        pushLog(`Inspecting ${category} / ${name}... Status: ${status}`, 'SYSTEM');
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-2 border-b border-primary/20 pb-4">
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="text-primary">{'>'}</span> SYSTEM_DEPENDENCIES
                </h2>
                <div className="flex items-center gap-4 text-xs font-mono text-muted">
                    <span>MATURITY_MODEL: ENFORCED</span>
                    <span>AXIS: CONFIDENCE</span>
                </div>
            </div>

            {/* Dependency Graph */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                {stackData.map((category, catIndex) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: catIndex * 0.2 }}
                        className="relative"
                    >
                        {/* Category Header */}
                        <div className="flex items-center gap-3 mb-6 p-3 bg-primary/5 border border-primary/20 rounded-sm">
                            <Server className="w-4 h-4 text-primary" />
                            <div className="font-mono font-bold text-sm text-primary tracking-wider">
                                {category.name}
                            </div>
                        </div>

                        {/* Tree Branch Line */}
                        <div className="absolute left-6 top-10 bottom-4 w-px bg-border/30" />

                        {/* Child Nodes */}
                        <div className="space-y-3 pl-12 relative">
                            {category.nodes.map((node, nodeIndex) => (
                                <motion.div
                                    key={node.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: (catIndex * 0.2) + (nodeIndex * 0.1) + 0.3 }}
                                    className="relative group cursor-crosshair"
                                    onMouseEnter={() => handleInspect(category.name, node.name, node.status)}
                                >
                                    {/* Connector */}
                                    <div className="absolute -left-6 top-1/2 w-4 h-px bg-border/30 group-hover:bg-primary/50 transition-colors" />

                                    {/* Node Card - STABLE vs ACTIVE */}
                                    <div className={`
                      border p-3 transition-all duration-300 relative overflow-hidden flex items-center justify-between
                      ${node.status === 'STABLE'
                                            ? 'bg-black/40 border-primary/20 hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                            : 'bg-black/20 border-border/50 hover:border-primary/30 hover:bg-white/5'
                                        }
                   `}>
                                        <div className="flex items-center gap-2">
                                            {/* Icon/Indicator */}
                                            {node.status === 'STABLE' ? (
                                                <ShieldCheck className="w-3 h-3 text-primary opacity-80" />
                                            ) : (
                                                <Activity className="w-3 h-3 text-muted group-hover:text-primary transition-colors" />
                                            )}
                                            <span className={`font-bold text-sm ${node.status === 'STABLE' ? 'text-white' : 'text-muted-foreground group-hover:text-white'}`}>
                                                {node.name}
                                            </span>
                                        </div>

                                        {/* Maturity Badge */}
                                        <span className={`
                         text-[9px] px-1.5 py-0.5 rounded border font-mono tracking-wider
                         ${node.status === 'STABLE'
                                                ? 'border-primary/30 text-primary bg-primary/10 shadow-[0_0_5px_rgba(6,182,212,0.2)]'
                                                : 'border-muted/30 text-muted bg-white/5 group-hover:border-primary/30 group-hover:text-primary/70'
                                            }
                      `}>
                                            {node.status}
                                        </span>

                                        {/* Active Pulse (Only for Active nodes) */}
                                        {node.status === 'ACTIVE' && (
                                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity pointer-events-none" />
                                        )}

                                        {/* Stable Glow (Constant subtle, stronger on hover) */}
                                        {node.status === 'STABLE' && (
                                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors pointer-events-none" />
                                        )}

                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
