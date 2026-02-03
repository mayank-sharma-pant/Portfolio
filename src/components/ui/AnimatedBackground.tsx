'use client';

import React, { useEffect, useRef, useState } from 'react';
import ParticleField from './ParticleField';

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scanlinePosition, setScanlinePosition] = useState(-100);
    const [particles, setParticles] = useState<Array<{x: number, y: number, vx: number, vy: number, life: number, maxLife: number, color: string}>>([]);

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

        // Enhanced parameters
        const hexSize = 40;
        const hexHeight = hexSize * Math.sqrt(3);
        let pulsePhase = 0;
        let time = 0;

        // Draw hexagon with enhanced effects
        const drawHexagon = (x: number, y: number, size: number, opacity: number, glow: number) => {
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

            // Add glow effect
            if (glow > 0.1) {
                ctx.shadowColor = 'rgba(63, 185, 224, 0.8)';
                ctx.shadowBlur = glow * 20;
                ctx.stroke();
                ctx.shadowBlur = 0;
            }
        };

        // Draw floating particles
        const drawParticles = () => {
            particles.forEach((particle, index) => {
                const alpha = particle.life / particle.maxLife;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 1 + alpha * 2, 0, Math.PI * 2);
                ctx.fillStyle = particle.color.replace(')', `, ${alpha})`);
                ctx.fill();

                // Update particle
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life--;

                // Remove dead particles
                if (particle.life <= 0) {
                    particles.splice(index, 1);
                }
            });
        };

        // Create new particles occasionally
        const createParticle = () => {
            if (Math.random() < 0.02) {
                const colors = [
                    'rgba(63, 185, 224',
                    'rgba(147, 51, 234',
                    'rgba(236, 72, 153',
                    'rgba(34, 197, 94'
                ];
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    life: Math.random() * 300 + 100,
                    maxLife: 400,
                    color: colors[Math.floor(Math.random() * colors.length)] + ')'
                });
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.01;
            pulsePhase += 0.01;

            // Draw hexagonal grid with enhanced effects
            const cols = Math.ceil(canvas.width / (hexSize * 1.5)) + 2;
            const rows = Math.ceil(canvas.height / hexHeight) + 2;

            for (let row = -1; row < rows; row++) {
                for (let col = -1; col < cols; col++) {
                    const x = col * hexSize * 1.5;
                    const y = row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2);

                    // Enhanced pulse effect
                    const phaseOffset = (row * 0.3 + col * 0.2) % (Math.PI * 2);
                    const pulse = Math.sin(pulsePhase + phaseOffset) * 0.5 + 0.5;
                    const wavePulse = Math.sin(time + row * 0.1 + col * 0.1) * 0.3 + 0.7;
                    const opacity = (0.08 + pulse * 0.07) * wavePulse;
                    const glow = pulse * wavePulse;

                    drawHexagon(x, y, hexSize, opacity, glow);

                    // Enhanced glow on intersections
                    if (Math.random() > 0.995) {
                        ctx.beginPath();
                        ctx.arc(x, y, 3 + pulse * 2, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(63, 185, 224, ${0.6 + pulse * 0.4})`;
                        ctx.fill();
                    }
                }
            }

            // Draw and update particles
            createParticle();
            drawParticles();

            requestAnimationFrame(animate);
        };

        animate();

        // Enhanced scanline sweep
        const scanlineInterval = setInterval(() => {
            setScanlinePosition(-100);
            const scanlineAnimation = setInterval(() => {
                setScanlinePosition(prev => {
                    if (prev >= window.innerHeight + 100) {
                        clearInterval(scanlineAnimation);
                        return -100;
                    }
                    return prev + 4;
                });
            }, 12);
        }, 8000);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            clearInterval(scanlineInterval);
        };
    }, [particles]);

    return (
        <>
            {/* Layer 1: Enhanced Hexagonal Grid */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 pointer-events-none"
                style={{ opacity: 0.7 }}
            />

            {/* Enhanced Scanline Sweep */}
            {scanlinePosition > -100 && scanlinePosition < window.innerHeight + 100 && (
                <div
                    className="fixed left-0 right-0 z-0 pointer-events-none"
                    style={{
                        top: `${scanlinePosition}px`,
                        height: '3px',
                        background: 'linear-gradient(90deg, transparent, rgba(63, 185, 224, 0.8), rgba(147, 51, 234, 0.6), rgba(63, 185, 224, 0.8), transparent)',
                        boxShadow: '0 0 40px rgba(63, 185, 224, 0.9), 0 0 80px rgba(147, 51, 234, 0.5)',
                        filter: 'blur(0.5px)',
                    }}
                />
            )}

            {/* Dynamic Gradient Drift */}
            <div
                className="fixed inset-0 z-0 pointer-events-none animate-gradient-drift-enhanced"
                style={{
                    background: `
                        radial-gradient(circle at 20% 80%, rgba(63, 185, 224, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.06) 0%, transparent 50%),
                        linear-gradient(
                            135deg,
                            rgba(18, 24, 38, 0.4) 0%,
                            rgba(7, 11, 20, 0.1) 50%,
                            rgba(18, 24, 38, 0.3) 100%
                        )
                    `,
                    backgroundSize: '200% 200%, 150% 150%, 180% 180%, 200% 200%',
                }}
            />

            {/* Enhanced Noise Texture */}
            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Particle Field */}
            <ParticleField particleCount={30} speed={0.3} size={1.5} />

            {/* Floating Geometric Shapes */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 20}s`,
                            animationDuration: `${15 + Math.random() * 10}s`,
                        }}
                    >
                        <div
                            className="w-2 h-2 bg-primary/20 rotate-45 animate-pulse"
                            style={{
                                boxShadow: '0 0 20px rgba(63, 185, 224, 0.3)',
                            }}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
