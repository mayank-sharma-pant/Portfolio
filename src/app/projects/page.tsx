'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors group">
                    <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                        <span className="text-primary">/</span> MODULE: PROJECTS
                    </h1>
                    <p className="text-muted font-mono text-xs mt-1">
                        INDEXING_ARTIFACTS... TOTAL: {projects.length}
                    </p>
                </div>
            </div>

            {/* Data Grid */}
            <div className="border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-white/5 text-xs font-mono text-muted uppercase tracking-wider">
                    <div className="col-span-2 md:col-span-1">ID</div>
                    <div className="col-span-6 md:col-span-3">PROJECT_NAME</div>
                    <div className="hidden md:block md:col-span-4">DESCRIPTION</div>
                    <div className="hidden md:block md:col-span-2">STACK</div>
                    <div className="col-span-2 md:col-span-1">STATUS</div>
                    <div className="hidden md:block md:col-span-1 text-right">LINK</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-border/50">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors group font-mono text-xs md:text-sm"
                        >
                            <div className="col-span-2 md:col-span-1 text-muted group-hover:text-primary transition-colors">
                                {project.id.split('_')[1]}
                            </div>

                            <div className="col-span-6 md:col-span-3 font-bold text-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                                {project.name}
                            </div>

                            <div className="hidden md:block md:col-span-4 text-muted truncate">
                                {project.description}
                            </div>

                            <div className="hidden md:block md:col-span-2 text-primary/80 truncate">
                                {project.tech.join(', ')}
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <span className={`
                  px-2 py-0.5 rounded-full text-[10px] border
                  ${project.status === 'LIVE' ? 'border-green-500/50 text-green-400 bg-green-500/10' :
                                        project.status === 'BETA' ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10' :
                                            'border-gray-500/50 text-gray-400 bg-gray-500/10'}
                `}>
                                    {project.status}
                                </span>
                            </div>

                            <div className="hidden md:block md:col-span-1 text-right">
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block hover:text-white transition-colors">
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
