'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { ExternalLink } from 'lucide-react';

export default function ProjectsView() {
    return (
        <div className="space-y-6">
            {/* Module Header */}
            <div className="flex flex-col gap-2 border-b border-primary/20 pb-4">
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="text-primary">{'>'}</span> MODULE_LOADED: PROJECTS
                </h2>
                <div className="flex items-center gap-4 text-xs font-mono text-muted">
                    <span>TOTAL_NODES: {projects.length}</span>
                    <span>STATUS: ACTIVE</span>
                    <span className="text-primary animate-pulse">● LIVE_CONNECTION</span>
                </div>
            </div>

            {/* Terminal Data Grid */}
            <div className="border border-border/50 bg-black/20 w-full overflow-hidden">
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-4 p-3 border-b border-border/50 bg-white/5 text-[10px] sm:text-xs font-mono text-primary font-bold uppercase tracking-wider">
                    <div className="col-span-2">ID_REF</div>
                    <div className="col-span-4 sm:col-span-3">PROJECT_NAME</div>
                    <div className="hidden sm:block sm:col-span-4">DESCRIPTION</div>
                    <div className="hidden sm:block sm:col-span-2">STACK</div>
                    <div className="col-span-3 sm:col-span-1 text-right">STATUS</div>
                    {/* <div className="hidden sm:block sm:col-span-1 text-right">LINK</div> */}
                </div>

                {/* Data Rows */}
                <div className="divide-y divide-border/20">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="grid grid-cols-12 gap-4 p-3 sm:p-4 items-center hover:bg-white/5 transition-colors group font-mono text-xs cursor-pointer"
                        >
                            <div className="col-span-2 text-muted/50 group-hover:text-primary transition-colors">
                                {project.id.split('_')[1]}
                            </div>

                            <div className="col-span-4 sm:col-span-3 font-bold text-foreground overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-primary transition-colors flex items-center gap-2">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-2">{'>'}</span>
                                {project.name}
                            </div>

                            <div className="hidden sm:block sm:col-span-4 text-muted truncate opacity-80">
                                {project.description}
                            </div>

                            <div className="hidden sm:block sm:col-span-2 text-primary/60 truncate text-[10px]">
                                [{project.tech.join(', ')}]
                            </div>

                            <div className="col-span-3 sm:col-span-1 text-right">
                                <span className={`
                  px-1.5 py-0.5 text-[10px] border tracking-wider
                  ${project.status === 'LIVE' ? 'border-green-500/30 text-green-400 bg-green-500/5' :
                                        project.status === 'BETA' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5' :
                                            'border-gray-500/30 text-gray-500 bg-gray-500/5'}
                `}>
                                    {project.status}
                                </span>
                            </div>

                            {/* External Link Overlay on Hover? Or just clickable row */}
                            {/* <div className="hidden sm:block sm:col-span-1 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 text-primary ml-auto" />
                </a>
              </div> */}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Footer Status */}
            <div className="text-[10px] font-mono text-muted/40 text-right">
                END_OF_LIST // BUFFER_CLEAR
            </div>
        </div>
    );
}
