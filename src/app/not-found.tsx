import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[100svh] bg-background text-foreground flex items-center justify-center px-6 py-10">
      <div className="relative w-full max-w-xl border border-border bg-secondary/40 px-6 py-6">
        <div className="absolute -inset-2 border border-border/30 pointer-events-none" />

        <div className="text-[11px] font-mono tracking-[0.55em] uppercase text-muted">
          NOT FOUND
        </div>
        <h1 className="mt-4 text-2xl font-semibold">Missing route</h1>
        <p className="mt-3 text-sm text-foreground/80">
          This path doesn’t exist in the system map.
        </p>

        <div className="mt-6 text-[10px] font-mono tracking-[0.35em] uppercase">
          <Link
            href="/"
            className="border border-border bg-background/40 px-3 py-2 hover:border-primary/50 transition-colors inline-block"
          >
            HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

