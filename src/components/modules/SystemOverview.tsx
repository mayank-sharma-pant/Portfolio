'use client';

import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { gsap } from 'gsap';
import HeroTerminal from '@/components/ui/HeroTerminal';
import SystemSnapshot from '@/components/ui/SystemSnapshot';
import TypewriterText from '@/components/ui/TypewriterText';

export default function SystemOverview() {
  const { state, pushLog } = useSystem();

  const rootRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const metadataRefs = useRef<HTMLDivElement[]>([]);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageWrapRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const [booted, setBooted] = useState(false);
  const hoverRaf = useRef<number | null>(null);
  const imageSrc = useMemo(() => '/anime/6d185bf59cb5624bd019a541b4974da3.jpg', []);
  const setMetadataRef = (index: number) => (node: HTMLDivElement | null) => {
    if (node) {
      metadataRefs.current[index] = node;
    }
  };

  useEffect(() => {
    if (state === 'BOOT') return;
    setBooted(true);

    // Initial logs
    const timers = [
      window.setTimeout(() => pushLog('SYSTEM_READY', 'SUCCESS'), 420),
      window.setTimeout(() => pushLog('MOUNTING_VIEW: HOME', 'SYSTEM'), 760),
      window.setTimeout(() => pushLog('ESTABLISHING_CONNECTION...', 'INFO'), 1100),
      window.setTimeout(() => pushLog('INTERFACE_MODE: HIGH_PERFORMANCE', 'WARNING'), 1700),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [state, pushLog]);

  useEffect(() => {
    if (state === 'BOOT') return;

    const ctx = gsap.context(() => {
      gsap.set([badgeRef.current, firstNameRef.current, lastNameRef.current, roleRef.current], { opacity: 0, y: 6 });
      gsap.set(firstNameRef.current, { x: -6, y: 0 });
      gsap.set(lastNameRef.current, { x: -6, y: 0 });
      gsap.set(heroImageWrapRef.current, { opacity: 0, scale: 1.03, y: 8 });
      gsap.set(metadataRefs.current, { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.2 }, 0.15)
        .to(firstNameRef.current, { opacity: 1, x: 0, duration: 0.26 }, 0.3)
        .to(lastNameRef.current, { opacity: 1, x: 0, duration: 0.26 }, 0.42)
        .to(roleRef.current, { opacity: 1, y: 0, duration: 0.2 }, 0.5)
        .to(heroImageWrapRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.42 }, 0.7)
        .to(metadataRefs.current, { opacity: 1, y: 0, duration: 0.2, stagger: 0.08 }, 0.9);
    }, rootRef);

    return () => ctx.revert();
  }, [state]);

  useEffect(() => {
    if (state === 'BOOT') return;
    const logs = [
      'Verifying system contracts...',
      'Health check: PASS',
      'Latency: 42ms',
      'Scaling policy: ACTIVE',
    ];
    let index = 0;
    const interval = window.setInterval(() => {
      pushLog(logs[index % logs.length], 'SYSTEM');
      index += 1;
    }, 4600);
    return () => window.clearInterval(interval);
  }, [state, pushLog]);

  const handleHeroMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!heroImageRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * -4;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
    if (hoverRaf.current) cancelAnimationFrame(hoverRaf.current);
    hoverRaf.current = requestAnimationFrame(() => {
      heroImageRef.current?.style.setProperty('transform', `translate(${x}px, ${y}px)`);
    });
  };

  const handleHeroMouseLeave = () => {
    if (!heroImageRef.current) return;
    if (hoverRaf.current) cancelAnimationFrame(hoverRaf.current);
    heroImageRef.current.style.setProperty('transform', 'translate(0px, 0px)');
  };

  return (
    <div ref={rootRef} className="relative w-full min-h-screen flex flex-col overflow-x-hidden bg-[#050505] selection:bg-primary/20">

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 grid-drift" />
      </div>

      <div className="relative z-10 w-full pt-4 pb-6 flex flex-col gap-5">
        {/* ZONE 1 — HERO (7 / 5 grid) */}
        <section className="grid grid-cols-12 gap-x-6 gap-y-6 items-start lg:min-h-[480px]">
          {/* LEFT (7 cols) */}
          <div ref={heroTextRef} className="col-span-12 lg:col-span-7 flex flex-col gap-3 pt-1 min-w-0">
            <div className="flex flex-col gap-2">
              <div ref={badgeRef} className="w-fit px-2 py-1 border border-white/10 bg-white/5 text-[9px] uppercase tracking-[0.3em] font-mono text-muted">
                SYSTEM_ACTIVE
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[0.95] text-foreground">
                <span ref={firstNameRef} className="inline-block">
                  Mayank
                </span>
                <br />
                <span ref={lastNameRef} className="inline-block text-foreground/80">
                  Sharma
                </span>
              </h1>

              <div ref={roleRef} className="min-w-0">
                <div className="text-lg md:text-xl font-semibold tracking-tight text-foreground/90">
                  {booted ? (
                    <TypewriterText text="Backend Engineer" speed={32} delay={500} cursor />
                  ) : (
                    'Backend Engineer'
                  )}
                </div>
                <p className="mt-2 text-sm md:text-base text-muted font-mono max-w-xl leading-relaxed">
                  Designing resilient APIs and scalable system architectures.
                  <br />
                  Build clean primitives. Ship stable systems.
                </p>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <span className="h-px w-10 bg-primary/70" />
                <span className="h-px w-24 bg-foreground/15" />
                <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted">
                  SIGNAL_STABLE
                </span>
              </div>
            </div>

            {/* Compact metadata row: ROLE / FOCUS / MODE */}
            <div className="relative w-full max-w-xl border border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden">
              <div className="panel-shimmer" />
              <div className="grid grid-cols-3 divide-x divide-white/10">
                {[
                  { k: 'ROLE', v: 'BACKEND_ENGINEER' },
                  { k: 'FOCUS', v: 'SYSTEM_ARCHITECTURE' },
                  { k: 'MODE', v: 'BUILDING' },
                ].map((item, index) => (
                  <div
                    key={item.k}
                    ref={setMetadataRef(index)}
                    className="px-4 py-3"
                  >
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
          </div>

          {/* RIGHT (5 cols) — Manga panel, fully visible */}
          <div className="col-span-12 lg:col-span-5 flex items-start justify-end min-w-0">
            <div
              ref={heroImageWrapRef}
              className="w-full max-w-[420px] rotate-1 hover:rotate-0 transition-transform duration-300 ease-out"
            >
              <div
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={handleHeroMouseLeave}
                className="relative h-[420px] lg:h-[480px] border border-white/10 bg-white/[0.02] backdrop-blur-sm p-2 shadow-2xl overflow-hidden hero-blade group"
              >
                <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-primary" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-primary" />

                <div ref={heroImageRef} className="relative h-full w-full overflow-hidden bg-[#0a0a0a] transition-transform duration-300 ease-out">
                  <img
                    src={imageSrc}
                    alt="Ichigo Kurosaki"
                    className="w-full h-full object-contain opacity-90 grayscale transition-all duration-300"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-black/35" />
                  <div className="image-grain" />
                  <div className="scanline-sweep scanline-sweep--hero" />
                  <div className="panel-shimmer" />
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
        <section className="grid grid-cols-12 gap-x-6 gap-y-5 items-start">
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
            <div className="ml-auto w-full max-w-[420px] lg:sticky lg:top-24">
              <HeroTerminal />
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
