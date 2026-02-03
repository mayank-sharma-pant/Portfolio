'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stackData, MaturityStatus } from '@/data/stack';
import { Server, Activity, ShieldCheck, ChevronRight, ChevronDown } from 'lucide-react';
import { useSystem } from '@/context/SystemContext';
import { synth } from '@/utils/audio-engine';

const languageFunctions: Record<string, string[]> = {
    'Java': [
        'REST API implementation',
        'Business logic & workflows',
        'Validation & error handling',
        'Data access coordination',
        'Integration with persistence layer'
    ],
    'JavaScript': [
        'Frontend state handling',
        'UI interaction logic',
        'API integration (fetch / axios)',
        'Client-side validation',
        'Tooling & build scripts'
    ],
    'SQL (MySQL)': [
        'Schema design',
        'Relational data modeling',
        'Query optimization',
        'Transactional operations'
    ],
    'Node.js': [
        'Frontend build tooling',
        'Script execution',
        'Lightweight service utilities'
    ]
};

export default function StackView() {
    const { pushLog } = useSystem();
    const [expandedLanguage, setExpandedLanguage] = useState<string | null>(null);

    const handleInspect = (category: string, name: string, status: MaturityStatus) => {
        synth.playHover();
        pushLog(`Inspecting ${category} / ${name}... Status: ${status}`, 'SYSTEM');
    };

    const handleLanguageClick = (languageName: string) => {
        synth.playClick();
        if (expandedLanguage === languageName) {
            pushLog(`Collapsing LANGUAGE_FUNCTIONS for ${languageName}`, 'SYSTEM');
            setExpandedLanguage(null);
        } else {
            if (expandedLanguage) {
                pushLog(`Collapsing LANGUAGE_FUNCTIONS for ${expandedLanguage}`, 'SYSTEM');
            }
            pushLog(`Loading LANGUAGE_FUNCTIONS for ${languageName}`, 'SYSTEM');
            setTimeout(() => {
                pushLog(`Functions mapped successfully`, 'SYSTEM');
            }, 150);
            setExpandedLanguage(languageName);
        }
    };

    return (
        <div className="space-y-10 pb-12">
            <section className="relative border border-border bg-secondary px-8 py-8">
                <div className="absolute -inset-2 border border-border/40 pointer-events-none" />
                <div className="text-[11px] uppercase tracking-[0.6em] text-muted">System Dependencies</div>
                <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-foreground">Stack</h1>
                <div className="mt-4 text-xs font-mono text-muted">MATURITY_MODEL: ENFORCED</div>
            </section>

            <section className="relative border border-border bg-background px-6 py-6">
                <div className="absolute -inset-2 border border-border/30 pointer-events-none" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stackData.map((category, catIndex) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: catIndex * 0.15 }}
                            className="relative border border-border/60 bg-secondary/40 px-4 py-5"
                        >
                            <div className="absolute -inset-2 border border-border/30 pointer-events-none" />
                            <div className="flex items-center gap-3 mb-6">
                                <Server className="w-4 h-4 text-primary" />
                                <div className="font-mono font-bold text-xs text-primary tracking-wider">
                                    {category.name}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {category.nodes.map((node, nodeIndex) => {
                                    const isLanguageLayer = category.name === 'LANGUAGE_LAYER';
                                    const hasFunction = isLanguageLayer && languageFunctions[node.name];
                                    const isExpanded = expandedLanguage === node.name;

                                    return (
                                        <div key={node.id}>
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: (catIndex * 0.15) + (nodeIndex * 0.08) + 0.2 }}
                                                className="group"
                                                onMouseEnter={() => handleInspect(category.name, node.name, node.status)}
                                            >
                                                <div
                                                    className={`border p-3 transition-colors flex items-center justify-between ${node.status === 'STABLE'
                                                            ? 'bg-background/60 border-primary/30 hover:border-primary/60'
                                                            : 'bg-background/40 border-border/60 hover:border-primary/40'}
                                                        ${hasFunction ? 'cursor-pointer' : 'cursor-crosshair'}`}
                                                    onClick={() => hasFunction && handleLanguageClick(node.name)}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {node.status === 'STABLE' ? (
                                                            <ShieldCheck className="w-3 h-3 text-primary" />
                                                        ) : (
                                                            <Activity className="w-3 h-3 text-muted group-hover:text-primary transition-colors" />
                                                        )}
                                                        <span className={`text-sm ${node.status === 'STABLE' ? 'text-foreground' : 'text-muted group-hover:text-foreground'}`}>
                                                            {node.name}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-[9px] px-1.5 py-0.5 border font-mono tracking-wider ${node.status === 'STABLE'
                                                                ? 'border-primary/40 text-primary'
                                                                : 'border-muted/30 text-muted'}
                                                            `}>
                                                            {node.status}
                                                        </span>
                                                        {hasFunction && (
                                                            <div className="text-primary/60 group-hover:text-primary transition-colors">
                                                                {isExpanded ? (
                                                                    <ChevronDown className="w-3 h-3" />
                                                                ) : (
                                                                    <ChevronRight className="w-3 h-3" />
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>

                                            <AnimatePresence>
                                                {isExpanded && hasFunction && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-2 pl-4 pr-3 py-3 bg-background/70 border-t border-border">
                                                            <div className="space-y-2">
                                                                <h4 className="text-[10px] font-mono tracking-wider text-primary/80 uppercase">
                                                                    LANGUAGE_FUNCTIONS
                                                                </h4>
                                                                <ul className="space-y-1.5">
                                                                    {languageFunctions[node.name].map((func, idx) => (
                                                                        <motion.li
                                                                            key={idx}
                                                                            initial={{ opacity: 0, x: -5 }}
                                                                            animate={{ opacity: 1, x: 0 }}
                                                                            transition={{ delay: idx * 0.05 }}
                                                                            className="flex items-start gap-2 text-xs text-foreground/80"
                                                                        >
                                                                            <span className="text-primary/50 mt-0.5">•</span>
                                                                            <span>{func}</span>
                                                                        </motion.li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
