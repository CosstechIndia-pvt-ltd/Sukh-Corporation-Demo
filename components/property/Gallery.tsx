"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Images } from "lucide-react";
import { cn } from "@/lib/cn";
import { SmartImage } from "@/components/ui/SmartImage";
import { Lightbox } from "./Lightbox";

type Img = { src: string; alt: string };

export function Gallery({ images, title }: { images: Img[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(0);
  const [ref, embla] = useEmblaCarousel();
  const [index, setIndex] = useState(0);
  const onSelect = useCallback(() => embla && setIndex(embla.selectedScrollSnap()), [embla]);
  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla, onSelect]);

  const show = (i: number) => {
    setStart(i);
    setOpen(true);
  };
  const grid = images.slice(1, 5);

  return (
    <>
      {/* Mobile: swipeable */}
      <div className="relative -mx-4 sm:-mx-6 md:hidden">
        <div ref={ref} className="overflow-hidden">
          <div className="flex touch-pan-y">
            {images.map((img, i) => (
              <button key={img.src + i} type="button" onClick={() => show(i)} className="relative min-w-0 flex-[0_0_100%]" aria-label={`Open photo ${i + 1}: ${img.alt}`}>
                <SmartImage src={img.src} alt={img.alt} priority={i === 0} sizes="100vw" wrapperClassName="aspect-[4/3]" />
              </button>
            ))}
          </div>
        </div>
        <span className="absolute bottom-3 right-4 rounded-chip bg-[rgb(var(--scrim)/0.7)] px-2.5 py-1 text-[12px] font-semibold tabular text-white">
          {index + 1} / {images.length}
        </span>
      </div>

      {/* Desktop: 1 large + 4 */}
      <div className="hidden h-[min(62vh,560px)] grid-cols-4 grid-rows-2 gap-2 md:grid">
        <button type="button" onClick={() => show(0)} className="group relative col-span-2 row-span-2 overflow-hidden rounded-l-media" aria-label={`Open photo 1: ${images[0].alt}`}>
          <SmartImage src={images[0].src} alt={images[0].alt} priority sizes="(min-width: 1320px) 660px, 50vw" wrapperClassName="h-full" className="transition-transform duration-700 group-hover:scale-[1.03]" />
        </button>
        {grid.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => show(i + 1)}
            aria-label={`Open photo ${i + 2}: ${img.alt}`}
            className={cn("group relative overflow-hidden", i === 1 && "rounded-tr-media", i === 3 && "rounded-br-media", grid.length < 4 && i === grid.length - 1 && "row-span-2")}
          >
            <SmartImage src={img.src} alt={img.alt} sizes="(min-width: 1320px) 330px, 25vw" wrapperClassName="h-full" className="transition-transform duration-700 group-hover:scale-[1.03]" />
          </button>
        ))}
      </div>
      <div className="mt-3 hidden justify-end md:flex">
        <button type="button" onClick={() => show(0)} className="inline-flex h-10 items-center gap-2 rounded-chip border border-line px-4 text-[13px] font-semibold hover:border-ink/40">
          <Images strokeWidth={1.5} className="size-4" />
          View all {images.length} photos
        </button>
      </div>

      <Lightbox images={images} open={open} startIndex={start} onOpenChange={setOpen} title={title} />
    </>
  );
}
