'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { experience } from '@/data/experience';
import { useSystem } from '@/context/SystemContext';

export default function LogsView() {
  const { pushLog } = useSystem();
  const didInitRef = useRef(false);

  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;

    pushLog('> Entering /logs', 'SYSTEM');

    // Slow-import the timeline into the terminal so the user can "read it like logs".
    const timers: number[] = [];
    let t = 450;

    experience.forEach((entry) => {
      timers.push(
        window.setTimeout(() => {
          pushLog(`[${entry.period}] ${entry.role}`, 'SYSTEM');
          pushLog(`@${entry.company}`, 'INFO');
        }, t)
      );
      t += 1100;

      entry.details.forEach((line) => {
        timers.push(window.setTimeout(() => pushLog(line, 'INFO'), t));
        t += 900;
      });

      t += 600;
    });

    return () => timers.forEach(window.clearTimeout);
  }, [pushLog]);

  return (
    <div className="space-y-6 pb-10">
      <section className="relative border border-border bg-secondary px-7 py-6">
        <div className="absolute -inset-2 border border-border/40 pointer-events-none" />
        <div className="relative z-10">
          <div className="text-[11px] uppercase tracking-[0.55em] text-muted">
            EP_04 — SYS LOGS
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground">
            Logs
          </h1>
          <div className="mt-3 text-xs font-mono text-muted">
            TIMELINE_ENTRIES: {experience.length}
          </div>
        </div>
      </section>

      <section className="relative border border-border bg-background px-5 py-5 h-[66vh] overflow-y-auto">
        <div className="absolute -inset-2 border border-border/30 pointer-events-none" />

        <div className="relative">
          {/* Timeline spine */}
          <div
            aria-hidden="true"
            className="absolute left-4 top-0 bottom-0 w-px bg-foreground/12"
          />

          <div className="space-y-6 pl-10">
            {experience.map((entry, idx) => (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: 'easeInOut', delay: idx * 0.04 }}
                className="relative"
              >
                {/* Node */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[26px] top-2 h-2.5 w-2.5 rounded-full bg-primary/70 shadow-[0_0_0_3px_rgba(225,91,91,0.12)]"
                />

                <div className="grid grid-cols-[160px_1fr] gap-6 items-start">
                  <div className="font-mono text-xs text-muted">
                    [{entry.period}]
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {entry.role}
                      </div>
                      <div className="mt-1 text-xs font-mono text-muted">
                        {entry.type} @ {entry.company}
                      </div>
                    </div>

                    <div className="relative border-l border-foreground/10 pl-4">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-foreground/22"
                      />
                      <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                        OUTCOME
                      </div>
                      <div className="mt-2 space-y-2">
                        {entry.details.map((line, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 text-sm text-foreground/85"
                          >
                            <span className="mt-2 h-1 w-1 rounded-full bg-foreground/20" />
                            <span>{line}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div aria-hidden="true" className="mt-6 h-px w-full bg-foreground/10" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
