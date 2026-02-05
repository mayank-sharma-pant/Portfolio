'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { useSystem } from '@/context/SystemContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroTerminal from '@/components/ui/HeroTerminal';
import SystemStatusStrip from '@/components/ui/SystemStatusStrip';
import ActiveTimeline from '@/components/ui/ActiveTimeline';

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
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(heroTextRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
        , 0.2)
        .fromTo(heroImageWrapRef.current,
          { x: 30, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 1.2 }
          , 0.4);

    }, rootRef);

    return () => ctx.revert();
  }, [state]);

  return (
    <div ref={rootRef} className="relative w-full min-h-screen flex flex-col pt-10">

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 px-8 md:px-14 lg:px-20 pt-16 pb-8 flex flex-col md:flex-row items-center justify-between min-h-[60vh]">

        {/* Left: Identity */}
        <div ref={heroTextRef} className="relative w-full md:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            System Active
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
            Mayank <br />
            <span className="text-muted/40">Sharma</span>
          </h1>

          <div className="flex flex-col gap-1 border-l-2 border-primary/40 pl-6 py-1">
            <p className="text-lg md:text-xl text-foreground/90 font-medium tracking-wide">
              Backend Engineer
            </p>
            <p className="text-sm text-muted font-mono max-w-md leading-relaxed">
              Designing resilient APIs and scalable system architectures.
              Turn coffee into code, and code into systems.
            </p>
          </div>
        </div>

        {/* Right: Ichigo Panel (Hero Image) */}
        <div ref={heroImageWrapRef} className="relative w-full md:w-[45%] h-[50vh] md:h-[60vh] mt-10 md:mt-0 flex justify-center md:justify-end">
          {/* Frame */}
          <div className="relative h-full w-full max-w-md border border-white/10 bg-white/[0.02] backdrop-blur-sm p-2 rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-primary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-primary" />

            <div className="relative h-full w-full overflow-hidden bg-[#0a0a0a]">
              <img
                src={imageSrc}
                alt="Ichigo Kurosaki"
                className="w-full h-full object-cover object-top opacity-80 grayscale hover:grayscale-0 transition-all duration-700 contrast-125"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* MID ZONE: STATUS STRIP */}
      <section className="relative z-20 -mt-12 md:-mt-24">
        <SystemStatusStrip />
      </section>

      {/* TERMINAL HERO OVERLAP */}
      <section className="relative z-30 px-4 md:px-0 -mt-8 mb-16">
        <HeroTerminal />
      </section>

      {/* BOTTOM ZONE: ACTIVE TIMELINE */}
      <div className="mt-auto relative z-10 w-full pb-0">
        <ActiveTimeline />
      </div>

    </div>
  );
}
