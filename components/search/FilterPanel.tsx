"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, Search } from "lucide-react";
import type { Category, ListingType } from "@/data/types";
import { cn } from "@/lib/cn";
import { formatCompactINR, formatPrice } from "@/lib/format";
import { CATEGORY_LABEL, FURNISHING, SUBTYPES, budgetScale, type Filters } from "@/lib/filters";
import { Chip } from "@/components/ui/Chip";
import { controlClass } from "@/components/ui/Field";
import { RangeSlider } from "./RangeSlider";

export type FilterMeta = {
  cities: { name: string; localities: string[]; count: number }[];
  amenities: string[];
};

function Group({ title, children, defaultOpen = true, badge }: { title: string; children: ReactNode; defaultOpen?: boolean; badge?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line py-5 first:pt-0">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex min-h-8 w-full items-center justify-between text-left">
        <span className="eyebrow flex items-center gap-2 text-ink">
          {title}
          {badge ? <span className="rounded-full bg-accent px-1.5 text-[10px] tracking-normal tabular">{badge}</span> : null}
        </span>
        <ChevronDown strokeWidth={1.5} className={cn("size-4 text-ink-muted transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && <div className="pt-4">{children}</div>}
    </div>
  );
}

const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

const TYPES: { id: ListingType | undefined; label: string }[] = [
  { id: undefined, label: "All" },
  { id: "sale", label: "Buy" },
  { id: "rent", label: "Rent" },
  { id: "lease", label: "Lease" },
];

const AREA_PRESETS = [
  { label: "Under 1,000", min: undefined, max: 1000 },
  { label: "1,000–2,500", min: 1000, max: 2500 },
  { label: "2,500–10,000", min: 2500, max: 10000 },
  { label: "10,000+", min: 10000, max: undefined },
];

export function FilterPanel({
  filters: f,
  onChange,
  meta,
  idPrefix,
}: {
  filters: Filters;
  onChange: (next: Filters) => void;
  meta: FilterMeta;
  idPrefix: string;
}) {
  const set = (patch: Partial<Filters>) => onChange({ ...f, ...patch, page: 1 });
  const scale = budgetScale(f.type);
  const [budget, setBudget] = useState<[number, number]>([f.min ?? scale.min, f.max ?? scale.max]);
  const [budgetKey, setBudgetKey] = useState(`${f.type}-${f.min}-${f.max}`);
  const key = `${f.type}-${f.min}-${f.max}`;
  if (key !== budgetKey) {
    // keep slider in sync when the URL changes elsewhere (chips, presets, back button)
    setBudgetKey(key);
    setBudget([f.min ?? scale.min, f.max ?? scale.max]);
  }
  const fmtBudget = (n: number) => (f.type === "sale" ? formatCompactINR(n) : formatPrice(n, "rent"));
  const commitBudget = ([lo, hi]: [number, number]) =>
    set({ min: lo <= scale.min ? undefined : lo, max: hi >= scale.max ? undefined : hi });

  const localities = meta.cities.filter((c) => f.city.includes(c.name)).flatMap((c) => c.localities);
  const showBhk = !f.cat || f.cat === "residential" || (f.cat === "farmland" && f.sub.includes("Farmhouse"));

  return (
    <div className="text-ink">
      <Group title="Search">
        <label htmlFor={`${idPrefix}-q`} className="sr-only">
          Keyword, locality or city
        </label>
        <div className="relative">
          <Search aria-hidden strokeWidth={1.5} className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
          <KeywordInput id={`${idPrefix}-q`} value={f.q} onCommit={(q) => set({ q })} />
        </div>
      </Group>

      <Group title="Looking to">
        <div className="grid grid-cols-4 rounded-chip border border-line p-1" role="group" aria-label="Listing type">
          {TYPES.map((t) => (
            <button
              key={t.label}
              type="button"
              aria-pressed={f.type === t.id}
              onClick={() => set({ type: t.id, min: undefined, max: undefined })}
              className={cn(
                "h-9 rounded-[3px] text-[13px] font-semibold transition-colors",
                f.type === t.id ? "bg-primary text-primary-ink" : "text-ink-muted hover:text-ink",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Group>

      <Group title="Category" badge={(f.cat ? 1 : 0) + f.sub.length}>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => (
            <Chip key={c} active={f.cat === c} onClick={() => set({ cat: f.cat === c ? undefined : c, sub: [] })}>
              {CATEGORY_LABEL[c]}
            </Chip>
          ))}
        </div>
        {f.cat && (
          <div className="mt-4 border-l border-line pl-3">
            <p className="mb-2 text-[12px] text-ink-muted">{CATEGORY_LABEL[f.cat]} type</p>
            <div className="flex flex-wrap gap-2">
              {SUBTYPES[f.cat].map((s) => (
                <Chip key={s} active={f.sub.includes(s)} onClick={() => set({ sub: toggle(f.sub, s) })}>
                  {s}
                </Chip>
              ))}
            </div>
          </div>
        )}
      </Group>

      <Group title="City" badge={f.city.length + f.loc.length}>
        <div className="flex flex-wrap gap-2">
          {meta.cities.map((c) => (
            <Chip
              key={c.name}
              active={f.city.includes(c.name)}
              onClick={() => {
                const city = toggle(f.city, c.name);
                const allowed = meta.cities.filter((x) => city.includes(x.name)).flatMap((x) => x.localities);
                set({ city, loc: f.loc.filter((l) => allowed.includes(l)) });
              }}
            >
              {c.name}
              <span className="text-[11px] opacity-70 tabular">{c.count}</span>
            </Chip>
          ))}
        </div>
        {localities.length > 0 && (
          <div className="mt-4 border-l border-line pl-3">
            <p className="mb-2 text-[12px] text-ink-muted">Locality</p>
            <div className="flex flex-wrap gap-2">
              {localities.map((l) => (
                <Chip key={l} active={f.loc.includes(l)} onClick={() => set({ loc: toggle(f.loc, l) })}>
                  {l}
                </Chip>
              ))}
            </div>
          </div>
        )}
      </Group>

      <Group title={f.type && f.type !== "sale" ? "Budget per month" : "Budget"}>
        {f.type ? (
          <>
            <RangeSlider
              label="Budget"
              min={scale.min}
              max={scale.max}
              step={scale.step}
              value={budget}
              onValueChange={setBudget}
              onValueCommit={commitBudget}
              format={fmtBudget}
            />
            <div className="mt-5 flex flex-wrap gap-2">
              {scale.presets.map((p) => {
                const active = (f.min ?? scale.min) === p.min && (f.max ?? scale.max) === p.max;
                return (
                  <Chip key={p.label} active={active} onClick={() => commitBudget(active ? [scale.min, scale.max] : [p.min, p.max])}>
                    {p.label}
                  </Chip>
                );
              })}
            </div>
          </>
        ) : (
          <p className="text-[13px] leading-relaxed text-ink-muted">
            Choose <button type="button" className="font-semibold text-ink underline underline-offset-2" onClick={() => set({ type: "sale" })}>Buy</button> or{" "}
            <button type="button" className="font-semibold text-ink underline underline-offset-2" onClick={() => set({ type: "rent" })}>Rent</button> to set a budget — sale prices and monthly rents use different scales.
          </p>
        )}
      </Group>

      {showBhk && (
        <Group title="Bedrooms" badge={f.bhk.length}>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((b) => (
              <Chip key={b} active={f.bhk.includes(b)} onClick={() => set({ bhk: toggle(f.bhk, b) })} className="min-w-12 justify-center">
                {b === 5 ? "5+" : b} BHK
              </Chip>
            ))}
          </div>
        </Group>
      )}

      <Group title="Area (sq.ft)" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-3">
          <AreaInput id={`${idPrefix}-amin`} label="Min sq.ft" value={f.amin} onCommit={(amin) => set({ amin })} />
          <AreaInput id={`${idPrefix}-amax`} label="Max sq.ft" value={f.amax} onCommit={(amax) => set({ amax })} />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {AREA_PRESETS.map((p) => {
            const active = f.amin === p.min && f.amax === p.max;
            return (
              <Chip key={p.label} active={active} onClick={() => set(active ? { amin: undefined, amax: undefined } : { amin: p.min, amax: p.max })}>
                {p.label}
              </Chip>
            );
          })}
        </div>
        <p className="mt-3 text-[12px] text-ink-muted">Farmland is converted at 43,560 sq.ft per acre.</p>
      </Group>

      <Group title="Furnishing" defaultOpen={false} badge={f.furn.length}>
        <div className="flex flex-wrap gap-2">
          {FURNISHING.map((v) => (
            <Chip key={v} active={f.furn.includes(v)} onClick={() => set({ furn: toggle(f.furn, v) })}>
              {v}
            </Chip>
          ))}
        </div>
      </Group>

      <Group title="Possession" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          <Chip active={f.poss === "ready"} onClick={() => set({ poss: f.poss === "ready" ? undefined : "ready" })}>
            Ready to move
          </Chip>
          <Chip active={f.poss === "uc"} onClick={() => set({ poss: f.poss === "uc" ? undefined : "uc" })}>
            Under construction
          </Chip>
        </div>
      </Group>

      <Group title="Amenities" defaultOpen={false} badge={f.amen.length}>
        <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {meta.amenities.map((a) => {
            const id = `${idPrefix}-amen-${a.replace(/\W+/g, "-")}`;
            return (
              <li key={a}>
                <label htmlFor={id} className="flex min-h-10 cursor-pointer items-center gap-3 text-[14px]">
                  <input
                    id={id}
                    type="checkbox"
                    checked={f.amen.includes(a)}
                    onChange={() => set({ amen: toggle(f.amen, a) })}
                    className="size-[18px] shrink-0 cursor-pointer appearance-none rounded-[4px] border border-ink/30 bg-surface bg-center bg-no-repeat transition-colors checked:border-primary checked:bg-primary checked:bg-[url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2.2'><path d='M3.5 8.5l3 3 6-7'/></svg>&quot;)]"
                  />
                  {a}
                </label>
              </li>
            );
          })}
        </ul>
      </Group>

      <div className="space-y-1 py-5">
        <Switch label="Verified listings only" checked={f.verified} onChange={(verified) => set({ verified })} />
        <Switch label="Featured only" checked={f.featured} onChange={(featured) => set({ featured })} />
      </div>
    </div>
  );
}

function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className="flex min-h-11 w-full items-center justify-between text-left text-[14px]">
      {label}
      <span className={cn("relative h-6 w-10 rounded-full border transition-colors", checked ? "border-primary bg-primary" : "border-line bg-surface-2")}>
        <span
          className={cn(
            "absolute top-1/2 size-[18px] -translate-y-1/2 rounded-full shadow-soft transition-[left,background-color] duration-200",
            checked ? "left-[19px] bg-primary-ink" : "left-[2px] bg-surface",
          )}
        />
      </span>
    </button>
  );
}

function KeywordInput({ id, value, onCommit }: { id: string; value: string; onCommit: (v: string) => void }) {
  const [draft, setDraft] = useState(value);
  const [last, setLast] = useState(value);
  if (value !== last) {
    setLast(value);
    setDraft(value);
  }
  return (
    <input
      id={id}
      type="search"
      value={draft}
      placeholder="Locality, city or keyword"
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => draft !== value && onCommit(draft.trim())}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onCommit(draft.trim());
        }
      }}
      className={cn(controlClass, "pl-10")}
    />
  );
}

function AreaInput({ id, label, value, onCommit }: { id: string; label: string; value?: number; onCommit: (v: number | undefined) => void }) {
  const [draft, setDraft] = useState(value?.toString() ?? "");
  const [last, setLast] = useState(value);
  if (value !== last) {
    setLast(value);
    setDraft(value?.toString() ?? "");
  }
  const commit = () => {
    const n = Number(draft.replace(/[^\d]/g, ""));
    onCommit(draft.trim() === "" || !Number.isFinite(n) ? undefined : n);
  };
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[12px] text-ink-muted">
        {label}
      </label>
      <input
        id={id}
        inputMode="numeric"
        value={draft}
        placeholder="Any"
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && commit()}
        className={cn(controlClass, "min-h-11 tabular")}
      />
    </div>
  );
}
