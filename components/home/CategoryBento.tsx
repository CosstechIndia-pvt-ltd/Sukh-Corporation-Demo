import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";

export type BentoTile = { label: string; href: string; count: number; image: string; alt: string; note: string };

const layout = [
  "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2 lg:row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1 lg:col-span-3",
  "col-span-2 row-span-1 lg:col-span-1",
];

export function CategoryBento({ tiles }: { tiles: BentoTile[] }) {
  return (
    <section className="container-x py-20 lg:py-28">
      <SectionHeading
        eyebrow="Browse by category"
        title={
          <>
            Six ways in. <em className="font-light italic">Every one</em> checked.
          </>
        }
        intro="From a two-bedroom near the metro to eight acres of vines — counts below are live from our current book."
      />
      <Reveal className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[230px]">
        {tiles.map((t, i) => (
          <Link
            key={t.label}
            href={t.href}
            className={cn("group relative isolate overflow-hidden rounded-media", layout[i])}
          >
            <SmartImage
              src={t.image}
              alt={t.alt}
              sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
              wrapperClassName="absolute inset-0 -z-10"
              className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgb(var(--scrim)/0.72)] via-[rgb(var(--scrim)/0.12)] to-transparent" />
            <div className="flex h-full flex-col justify-end p-4 text-white sm:p-6">
              <p className="eyebrow text-[10px] text-white/85">
                {t.count} {t.count === 1 ? "listing" : "listings"}
              </p>
              <p className={cn("mt-1 flex items-center gap-2 font-display leading-none", i === 0 ? "text-[34px] sm:text-[44px]" : "text-[24px] sm:text-[28px]")}>
                {t.label}
                <ArrowUpRight strokeWidth={1.25} className="size-5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </p>
              {(i === 0 || i === 4) && <p className="mt-2 hidden max-w-xs text-[13px] text-white/85 sm:block">{t.note}</p>}
            </div>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}
