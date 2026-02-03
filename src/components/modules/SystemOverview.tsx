'use client';

import React, { useEffect, useRef } from 'react';
import { useSystem } from '@/context/SystemContext';
import LogStream from '@/components/system/LogStream';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SystemOverview() {
    const { logs } = useSystem();
    const containerRef = useRef<HTMLDivElement>(null);
    const terminalGlowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const introPanels = gsap.utils.toArray<HTMLElement>('[data-panel-intro]');
            const panels = gsap.utils.toArray<HTMLElement>('[data-panel]');

            gsap.set(introPanels, { y: 40, opacity: 0 });
            gsap.set(panels, { y: 40, opacity: 0 });

            const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
            tl.to(introPanels, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 })
              .to('[data-title]', { y: 0, opacity: 1, duration: 0.6 }, '-=0.3');

            gsap.utils.toArray<HTMLElement>('[data-panel]').forEach((panel) => {
                gsap.to(panel, {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power2.inOut',
                    scrollTrigger: {
                        trigger: panel,
                        start: 'top 85%'
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!terminalGlowRef.current) return;
        if (logs.length === 0) return;
        gsap.fromTo(
            terminalGlowRef.current,
            { opacity: 0 },
            { opacity: 0.35, duration: 0.2, ease: 'power2.inOut', yoyo: true, repeat: 1 }
        );
    }, [logs.length]);

    return (
        <div ref={containerRef} className="relative space-y-12">
            {/* Intro Panel */}
            <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">
                <div
                    className="relative border border-border bg-secondary px-10 py-12 lg:px-14 lg:py-16"
                    data-panel-intro
                >
                    <div className="absolute -inset-2 border border-border/60 pointer-events-none" />
                    <div className="absolute -inset-6 border border-border/30 pointer-events-none" />
                    <div className="text-[11px] uppercase tracking-[0.6em] text-muted">Dark Cinematic Systems</div>
                    <h1 className="mt-6 text-6xl md:text-7xl font-semibold tracking-tight text-foreground" data-title>
                        Mayank Sharma
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-foreground/85 max-w-xl">
                        Backend-focused intern and early-stage founder building systems that feel calm, reliable, and real.
                    </p>
                    <div className="mt-8 h-px bg-border" />
                    <div className="mt-4 text-xs uppercase tracking-[0.35em] text-muted">
                        Backend • Product Systems • HealthTech
                    </div>
                </div>

                <div className="relative border border-border bg-background px-8 py-10 lg:px-10" data-panel-intro>
                    <div className="text-[11px] uppercase tracking-[0.6em] text-muted">System Status</div>
                    <div className="mt-6 space-y-5 text-base text-foreground/90">
                        <div>
                            <div className="text-muted text-sm mb-1">Current Focus</div>
                            <div>Backend Developer Intern — SunEdge IT Solutions</div>
                        </div>
                        <div>
                            <div className="text-muted text-sm mb-1">Active Build</div>
                            <div>Healiora — product & backend systems</div>
                        </div>
                        <div>
                            <div className="text-muted text-sm mb-1">Status</div>
                            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em]">
                                <span className="border border-border px-2 py-1">ACTIVE</span>
                                <span className="border border-border px-2 py-1">IN_PROGRESS</span>
                                <span className="border border-border px-2 py-1">BUILDING</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Terminal Panel */}
            <section className="relative border border-border bg-secondary px-6 py-6" data-panel>
                <div className="absolute inset-0 pointer-events-none" ref={terminalGlowRef}>
                    <div className="absolute inset-0 bg-primary/10" />
                </div>
                <div className="text-[11px] uppercase tracking-[0.6em] text-muted mb-3">System Brain</div>
                <div className="relative">
                    <LogStream label="System Activity" />
                    <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[repeating-linear-gradient(180deg,transparent_0,transparent_2px,rgba(255,255,255,0.08)_2px,rgba(255,255,255,0.08)_3px)]" />
                </div>
            </section>

            {/* Project Panel */}
            <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12" data-panel>
                <div className="relative border border-border bg-background px-8 py-10">
                    <div className="text-[11px] uppercase tracking-[0.6em] text-muted">Project Module</div>
                    <h2 className="mt-5 text-3xl font-semibold text-foreground">Healiora</h2>
                    <p className="mt-4 text-base text-foreground/85">
                        A HealthTech platform focused on patient and hospital workflows. I lead the product direction and backend architecture.
                    </p>
                    <div className="mt-6 text-xs uppercase tracking-[0.3em] text-muted">In development • CU-TBI incubated</div>
                </div>
                <div className="relative border border-border bg-secondary px-8 py-10">
                    <div className="text-[11px] uppercase tracking-[0.6em] text-muted">Current Scope</div>
                    <ul className="mt-5 space-y-2 text-base text-foreground/90">
                        <li>API design with clear boundaries</li>
                        <li>Data modeling and system reliability</li>
                        <li>Product workflows that feel intuitive</li>
                        <li>Iteration based on real user feedback</li>
                    </ul>
                </div>
            </section>

            {/* Closing Panel */}
            <section className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12" data-panel>
                <div className="relative border border-border bg-background px-8 py-10">
                    <div className="text-[11px] uppercase tracking-[0.6em] text-muted">Closing Panel</div>
                    <p className="mt-5 text-base text-foreground/85">
                        I build calm, durable systems and ship products that are grounded in reality — not hype.
                    </p>
                </div>
                <div className="relative border border-border bg-secondary px-8 py-10">
                    <div className="text-[11px] uppercase tracking-[0.6em] text-muted">Contact</div>
                    <div className="mt-5 space-y-2 text-base text-foreground/90">
                        <div>github.com/mayank-sharma-pant</div>
                        <div>linkedin.com/in/mayank-sharma-a747ba275/</div>
                        <div>x.com/nullbytez</div>
                        <div>mayanksharmarrk01@gmail.com</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
