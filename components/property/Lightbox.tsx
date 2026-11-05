"use client";

import * as RD from "@radix-ui/react-dialog";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Img = { src: string; alt: string };

export function Lightbox({
  images,
  open,
  startIndex,
  onOpenChange,
  title,
}: {
  images: Img[];
  open: boolean;
  startIndex: number;
  onOpenChange: (v: boolean) => void;
  title: string;
}) {
  return (
    <RD.Root open={open} onOpenChange={onOpenChange}>
      <RD.Portal>
        <RD.Overlay className="anim-overlay fixed inset-0 z-[90] bg-[#0d0a0f]/95" />
        <RD.Content className="anim-overlay fixed inset-0 z-[91] flex flex-col text-white focus:outline-none" aria-describedby={undefined}>
          <RD.Title className="sr-only">Photos of {title}</RD.Title>
          {open && <Viewer images={images} startIndex={startIndex} />}
        </RD.Content>
      </RD.Portal>
    </RD.Root>
  );
}

function Viewer({ images, startIndex }: { images: Img[]; startIndex: number }) {
  const [ref, embla] = useEmblaCarousel({ startIndex, loop: images.length > 2 });
  const [index, setIndex] = useState(startIndex);

  const onSelect = useCallback(() => embla && setIndex(embla.selectedScrollSnap()), [embla]);
  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla, onSelect]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") embla?.scrollNext();
      if (e.key === "ArrowLeft") embla?.scrollPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [embla]);

  const nav = "absolute top-1/2 z-10 hidden size-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 md:inline-flex";

  return (
    <>
      <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
        <p className="text-[13px] tabular text-white/80" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </p>
        <p className="mx-4 hidden truncate text-[13px] text-white/80 sm:block">{images[index]?.alt}</p>
        <RD.Close aria-label="Close gallery" className="inline-flex size-11 items-center justify-center rounded-full hover:bg-white/10">
          <X strokeWidth={1.5} className="size-5" />
        </RD.Close>
      </div>
      <div className="relative min-h-0 flex-1">
        <div ref={ref} className="h-full overflow-hidden">
          <div className="flex h-full touch-pan-y">
            {images.map((img, i) => (
              <div key={img.src + i} className="relative h-full min-w-0 flex-[0_0_100%] px-2 sm:px-20">
                <div className="relative h-full w-full">
                  <Image src={img.src} alt={img.alt} fill sizes="100vw" className="object-contain" priority={i === startIndex} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button type="button" onClick={() => embla?.scrollPrev()} aria-label="Previous photo" className={`${nav} left-4`}>
          <ChevronLeft strokeWidth={1.25} className="size-6" />
        </button>
        <button type="button" onClick={() => embla?.scrollNext()} aria-label="Next photo" className={`${nav} right-4`}>
          <ChevronRight strokeWidth={1.25} className="size-6" />
        </button>
      </div>
      <div className="no-scrollbar flex shrink-0 justify-center gap-2 overflow-x-auto px-4 py-4">
        {images.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => embla?.scrollTo(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index}
            className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-[4px] transition-opacity ${i === index ? "opacity-100 ring-1 ring-white" : "opacity-50 hover:opacity-80"}`}
          >
            <Image src={img.src} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
    </>
  );
}
