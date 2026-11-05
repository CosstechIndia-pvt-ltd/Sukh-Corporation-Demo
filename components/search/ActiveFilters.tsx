"use client";

import { X } from "lucide-react";
import { activeChips, clearFilters, type Filters } from "@/lib/filters";

export function ActiveFilters({ filters, onChange }: { filters: Filters; onChange: (f: Filters) => void }) {
  const chips = activeChips(filters);
  if (!chips.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Active filters">
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={() => onChange(c.remove(filters))}
          aria-label={`Remove filter: ${c.label}`}
          className="group inline-flex h-9 items-center gap-1.5 rounded-chip border border-line bg-surface pl-3 pr-2 text-[13px] text-ink transition-colors hover:border-ink/40"
        >
          {c.label}
          <X strokeWidth={1.5} className="size-3.5 text-ink-muted group-hover:text-ink" />
        </button>
      ))}
      <button type="button" onClick={() => onChange(clearFilters(filters))} className="h-9 px-2 text-[13px] font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
        Clear all
      </button>
    </div>
  );
}
