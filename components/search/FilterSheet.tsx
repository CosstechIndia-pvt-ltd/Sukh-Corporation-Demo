"use client";

import { useState } from "react";
import { Check, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { applyFilters, clearFilters, countActive, SORTS, type Filters, type SortId } from "@/lib/filters";
import type { CardData } from "@/lib/specs";
import { DialogRoot, SheetContent } from "@/components/ui/Dialog";
import { FilterPanel, type FilterMeta } from "./FilterPanel";

/** Mobile: filters edit a draft and apply on demand; sort is its own sheet. */
export function MobileFilterBar({
  filters,
  onChange,
  meta,
  all,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  meta: FilterMeta;
  all: CardData[];
}) {
  const [open, setOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [draft, setDraft] = useState(filters);
  const n = countActive(filters);
  const draftCount = applyFilters(all, draft).length;

  const btn = "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-chip border border-line bg-surface text-[14px] font-semibold text-ink";

  return (
    <div className="flex gap-2 lg:hidden">
      <DialogRoot
        open={open}
        onOpenChange={(v) => {
          if (v) setDraft(filters);
          setOpen(v);
        }}
      >
        <button type="button" className={btn} onClick={() => { setDraft(filters); setOpen(true); }}>
          <SlidersHorizontal strokeWidth={1.5} className="size-4" />
          Filters{n ? ` (${n})` : ""}
        </button>
        <SheetContent
          title="Filters"
          description={`${draftCount} ${draftCount === 1 ? "property matches" : "properties match"}`}
          footer={
            <div className="flex gap-3">
              <button type="button" onClick={() => setDraft(clearFilters(draft))} className="h-12 flex-1 rounded-chip border border-line text-sm font-semibold">
                Clear
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange({ ...draft, page: 1 });
                  setOpen(false);
                }}
                className="h-12 flex-[2] rounded-chip bg-primary text-sm font-semibold text-primary-ink"
              >
                Show {draftCount} {draftCount === 1 ? "property" : "properties"}
              </button>
            </div>
          }
        >
          <FilterPanel filters={draft} onChange={setDraft} meta={meta} idPrefix="m" />
        </SheetContent>
      </DialogRoot>

      <DialogRoot open={sortOpen} onOpenChange={setSortOpen}>
        <button type="button" className={btn} onClick={() => setSortOpen(true)}>
          <ArrowUpDown strokeWidth={1.5} className="size-4" />
          {SORTS.find((s) => s.id === filters.sort)?.label ?? "Sort"}
        </button>
        <SheetContent title="Sort by">
          <ul role="radiogroup" aria-label="Sort order" className="-mx-2">
            {SORTS.map((s) => {
              const active = s.id === filters.sort;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => {
                      onChange({ ...filters, sort: s.id as SortId, page: 1 });
                      setSortOpen(false);
                    }}
                    className={cn("flex min-h-13 w-full items-center justify-between rounded-chip px-3 text-left text-[15px]", active && "bg-accent-2 font-semibold")}
                  >
                    {s.label}
                    {active && <Check strokeWidth={1.5} className="size-4" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </SheetContent>
      </DialogRoot>
    </div>
  );
}
