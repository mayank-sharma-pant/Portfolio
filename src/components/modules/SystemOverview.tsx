'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { useSystem } from '@/context/SystemContext';
import { gsap } from 'gsap';
import HeroTerminal from '@/components/ui/HeroTerminal';
import SystemSnapshot from '@/components/ui/SystemSnapshot';

export default function SystemOverview() {
  const { state, pushLog } = useSystem();

  const rootRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageWrapRef = useRef<HTMLDivElement>(null);
  const imageSrc = useMemo(() => '/anime/6d185bf59cb5624bd019a541b4974da3.jpg', []);

  useEffect(() => {
    if (state === 'BOOT') return;

    // Initial logs
    const timers = [
      window.setTimeout(() => pushLog('SYSTEM_READY', 'SUCCESS'), 500),
      window.setTimeout(() => pushLog('MOUNTING_VIEW: HOME', 'SYSTEM'), 800),
      window.setTimeout(() => pushLog('ESTABLISHING_CONNECTION...', 'INFO'), 1200),
      window.setTimeout(() => pushLog('INTERFACE_MODE: HIGH_PERFORMANCE', 'WARNING'), 2000),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [state, pushLog]);

  useEffect(() => {
    if (state === 'BOOT') return;

    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(heroTextRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45 }
        , 0.2)
        .fromTo(heroImageWrapRef.current,
          { x: 30, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 0.55 }
          , 0.4);

    }, rootRef);

    return () => ctx.revert();
  }, [state]);

  return (
    <div ref={rootRef} className="relative w-full min-h-screen flex flex-col overflow-x-hidden bg-[#050505] selection:bg-primary/20">

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <div className="relative z-10 w-full pt-6 pb-10 flex flex-col gap-6">
        {/* ZONE 1 — HERO (7 / 5 grid) */}
        <section className="grid grid-cols-12 gap-x-6 gap-y-8 items-start lg:min-h-[520px]">
          {/* LEFT (7 cols) */}
          <div ref={heroTextRef} className="col-span-12 lg:col-span-7 flex flex-col gap-4 pt-1 min-w-0">
            {/* Compact metadata row: ROLE / FOCUS / MODE */}
            <div className="w-full max-w-xl border border-white/5 bg-black/20 backdrop-blur-sm">
              <div className="grid grid-cols-3 divide-x divide-white/10">
                {[
                  { k: 'ROLE', v: 'BACKEND_ENGINEER' },
                  { k: 'FOCUS', v: 'SYSTEM_ARCHITECTURE' },
                  { k: 'MODE', v: 'BUILDING' },
                ].map((item) => (
                  <div key={item.k} className="px-4 py-3">
                    <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted">
                      {item.k}
                    </div>
                    <div className="mt-1 text-xs font-mono tracking-[0.15em] text-foreground">
                      {item.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.92] text-foreground">
                Mayank <br />
                <span className="text-muted/30">Sharma</span>
              </h1>

              <div className="min-w-0">
                <div className="text-lg md:text-xl font-semibold tracking-tight text-foreground/90">
                  Backend Engineer
                </div>
                <p className="mt-2 text-sm md:text-base text-muted font-mono max-w-xl leading-relaxed">
                  Designing resilient APIs and scalable system architectures.
                  <br />
                  Build clean primitives. Ship stable systems.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT (5 cols) — Manga panel, fully visible */}
          <div className="col-span-12 lg:col-span-5 flex items-start justify-end min-w-0">
            <div
              ref={heroImageWrapRef}
              className="w-full max-w-[420px] rotate-1 hover:rotate-0 transition-transform duration-300 ease-out"
            >
              <div className="relative h-[520px] max-h-[520px] border border-white/10 bg-white/[0.02] backdrop-blur-sm p-2 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-primary" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-primary" />

                <div className="relative h-full w-full overflow-hidden bg-[#0a0a0a]">
                  <img
                    src={imageSrc}
                    alt="Ichigo Kurosaki"
                    className="w-full h-full object-contain opacity-90 grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-black/35" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ZONE 2 — SYSTEM SNAPSHOT (Horizontal status bar, max 96px) */}
        <section className="w-full">
          <SystemSnapshot />
        </section>

        {/* ZONE 3 — TERMINAL (Right, grid-bound, 4–5 columns) */}
        <section className="grid grid-cols-12 gap-x-6 gap-y-6 items-start">
          <div className="col-span-12 lg:col-span-7 min-w-0">
            <div className="border border-white/5 bg-black/15 backdrop-blur-sm px-5 py-4">
              <div className="text-[10px] font-mono tracking-[0.35em] uppercase text-muted">
                OPERATOR_NOTES
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-muted/80">
                <div className="border-l border-white/10 pl-3">Try: <span className="text-foreground/90">help</span></div>
                <div className="border-l border-white/10 pl-3">Jump: <span className="text-foreground/90">work</span></div>
                <div className="border-l border-white/10 pl-3">Inspect: <span className="text-foreground/90">systems</span></div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-start-8 lg:col-span-5 min-w-0">
            <div className="ml-auto w-full max-w-[520px]">
              <HeroTerminal />
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
