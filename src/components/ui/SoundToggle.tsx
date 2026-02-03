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
                rounded-full border transition-colors duration-200
                ${isMuted
                    ? 'bg-transparent border-border text-muted hover:text-foreground'
                    : 'bg-secondary border-border text-foreground hover:text-primary'
                }
            `}
            aria-label={isMuted ? "Unmute system audio" : "Mute system audio"}
        >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
    );
}
