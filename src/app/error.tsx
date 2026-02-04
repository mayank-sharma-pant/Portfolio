'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the real error instead of falling into a refresh loop.
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[100svh] bg-background text-foreground flex items-center justify-center px-6 py-10">
      <div className="relative w-full max-w-2xl border border-border bg-secondary/40 px-6 py-6">
        <div className="absolute -inset-2 border border-border/30 pointer-events-none" />

        <div className="text-[11px] font-mono tracking-[0.55em] uppercase text-muted">
          SYSTEM ERROR
        </div>
        <h1 className="mt-4 text-2xl font-semibold">Unhandled exception</h1>

        <div className="mt-4 border-t border-border/60 pt-4">
          <div className="font-mono text-xs text-muted">MESSAGE</div>
          <p className="mt-2 font-mono text-sm text-foreground/85 break-words">
            {error?.message || 'An error occurred.'}
          </p>
          {error?.digest && (
            <p className="mt-3 font-mono text-xs text-muted break-words">
              DIGEST: {error.digest}
            </p>
          )}
        </div>

        <div className="mt-6 flex items-center gap-3 text-[10px] font-mono tracking-[0.35em] uppercase">
          <button
            type="button"
            onClick={() => reset()}
            className="border border-border bg-background/40 px-3 py-2 hover:border-primary/50 transition-colors"
          >
            RETRY
          </button>
          <Link
            href="/"
            className="border border-border bg-background/40 px-3 py-2 hover:border-primary/50 transition-colors"
          >
            HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

