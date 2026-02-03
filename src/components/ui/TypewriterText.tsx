'use client';

import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
    cursor?: boolean;
    onComplete?: () => void;
}

export default function TypewriterText({
    text,
    className = "",
    speed = 50,
    delay = 0,
    cursor = true,
    onComplete
}: TypewriterTextProps) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (delay > 0) {
            const delayTimer = setTimeout(() => {
                startTyping();
            }, delay);
            return () => clearTimeout(delayTimer);
        } else {
            startTyping();
        }
    }, [text, delay]);

    const startTyping = () => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timer);
        } else {
            setIsComplete(true);
            onComplete?.();
        }
    };

    useEffect(() => {
        if (currentIndex < text.length && displayText.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timer);
        } else if (currentIndex >= text.length) {
            setIsComplete(true);
            onComplete?.();
        }
    }, [currentIndex, text, speed, onComplete]);

    return (
        <span className={`${className} font-mono`}>
            {displayText}
            {cursor && !isComplete && (
                <span className="animate-pulse text-primary">|</span>
            )}
        </span>
    );
}