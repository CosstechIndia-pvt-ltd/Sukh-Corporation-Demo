import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export type CityCard = { name: string; state: string; count: number; from: string; image: string; alt: string; note: string };

export function CityGrid({ cities, more }: { cities: CityCard[]; more: CityCard[] }) {
  return (
    <section className="container-x py-20 lg:py-28">
      <SectionHeading
        eyebrow="Explore by city"
        title={
          <>
            Twelve cities, <em className="font-light italic">one standard.</em>
          </>
        }
        intro="Each office is run by people who live in the city — they know which lanes flood, which societies are well run, and what a fair price looks like."
      />
      <Reveal className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {cities.map((c, i) => (
          <Link key={c.name} href={`/properties?city=${encodeURIComponent(c.name)}`} className={cn("group block", i % 2 === 1 && "md:mt-12")}>
            <SmartImage
              src={c.image}
              alt={c.alt}
              sizes="(min-width: 768px) 25vw, 50vw"
              wrapperClassName="aspect-[3/4] rounded-card"
              className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="mt-4 flex items-baseline justify-between gap-2">
              <h3 className="text-[24px] leading-none sm:text-[28px]">{c.name}</h3>
              <span className="text-[12px] tabular text-ink-muted">{c.count}</span>
            </div>
            <p className="mt-1.5 text-[13px] text-ink-muted">{c.note}</p>
            <p className="mt-2 text-[13px] font-semibold tabular text-ink">From {c.from}</p>
          </Link>
        ))}
      </Reveal>
      <div className="mt-14 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line pt-6 text-[14px]">
        <span className="eyebrow text-ink-muted">Also in</span>
        {more.map((c) => (
          <Link key={c.name} href={`/properties?city=${encodeURIComponent(c.name)}`} className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
            {c.name} <span className="text-ink-muted tabular">({c.count})</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
