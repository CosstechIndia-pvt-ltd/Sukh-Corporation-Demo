"use client";

import { Heart, X } from "lucide-react";
import { useShortlist } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import type { CardData } from "@/lib/specs";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ButtonLink } from "@/components/ui/Button";
import { CardSkeleton } from "@/components/property/CardSkeleton";

export function ShortlistView({ all }: { all: CardData[] }) {
  const hydrated = useHydrated();
  const { ids, remove, clear } = useShortlist();
  const items = ids.map((id) => all.find((p) => p.id === id)).filter((x): x is CardData => Boolean(x));

  if (!hydrated) {
    return (
      <div className="grid min-h-[480px] gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading shortlist">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={i > 0 ? "hidden sm:block" : undefined}>
            <CardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="grain flex min-h-[480px] flex-col justify-center rounded-media border border-line bg-surface-2 px-6 py-20 text-center sm:px-12">
        <Heart strokeWidth={1.25} className="mx-auto size-10 text-ink-muted" aria-hidden />
        <h2 className="mx-auto mt-6 max-w-md text-[32px] leading-tight sm:text-[40px]">
          Nothing saved <em className="font-light italic">yet.</em>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
          Tap the heart on any listing to keep it here. Your shortlist stays on this device — no sign-in needed.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/properties" size="lg">Browse properties</ButtonLink>
          <ButtonLink href="/properties?featured=1" variant="secondary" size="lg">See featured</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-10 flex flex-col gap-4 rounded-card border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[14px]">
          <span className="font-semibold tabular">{items.length}</span> saved {items.length === 1 ? "property" : "properties"}. One advisor can arrange visits to all of them in a single day where they&rsquo;re in the same city.
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={clear} className="h-11 px-3 text-[13px] font-semibold text-ink-muted hover:text-ink">
            Clear all
          </button>
          <ButtonLink href={`/enquire?property=${items.map((p) => p.slug).join(",")}`}>Enquire about all</ButtonLink>
        </div>
      </div>
      <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <li key={p.id} className="flex flex-col">
            <PropertyCard property={p} />
            <button type="button" onClick={() => remove(p.id)} className="mt-3 inline-flex h-10 items-center gap-1.5 self-start px-1 text-[13px] font-medium text-ink-muted hover:text-danger">
              <X strokeWidth={1.5} className="size-4" /> Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
