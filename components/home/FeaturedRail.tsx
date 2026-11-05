"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { CardData } from "@/lib/specs";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedRail({ items }: { items: CardData[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const arrow =
    "inline-flex size-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink disabled:hover:border-line";

  return (
    <section className="border-t border-line bg-surface-2 py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={`Featured · ${items.length} listings`}
          title="This week’s shortlist"
          intro="Eight properties our advisors would show first — chosen for price, title and the way the light falls."
          action={
            <div className="flex items-center gap-3">
              <Link href="/properties?featured=1" className="mr-3 hidden text-[13px] font-semibold underline decoration-line underline-offset-4 hover:decoration-ink sm:inline">
                See all featured
              </Link>
              <button type="button" className={arrow} onClick={() => scroll(-1)} disabled={edges.start} aria-label="Scroll featured properties left">
                <ArrowLeft strokeWidth={1.5} className="size-5" />
              </button>
              <button type="button" className={arrow} onClick={() => scroll(1)} disabled={edges.end} aria-label="Scroll featured properties right">
                <ArrowRight strokeWidth={1.5} className="size-5" />
              </button>
            </div>
          }
        />
      </div>
      <ul
        ref={ref}
        aria-label="Featured properties"
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[max(16px,calc((100vw-1320px)/2+40px))] pb-4 [scroll-padding-inline:max(16px,calc((100vw-1320px)/2+40px))]"
      >
        {items.map((p) => (
          <li key={p.id} className="w-[84vw] max-w-[380px] shrink-0 snap-start sm:w-[360px]">
            <PropertyCard property={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
