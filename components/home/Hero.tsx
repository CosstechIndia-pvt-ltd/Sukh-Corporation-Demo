import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Property } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { unsplash } from "@/lib/images";
import { HeroSearch } from "@/components/search/HeroSearch";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

export function Hero({ cities, spotlight }: { cities: string[]; spotlight: Property }) {
  return (
    <section className="grain -mt-[76px] overflow-hidden pt-[76px] lg:-mt-[88px] lg:pt-[88px]">
      <div className="container-x grid grid-cols-1 gap-x-10 pb-16 pt-8 lg:grid-cols-12 lg:pb-24 lg:pt-12">
        <div className="lg:col-span-6 lg:row-start-1 lg:pr-4 lg:pt-10">
          <Eyebrow>Est. 2004 · 12 cities</Eyebrow>
          <h1 className="mt-6 text-[44px] leading-[1.02] tracking-[-0.03em] sm:text-[60px] lg:text-[76px] xl:text-[84px]">
            Homes, offices and land —{" "}
            <em className="font-light italic text-primary">chosen with care.</em>
          </h1>
          <p className="mt-6 max-w-[440px] text-base leading-relaxed text-ink-muted sm:text-[17px]">
            Thirty listings we would put our own name to, across twelve cities. One advisor stays with you from the first call to registration.
          </p>
        </div>

        <div className="relative mt-10 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:mt-0">
          <SmartImage
            src={unsplash("1600585154340-be6161a56a0c", { w: 1600 })}
            alt="A glass-fronted contemporary home at dusk, lights on inside"
            priority
            quality={70}
            sizes="(min-width: 1024px) 50vw, calc(100vw - 32px)"
            wrapperClassName="aspect-[4/5] w-full rounded-media sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[640px]"
          />
          <Link
            href={`/properties/${spotlight.slug}`}
            className="group absolute right-4 top-4 hidden max-w-[280px] rounded-card border border-line bg-surface/95 p-4 shadow-float backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 sm:block lg:-left-10 lg:right-auto lg:top-12"
          >
            <p className="eyebrow text-[10px] text-ink-muted">Featured this week</p>
            <p className="mt-2 font-display text-[26px] leading-none tabular text-ink">{formatPrice(spotlight.price, spotlight.listingType)}</p>
            <p className="mt-2 text-[13px] font-semibold leading-snug text-ink">{spotlight.title}</p>
            <p className="mt-0.5 flex items-center justify-between text-[12px] text-ink-muted">
              {spotlight.locality}, {spotlight.city}
              <ArrowUpRight strokeWidth={1.5} className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </p>
          </Link>
        </div>

        <div className="relative z-10 -mt-24 px-2 sm:-mt-28 sm:px-6 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:-mr-28 lg:mt-12 lg:self-end lg:px-0">
          <HeroSearch cities={cities} />
        </div>
      </div>
    </section>
  );
}
