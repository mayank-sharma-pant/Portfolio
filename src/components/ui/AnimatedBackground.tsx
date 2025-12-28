'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
}

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>();

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

        // Initialize particles - increased count for more visual impact
        const particleCount = 120;
        particlesRef.current = Array.from({ length: particleCount }, (_) => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.6 + 0.4,
        }));

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            // Darker fade for near-black base
            ctx.fillStyle = 'rgba(7, 11, 20, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const particles = particlesRef.current;

            // Update and draw particles
            particles.forEach((particle, i) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Mouse interaction - stronger effect
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 200) {
                    const force = (200 - distance) / 200;
                    particle.x -= dx * 0.02 * force;
                    particle.y -= dy * 0.02 * force;
                }

                // Draw particle with enhanced glow
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#06b6d4';
                ctx.fillStyle = `rgba(6, 182, 212, ${particle.opacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                // Add extra glow layer
                ctx.shadowBlur = 10;
                ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity * 0.5})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Draw connections with gradient
                particles.slice(i + 1).forEach((otherParticle) => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const opacity = (1 - distance / 150) * 0.4;
                        const gradient = ctx.createLinearGradient(
                            particle.x, particle.y,
                            otherParticle.x, otherParticle.y
                        );
                        gradient.addColorStop(0, `rgba(6, 182, 212, ${opacity})`);
                        gradient.addColorStop(0.5, `rgba(34, 211, 238, ${opacity * 0.8})`);
                        gradient.addColorStop(1, `rgba(6, 182, 212, ${opacity})`);

                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <>
            {/* Particle Canvas - Felt, Not Visible */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 pointer-events-none"
                style={{ opacity: 0.4 }}
            />

            {/* Desaturated Gradient Waves */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 animate-gradient-wave-1 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700/10 via-transparent to-slate-600/10" />
                </div>
                <div className="absolute inset-0 animate-gradient-wave-2 opacity-8">
                    <div className="absolute inset-0 bg-gradient-to-tl from-slate-600/10 via-transparent to-slate-700/10" />
                </div>
            </div>

            {/* Subtle Glowing Orbs */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-slate-600/5 rounded-full blur-3xl animate-float-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-slate-700/5 rounded-full blur-3xl animate-float-slower" />
            </div>
        </>
    );
}
