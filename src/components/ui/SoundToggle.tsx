'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { synth } from '@/utils/audio-engine';

export default function SoundToggle() {
    const [isMuted, setIsMuted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Sync initial state
        setIsMuted(synth.getMuted());
    }, []);

    const toggleSound = () => {
        const newMutedState = synth.toggleMute();
        setIsMuted(newMutedState);

        if (!hasInteracted && !newMutedState) {
            setHasInteracted(true);
            synth.start();
        }
    };

    return (
        <button
            onClick={toggleSound}
            className={`
                fixed top-6 right-6 z-50 p-3 
                rounded-full border backdrop-blur-md transition-all duration-300
                hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]
                ${isMuted
                    ? 'bg-slate-900/50 border-slate-700 text-slate-500 hover:text-slate-300'
                    : 'bg-cyan-950/30 border-cyan-500/50 text-cyan-400 hover:text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                }
            `}
            aria-label={isMuted ? "Unmute system audio" : "Mute system audio"}
        >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
    );
}
