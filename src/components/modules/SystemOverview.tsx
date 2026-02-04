'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { useSystem } from '@/context/SystemContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * HOME - ANIME SYSTEMS / CONTROLLED CHAOS
 * Constraints:
 * - Keep existing text content (no rewrites).
 * - Hero: left text, right framed manga panel (<= ~45% width), never touching screen edges.
 * - Dark charcoal UI (no pure black, no gradients, no neon).
 * - Controlled asymmetry: everything aligns to an invisible spine.
 * - GSAP: calm, confident easing only (no bounce/overshoot).
 */
export default function SystemOverview() {
  const { state, pushLog } = useSystem();

  const rootRef = useRef<HTMLDivElement>(null);

  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageWrapRef = useRef<HTMLDivElement>(null);
  const heroGhostRef = useRef<HTMLDivElement>(null);
  const heroPanelClipRef = useRef<HTMLDivElement>(null);
  const heroWashRef = useRef<HTMLDivElement>(null);

  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroMetaRef = useRef<HTMLDivElement>(null);

  const blockNowRef = useRef<HTMLDivElement>(null);
  const blockCapRef = useRef<HTMLDivElement>(null);
  const blockFocusRef = useRef<HTMLDivElement>(null);
  const blockContextRef = useRef<HTMLDivElement>(null);
  const blockSignalsRef = useRef<HTMLDivElement>(null);
  const blockLinksRef = useRef<HTMLDivElement>(null);

  const imageSrc = useMemo(
    () => '/anime/6d185bf59cb5624bd019a541b4974da3.jpg',
    []
  );

  useEffect(() => {
    if (state === 'BOOT') return;
    const timers = [
      window.setTimeout(() => pushLog('SYSTEM_READY.', 'SYSTEM'), 420),
      window.setTimeout(
        () => pushLog("Type 'help' for commands...", 'INFO'),
        1120
      ),
    ];

    return () => timers.forEach(window.clearTimeout);
  }, [state, pushLog]);

  useEffect(() => {
    if (state === 'BOOT') return;
    gsap.registerPlugin(ScrollTrigger);

    const scroller = document.querySelector('[data-scroll-wrapper]') as
      | HTMLElement
      | null;
    if (scroller) ScrollTrigger.defaults({ scroller });

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([heroTitleRef.current, heroSubRef.current, heroMetaRef.current], {
        y: 16,
        opacity: 0,
      });
      gsap.set(heroTextRef.current, { x: -16, opacity: 0 });
      gsap.set(heroImageWrapRef.current, { x: 18, opacity: 0, scale: 0.99 });
      gsap.set(heroGhostRef.current, { opacity: 0, y: 10 });
      gsap.set(heroWashRef.current, { opacity: 0, scale: 0.98 });
      gsap.set(heroPanelClipRef.current, { clipPath: 'inset(0 0 100% 0)' });
      gsap.set(
        [
          blockNowRef.current,
          blockCapRef.current,
          blockFocusRef.current,
          blockContextRef.current,
          blockSignalsRef.current,
          blockLinksRef.current,
        ],
        { y: 16, opacity: 0 }
      );
      gsap.set('[data-seam]', { scaleX: 0.5, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
      tl.to(heroTitleRef.current, { y: 0, opacity: 1, duration: 0.6 }, 0)
        .to(heroSubRef.current, { y: 0, opacity: 1, duration: 0.55 }, 0.12)
        .to(heroMetaRef.current, { y: 0, opacity: 1, duration: 0.45 }, 0.26)
        .to(heroTextRef.current, { x: 0, opacity: 1, duration: 0.45 }, 0.22)
        .to(heroGhostRef.current, { opacity: 0.08, y: 0, duration: 0.75 }, 0.18)
        .to(heroWashRef.current, { opacity: 1, scale: 1, duration: 0.65 }, 0.16)
        .to(heroPanelClipRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.75 }, 0.32)
        .to(heroImageWrapRef.current, { x: 0, opacity: 1, scale: 1, duration: 0.7 }, 0.42)
        .to(
          [
            blockNowRef.current,
            blockCapRef.current,
            blockFocusRef.current,
            blockContextRef.current,
            blockSignalsRef.current,
            blockLinksRef.current,
          ],
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          0.62
        )
        .to('[data-seam]', { scaleX: 1, opacity: 1, duration: 0.65, stagger: 0.08 }, 0.55);

      // One-time intro flicker (subtle)
      tl.to(
        heroTitleRef.current,
        { opacity: 0.85, x: 1, duration: 0.06, ease: 'none' },
        0.58
      )
        .to(heroTitleRef.current, { opacity: 1, x: -1, duration: 0.06, ease: 'none' }, 0.64)
        .to(heroTitleRef.current, { opacity: 1, x: 0, duration: 0.1, ease: 'power1.inOut' }, 0.7);

      // Terminal breathing (subtle)
      const terminal = document.querySelector('.terminal-core');
      if (terminal) {
        gsap.to(terminal, {
          y: -2,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }

      // Very subtle hero panel parallax
      if (heroImageWrapRef.current) {
        gsap.to(heroImageWrapRef.current, {
          y: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: heroImageWrapRef.current,
            start: 'top 85%',
            end: 'bottom top',
            scrub: 0.65,
          },
        });
      }

      // Controlled drift on blocks
      const blocks = [
        blockNowRef.current,
        blockCapRef.current,
        blockFocusRef.current,
        blockContextRef.current,
        blockSignalsRef.current,
        blockLinksRef.current,
      ];
      blocks.forEach((node, idx) => {
        if (!node) return;
        ScrollTrigger.create({
          trigger: node,
          start: 'top 85%',
          end: 'bottom 70%',
          scrub: 0.5,
          onUpdate: (self) => {
            const drift = (idx % 2 === 0 ? -1 : 1) * self.progress * 10;
            gsap.to(node, { x: drift, duration: 0.18, ease: 'power2.out' });
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [state]);

  return (
    <div ref={rootRef} className="relative w-full text-foreground">
      {/* HERO */}
      <section className="relative px-8 md:px-14 lg:px-20 pt-7 pb-4">
        {/* Soft ink wash behind the reading area (no gradients) */}
        <div
          ref={heroWashRef}
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-24 h-[34rem] w-[54rem] rounded-full bg-background/70 blur-3xl"
        />
        {/* Ghost typography + spine */}
        <div
          ref={heroGhostRef}
          aria-hidden="true"
          className="absolute left-8 md:left-14 top-3 select-none pointer-events-none leading-[0.88] font-semibold tracking-[-0.02em] text-foreground/5 text-[clamp(4rem,8.5vw,8.5rem)]"
        >
          Mayank
          <br />
          Sharma
        </div>
        <div
          aria-hidden="true"
          className="absolute left-[48%] top-0 bottom-0 w-px bg-foreground/10"
        />

        <div className="relative flex items-center justify-between gap-10">
          {/* Left: Text */}
          <div ref={heroTextRef} className="relative w-[55%]">
            {/* Panel marks */}
            <div
              aria-hidden="true"
              className="absolute -left-6 top-2 h-px w-5 bg-foreground/25"
            />
            <div
              aria-hidden="true"
              className="absolute -left-6 top-2 w-3 h-3 border-l border-t border-foreground/25"
            />

            <h1
              ref={heroTitleRef}
              className="text-[clamp(2.6rem,5.5vw,6rem)] leading-[0.95] font-semibold"
            >
              Mayank
              <br />
              Sharma
            </h1>

            <p
              ref={heroSubRef}
              className="mt-4 text-lg leading-relaxed text-foreground/90 max-w-[56ch]"
            >
              Backend-focused intern and startup co-founder. I design APIs, build
              backend systems, and ship MVPs with real users.
            </p>

            <div
              ref={heroMetaRef}
              className="mt-5 text-xs uppercase tracking-[0.45em] text-muted"
            >
              BACKEND · PRODUCT SYSTEMS · HEALTHTECH
            </div>
            <div className="mt-3 text-sm text-muted">
              B.Tech CSE at Chandigarh University (2022-2026)
            </div>

            {/* Rhythm line */}
            <div aria-hidden="true" className="mt-6 flex items-center gap-3">
              <div className="h-px w-10 bg-primary/60" />
              <div className="h-px w-20 bg-foreground/12" />
            </div>
          </div>

          {/* Right: Framed manga panel */}
          <div ref={heroImageWrapRef} className="relative w-[40%] -mb-10">
            {/* Offset outline (panel stacking) */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 border border-foreground/10"
            />
            <div className="relative border border-border p-4 bg-background/50">
              {/* Corner marks */}
              <div
                aria-hidden="true"
                className="absolute left-3 top-3 w-4 h-4 border-l border-t border-foreground/25"
              />
              <div
                aria-hidden="true"
                className="absolute right-3 top-3 w-4 h-4 border-r border-t border-foreground/25"
              />
              <div
                aria-hidden="true"
                className="absolute left-3 bottom-3 w-4 h-4 border-l border-b border-foreground/12"
              />
              <div
                aria-hidden="true"
                className="absolute right-3 bottom-3 w-4 h-4 border-r border-b border-foreground/12"
              />

              <div
                ref={heroPanelClipRef}
                className="relative overflow-hidden h-[62vh] bg-[#111217]"
              >
                <img
                  src={imageSrc}
                  alt="Ichigo Kurosaki"
                  className="w-full h-full object-contain object-center grayscale contrast-125 brightness-95 opacity-95"
                />
                {/* Darken whites to match the ink UI */}
                <div className="absolute inset-0 bg-[#0b0b0b]/45" />
                {/* Subtle grain */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-[0.085] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
                  }}
                />
              </div>
            </div>

            <div
              aria-hidden="true"
              className="absolute -left-6 top-6 h-px w-6 bg-primary/60"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 h-px w-full bg-foreground/12" />
      </section>

      {/* STRUCTURED SPREAD */}
      <section className="relative px-8 md:px-14 lg:px-20 pt-3 pb-6 -mt-10">
        {/* Spine */}
        <div
          aria-hidden="true"
          className="absolute left-[48%] top-0 h-full w-px bg-foreground/12"
        />
        {/* Rhythm seams */}
        <div
          data-seam
          aria-hidden="true"
          className="absolute left-0 right-0 top-[18%] h-px bg-foreground/10 origin-left"
        />
        <div
          data-seam
          aria-hidden="true"
          className="absolute left-0 right-0 top-[52%] h-px bg-foreground/10 origin-left"
        />
        <div
          data-seam
          aria-hidden="true"
          className="absolute left-0 right-0 top-[82%] h-px bg-foreground/10 origin-left"
        />
        {/* Subtle band for depth (no gradients, not a "card") */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-[34%] h-40 bg-foreground/[0.03]"
        />

        <div className="relative space-y-6">
          {/* NOW (left) */}
          <div
            ref={blockNowRef}
            className="relative w-[44%] pt-2 pb-1 pr-6
            after:content-[''] after:absolute after:-right-[9.5vw] after:top-4 after:h-px after:w-[9.5vw] after:bg-foreground/10"
          >
            <div
              aria-hidden="true"
              className="absolute -left-6 top-2 h-px w-6 bg-foreground/20"
            />
            <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-muted mb-2">
              NOW
            </div>

            <div className="mt-3 space-y-3">
              <div className="relative border-l border-foreground/10 pl-4">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/60"
                />
                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                  ROLE
                </div>
                <div className="mt-1 text-sm text-foreground/85">
                  Backend Developer Intern
                </div>
                <div className="mt-0.5 text-sm text-foreground/85">
                  SunEdge IT Solutions
                </div>
              </div>

              <div className="relative border-l border-foreground/10 pl-4 ml-2">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/45"
                />
                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                  BUILD
                </div>
                <div className="mt-1 text-sm text-foreground/85">
                  Co-founder and product-focused engineer
                </div>
                <div className="mt-0.5 text-sm text-foreground/85">
                  Healiora (CU-TBI Incubated)
                </div>
              </div>
            </div>
          </div>

          {/* CAPABILITIES (right, interlocks upward) */}
          <div
            ref={blockCapRef}
            className="relative w-[42%] ml-auto -mt-3 pt-2 pb-1 pl-6
            after:content-[''] after:absolute after:-left-[9.5vw] after:top-4 after:h-px after:w-[9.5vw] after:bg-foreground/10"
          >
            <div
              aria-hidden="true"
              className="absolute -right-6 top-2 h-px w-6 bg-foreground/20"
            />
            <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-muted mb-2">
              CAPABILITIES
            </div>

            <div className="mt-3 space-y-3">
              <div className="relative border-l border-foreground/10 pl-4">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/60"
                />
                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                  BACKEND
                </div>
                <div className="mt-1 text-sm text-foreground/85">
                  Design and build REST APIs
                </div>
                <div className="mt-0.5 text-sm text-foreground/85">
                  Implement clean backend architecture
                </div>
              </div>

              <div className="relative border-l border-foreground/10 pl-4 ml-2">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/45"
                />
                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                  MOBILE
                </div>
                <div className="mt-1 text-sm text-foreground/85">
                  Develop Android applications
                </div>
              </div>

              <div className="relative border-l border-foreground/10 pl-4 ml-4">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/45"
                />
                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                  SHIP
                </div>
                <div className="mt-1 text-sm text-foreground/85">
                  Ship MVPs with real users
                </div>
              </div>
            </div>
          </div>

          {/* FOCUS (left) */}
          <div
            ref={blockFocusRef}
            className="relative w-[44%] -mt-1 pt-2 pb-1 pr-6
            after:content-[''] after:absolute after:-right-[9.5vw] after:top-4 after:h-px after:w-[9.5vw] after:bg-foreground/10"
          >
            <div
              aria-hidden="true"
              className="absolute -left-6 top-2 h-px w-6 bg-foreground/20"
            />
            <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-muted mb-2">
              FOCUS
            </div>

            <div className="mt-3 space-y-3">
              <div className="relative border-l border-foreground/10 pl-4">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/60"
                />
                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                  SYSTEMS
                </div>
                <div className="mt-1 text-sm text-foreground/85">
                  Backend APIs and clean architecture
                </div>
              </div>

              <div className="relative border-l border-foreground/10 pl-4 ml-2">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/45"
                />
                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                  PRODUCT
                </div>
                <div className="mt-1 text-sm text-foreground/85">
                  Real-world product development
                </div>
              </div>

              <div className="relative border-l border-foreground/10 pl-4 ml-4">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/45"
                />
                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                  INTERACTION
                </div>
                <div className="mt-1 text-sm text-foreground/85">
                  Frontend fundamentals and interaction systems
                </div>
              </div>
            </div>
          </div>

          {/* CONTEXT (right) */}
          <div
            ref={blockContextRef}
            className="relative w-[42%] ml-auto -mt-3 pt-2 pb-1 pl-6
            after:content-[''] after:absolute after:-left-[9.5vw] after:top-4 after:h-px after:w-[9.5vw] after:bg-foreground/10"
          >
            <div
              aria-hidden="true"
              className="absolute -right-6 top-2 h-px w-6 bg-foreground/20"
            />
            <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-muted mb-2">
              CONTEXT
            </div>

            <div className="mt-3 space-y-3">
              <div className="relative border-l border-foreground/10 pl-4">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/60"
                />
                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                  WORK
                </div>
                <div className="mt-1 text-sm text-foreground/85">
                  Backend Intern - SunEdge IT Solutions
                </div>
              </div>

              <div className="relative border-l border-foreground/10 pl-4 ml-2">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/45"
                />
                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                  FOUNDING
                </div>
                <div className="mt-1 text-sm text-foreground/85">
                  Co-founder - Healiora (CU-TBI Incubated)
                </div>
              </div>

              <div className="relative border-l border-foreground/10 pl-4 ml-4">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/45"
                />
                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                  EDUCATION
                </div>
                <div className="mt-1 text-sm text-foreground/85">
                  B.Tech CSE - Chandigarh University
                </div>
              </div>
            </div>
          </div>

          {/* SIGNALS (left) */}
          <div
            ref={blockSignalsRef}
            className="relative w-[44%] -mt-1 pt-2 pb-1 pr-6
            after:content-[''] after:absolute after:-right-[9.5vw] after:top-4 after:h-px after:w-[9.5vw] after:bg-foreground/10"
          >
            <div
              aria-hidden="true"
              className="absolute -left-6 top-2 h-px w-6 bg-foreground/20"
            />
            <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-muted mb-2">
              SIGNALS
            </div>

            <div className="mt-3 space-y-3">
              <div className="relative border-l border-foreground/10 pl-4">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/60"
                />
                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                  Active modules
                </div>
                <div className="mt-1 text-sm text-foreground/85">
                  Projects, Dependencies, Sys Logs
                </div>
              </div>

              <div className="relative border-l border-foreground/10 pl-4 ml-2">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/45"
                />
                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                  Primary stack
                </div>
                <div className="mt-1 text-sm text-foreground/85">
                  Java / Spring Boot / SQL
                </div>
              </div>

              <div className="relative border-l border-foreground/10 pl-4 ml-4">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/45"
                />
                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                  Current phase
                </div>
                <div className="mt-1 text-sm text-foreground/85">
                  Skill Expansion (Frontend)
                </div>
              </div>
            </div>
          </div>

          {/* LINKS (right) */}
          <div
            ref={blockLinksRef}
            className="relative w-[42%] ml-auto -mt-3 pt-2 pb-1 pl-6
            after:content-[''] after:absolute after:-left-[9.5vw] after:top-4 after:h-px after:w-[9.5vw] after:bg-foreground/10"
          >
            <div
              aria-hidden="true"
              className="absolute -right-6 top-2 h-px w-6 bg-foreground/20"
            />
            <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-muted mb-2">
              LINKS
            </div>
            <a
              className="link-node group flex items-center gap-2 text-sm text-foreground/85 w-fit ml-0"
              href="https://github.com/mayank-sharma-pant"
              target="_blank"
              rel="noreferrer"
            >
              <span className="link-node__dot h-1.5 w-1.5 rounded-full bg-primary/70 shadow-[0_0_0_3px_rgba(225,91,91,0.10)]" />
              <span className="link-node__text relative">
                github.com/mayank-sharma-pant
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary/70 transition-all duration-200 group-hover:w-full" />
              </span>
            </a>
            <a
              className="link-node group flex items-center gap-2 text-sm text-foreground/85 w-fit mt-2 ml-2"
              href="https://linkedin.com/in/mayank-sharma-a747ba275/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="link-node__dot h-1.5 w-1.5 rounded-full bg-primary/45 shadow-[0_0_0_3px_rgba(225,91,91,0.08)]" />
              <span className="link-node__text relative">
                linkedin.com/in/mayank-sharma-a747ba275/
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary/70 transition-all duration-200 group-hover:w-full" />
              </span>
            </a>
            <a
              className="link-node group flex items-center gap-2 text-sm text-foreground/85 w-fit mt-2 ml-4"
              href="https://x.com/nullbytez"
              target="_blank"
              rel="noreferrer"
            >
              <span className="link-node__dot h-1.5 w-1.5 rounded-full bg-primary/45 shadow-[0_0_0_3px_rgba(225,91,91,0.08)]" />
              <span className="link-node__text relative">
                x.com/nullbytez
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary/70 transition-all duration-200 group-hover:w-full" />
              </span>
            </a>
            <a
              className="link-node group flex items-center gap-2 text-sm text-foreground/85 w-fit mt-2 ml-1"
              href="mailto:mayanksharmarrk01@gmail.com"
            >
              <span className="link-node__dot h-1.5 w-1.5 rounded-full bg-primary/45 shadow-[0_0_0_3px_rgba(225,91,91,0.08)]" />
              <span className="link-node__text relative">
                mayanksharmarrk01@gmail.com
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary/70 transition-all duration-200 group-hover:w-full" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* END OF LOG */}
      <section className="relative px-8 md:px-14 lg:px-20 pt-1 pb-[calc(24vh+56px)] -mt-2">
        <div
          aria-hidden="true"
          className="absolute left-[48%] top-0 bottom-0 w-px bg-foreground/10"
        />

        <div className="relative ml-auto w-[52%] pt-4">
          <div className="font-mono text-[11px] tracking-[0.45em] uppercase text-muted">
            SESSION COMPLETE
          </div>
          <div className="mt-3 text-sm text-foreground/80 max-w-[56ch]">
            End of log. System idle.
          </div>

          <div className="mt-5 font-mono text-xs text-muted">
            <span className="text-primary">system@hvy:~$</span> tail -f sys_activity
            <span className="inline-block ml-2 h-3 w-[2px] bg-primary/60 align-[-2px] animate-pulse" />
          </div>

          <div aria-hidden="true" className="mt-6 flex items-center gap-3">
            <div className="h-px w-14 bg-primary/60" />
            <div className="h-px flex-1 bg-foreground/12" />
          </div>
        </div>
      </section>
    </div>
  );
}
