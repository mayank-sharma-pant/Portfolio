'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { stackData } from '@/data/stack';
import { projects } from '@/data/projects';
import { useSystem } from '@/context/SystemContext';

type ClusterItem = { label?: string; lines: string[] };

function uniq(items: string[]) {
  return Array.from(new Set(items));
}

export default function SystemsView() {
  const { pushLog } = useSystem();
  const didInitRef = useRef(false);

  const nodes = useMemo(() => stackData.flatMap((c) => c.nodes), []);

  const coreSystems: ClusterItem[] = useMemo(() => {
    const runtime = nodes
      .filter((n) => ['CORE', 'TOOL'].includes(n.type))
      .map((n) => `${n.name} - ${n.status}`);

    const data = nodes
      .filter((n) => n.name.includes('SQL') || n.name.includes('Mongo') || n.name.includes('JPA'))
      .map((n) => `${n.name} - ${n.status}`);

    return [
      { label: 'RUNTIME / TOOLS', lines: runtime.slice(0, 6) },
      { label: 'DATA', lines: data.slice(0, 6) },
    ].filter((c) => c.lines.length > 0);
  }, [nodes]);

  const backendStack: ClusterItem[] = useMemo(() => {
    const lines = nodes
      .filter((n) => ['Java', 'Spring Boot', 'FastAPI', 'JPA / Hibernate', 'SQL (MySQL)'].includes(n.name))
      .map((n) => `${n.name} - ${n.status}`);

    return [{ label: 'BACKEND', lines }];
  }, [nodes]);

  const frontendExpansion: ClusterItem[] = useMemo(() => {
    const lines = nodes
      .filter((n) => ['JavaScript', 'React', 'Jetpack Compose', 'Node.js'].includes(n.name))
      .map((n) => `${n.name} - ${n.status}`);

    return [{ label: 'FRONTEND', lines }];
  }, [nodes]);

  const principles: ClusterItem[] = useMemo(() => {
    const fromProjects = uniq(projects.flatMap((p) => p.focus));
    const lines = fromProjects.slice(0, 9);

    // Grouped clusters (existing text only).
    return [
      { label: 'ARCHITECTURE', lines: lines.slice(0, 3) },
      { label: 'WORKFLOWS', lines: lines.slice(3, 6) },
      { label: 'SHIPPING', lines: lines.slice(6, 9) },
    ].filter((c) => c.lines.length > 0);
  }, []);

  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;

    pushLog('> Running SYSTEM_DIAGNOSTICS', 'SYSTEM');
    const timers = [
      window.setTimeout(
        () => pushLog(`> STACK_VALIDATE: ${nodes.length} nodes`, 'SYSTEM'),
        450
      ),
      window.setTimeout(() => pushLog('> MODULE_CHECK: OK', 'SUCCESS'), 900),
      window.setTimeout(() => pushLog('> SYSTEM_STATE: stable', 'SYSTEM'), 1350),
    ];

    return () => timers.forEach(window.clearTimeout);
  }, [pushLog, nodes.length]);

  return (
    <div className="space-y-6 pb-10">
      <section className="relative border border-border bg-secondary px-7 py-6">
        <div className="absolute -inset-2 border border-border/40 pointer-events-none" />
        <div className="relative z-10">
          <div className="text-[11px] uppercase tracking-[0.55em] text-muted">
            EP_03 — SYSTEMS & THINKING
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground">
            Systems
          </h1>
          <div className="mt-3 text-xs font-mono text-muted flex items-center gap-4">
            <span>DIAGNOSTICS: READY</span>
            <span className="text-primary">STACK: VALIDATED</span>
          </div>
        </div>
      </section>

      <section className="relative border border-border bg-background px-5 py-5">
        <div className="absolute -inset-2 border border-border/30 pointer-events-none" />

        <div className="relative grid grid-cols-2 gap-6 h-[66vh]">
          <SystemsPanel title="CORE SYSTEMS" clusters={coreSystems} />
          <SystemsPanel title="BACKEND STACK" clusters={backendStack} />
          <SystemsPanel title="FRONTEND EXPANSION" clusters={frontendExpansion} />
          <SystemsPanel title="ENGINEERING PRINCIPLES" clusters={principles} />
        </div>
      </section>
    </div>
  );
}

function SystemsPanel({ title, clusters }: { title: string; clusters: ClusterItem[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: 'easeInOut' }}
      className="relative overflow-hidden"
    >
      <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-px bg-foreground/10" />

      <div className="pl-5 pr-3 pt-2">
        <div className="font-mono text-[11px] tracking-[0.45em] uppercase text-muted">
          {title}
        </div>
      </div>

      <div className="mt-4 pl-5 pr-4 space-y-4">
        {clusters.map((cluster, idx) => (
          <div
            key={`${title}-${idx}`}
            className={`relative border-l border-foreground/10 pl-4 ${idx === 1 ? 'ml-2' : idx === 2 ? 'ml-4' : ''
              }`}
          >
            <span
              aria-hidden="true"
              className="absolute -left-[3px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary/55"
            />

            {cluster.label && (
              <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted/90">
                {cluster.label}
              </div>
            )}

            <div className="mt-2 space-y-2">
              {cluster.lines.map((line) => (
                <div key={line} className="flex items-start gap-3 text-sm text-foreground/85">
                  <span className="mt-2 h-1 w-1 rounded-full bg-foreground/20" />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div aria-hidden="true" className="mt-5 h-px w-full bg-foreground/10" />
    </motion.section>
  );
}
