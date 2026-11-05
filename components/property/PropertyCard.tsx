import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatPrice, listingLabel, timeAgo } from "@/lib/format";
import { cardSpecs, priceNote, type CardData } from "@/lib/specs";
import { Badge } from "@/components/ui/Badge";
import { CardCarousel } from "./CardCarousel";
import { CompareToggle } from "./CompareToggle";
import { ShortlistButton } from "./ShortlistButton";

export function PropertyCard({
  property: p,
  layout = "grid",
  priority,
  className,
}: {
  property: CardData;
  layout?: "grid" | "list";
  priority?: boolean;
  className?: string;
}) {
  const href = `/properties/${p.slug}`;
  const specs = cardSpecs(p);
  const note = priceNote(p);
  const list = layout === "list";

  return (
    <article
      className={cn(
        "group/card relative flex h-full rounded-card bg-surface transition-shadow duration-300 hover:shadow-soft",
        list ? "flex-col border border-line sm:flex-row" : "flex-col",
        className,
      )}
    >
      <div className={cn("relative z-10 shrink-0", list ? "sm:w-[42%]" : "")}>
        <CardCarousel
          images={p.images}
          href={href}
          priority={priority}
          sizes={list ? "(min-width: 1024px) 380px, (min-width: 640px) 42vw, 100vw" : "(min-width: 1280px) 400px, (min-width: 768px) 45vw, 100vw"}
          className={cn(
            "rounded-card",
            list ? "aspect-[4/3] sm:aspect-auto sm:h-full sm:min-h-64 sm:rounded-r-none" : "aspect-[4/3]",
          )}
        />
        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge tone={p.listingType === "sale" ? "plain" : "accent"}>{listingLabel[p.listingType]}</Badge>
          {p.featured && <Badge tone="solid">Featured</Badge>}
        </div>
        <ShortlistButton id={p.id} title={p.title} className="absolute right-3 top-3" />
      </div>

      <div className={cn("flex flex-1 flex-col", list ? "p-5 sm:p-6" : "px-1 pb-1 pt-5")}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <p className="font-display text-[28px] font-normal leading-none tracking-[-0.02em] tabular text-ink">
            {formatPrice(p.price, p.listingType)}
          </p>
          {note && <p className="shrink-0 text-[12px] tabular text-ink-muted">{note}</p>}
        </div>
        <h3 className="mt-3 font-sans text-[15px] font-semibold leading-snug tracking-normal text-ink">
          <Link href={href} className="line-clamp-2 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-has-[a:focus-visible]/card:underline">
            {p.title}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink-muted">
          {p.locality} · {p.city}
          {p.verified && (
            <span className="inline-flex items-center gap-1 text-ink" title="Title and documents verified by Sukh">
              <BadgeCheck strokeWidth={1.5} className="size-4 text-success" aria-hidden />
              <span className="sr-only">Verified</span>
            </span>
          )}
        </p>
        <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-3 text-[13px] text-ink">
          {specs.map((s, i) => (
            <li key={s} className="flex items-center gap-3 tabular">
              {i > 0 && <span aria-hidden className="size-1 rounded-full bg-highlight" />}
              {s}
            </li>
          ))}
        </ul>
        <div className="relative z-10 mt-auto flex items-center justify-between pt-3">
          <p className="text-[12px] text-ink-muted">{timeAgo(p.postedOn)}</p>
          <CompareToggle id={p.id} title={p.title} />
        </div>
      </div>
    </article>
  );
}
