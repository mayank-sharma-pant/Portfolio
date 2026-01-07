'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';
import { synth } from '@/utils/audio-engine';
import { ChevronRight, ChevronDown } from 'lucide-react';
import SystemPanel from '@/components/ui/SystemPanel';

interface Command {
    id: string;
    name: string;
    description: string;
    stack?: string;
}

interface CommandGroup {
    id: string;
    name: string;
    commands: Command[];
}

const commandGroups: CommandGroup[] = [
    {
        id: 'BACKEND_OPERATIONS',
        name: 'BACKEND_OPERATIONS',
        commands: [
            { id: 'build-rest-apis', name: 'build-rest-apis', description: 'Design and implement RESTful backend endpoints', stack: 'Spring Boot, FastAPI' },
            { id: 'design-database-schema', name: 'design-database-schema', description: 'Structure relational databases for application needs' },
            { id: 'implement-validation', name: 'implement-validation', description: 'Add input validation and error handling to APIs' },
            { id: 'handle-authentication', name: 'handle-authentication', description: 'Implement JWT-based authentication flows' },
            { id: 'structure-backend-project', name: 'structure-backend-project', description: 'Organize backend codebase with clean architecture' },
            { id: 'debug-api-issues', name: 'debug-api-issues', description: 'Identify and fix backend bugs and performance issues' }
        ]
    },
    {
        id: 'DATA_OPERATIONS',
        name: 'DATA_OPERATIONS',
        commands: [
            { id: 'model-relational-data', name: 'model-relational-data', description: 'Design entity relationships and database schemas' },
            { id: 'write-sql-queries', name: 'write-sql-queries', description: 'Write optimized SQL queries for data retrieval' },
            { id: 'manage-transactions', name: 'manage-transactions', description: 'Handle database transactions and rollbacks' },
            { id: 'integrate-database-with-api', name: 'integrate-database-with-api', description: 'Connect database layer with API endpoints', stack: 'JPA, Hibernate' }
        ]
    },
    {
        id: 'PRODUCT_OPERATIONS',
        name: 'PRODUCT_OPERATIONS',
        commands: [
            { id: 'define-mvp-scope', name: 'define-mvp-scope', description: 'Break down product ideas into minimal viable features' },
            { id: 'break-feature-into-tasks', name: 'break-feature-into-tasks', description: 'Decompose features into actionable development tasks' },
            { id: 'iterate-on-existing-feature', name: 'iterate-on-existing-feature', description: 'Improve and refine existing product features' },
            { id: 'integrate-user-feedback', name: 'integrate-user-feedback', description: 'Incorporate user testing results into product iterations' }
        ]
    },
    {
        id: 'MOBILE_OPERATIONS',
        name: 'MOBILE_OPERATIONS',
        commands: [
            { id: 'build-android-ui', name: 'build-android-ui', description: 'Create Android UI components with Jetpack Compose' },
            { id: 'manage-mobile-state', name: 'manage-mobile-state', description: 'Handle state management in mobile applications' },
            { id: 'connect-mobile-app-to-api', name: 'connect-mobile-app-to-api', description: 'Integrate mobile apps with REST APIs' }
        ]
    },
    {
        id: 'FRONTEND_OPERATIONS',
        name: 'FRONTEND_OPERATIONS',
        commands: [
            { id: 'build-react-ui', name: 'build-react-ui', description: 'Create React components and user interfaces' },
            { id: 'manage-ui-state', name: 'manage-ui-state', description: 'Handle frontend state with React hooks' },
            { id: 'integrate-rest-api', name: 'integrate-rest-api', description: 'Connect frontend to backend REST APIs', stack: 'fetch, axios' },
            { id: 'add-basic-interactions', name: 'add-basic-interactions', description: 'Implement user interactions and form handling' }
        ]
    },
    {
        id: 'COLLABORATION_OPERATIONS',
        name: 'COLLABORATION_OPERATIONS',
        commands: [
            { id: 'work-with-frontend-team', name: 'work-with-frontend-team', description: 'Coordinate with frontend developers on API contracts' },
            { id: 'follow-git-workflow', name: 'follow-git-workflow', description: 'Use Git for version control and collaboration' },
            { id: 'review-and-debug-code', name: 'review-and-debug-code', description: 'Review code and help debug team issues' },
            { id: 'coordinate-feature-delivery', name: 'coordinate-feature-delivery', description: 'Align with team on feature timelines and delivery' }
        ]
    }
];

export default function SystemCommandsView() {
    const { pushLog } = useSystem();
    const [mounted, setMounted] = useState(false);
    const [visibleGroups, setVisibleGroups] = useState(0);
    const [hoveredCommand, setHoveredCommand] = useState<string | null>(null);
    const [expandedCommand, setExpandedCommand] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
        pushLog('Loading SYSTEM_COMMANDS', 'SYSTEM');
        pushLog('Registering available operations', 'SYSTEM');

        // Progressive group reveal
        const interval = setInterval(() => {
            setVisibleGroups(prev => {
                if (prev < commandGroups.length) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    pushLog('Command registry ready', 'SYSTEM');
                    return prev;
                }
            });
        }, 200);

        return () => clearInterval(interval);
    }, [pushLog]);

    const handleCommandHover = (commandId: string, commandName: string) => {
        if (hoveredCommand !== commandId) {
            synth.playHover();
            setHoveredCommand(commandId);
        }
    };

    const handleCommandClick = (commandId: string, commandName: string) => {
        synth.playClick();
        pushLog(`Inspecting command: ${commandName}`, 'SYSTEM');
        setExpandedCommand(expandedCommand === commandId ? null : commandId);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 font-mono text-sm">

            {/* Page Header */}
            <div className="border-b border-primary/20 pb-4">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="text-primary">{'>'}</span> SYSTEM_COMMANDS
                </h1>
                <p className="text-xs text-muted mt-2">Operational capability registry</p>
            </div>

            {/* Command Groups */}
            <div className="space-y-8">
                {commandGroups.slice(0, visibleGroups).map((group, groupIndex) => (
                    <SystemPanel
                        key={group.id}
                        id={`CMD_GROUP_${group.id}`}
                        title={group.name}
                        className="p-0 overflow-hidden bg-black/40 backdrop-blur-sm"
                        noLift={true} // Commands internal list shouldn't lift the whole panel too much
                    >
                        {/* Commands */}
                        <div className="p-4 space-y-1">
                            {group.commands.map((command, cmdIndex) => (
                                <motion.div
                                    key={command.id}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: cmdIndex * 0.05 }}
                                    onMouseEnter={() => handleCommandHover(command.id, command.name)}
                                    // onMouseLeave handled by parent panel mostly, but granular hover needed for command details
                                    onClick={() => handleCommandClick(command.id, command.name)}
                                    className="cursor-pointer group relative"
                                >
                                    {/* Command Line */}
                                    <div className={`
                                            flex items-start gap-2 p-2 rounded-sm transition-all duration-200
                                            ${expandedCommand === command.id ? 'bg-primary/10' : 'hover:bg-white/5'}
                                            ${hoveredCommand === command.id ? 'text-primary' : 'text-foreground/80'}
                                        `}>
                                        <span className="text-primary/50 mt-0.5">{'>'}</span>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono">{command.name}</span>
                                                {expandedCommand === command.id ? (
                                                    <ChevronDown className="w-3 h-3 text-primary" />
                                                ) : (
                                                    <ChevronRight className="w-3 h-3 text-muted group-hover:text-primary transition-colors" />
                                                )}
                                            </div>

                                            {/* Inline Description on Hover */}
                                            <AnimatePresence>
                                                {hoveredCommand === command.id && expandedCommand !== command.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.15 }}
                                                        className="text-xs text-muted mt-1 pl-4"
                                                    >
                                                        ↳ {command.description}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Expanded Details on Click */}
                                            <AnimatePresence>
                                                {expandedCommand === command.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="mt-2 pl-4 space-y-1 text-xs border-l border-primary/20"
                                                    >
                                                        <div className="text-foreground/80">
                                                            ↳ {command.description}
                                                        </div>
                                                        {command.stack && (
                                                            <div className="text-muted">
                                                                Stack: {command.stack}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </SystemPanel>
                ))}
            </div>

            {/* Cursor Blink Effect */}
            {visibleGroups === commandGroups.length && (
                <div className="flex items-center gap-1 text-primary/50 text-xs">
                    <span>$</span>
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-primary/50"
                    />
                </div>
            )}
        </div>
    );
}
