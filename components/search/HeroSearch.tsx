"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { Search } from "lucide-react";
import type { Category, ListingType } from "@/data/types";
import { cn } from "@/lib/cn";
import { BUDGET, SUBTYPES, budgetScale } from "@/lib/filters";
import { Select, controlClass } from "@/components/ui/Field";

type Tab = { id: string; label: string; cat: Category; types: ListingType[] };

const TABS: Tab[] = [
  { id: "buy", label: "Buy", cat: "residential", types: ["sale"] },
  { id: "rent", label: "Rent", cat: "residential", types: ["rent"] },
  { id: "commercial", label: "Commercial", cat: "commercial", types: ["lease", "sale"] },
  { id: "farmland", label: "Farmland", cat: "farmland", types: ["sale", "lease"] },
];

const TYPE_LABEL: Record<ListingType, string> = { sale: "Buy", rent: "Rent", lease: "Lease" };

export function HeroSearch({ cities }: { cities: string[] }) {
  const router = useRouter();
  const uid = useId();
  const [tabId, setTabId] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === tabId)!;
  const [type, setType] = useState<ListingType>(tab.types[0]);
  const [city, setCity] = useState("");
  const [q, setQ] = useState("");
  const [budget, setBudget] = useState("");
  const [sub, setSub] = useState("");

  const selectTab = (t: Tab) => {
    setTabId(t.id);
    setType(t.types[0]);
    setBudget("");
    setSub("");
  };

  const presets = budgetScale(type) === BUDGET.rent ? BUDGET.rent.presets : BUDGET.sale.presets;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    p.set("type", type);
    p.set("cat", tab.cat);
    if (city) p.set("city", city);
    if (q.trim()) p.set("q", q.trim());
    if (sub) p.set("sub", sub);
    if (budget) {
      const preset = presets[Number(budget)];
      if (preset.min > 0) p.set("min", String(preset.min));
      if (preset.max < budgetScale(type).max) p.set("max", String(preset.max));
    }
    router.push(`/properties?${p.toString()}`);
  };

  const label = "eyebrow mb-2 block text-[10px] text-ink-muted";

  return (
    <form onSubmit={submit} role="search" aria-label="Search properties" className="rounded-card border border-line bg-surface shadow-float">
      <div role="tablist" aria-label="What are you looking for?" className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line px-3 sm:px-5">
        {TABS.map((t) => {
          const active = t.id === tabId;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectTab(t)}
              className={cn(
                "relative h-12 shrink-0 px-3 text-[14px] font-semibold transition-colors sm:h-14",
                active ? "text-ink" : "text-ink-muted hover:text-ink",
              )}
            >
              {t.label}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-3 -bottom-px h-0.5 origin-left bg-primary transition-transform duration-300 ease-out",
                  active ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          );
        })}
        {tab.types.length > 1 && (
          <div className="ml-auto flex shrink-0 items-center gap-1 py-2 pl-3" role="group" aria-label="Buy or lease">
            {tab.types.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={type === t}
                onClick={() => {
                  setType(t);
                  setBudget("");
                }}
                className={cn(
                  "h-8 rounded-chip px-3 text-[12px] font-semibold transition-colors",
                  type === t ? "bg-accent text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {TYPE_LABEL[t]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-4 p-4 sm:p-5 lg:grid-cols-[1fr_1.3fr_1fr_1fr]">
        <div>
          <label htmlFor={`${uid}-city`} className={label}>
            City
          </label>
          <Select id={`${uid}-city`} value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All 12 cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-span-2 row-start-1 lg:col-span-1 lg:row-start-auto">
          <label htmlFor={`${uid}-q`} className={label}>
            Locality or keyword
          </label>
          <input
            id={`${uid}-q`}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. Baner, sea view"
            className={controlClass}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-budget`} className={label}>
            Budget{type !== "sale" ? " / month" : ""}
          </label>
          <Select id={`${uid}-budget`} value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="">Any budget</option>
            {presets.map((p, i) => (
              <option key={p.label} value={i}>
                {p.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <label htmlFor={`${uid}-sub`} className={label}>
            Property type
          </label>
          <Select id={`${uid}-sub`} value={sub} onChange={(e) => setSub(e.target.value)}>
            <option value="">All {tab.cat === "residential" ? "homes" : tab.cat === "commercial" ? "commercial" : "land"}</option>
            {SUBTYPES[tab.cat].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex flex-col-reverse items-stretch justify-between gap-3 border-t border-line px-4 py-3 sm:flex-row sm:items-center sm:px-5">
        <p className="text-[12px] text-ink-muted">Every listing is title-checked by our legal desk before it goes live.</p>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-chip bg-primary px-7 text-sm font-semibold text-primary-ink transition-colors hover:bg-[color-mix(in_oklab,var(--primary)_88%,var(--ink))]"
        >
          <Search strokeWidth={1.5} className="size-4" />
          Search
        </button>
      </div>
    </form>
  );
}
