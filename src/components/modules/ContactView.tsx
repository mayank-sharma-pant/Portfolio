'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';
import { synth } from '@/utils/audio-engine';

export default function ContactView() {
  const { pushLog } = useSystem();
  const didInitRef = useRef(false);

  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    pushLog('Awaiting input...', 'SYSTEM');
  }, [pushLog]);

  return (
    <div className="space-y-6 pb-10">
      <section className="relative border border-border bg-secondary px-7 py-6">
        <div className="absolute -inset-2 border border-border/40 pointer-events-none" />
        <div className="relative z-10">
          <div className="text-[11px] uppercase tracking-[0.55em] text-muted">
            EP_05 — END STATE
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground">
            Contact
          </h1>
        </div>
      </section>

      <section className="relative border border-border bg-background px-5 py-5">
        <div className="absolute -inset-2 border border-border/30 pointer-events-none" />

        <div className="relative grid grid-cols-[1.1fr_0.9fr] gap-8 h-[62vh]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: 'easeInOut' }}
            className="flex flex-col justify-center"
          >
            <div className="text-[11px] font-mono tracking-[0.45em] uppercase text-muted">
              SYSTEM STATUS
            </div>
            <div className="mt-4 text-2xl leading-tight text-foreground">
              System available for collaboration.
            </div>
            <div className="mt-3 text-sm text-foreground/80 max-w-[60ch]">
              Open to backend, systems, and early-stage products.
            </div>

            <div aria-hidden="true" className="mt-6 flex items-center gap-3">
              <div className="h-px w-12 bg-primary/60" />
              <div className="h-px w-24 bg-foreground/12" />
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: 'easeInOut', delay: 0.06 }}
            className="relative"
          >
            <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-px bg-foreground/10" />
            <div className="pl-6 pr-4 pt-2">
              <div className="font-mono text-[11px] tracking-[0.45em] uppercase text-muted">
                CHANNELS
              </div>
            </div>

            <div className="mt-5 pl-6 pr-4 space-y-3">
              <a
                href="mailto:mayanksharmarrk01@gmail.com"
                onMouseEnter={() => synth.playHover()}
                onClick={() => pushLog('Opening email client', 'SYSTEM')}
                className="link-node group flex items-center gap-2 text-sm text-foreground/85 w-fit"
              >
                <span className="link-node__dot h-1.5 w-1.5 rounded-full bg-primary/70 shadow-[0_0_0_3px_rgba(225,91,91,0.10)]" />
                <span className="link-node__text relative">
                  mayanksharmarrk01@gmail.com
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary/70 transition-all duration-200 group-hover:w-full" />
                </span>
              </a>

              <a
                href="https://github.com/mayank-sharma-pant"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => synth.playHover()}
                onClick={() => pushLog('Opening GitHub profile', 'SYSTEM')}
                className="link-node group flex items-center gap-2 text-sm text-foreground/85 w-fit ml-2"
              >
                <span className="link-node__dot h-1.5 w-1.5 rounded-full bg-primary/45 shadow-[0_0_0_3px_rgba(225,91,91,0.08)]" />
                <span className="link-node__text relative">
                  github.com/mayank-sharma-pant
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary/70 transition-all duration-200 group-hover:w-full" />
                </span>
              </a>

              <a
                href="https://linkedin.com/in/mayank-sharma-a747ba275/"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => synth.playHover()}
                onClick={() => pushLog('Opening LinkedIn profile', 'SYSTEM')}
                className="link-node group flex items-center gap-2 text-sm text-foreground/85 w-fit ml-4"
              >
                <span className="link-node__dot h-1.5 w-1.5 rounded-full bg-primary/45 shadow-[0_0_0_3px_rgba(225,91,91,0.08)]" />
                <span className="link-node__text relative">
                  linkedin.com/in/mayank-sharma-a747ba275/
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary/70 transition-all duration-200 group-hover:w-full" />
                </span>
              </a>
            </div>

            <div aria-hidden="true" className="mt-8 ml-6 mr-4 h-px bg-foreground/10" />

            <div className="mt-4 pl-6 pr-4 font-mono text-xs text-muted">
              <span className="text-primary">system@hvy:~$</span> _
              <span className="inline-block ml-2 h-3 w-[2px] bg-primary/60 align-[-2px] animate-pulse" />
            </div>
          </motion.aside>
        </div>
      </section>
    </div>
  );
}

