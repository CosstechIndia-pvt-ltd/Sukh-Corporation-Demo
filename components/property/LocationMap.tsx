import { ArrowUpRight, MapPin } from "lucide-react";
import type { Property } from "@/data/types";

/** Styled static map — no third-party embed, so it costs nothing in performance or privacy. */
export function LocationMap({ property: p }: { property: Property }) {
  const { lat, lng } = p.coordinates;
  const href = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`;
  return (
    <div className="relative overflow-hidden rounded-card border border-line bg-surface-2">
      <svg viewBox="0 0 800 360" className="block h-64 w-full sm:h-80" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <pattern id="blocks" width="64" height="64" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            <rect width="64" height="64" fill="var(--surface-2)" />
            <rect x="6" y="6" width="52" height="52" rx="3" fill="var(--accent-2)" />
          </pattern>
        </defs>
        <rect width="800" height="360" fill="url(#blocks)" />
        <path d="M-20 250 C 180 210, 300 300, 520 230 S 760 180, 840 200" stroke="var(--surface)" strokeWidth="22" fill="none" />
        <path d="M-20 250 C 180 210, 300 300, 520 230 S 760 180, 840 200" stroke="var(--line)" strokeWidth="1" fill="none" strokeDasharray="6 8" />
        <path d="M300 -20 L 360 380" stroke="var(--surface)" strokeWidth="14" />
        <path d="M560 -20 C 540 120, 600 220, 640 380" stroke="var(--surface)" strokeWidth="10" fill="none" />
        <path d="M-20 90 L 820 120" stroke="var(--surface)" strokeWidth="10" />
        <ellipse cx="660" cy="70" rx="90" ry="46" fill="var(--accent)" opacity="0.7" />
        <circle cx="400" cy="180" r="60" fill="var(--primary)" opacity="0.08" />
        <circle cx="400" cy="180" r="28" fill="var(--primary)" opacity="0.14" />
      </svg>
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <MapPin strokeWidth={1.5} className="size-10 fill-primary text-primary-ink drop-shadow" />
      </div>
      <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-3 rounded-chip border border-line bg-surface/95 px-4 py-3 backdrop-blur sm:inset-x-4 sm:bottom-4">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-ink">{p.address}</p>
          <p className="text-[12px] tabular text-ink-muted">
            {lat.toFixed(4)}° N, {lng.toFixed(4)}° E · approximate
          </p>
        </div>
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1 text-[13px] font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
          Open map
          <ArrowUpRight strokeWidth={1.5} className="size-4" />
        </a>
      </div>
    </div>
  );
}
