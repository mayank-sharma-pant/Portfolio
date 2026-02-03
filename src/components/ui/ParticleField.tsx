'use client';

import React, { useEffect, useRef } from 'react';

interface ParticleFieldProps {
    particleCount?: number;
    colors?: string[];
    speed?: number;
    size?: number;
    className?: string;
}

export default function ParticleField({
    particleCount = 50,
    colors = ['#3FB9E0', '#9333EA', '#EC4899', '#22C55E'],
    speed = 0.5,
    size = 2,
    className = ""
}: ParticleFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            life: number;
            maxLife: number;
            color: string;
            size: number;
        }> = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * speed,
                    vy: (Math.random() - 0.5) * speed,
                    life: Math.random() * 1000 + 500,
                    maxLife: 1500,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() * size + 1
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Update life
                particle.life--;

                // Remove dead particles and create new ones
                if (particle.life <= 0) {
                    particles[index] = {
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        vx: (Math.random() - 0.5) * speed,
                        vy: (Math.random() - 0.5) * speed,
                        life: Math.random() * 1000 + 500,
                        maxLife: 1500,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        size: Math.random() * size + 1
                    };
                }

                // Draw particle
                const alpha = particle.life / particle.maxLife;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color.replace(')', `, ${alpha * 0.6})`);
                ctx.fill();

                // Add glow effect
                ctx.shadowColor = particle.color;
                ctx.shadowBlur = particle.size * 2;
                ctx.fill();
                ctx.shadowBlur = 0;

                // Draw connections to nearby particles
                particles.forEach((otherParticle, otherIndex) => {
                    if (index !== otherIndex) {
                        const dx = particle.x - otherParticle.x;
                        const dy = particle.y - otherParticle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 100) {
                            const connectionAlpha = (1 - distance / 100) * alpha * 0.3;
                            ctx.beginPath();
                            ctx.moveTo(particle.x, particle.y);
                            ctx.lineTo(otherParticle.x, otherParticle.y);
                            ctx.strokeStyle = particle.color.replace(')', `, ${connectionAlpha})`);
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        initParticles();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [particleCount, colors, speed, size]);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 z-0 pointer-events-none ${className}`}
            style={{ opacity: 0.4 }}
        />
    );
}