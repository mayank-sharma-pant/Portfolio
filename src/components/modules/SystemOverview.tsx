'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import LogStream from '@/components/system/LogStream';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * HOME — "ANIME NERD PERSONAL SPACE"
 *
 * Rules this implementation follows:
 * - Anime image is OBVIOUS and occupies the hero as a real object (not a texture).
 * - Terminal remains a core interactive feature (visually dominant, impossible to miss).
 * - Heavy GSAP choreography: big entrances, parallax, scroll-driven motion.
 * - No bounce / elastic easing.
 */
export default function SystemOverview() {
  const { logs, state, pushLog } = useSystem();

  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const heroFigureRef = useRef<HTMLDivElement>(null);
  const heroFigureImgRef = useRef<HTMLImageElement>(null);
  const heroGhostRef = useRef<HTMLDivElement>(null);
  const heroKickerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroBodyRef = useRef<HTMLParagraphElement>(null);
  const heroMetaRef = useRef<HTMLDivElement>(null);

  const terminalWrapRef = useRef<HTMLDivElement>(null);
  const terminalFrameRef = useRef<HTMLDivElement>(null);
  const terminalPulseRef = useRef<HTMLDivElement>(null);
  const operatorRef = useRef<HTMLDivElement>(null);

  const seededRef = useRef(false);
  const introPlayedRef = useRef(false);
  const guideDismissedRef = useRef(false);
  const [guideVisible, setGuideVisible] = useState(true);

  const terminalHeight = useMemo(() => 'h-[320px] md:h-[360px] lg:h-[420px]', []);

  const dismissGuide = () => {
    if (guideDismissedRef.current) return;
    guideDismissedRef.current = true;

    if (!operatorRef.current) {
      setGuideVisible(false);
      return;
    }

    gsap.to(operatorRef.current, {
      autoAlpha: 0,
      y: 14,
      duration: 0.55,
      ease: 'power2.inOut',
      onComplete: () => setGuideVisible(false),
    });
  };

  const focusTerminal = () => {
    if (!terminalFrameRef.current) return;
    gsap.to(terminalFrameRef.current, {
      scale: 1.01,
      duration: 0.45,
      ease: 'power2.inOut',
    });
  };

  const blurTerminal = () => {
    const frame = terminalFrameRef.current;
    if (!frame) return;

    // Avoid jitter when focus moves between children inside the terminal.
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (active && frame.contains(active)) return;
      gsap.to(frame, {
        scale: 1,
        duration: 0.45,
        ease: 'power2.inOut',
      });
    });
  };

  // Seed a short "inner monologue" burst so the terminal feels intentional even before user input.
  useEffect(() => {
    if (state === 'BOOT') return;
    if (seededRef.current) return;
    seededRef.current = true;

    const timers = [
      window.setTimeout(() => pushLog('SYSTEM_READY. Waiting for input…', 'SYSTEM'), 350),
      window.setTimeout(() => pushLog("Tip: type 'help' to explore.", 'INFO'), 1100),
      window.setTimeout(
        () => pushLog("Operator online. // don’t overthink it — just try a command.", 'SYSTEM'),
        1900
      ),
    ];

    return () => timers.forEach(window.clearTimeout);
  }, [state, pushLog]);

  useEffect(() => {
    if (state === 'BOOT') return;
    if (introPlayedRef.current) return;
    introPlayedRef.current = true;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!heroRef.current) return;

      // --- Initial states (heavy motion, no bounce) ---
      gsap.set([heroKickerRef.current, heroTitleRef.current, heroBodyRef.current, heroMetaRef.current], {
        y: 26,
        opacity: 0,
      });
      gsap.set(heroGhostRef.current, { opacity: 0, y: 10 });

      if (heroFigureRef.current) {
        gsap.set(heroFigureRef.current, {
          clipPath: 'inset(0 100% 0 0)',
          x: 120,
          rotate: 2,
          opacity: 1,
        });
      }

      if (terminalWrapRef.current) {
        gsap.set(terminalWrapRef.current, { y: 80, opacity: 0, scale: 0.98 });
      }

      if (operatorRef.current) {
        gsap.set(operatorRef.current, { opacity: 0, y: 8 });
      }

      const intro = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

      // 1) Image presence resolves early (obvious anime signal).
      intro
        .to(heroGhostRef.current, { opacity: 0.14, y: 0, duration: 0.9 }, 0)
        .to(
          heroFigureRef.current,
          {
            clipPath: 'inset(0 0% 0 0)',
            x: 0,
            rotate: 0,
            duration: 1.25,
          },
          0.1
        )
        // 2) Typography drama (delayed resolve).
        .to(heroKickerRef.current, { y: 0, opacity: 1, duration: 0.55 }, 0.25)
        .to(heroTitleRef.current, { y: 0, opacity: 1, duration: 0.75 }, 0.35)
        .to(heroBodyRef.current, { y: 0, opacity: 1, duration: 0.6 }, 0.55)
        .to(heroMetaRef.current, { y: 0, opacity: 1, duration: 0.55 }, 0.7);

      // 3) Terminal enters as the "brain" (dominant, unavoidable).
      if (terminalWrapRef.current) {
        intro.to(terminalWrapRef.current, { y: 0, opacity: 1, scale: 1, duration: 0.95 }, 0.85);
      }

      // 4) Operator guide (minimal silhouette, fades on interaction).
      if (operatorRef.current) {
        intro
          .to(operatorRef.current, { opacity: 1, y: 0, duration: 0.55 }, 1.25)
          .to(operatorRef.current, { y: -4, duration: 0.9, yoyo: true, repeat: 1 }, 1.35);
      }

      // --- Scroll-driven motion (parallax + tension) ---
      if (heroFigureImgRef.current) {
        gsap.to(heroFigureImgRef.current, {
          y: -90,
          rotate: -1,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (heroGhostRef.current) {
        gsap.to(heroGhostRef.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (terminalWrapRef.current) {
        gsap.to(terminalWrapRef.current, {
          y: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: terminalWrapRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            scrub: true,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [state]);

  // Terminal-driven UI response: pulse when new logs arrive.
  useEffect(() => {
    if (!terminalPulseRef.current) return;
    if (logs.length === 0) return;

    gsap.fromTo(
      terminalPulseRef.current,
      { opacity: 0 },
      { opacity: 0.8, duration: 0.18, ease: 'power2.inOut', yoyo: true, repeat: 1 }
    );
  }, [logs.length]);

  return (
    <div ref={rootRef} className="relative">
      {/* HERO — chaotic, image-forward composition */}
      <section ref={heroRef} className="relative overflow-visible pt-14 md:pt-20 pb-52 md:pb-60">
        <div className="px-5 md:px-10 lg:px-14">
          <div className="relative">
            {/* Ghost typography (drama layer) */}
            <div
              ref={heroGhostRef}
              className="pointer-events-none select-none absolute -top-10 left-0 text-[64px] md:text-[92px] lg:text-[120px] font-semibold tracking-[-0.02em] text-foreground/10"
            >
              PERSONAL SPACE
            </div>

            {/* Text block */}
            <div className="relative z-20 max-w-[760px]">
              <div
                ref={heroKickerRef}
                className="font-mono text-[11px] tracking-[0.4em] uppercase text-muted"
              >
                EP_01 — ORIGIN // anime nerd, system builder
              </div>
              <h1
                ref={heroTitleRef}
                className="mt-5 text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.03em] leading-[0.9] text-foreground"
              >
                Mayank
                <span className="block ml-[0.08em]">Sharma</span>
              </h1>
              <p
                ref={heroBodyRef}
                className="mt-5 max-w-[44ch] text-base md:text-lg text-foreground/85 leading-relaxed"
              >
                I build backend systems that stay calm under pressure — APIs, data models, and MVPs that ship.
                <span className="text-muted"> // serious work, nerd energy</span>
              </p>

              <div ref={heroMetaRef} className="mt-7 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2 border border-border bg-secondary px-3 py-1.5 text-[11px] tracking-[0.25em] uppercase text-foreground/85">
                  CURRENT ARC <span className="text-primary">BUILDING</span>
                </span>
                <span className="inline-flex items-center gap-2 border border-border bg-background px-3 py-1.5 text-[11px] tracking-[0.25em] uppercase text-muted font-mono">
                  FOCUS: Backend
                </span>
                <span className="inline-flex items-center gap-2 border border-border bg-background px-3 py-1.5 text-[11px] tracking-[0.25em] uppercase text-muted font-mono">
                  STACK: Java · Spring · SQL
                </span>
              </div>
            </div>

            {/* Hero image as a real object (NOT texture) */}
            <div
              ref={heroFigureRef}
              className="relative z-10 mt-10 lg:mt-0 lg:absolute lg:right-[-140px] lg:top-[-70px] w-full max-w-[560px] lg:w-[min(760px,58vw)]"
              style={{
                clipPath: 'inset(0 100% 0 0)',
              }}
            >
              <div className="relative">
                {/* Manga-panel-ish frame */}
                <div className="absolute -inset-3 border border-border/40 rotate-[-1deg]" aria-hidden="true" />
                <div className="absolute -inset-1 border border-border/70 rotate-[1deg]" aria-hidden="true" />

                <div
                  className="relative border border-border bg-black/40 overflow-hidden"
                  style={{
                    clipPath: 'polygon(0 0, 96% 0, 100% 12%, 100% 100%, 10% 100%, 0 88%)',
                  }}
                >
                  <img
                    ref={heroFigureImgRef}
                    src="/anime/6d185bf59cb5624bd019a541b4974da3.jpg"
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-contain invert grayscale contrast-125 opacity-95 select-none pointer-events-none"
                    style={{
                      WebkitMaskImage:
                        'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
                      maskImage:
                        'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
                    }}
                  />
                </div>

                {/* Loud cut-lines (energy layer) */}
                <div className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen" aria-hidden="true">
                  <div className="hero-cutlines" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TERMINAL — visually dominant and overlapped */}
        {state !== 'BOOT' && (
          <div className="absolute left-0 right-0 -bottom-32 md:-bottom-36">
            <div className="px-5 md:px-10 lg:px-14">
              <div ref={terminalWrapRef} className="relative w-full max-w-[1120px] ml-0 lg:ml-auto">
                <div
                  ref={terminalPulseRef}
                  className="absolute -inset-1 border border-primary/30 opacity-0 pointer-events-none"
                  aria-hidden="true"
                />

                <div
                  ref={terminalFrameRef}
                  className="relative border border-border bg-black/55 backdrop-blur-sm origin-center"
                  onMouseEnter={focusTerminal}
                  onMouseLeave={blurTerminal}
                  onFocusCapture={focusTerminal}
                  onBlurCapture={blurTerminal}
                >
                  <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                      <div className="text-[11px] tracking-[0.45em] uppercase text-muted">SYSTEM BRAIN</div>
                    </div>
                    <div className="text-[10px] font-mono text-muted">
                      TRY: <span className="text-foreground/80">help</span> ·{' '}
                      <span className="text-foreground/80">ls</span>
                    </div>
                  </div>

                  {/* Operator guide: minimal silhouette + gesture */}
                  {guideVisible && (
                    <div
                      ref={operatorRef}
                      className="absolute right-6 -top-10 z-20 pointer-events-none select-none"
                      aria-hidden="true"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-14 text-foreground/80">
                          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-current opacity-90" />
                          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-5 h-6 rounded-[10px] bg-current opacity-70" />
                          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-7 rounded-[18px] bg-current opacity-20" />
                          <div className="absolute top-8 left-7 w-6 h-[2px] bg-primary/80 rotate-[18deg] origin-left" />
                        </div>
                        <div className="text-[11px] tracking-[0.28em] uppercase text-foreground/85">Interact.</div>
                      </div>
                      <div className="absolute right-12 top-10 w-20 h-px bg-primary/70" />
                    </div>
                  )}

                  <div
                    onMouseEnter={dismissGuide}
                    onFocusCapture={dismissGuide}
                    onPointerDown={dismissGuide}
                    className="px-0"
                  >
                    <LogStream label="System Activity" heightClassName={terminalHeight} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Below-the-fold — still tight, still personal (not resume-y) */}
      <section className="px-5 md:px-10 lg:px-14 pt-44 md:pt-48 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-7">
          <div className="relative border border-border bg-secondary px-7 py-8">
            <div className="text-[11px] uppercase tracking-[0.5em] text-muted">ACTIVE PROJECT</div>
            <div className="mt-4 text-3xl md:text-4xl font-semibold text-foreground">Healiora</div>
            <p className="mt-4 text-base text-foreground/85 leading-relaxed max-w-[62ch]">
              HealthTech product focused on patient & hospital workflows. I own product direction and the backend
              architecture.
            </p>
            <div className="mt-5 text-xs uppercase tracking-[0.3em] text-muted font-mono">
              // shipping in public · iterating fast
            </div>
          </div>

          <div className="relative border border-border bg-background px-7 py-8">
            <div className="text-[11px] uppercase tracking-[0.5em] text-muted">SYSTEM STATE</div>
            <ul className="mt-5 space-y-3 text-base text-foreground/90">
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 bg-primary/70" />
                API design with sharp boundaries
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 bg-primary/70" />
                Data modeling + reliability work
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 bg-primary/70" />
                Product loops that feel intuitive
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 bg-primary/70" />
                Iteration based on real feedback
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-7">
          <div className="relative border border-border bg-background px-7 py-8">
            <div className="text-[11px] uppercase tracking-[0.5em] text-muted">EXIT</div>
            <p className="mt-4 text-base text-foreground/85 leading-relaxed max-w-[64ch]">
              I’m not here to cosplay “senior.” I’m here to build systems that work, ship, and get better with time.
            </p>
          </div>
          <div className="relative border border-border bg-secondary px-7 py-8">
            <div className="text-[11px] uppercase tracking-[0.5em] text-muted">CONTACT</div>
            <div className="mt-4 space-y-2 text-base text-foreground/90">
              <div>github.com/mayank-sharma-pant</div>
              <div>linkedin.com/in/mayank-sharma-a747ba275/</div>
              <div>x.com/nullbytez</div>
              <div>mayanksharmarrk01@gmail.com</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
