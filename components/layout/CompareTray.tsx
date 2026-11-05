"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { ListingLite } from "@/lib/nav";
import { COMPARE_LIMIT, useCompare } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import { buttonClass } from "@/components/ui/Button";

const TRAY_H = 80;

export function CompareTray({ listings }: { listings: ListingLite[] }) {
  const hydrated = useHydrated();
  const pathname = usePathname();
  const { ids, remove, clear } = useCompare();
  const items = ids.map((id) => listings.find((l) => l.id === id)).filter((x): x is ListingLite => Boolean(x));
  const visible = hydrated && items.length > 0 && pathname !== "/compare";

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--tray", visible ? `${TRAY_H}px` : "0px");
    return () => root.style.setProperty("--tray", "0px");
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <m.aside
          aria-label="Compare tray"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 z-40 border-t border-line bg-surface/95 shadow-float backdrop-blur-md"
          style={{ bottom: "var(--dock, 0px)", height: TRAY_H }}
        >
          <div className="container-x flex h-full items-center gap-4">
            <div className="hidden shrink-0 md:block">
              <p className="eyebrow text-ink-muted">Compare</p>
              <p className="text-[13px] tabular text-ink">
                {items.length} of {COMPARE_LIMIT} selected
              </p>
            </div>
            <ul className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              {items.map((l) => (
                <li key={l.id} className="relative flex min-w-0 items-center gap-3 sm:flex-1 sm:max-w-64">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-chip bg-surface-2">
                    <Image src={l.image} alt={l.alt} fill sizes="48px" className="object-cover" />
                  </div>
                  <div className="hidden min-w-0 lg:block">
                    <p className="truncate text-[13px] font-semibold text-ink">{l.title}</p>
                    <p className="truncate text-[12px] tabular text-ink-muted">
                      {formatPrice(l.price, l.listingType)} · {l.locality}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(l.id)}
                    aria-label={`Remove ${l.title} from compare`}
                    className="absolute -left-1.5 -top-1.5 inline-flex size-6 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-soft lg:static lg:size-8 lg:shrink-0 lg:border-0 lg:shadow-none lg:hover:bg-accent-2"
                  >
                    <X strokeWidth={1.5} className="size-3.5 lg:size-4" />
                  </button>
                </li>
              ))}
              {Array.from({ length: COMPARE_LIMIT - items.length }).map((_, i) => (
                <li key={`slot-${i}`} aria-hidden className="hidden size-12 shrink-0 rounded-chip border border-dashed border-line sm:block" />
              ))}
            </ul>
            <button type="button" onClick={clear} className="hidden h-10 px-2 text-[13px] font-medium text-ink-muted hover:text-ink sm:block">
              Clear
            </button>
            <Link href="/compare" className={buttonClass({ size: "sm", className: "shrink-0" })}>
              Compare{items.length > 1 ? ` ${items.length}` : ""}
            </Link>
          </div>
        </m.aside>
      )}
    </AnimatePresence>
  );
}
