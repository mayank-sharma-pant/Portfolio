'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type SystemState = 'BOOT' | 'IDLE' | 'LOADING_MODULE' | 'ACTIVE_MODULE' | 'ERROR';
type LogType = 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS' | 'SYSTEM';

interface LogEntry {
    id: string;
    timestamp: string;
    message: string;
    type: LogType;
}

interface SystemContextType {
    state: SystemState;
    activeModule: string | null;
    logs: LogEntry[];
    pushLog: (message: string, type?: LogType) => void;
    clearLogs: () => void;
    mountModule: (moduleId: string) => void;
    bootSystem: () => void;
}

import { synth } from '@/utils/audio-engine';

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<SystemState>('BOOT');
    const [activeModule, setActiveModule] = useState<string | null>(null);
    const [logs, setLogs] = useState<LogEntry[]>([]);

    const pushLog = useCallback((message: string, type: LogType = 'INFO') => {
        const timestamp = new Date().toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        // Audio Triggers
        if (type === 'ERROR' || type === 'WARNING') {
            synth.playError();
        } else {
            // Subtle click for normal logs
            // synth.playClick(); // Too noisy if every log clicks? Let's keep it selective.
        }

        setLogs(prev => [...prev.slice(-49), { // Keep last 50 logs
            id: Math.random().toString(36).substr(2, 9),
            timestamp,
            message,
            type
        }]);
    }, []);

    const clearLogs = useCallback(() => {
        setLogs([]);
    }, []);

    const bootSystem = useCallback(() => {
        // Cinematic Boot Sequence
        let step = 0;
        const bootSteps = [
            { msg: 'Initializing KERNEL...', delay: 200 },
            { msg: 'Loading core drivers...', delay: 600 },
            { msg: 'Mounting virtual file system...', delay: 1000 },
            { msg: 'Checking integrity...', delay: 1400 },
            { msg: 'SYSTEM_READY.', delay: 2000, type: 'SUCCESS' as LogType },
        ];

        bootSteps.forEach(({ msg, delay, type }) => {
            setTimeout(() => {
                pushLog(msg, type);
                if (type === 'SUCCESS') synth.playMount();
            }, delay);
        });

        setTimeout(() => {
            setState('IDLE');
            synth.playMount(); // Unlock sound
        }, 2500);
    }, [pushLog]);

    const mountModule = useCallback((moduleId: string) => {
        // Handle RESET (go back to home)
        if (moduleId === 'RESET') {
            if (!activeModule) return; // Already at home
            synth.playNavigate();
            setActiveModule(null);
            setState('IDLE');
            pushLog('Returning to SYSTEM_OVERVIEW', 'SYSTEM');
            return;
        }

        if (activeModule === moduleId) return;

        // Audio Feedback
        synth.playClick();

        // 1. Reset State
        setState('LOADING_MODULE');
        setActiveModule(null); // Clear center immediately
        pushLog(`Requesting mount: ${moduleId}...`, 'SYSTEM');

        // 2. "Heavy" Load Simulation
        const isHeavy = moduleId === 'HEALIORA'; // Primary node is heavier
        const loadTime = isHeavy ? 2000 : 800; // Delay creates weight

        // Simulated Logs during load
        setTimeout(() => pushLog(`Allocating memory for ${moduleId}...`), 200);
        setTimeout(() => pushLog(`Resolving dependencies...`), 400);

        // 3. Simulated Failure (Controlled Randomness)
        const shouldFail = Math.random() > 0.85; // 15% chance of "hiccup"

        if (shouldFail) {
            setTimeout(() => {
                pushLog(`Warning: Latency spike detected on ${moduleId} fetch.`, 'WARNING');
                pushLog(`Retrying packet delivery...`, 'SYSTEM');
                synth.playError();
            }, 600);
        }

        // 4. Finalize Mount
        setTimeout(() => {
            setActiveModule(moduleId);
            setState('ACTIVE_MODULE');
            pushLog(`${moduleId} mounted successfully.`, 'SUCCESS');
            synth.playMount(); // Success sound
            if (isHeavy) pushLog('PRIMARY_NODE lock engaged.', 'SYSTEM');
        }, loadTime + (shouldFail ? 500 : 0));

    }, [activeModule, pushLog]);

    // Idle Heartbeat
    useEffect(() => {
        if (state === 'BOOT') return;

        const interval = setInterval(() => {
            if (Math.random() > 0.95) { // Occasional background noise
                pushLog('System heartbeat: stable', 'SYSTEM');
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [state, pushLog]);

    return (
        <SystemContext.Provider value={{ state, activeModule, logs, pushLog, clearLogs, mountModule, bootSystem }}>
            {children}
        </SystemContext.Provider>
    );
}

export function useSystem() {
    const context = useContext(SystemContext);
    if (context === undefined) {
        throw new Error('useSystem must be used within a SystemProvider');
    }
    return context;
}
