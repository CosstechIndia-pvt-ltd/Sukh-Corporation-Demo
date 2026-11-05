"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GitCompare, X } from "lucide-react";
import type { Property } from "@/data/types";
import { cn } from "@/lib/cn";
import { formatArea, formatDate, formatPrice, listingLabel } from "@/lib/format";
import { useCompare } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import { priceNote } from "@/lib/specs";
import { ButtonLink } from "@/components/ui/Button";

export type CompareItem = Omit<Property, "description" | "highlights" | "advisor" | "coordinates">;

type Row = { label: string; get: (p: CompareItem) => string; group?: string };

const nearest = (p: CompareItem, type: Property["nearby"][number]["type"]) => {
  const n = p.nearby.filter((x) => x.type === type).sort((a, b) => a.distanceKm - b.distanceKm)[0];
  return n ? `${n.distanceKm} km · ${n.name}` : "—";
};

const ROWS: Row[] = [
  { label: "Price", get: (p) => formatPrice(p.price, p.listingType) },
  { label: "Price / sq.ft", get: (p) => priceNote(p) ?? "—" },
  { label: "Listing", get: (p) => listingLabel[p.listingType] },
  { label: "Type", get: (p) => p.subType },
  { label: "Area", get: (p) => `${formatArea(p.area)} (${p.area.type})` },
  { label: "Configuration", get: (p) => (p.bhk ? `${p.bhk} BHK · ${p.bathrooms ?? "—"} bath` : p.washrooms !== undefined ? `${p.washrooms} washrooms` : "—") },
  { label: "Furnishing", get: (p) => p.furnishing ?? "—" },
  { label: "Possession", get: (p) => (p.possession === "Under construction" && p.possessionDate ? `By ${formatDate(p.possessionDate)}` : p.possession) },
  { label: "Floor", get: (p) => (p.floor !== undefined && p.totalFloors ? `${p.floor === 0 ? "Ground" : p.floor} of ${p.totalFloors}` : "—") },
  { label: "Facing", get: (p) => p.facing ?? "—" },
  { label: "Parking", get: (p) => (p.parkingSlots ? `${p.parkingSlots}` : "—") },
  { label: "Verified", get: (p) => (p.verified ? "Yes" : "In progress") },
  { label: "Nearest transit", get: (p) => nearest(p, "metro"), group: "Nearby" },
  { label: "Nearest hospital", get: (p) => nearest(p, "hospital"), group: "Nearby" },
  { label: "Nearest school", get: (p) => nearest(p, "school"), group: "Nearby" },
  { label: "Airport", get: (p) => nearest(p, "airport"), group: "Nearby" },
];

export function CompareView({ all }: { all: CompareItem[] }) {
  const hydrated = useHydrated();
  const { ids, remove, clear } = useCompare();
  const [diffOnly, setDiffOnly] = useState(false);
  const items = ids.map((id) => all.find((p) => p.id === id)).filter((x): x is CompareItem => Boolean(x));

  if (!hydrated) return <div className="skeleton min-h-[480px] rounded-media" role="status" aria-label="Loading comparison" />;

  if (!items.length) {
    return (
      <div className="grain flex min-h-[480px] flex-col justify-center rounded-media border border-line bg-surface-2 px-6 py-20 text-center sm:px-12">
        <GitCompare strokeWidth={1.25} className="mx-auto size-10 text-ink-muted" aria-hidden />
        <h2 className="mx-auto mt-6 max-w-md text-[32px] leading-tight sm:text-[40px]">Pick two or three to compare.</h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">Tick &ldquo;Compare&rdquo; on any listing card. You can line up to three properties side by side.</p>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/properties" size="lg">Browse properties</ButtonLink>
        </div>
      </div>
    );
  }

  const amenities = [...new Set(items.flatMap((p) => p.amenities))].sort();
  const differs = (vals: string[]) => new Set(vals).size > 1;
  const rows = ROWS.map((r) => ({ ...r, vals: items.map(r.get) }));
  const amenityRows = amenities.map((a) => ({ label: a, vals: items.map((p) => (p.amenities.includes(a) ? "✓" : "—")) }));
  const visibleRows = diffOnly && items.length > 1 ? rows.filter((r) => differs(r.vals)) : rows;
  const visibleAmen = diffOnly && items.length > 1 ? amenityRows.filter((r) => differs(r.vals)) : amenityRows;

  const cell = "border-b border-line px-4 py-3.5 text-left align-top text-[14px] sm:px-5";
  const head = "sticky left-0 z-10 w-36 min-w-36 bg-bg text-[12px] font-semibold text-ink-muted sm:w-48 sm:min-w-48";

  const renderRow = (r: { label: string; vals: string[] }) => {
    const d = items.length > 1 && differs(r.vals);
    return (
      <tr key={r.label}>
        <th scope="row" className={cn(cell, head)}>
          {r.label}
        </th>
        {r.vals.map((v, i) => (
          <td key={i} className={cn(cell, "tabular", d && !diffOnly && "bg-accent-2/70", v === "—" && "text-ink-muted", v === "✓" && "text-success")}>
            {v === "✓" ? <span aria-label="Yes">✓</span> : v === "—" ? <span aria-label="No">—</span> : v}
          </td>
        ))}
      </tr>
    );
  };

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[14px] text-ink-muted">
          Comparing <span className="font-semibold tabular text-ink">{items.length}</span> of 3.{" "}
          {items.length < 2 ? "Add at least one more to see differences." : "Rows that differ are tinted."}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            role="switch"
            aria-checked={diffOnly}
            onClick={() => setDiffOnly(!diffOnly)}
            disabled={items.length < 2}
            className="inline-flex h-11 items-center gap-3 rounded-chip border border-line px-4 text-[13px] font-semibold disabled:opacity-50"
          >
            <span className={cn("relative h-5 w-8 rounded-full transition-colors", diffOnly ? "bg-primary" : "bg-line")}>
              <span className={cn("absolute top-0.5 size-4 rounded-full bg-surface transition-[left]", diffOnly ? "left-[14px]" : "left-0.5")} />
            </span>
            Only show differences
          </button>
          <button type="button" onClick={clear} className="h-11 px-3 text-[13px] font-semibold text-ink-muted hover:text-ink">
            Clear
          </button>
        </div>
      </div>

      <div className="-mx-4 overflow-x-auto sm:mx-0 lg:overflow-visible">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 lg:min-w-0">
          <caption className="sr-only">Side-by-side comparison of selected properties</caption>
          <thead>
            <tr>
              <td className={cn(head, "align-bottom")} />
              {items.map((p) => (
                <td key={p.id} className="w-[30%] bg-bg px-4 pb-3 align-top sm:px-5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface-2">
                    <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="(min-width: 1024px) 320px, 220px" className="object-cover" />
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      aria-label={`Remove ${p.title} from comparison`}
                      className="absolute right-2 top-2 inline-flex size-9 items-center justify-center rounded-full bg-surface/90 text-ink shadow-soft hover:bg-surface"
                    >
                      <X strokeWidth={1.5} className="size-4" />
                    </button>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <th scope="col" className={cn(head, "border-b border-line px-4 py-3 text-left align-bottom sm:px-5 lg:sticky lg:top-16 lg:z-20")}>
                <span className="sr-only">Property</span>
              </th>
              {items.map((p) => (
                <th key={p.id} scope="col" className="border-b border-line bg-bg/95 px-4 py-3 text-left align-top font-normal backdrop-blur sm:px-5 lg:sticky lg:top-16 lg:z-10">
                  <Link href={`/properties/${p.slug}`} className="line-clamp-2 block text-[15px] font-semibold leading-snug text-ink hover:text-primary">
                    {p.title}
                  </Link>
                  <p className="text-[12px] text-ink-muted">
                    {p.locality}, {p.city} · <span className="tabular">{formatPrice(p.price, p.listingType)}</span>
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.filter((r) => !r.group).map(renderRow)}
            {visibleAmen.length > 0 && (
              <tr>
                <th colSpan={items.length + 1} scope="colgroup" className="sticky left-0 bg-bg px-4 pb-2 pt-10 text-left sm:px-5">
                  <span className="eyebrow text-ink-muted">Amenities</span>
                </th>
              </tr>
            )}
            {visibleAmen.map(renderRow)}
            {visibleRows.some((r) => r.group) && (
              <tr>
                <th colSpan={items.length + 1} scope="colgroup" className="sticky left-0 bg-bg px-4 pb-2 pt-10 text-left sm:px-5">
                  <span className="eyebrow text-ink-muted">Nearby</span>
                </th>
              </tr>
            )}
            {visibleRows.filter((r) => r.group).map(renderRow)}
          </tbody>
        </table>
      </div>
      {items.length < 3 && (
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/properties" variant="secondary">Add {items.length < 2 ? "another" : "a third"} property</ButtonLink>
        </div>
      )}
    </>
  );
}
