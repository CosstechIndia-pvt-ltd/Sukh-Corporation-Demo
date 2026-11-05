"use client";

import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { SmartImage } from "@/components/ui/SmartImage";

type Img = { src: string; alt: string };

/**
 * Swipeable card gallery. Only the first image is mounted until the visitor
 * interacts, so a page of 12 cards loads 12 images, not 60.
 */
export function CardCarousel({
  images,
  href,
  sizes,
  priority,
  className,
}: {
  images: Img[];
  href: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const [emblaRef, embla] = useEmblaCarousel({ loop: false, align: "start", containScroll: "trimSnaps" });
  const [index, setIndex] = useState(0);
  const slides = active ? images : images.slice(0, 1);

  const onSelect = useCallback(() => embla && setIndex(embla.selectedScrollSnap()), [embla]);
  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    embla.reInit();
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla, onSelect, slides.length]);

  const activate = () => setActive(true);
  const go = (dir: -1 | 1) => (e: React.MouseEvent) => {
    e.preventDefault();
    activate();
    requestAnimationFrame(() => (dir === 1 ? embla?.scrollNext() : embla?.scrollPrev()));
  };

  return (
    <div
      className={cn("group/carousel relative overflow-hidden", className)}
      onPointerEnter={activate}
      onTouchStart={activate}
      onFocus={activate}
    >
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full touch-pan-y">
          {slides.map((img, i) => (
            <Link
              key={img.src + i}
              href={href}
              tabIndex={-1}
              aria-hidden={i !== index}
              className="relative h-full min-w-0 flex-[0_0_100%]"
              draggable={false}
            >
              <SmartImage
                src={img.src}
                alt={img.alt}
                sizes={sizes}
                priority={priority && i === 0}
                wrapperClassName="h-full w-full"
                className="transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
              />
            </Link>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgb(var(--scrim)/0.35)] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5" aria-hidden>
            {images.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full bg-white/90 transition-all duration-300",
                  i === index ? "w-4 opacity-100" : "w-1.5 opacity-60",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={go(-1)}
            aria-label="Previous photo"
            disabled={index === 0}
            className="absolute left-2 top-1/2 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink opacity-0 shadow-soft transition-opacity duration-200 focus-visible:opacity-100 disabled:hidden group-hover/carousel:opacity-100 md:inline-flex"
          >
            <ChevronLeft strokeWidth={1.5} className="size-4" />
          </button>
          <button
            type="button"
            onClick={go(1)}
            aria-label="Next photo"
            disabled={active && index === images.length - 1}
            className="absolute right-2 top-1/2 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink opacity-0 shadow-soft transition-opacity duration-200 focus-visible:opacity-100 disabled:hidden group-hover/carousel:opacity-100 md:inline-flex"
          >
            <ChevronRight strokeWidth={1.5} className="size-4" />
          </button>
        </>
      )}
    </div>
  );
}
