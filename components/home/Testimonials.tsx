"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [ref, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const [index, setIndex] = useState(0);

  const onSelect = useCallback(() => embla && setIndex(embla.selectedScrollSnap()), [embla]);
  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla, onSelect]);

  const btn =
    "inline-flex size-12 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg";

  return (
    <section className="border-t border-line py-20 lg:py-28" aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <Eyebrow>In their words · {items.length} clients</Eyebrow>
          <div className="flex items-center gap-3">
            <p className="mr-2 text-[13px] tabular text-ink-muted" aria-live="polite">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <button type="button" className={btn} onClick={() => embla?.scrollPrev()} aria-label="Previous testimonial">
              <ArrowLeft strokeWidth={1.5} className="size-5" />
            </button>
            <button type="button" className={btn} onClick={() => embla?.scrollNext()} aria-label="Next testimonial">
              <ArrowRight strokeWidth={1.5} className="size-5" />
            </button>
          </div>
        </div>

        <div ref={ref} className="mt-10 overflow-hidden">
          <div className="flex touch-pan-y">
            {items.map((t, i) => (
              <figure
                key={t.name}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${items.length}`}
                className="min-w-0 flex-[0_0_100%] pr-6 lg:grid lg:grid-cols-12 lg:gap-10 lg:pr-0"
              >
                <span aria-hidden className="block font-display text-[96px] leading-[0.6] text-accent lg:col-span-1 lg:text-[140px]">
                  &ldquo;
                </span>
                <div className="lg:col-span-10">
                  <blockquote className="font-display text-[26px] font-light leading-[1.25] tracking-[-0.015em] text-ink sm:text-[34px] lg:text-[42px]">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-6 text-[14px]">
                    <span className="font-semibold text-ink">{t.name}</span>
                    <span aria-hidden className="size-1 rounded-full bg-highlight" />
                    <span className="text-ink-muted">{t.city}</span>
                    <span aria-hidden className="size-1 rounded-full bg-highlight" />
                    <span className="text-ink-muted">
                      {t.property}, {t.year}
                    </span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
