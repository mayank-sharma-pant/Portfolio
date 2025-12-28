'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { motion, AnimatePresence } from 'framer-motion';
import { parseCommand, getPrompt } from '@/utils/command-parser';
import { synth } from '@/utils/audio-engine';

export default function LogStream() {
    const { logs, activeModule, mountModule, pushLog, clearLogs } = useSystem();
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const handleCommand = (command: string) => {
        if (!command.trim()) return;

        // Add to history
        setCommandHistory(prev => [...prev, command]);
        setHistoryIndex(-1);

        // Echo command to terminal
        pushLog(`${getPrompt(activeModule)} ${command}`, 'INFO');

        // Parse and execute
        const result = parseCommand(command, activeModule);

        if (result.action === 'CLEAR') {
            clearLogs();
            return;
        }

        // Log result message
        if (result.message) {
            pushLog(result.message, result.type || 'SYSTEM');
        }

        // Execute action
        if (result.success) {
            switch (result.action) {
                case 'NAVIGATE':
                    synth.playNavigate();
                    if (result.module) {
                        mountModule(result.module);
                    } else {
                        // Go back to home
                        mountModule('RESET');
                    }
                    break;
                case 'LIST':
                case 'HELP':
                case 'PWD':
                    synth.playClick();
                    break;
            }
        } else {
            synth.playError();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1
                    ? commandHistory.length - 1
                    : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput('');
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            }
        }
    };

    return (
        <div className="h-48 w-full border-t border-border bg-black/40 backdrop-blur-sm font-mono text-xs overflow-hidden font-medium shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)] flex flex-col">
            {/* Log Output */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                    <AnimatePresence initial={false}>
                        {logs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex gap-3 ${log.type === 'ERROR' ? 'text-red-500' :
                                        log.type === 'WARNING' ? 'text-yellow-500' :
                                            log.type === 'SUCCESS' ? 'text-green-500' :
                                                log.type === 'SYSTEM' ? 'text-primary' :
                                                    'text-muted'
                                    }`}
                            >
                                <span className="opacity-50">[{log.timestamp}]</span>
                                <span>{'>'}</span>
                                <span className="whitespace-pre-wrap">{log.message}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={bottomRef} />
                </div>
            </div>

            {/* Terminal Input */}
            <div className="border-t border-primary/20 bg-black/60 p-3 flex items-center gap-2">
                <span className="text-primary">{getPrompt(activeModule)}</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-foreground caret-primary"
                    placeholder="Type 'help' for commands..."
                    autoComplete="off"
                    spellCheck={false}
                />
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-4 bg-primary/50"
                />
            </div>
        </div>
    );
}
