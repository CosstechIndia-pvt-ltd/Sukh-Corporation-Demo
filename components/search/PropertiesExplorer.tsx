"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  CATEGORY_LABEL,
  PAGE_SIZE,
  applyFilters,
  clearFilters,
  parseFilters,
  serializeFilters,
  suggestRelaxations,
  type Filters,
} from "@/lib/filters";
import type { CardData } from "@/lib/specs";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";
import { ActiveFilters } from "./ActiveFilters";
import { FilterPanel, type FilterMeta } from "./FilterPanel";
import { MobileFilterBar } from "./FilterSheet";
import { SortSelect } from "./SortSelect";

function heading(f: Filters, n: number) {
  const noun = f.sub.length === 1 ? f.sub[0].toLowerCase() + (n === 1 ? "" : "s") : f.cat ? `${CATEGORY_LABEL[f.cat].toLowerCase()} ${n === 1 ? "property" : "properties"}` : n === 1 ? "property" : "properties";
  const verb = f.type === "sale" ? " for sale" : f.type === "rent" ? " for rent" : f.type === "lease" ? " for lease" : "";
  const where = f.loc.length === 1 ? ` in ${f.loc[0]}` : f.city.length === 1 ? ` in ${f.city[0]}` : f.city.length > 1 ? ` in ${f.city.length} cities` : " across India";
  return `${n === 0 ? "No" : n} ${n === 0 && !f.sub.length && !f.cat ? "properties" : noun}${verb}${where}`;
}

export function PropertiesExplorer({ all, meta }: { all: CardData[]; meta: FilterMeta }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const filters = useMemo(() => parseFilters(params), [params]);
  const results = useMemo(() => applyFilters(all, filters), [all, filters]);
  const visible = results.slice(0, filters.page * PAGE_SIZE);

  const update = useCallback(
    (next: Filters, mode: "push" | "replace" = "push") => {
      const qs = serializeFilters(next);
      const url = qs ? `${pathname}?${qs}` : pathname;
      if (mode === "replace") router.replace(url, { scroll: false });
      else router.push(url, { scroll: false });
    },
    [pathname, router],
  );

  const suggestions = results.length === 0 ? suggestRelaxations(all, filters) : [];

  return (
    <div className="container-x pb-24 pt-8 lg:pt-12">
      <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow flex items-center gap-3 text-ink-muted">
            <span aria-hidden className="h-px w-6 bg-highlight" />
            Properties · {all.length} listings
          </p>
          <h1 className="mt-4 text-[34px] leading-[1.05] sm:text-[48px]" aria-live="polite" aria-atomic="true">
            {heading(filters, results.length)}
          </h1>
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          <SortSelect id="sort" value={filters.sort} onChange={(sort) => update({ ...filters, sort, page: 1 })} />
          <ViewToggle value={filters.view} onChange={(view) => update({ ...filters, view }, "replace")} />
        </div>
      </div>

      <div className="sticky top-16 z-30 -mx-4 border-b border-line bg-bg/95 px-4 py-3 backdrop-blur lg:hidden">
        <MobileFilterBar filters={filters} onChange={update} meta={meta} all={all} />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr]">
        <aside aria-label="Filters" className="hidden lg:block">
          <div className="no-scrollbar sticky top-24 max-h-[calc(100dvh-112px)] overflow-y-auto pb-10 pr-2">
            <FilterPanel filters={filters} onChange={update} meta={meta} idPrefix="d" />
          </div>
        </aside>

        <section aria-labelledby="results-heading" className="min-w-0">
          <h2 id="results-heading" className="sr-only">Results</h2>
          <div className="mb-6 flex items-start justify-between gap-4">
            <ActiveFilters filters={filters} onChange={update} />
            <div className="ml-auto lg:hidden">
              <ViewToggle value={filters.view} onChange={(view) => update({ ...filters, view }, "replace")} />
            </div>
          </div>

          {results.length === 0 ? (
            <EmptyState suggestions={suggestions} onApply={update} onClear={() => update(clearFilters(filters))} />
          ) : (
            <>
              <ul className={cn(filters.view === "grid" ? "grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-6")}>
                {visible.map((p, i) => (
                  <li key={p.id}>
                    <PropertyCard property={p} layout={filters.view} priority={i < 2} />
                  </li>
                ))}
              </ul>
              <div className="mt-14 flex flex-col items-center gap-4">
                <p className="text-[13px] tabular text-ink-muted">
                  Showing {visible.length} of {results.length}
                </p>
                <div className="h-px w-40 bg-line">
                  <div className="h-px bg-primary transition-[width] duration-500" style={{ width: `${(visible.length / results.length) * 100}%` }} />
                </div>
                {visible.length < results.length && (
                  <Button variant="secondary" onClick={() => update({ ...filters, page: filters.page + 1 }, "replace")}>
                    Load {Math.min(PAGE_SIZE, results.length - visible.length)} more
                  </Button>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function ViewToggle({ value, onChange }: { value: "grid" | "list"; onChange: (v: "grid" | "list") => void }) {
  const btn = (v: "grid" | "list", Icon: typeof List, label: string) => (
    <button
      type="button"
      aria-pressed={value === v}
      aria-label={label}
      onClick={() => onChange(v)}
      className={cn("inline-flex size-10 items-center justify-center rounded-[3px] transition-colors", value === v ? "bg-ink text-bg" : "text-ink-muted hover:text-ink")}
    >
      <Icon strokeWidth={1.5} className="size-4" />
    </button>
  );
  return (
    <div className="inline-flex rounded-chip border border-line p-0.5" role="group" aria-label="Layout">
      {btn("grid", LayoutGrid, "Grid view")}
      {btn("list", List, "List view")}
    </div>
  );
}

function EmptyState({
  suggestions,
  onApply,
  onClear,
}: {
  suggestions: { label: string; next: Filters; count: number }[];
  onApply: (f: Filters) => void;
  onClear: () => void;
}) {
  return (
    <div className="grain rounded-media border border-line bg-surface-2 px-6 py-16 sm:px-12">
      <p className="eyebrow text-ink-muted">No exact matches</p>
      <h2 className="mt-4 max-w-lg text-[32px] leading-tight sm:text-[40px]">
        Nothing fits all of that — <em className="font-light italic">yet.</em>
      </h2>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
        Try loosening one filter. Or tell an advisor what you need: about a third of our deals are for properties that never reach the website.
      </p>
      {suggestions.length > 0 && (
        <ul className="mt-8 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <li key={s.label}>
              <button
                type="button"
                onClick={() => onApply(s.next)}
                className="inline-flex h-10 items-center gap-2 rounded-chip border border-line bg-surface px-4 text-[13px] font-medium hover:border-ink/40"
              >
                {s.label}
                <span className="tabular text-ink-muted">→ {s.count}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={onClear}>Clear all filters</Button>
        <a href="/enquire" className="inline-flex h-11 items-center px-2 text-sm font-semibold underline decoration-line underline-offset-4 hover:decoration-ink">
          Ask an advisor instead
        </a>
      </div>
    </div>
  );
}
