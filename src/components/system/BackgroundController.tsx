'use client';

import { useEffect, useState } from 'react';
import { useSystem } from '@/context/SystemContext';

/**
 * BackgroundController - Reactive background effects system
 * 
 * Listens to system state changes and triggers background visual effects:
 * - Gradient shifts on module changes
 * - Data pulse lines on log updates
 * - All effects are reactive, not constant
 */
export default function BackgroundController() {
    const { activeModule, logs } = useSystem();
    const [showPulse, setShowPulse] = useState(false);

    // Reactive gradient shift on module change
    useEffect(() => {
        if (activeModule) {
            document.body.setAttribute('data-gradient-state', 'active');
        } else {
            document.body.setAttribute('data-gradient-state', 'idle');
        }

        return () => {
            document.body.removeAttribute('data-gradient-state');
        };
    }, [activeModule]);

    // Data pulse effect on log updates
    useEffect(() => {
        if (logs.length > 0) {
            setShowPulse(true);
            const timer = setTimeout(() => setShowPulse(false), 500);
            return () => clearTimeout(timer);
        }
    }, [logs.length]);

    return (
        <>
            {/* Data pulse line */}
            {showPulse && <div className="data-pulse" />}
        </>
    );
}
