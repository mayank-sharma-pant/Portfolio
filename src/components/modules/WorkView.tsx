'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { useSystem } from '@/context/SystemContext';
import { synth } from '@/utils/audio-engine';

function mapStatus(status: (typeof projects)[number]['status']) {
  switch (status) {
    case 'ACTIVE':
      return 'LIVE';
    case 'IN_PROGRESS':
      return 'IN_PROGRESS';
    case 'COMPLETED':
      return 'ARCHIVED';
    default:
      return status;
  }
}

export default function WorkView() {
  const { pushLog } = useSystem();

  const [selectedId, setSelectedId] = useState<string>(() => projects[0]?.id ?? '');
  const selected = useMemo(
    () => projects.find((p) => p.id === selectedId) ?? projects[0],
    [selectedId]
  );

  const didInitRef = useRef(false);
  const lastLoggedIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;

    pushLog('> Mounting WORKSPACE: /work', 'SYSTEM');
    pushLog(`> PROJECT_REGISTRY: ${projects.length} nodes`, 'SYSTEM');
  }, [pushLog]);

  useEffect(() => {
    if (!selected) return;
    if (lastLoggedIdRef.current === selected.id) return;
    lastLoggedIdRef.current = selected.id;

    // Contextual terminal output when switching projects (derived from existing content).
    pushLog(`> PROJECT_SELECT: ${selected.id}`, 'SYSTEM');
    pushLog(`> NAME: ${selected.name}`, 'INFO');
    pushLog(`> STATUS: ${mapStatus(selected.status)}`, 'INFO');
    pushLog(`> STACK: ${selected.tech}`, 'INFO');
  }, [selected?.id, pushLog]);

  const onSelect = (id: string) => {
    if (id === selectedId) return;
    synth.playClick();
    setSelectedId(id);
  };

  return (
    <div className="space-y-6 pb-10">
      <section className="relative border border-border bg-secondary px-7 py-6">
        <div className="absolute -inset-2 border border-border/40 pointer-events-none" />
        <div className="relative z-10">
          <div className="text-[11px] uppercase tracking-[0.55em] text-muted">
            EP_02 — WORK INDEX
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground">
            Work
          </h1>
          <div className="mt-3 text-xs font-mono text-muted flex items-center gap-4">
            <span>NODE_COUNT: {projects.length}</span>
            <span className="text-primary">MODE: ENGINEERING</span>
          </div>
        </div>
      </section>

      <section className="relative border border-border bg-background px-5 py-5">
        <div className="absolute -inset-2 border border-border/30 pointer-events-none" />

        <div className="relative grid grid-cols-[300px_1fr] gap-0 h-[66vh]">
          {/* Left: Index */}
          <aside className="pr-5 border-r border-border/50 overflow-y-auto">
            <div className="font-mono text-[11px] tracking-[0.45em] uppercase text-muted">
              PROJECT INDEX
            </div>

            <div className="mt-4 space-y-2">
              {projects.map((p, idx) => {
                const active = p.id === selectedId;
                return (
                  <button
                    key={p.id}
                    onMouseEnter={() => synth.playHover()}
                    onClick={() => onSelect(p.id)}
                    className={`w-full text-left group relative pl-4 pr-3 py-2 border-l-2 transition-colors duration-200
                      ${active
                        ? 'border-primary text-foreground bg-secondary/35'
                        : 'border-transparent text-muted hover:text-foreground hover:bg-secondary/25'
                      }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs tracking-[0.25em] opacity-70">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-semibold tracking-[0.08em] uppercase">
                        {p.name}
                      </span>
                    </div>
                    <div className="mt-1 pl-[2.35rem] text-[11px] font-mono text-muted/80">
                      {p.type}
                    </div>

                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-0 bottom-0 w-px bg-primary/50 opacity-0 transition-opacity duration-200 ${active ? 'opacity-100' : 'group-hover:opacity-40'
                        }`}
                    />
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right: Details */}
          <div className="pl-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              {selected && (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  className="relative"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="font-mono text-[11px] tracking-[0.45em] uppercase text-muted">
                        SELECTED NODE
                      </div>
                      <h2 className="mt-3 text-2xl font-semibold tracking-[0.06em] uppercase">
                        {selected.name}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-muted">
                        STATUS
                      </span>
                      <span className="text-[10px] font-mono tracking-[0.35em] uppercase border border-primary/35 text-primary px-2 py-1">
                        {mapStatus(selected.status)}
                      </span>
                    </div>
                  </div>

                  <div aria-hidden="true" className="mt-5 h-px w-full bg-foreground/12" />

                  <div className="mt-5 space-y-5">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="relative border-l border-foreground/10 pl-4">
                        <span
                          aria-hidden="true"
                          className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/60"
                        />
                        <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                          TYPE
                        </div>
                        <div className="mt-1 text-sm text-foreground/85">
                          {selected.type}
                        </div>
                      </div>

                      <div className="relative border-l border-foreground/10 pl-4">
                        <span
                          aria-hidden="true"
                          className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/45"
                        />
                        <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                          STACK
                        </div>
                        <div className="mt-1 text-sm text-foreground/85">
                          {selected.tech}
                        </div>
                      </div>
                    </div>

                    <div className="relative border-l border-foreground/10 pl-4">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/60"
                      />
                      <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                        PROBLEM
                      </div>
                      <div className="mt-1 text-sm text-foreground/85">
                        {selected.description}
                      </div>
                    </div>

                    <div className="relative border-l border-foreground/10 pl-4 ml-3">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/45"
                      />
                      <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                        SOLUTION
                      </div>
                      <div className="mt-2 space-y-2">
                        {selected.focus.slice(0, 3).map((line, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-foreground/85">
                            <span className="mt-2 h-1 w-1 rounded-full bg-primary/55" />
                            <span>{line}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative border-l border-foreground/10 pl-4 ml-1">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/45"
                      />
                      <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                        CONTEXT
                      </div>
                      <div className="mt-1 text-sm text-foreground/85">
                        {selected.context}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
