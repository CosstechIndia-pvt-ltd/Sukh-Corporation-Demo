import { cn } from "@/lib/cn";

/** Sukh monogram: an arched doorway enclosing a serif S, drawn with hairline strokes. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={cn("size-9", className)}>
      <path d="M6 37V18C6 10.268 12.268 4 20 4s14 6.268 14 14v19" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2 37h36" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M24.6 15.2c-.7-1.6-2.4-2.6-4.4-2.6-2.6 0-4.4 1.5-4.4 3.5 0 4.8 9.2 3 9.2 8.4 0 2.3-2.1 4-4.9 4-2.4 0-4.4-1.2-5-3.2"
        stroke="var(--highlight)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-ink", className)}>
      <Monogram className={compact ? "size-8" : "size-9"} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display font-normal tracking-[-0.02em]", compact ? "text-[22px]" : "text-[26px]")}>Sukh</span>{" "}
        <span className="mt-1 text-[8.5px] font-semibold uppercase tracking-[0.42em] text-ink-muted">Corporation</span>
      </span>
    </span>
  );
}
