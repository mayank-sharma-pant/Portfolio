'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Zap, GitBranch, Server, Globe, Lock } from 'lucide-react';

export default function HealioraView() {
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Primary Header */}
            <div className="flex flex-col gap-2 border-b-2 border-primary pb-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                        <Activity className="w-8 h-8 text-primary animate-pulse" />
                        <span className="tracking-[0.2em]">HEALIORA_PRIME</span>
                    </h2>
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/50 text-primary text-xs font-bold tracking-wider rounded-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        STATUS: INCUBATED
                    </div>
                </div>
                <div className="flex items-center gap-6 text-xs font-mono text-muted mt-2">
                    <span>ROLE: CO-FOUNDER | PRODUCT_LEAD</span>
                    <span>ACCESS_LEVEL: ADMIN / ROOT</span>
                    <span>UPTIME: 99.98%</span>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Left Column: Mission & Core Stats */}
                <div className="space-y-6">
                    {/* Mission Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-black/30 border border-border p-6 relative group overflow-hidden"
                    >
                        <h3 className="text-sm text-muted font-bold tracking-widest mb-4 flex items-center gap-2">
                            <Globe className="w-4 h-4" /> DIRECTIVE // MISSION
                        </h3>
                        <p className="font-mono text-sm leading-relaxed text-foreground/90">
                            Developing an AI-driven ecosystem to optimize healthcare coordination.
                            Streamlining patient-provider communication through autonomous agents and predictive analytics.
                        </p>

                        {/* Decorative corner */}
                        <div className="absolute top-0 right-0 p-2">
                            <div className="w-2 h-2 bg-primary/50" />
                        </div>
                    </motion.div>

                    {/* System Health / Contribution Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-black/30 border border-border p-4"
                        >
                            <div className="text-xs text-muted font-mono mb-2">CONTRIBUTION</div>
                            <div className="text-2xl font-bold text-white mb-1">Architecture</div>
                            <div className="h-1 w-full bg-secondary overflow-hidden">
                                <div className="h-full w-[90%] bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-black/30 border border-border p-4"
                        >
                            <div className="text-xs text-muted font-mono mb-2">SYSTEM_LOAD</div>
                            <div className="text-2xl font-bold text-white mb-1">High</div>
                            <div className="h-1 w-full bg-secondary overflow-hidden">
                                <div className="h-full w-[75%] bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Column: Technical Stack Details */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-black/30 border border-border p-6 h-full relative"
                    >
                        <h3 className="text-sm text-muted font-bold tracking-widest mb-6 flex items-center gap-2">
                            <Server className="w-4 h-4" /> CORE_INFRASTRUCTURE
                        </h3>

                        <ul className="space-y-4 font-mono text-sm">
                            <li className="flex items-center justify-between group">
                                <span className="text-muted group-hover:text-primary transition-colors">Backend Core</span>
                                <span className="text-foreground">Node.js / Express</span>
                            </li>
                            <li className="flex items-center justify-between group">
                                <span className="text-muted group-hover:text-primary transition-colors">Data Layer</span>
                                <span className="text-foreground">PostgreSQL + Redis</span>
                            </li>
                            <li className="flex items-center justify-between group">
                                <span className="text-muted group-hover:text-primary transition-colors">AI Agents</span>
                                <span className="text-foreground">Python / LangChain</span>
                            </li>
                            <li className="flex items-center justify-between group">
                                <span className="text-muted group-hover:text-primary transition-colors">Deploy</span>
                                <span className="text-foreground">AWS (ECS / Fargate)</span>
                            </li>
                        </ul>

                        {/* Security Badge */}
                        <div className="mt-8 flex items-center justify-center p-4 bg-primary/5 border border-primary/20 rounded-sm">
                            <Shield className="w-5 h-5 text-primary mr-3" />
                            <span className="font-mono text-xs text-primary font-bold">HIPAA_COMPLIANCE_MODE: ACTIVE</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom: Roadmap / Terminal */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-black/40 border-t-2 border-primary/30 p-4 font-mono text-xs text-muted"
            >
                <div className="flex items-center gap-2 text-primary mb-2">
                    <GitBranch className="w-4 h-4" />
                    <span className="font-bold">LIVE_ROADMAP_FEED</span>
                </div>
                <div className="space-y-1 opacity-70">
                    <p>{'>'} Q3 2024: Beta launch initiated for select providers.</p>
                    <p>{'>'} Q4 2024: Integration with major EMR systems [IN_PROGRESS].</p>
                    <p className="animate-pulse">{'>'} CURRENT: Scaling websocket infrastructure for real-time chat.</p>
                </div>
            </motion.div>

        </div>
    );
}
