'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scanlinePosition, setScanlinePosition] = useState(-100);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Hexagonal grid parameters
        const hexSize = 40;
        const hexHeight = hexSize * Math.sqrt(3);
        let pulsePhase = 0;

        // Draw hexagon
        const drawHexagon = (x: number, y: number, size: number, opacity: number) => {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const hx = x + size * Math.cos(angle);
                const hy = y + size * Math.sin(angle);
                if (i === 0) {
                    ctx.moveTo(hx, hy);
                } else {
                    ctx.lineTo(hx, hy);
                }
            }
            ctx.closePath();
            ctx.strokeStyle = `rgba(63, 185, 224, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            pulsePhase += 0.01;

            // Draw hexagonal grid
            const cols = Math.ceil(canvas.width / (hexSize * 1.5)) + 2;
            const rows = Math.ceil(canvas.height / hexHeight) + 2;

            for (let row = -1; row < rows; row++) {
                for (let col = -1; col < cols; col++) {
                    const x = col * hexSize * 1.5;
                    const y = row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2);

                    // Pulse effect - different hexagons pulse at different times
                    const phaseOffset = (row * 0.3 + col * 0.2) % (Math.PI * 2);
                    const pulse = Math.sin(pulsePhase + phaseOffset) * 0.5 + 0.5;
                    const opacity = 0.08 + pulse * 0.07; // Increased from 0.02 + 0.03

                    drawHexagon(x, y, hexSize, opacity);

                    // Occasional glow on intersections
                    if (Math.random() > 0.997) {
                        ctx.beginPath();
                        ctx.arc(x, y, 2, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(63, 185, 224, ${0.5 + pulse * 0.3})`; // Increased from 0.3 + 0.2
                        ctx.fill();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        // Scanline sweep every 12 seconds
        const scanlineInterval = setInterval(() => {
            setScanlinePosition(-100);
            const scanlineAnimation = setInterval(() => {
                setScanlinePosition(prev => {
                    if (prev >= window.innerHeight + 100) {
                        clearInterval(scanlineAnimation);
                        return -100;
                    }
                    return prev + 3;
                });
            }, 16);
        }, 12000);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            clearInterval(scanlineInterval);
        };
    }, []);

    return (
        <>
            {/* Layer 1: Ambient Background - Hexagonal Grid */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 pointer-events-none"
                style={{ opacity: 0.6 }}
            />

            {/* Scanline Sweep */}
            {scanlinePosition > -100 && scanlinePosition < window.innerHeight + 100 && (
                <div
                    className="fixed left-0 right-0 z-0 pointer-events-none animate-scanline"
                    style={{
                        top: `${scanlinePosition}px`,
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, rgba(63, 185, 224, 0.6), transparent)',
                        boxShadow: '0 0 30px rgba(63, 185, 224, 0.8)',
                    }}
                />
            )}

            {/* Slow Gradient Drift - 45s Loop */}
            <div
                className="fixed inset-0 z-0 pointer-events-none animate-gradient-drift"
                style={{
                    background: `
                        linear-gradient(
                            135deg,
                            rgba(18, 24, 38, 0.3) 0%,
                            rgba(7, 11, 20, 0) 50%,
                            rgba(18, 24, 38, 0.2) 100%
                        )
                    `,
                    backgroundSize: '200% 200%',
                }}
            />

            {/* Subtle Noise Texture */}
            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </>
    );
}
