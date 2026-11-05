import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, ChevronRight, MapPin, ShieldCheck } from "lucide-react";
import { getProperty, getSimilar, properties } from "@/data/properties";
import { formatDate, formatPrice, listingLabel, timeAgo } from "@/lib/format";
import { CATEGORY_LABEL } from "@/lib/filters";
import { toCardData } from "@/lib/specs";
import { AmenityList } from "@/components/property/AmenityList";
import { CompareToggle } from "@/components/property/CompareToggle";
import { EmiCalculator } from "@/components/property/EmiCalculator";
import { EnquiryCard, MobileActionBar } from "@/components/property/EnquiryCard";
import { Gallery } from "@/components/property/Gallery";
import { LocationMap } from "@/components/property/LocationMap";
import { NearbyList } from "@/components/property/NearbyList";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ReadMore } from "@/components/property/ReadMore";
import { ShareButton } from "@/components/property/ShareButton";
import { ShortlistButton } from "@/components/property/ShortlistButton";
import { SpecGrid } from "@/components/property/SpecGrid";
import { Badge } from "@/components/ui/Badge";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) return { title: "Property not found" };
  const title = `${p.title}, ${p.locality} — ${formatPrice(p.price, p.listingType)}`;
  const description = `${listingLabel[p.listingType]} in ${p.locality}, ${p.city}. ${p.highlights.slice(0, 2).join(". ")}.`;
  return {
    title,
    description,
    alternates: { canonical: `/properties/${p.slug}` },
    openGraph: { title, description, images: [{ url: p.images[0].src, width: 1800, height: 1200, alt: p.images[0].alt }] },
  };
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="rule-tick pt-8">
      <h2 id={id} className="mb-6 text-[28px] leading-tight sm:text-[32px]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function PropertyPage({ params }: Params) {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) notFound();
  const similar = getSimilar(p, 3).map(toCardData);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.title,
    description: p.description,
    image: p.images.map((i) => i.src),
    datePosted: p.postedOn,
    offers: { "@type": "Offer", price: p.price, priceCurrency: "INR" },
    address: { "@type": "PostalAddress", streetAddress: p.address, addressLocality: p.city, addressCountry: "IN" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x pb-28 pt-6 lg:pb-24">
        <nav aria-label="Breadcrumb" className="mb-6 overflow-hidden">
          <ol className="no-scrollbar flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-[13px] text-ink-muted">
            <li><Link href="/" className="hover:text-ink">Home</Link></li>
            <li aria-hidden><ChevronRight strokeWidth={1.5} className="size-3.5" /></li>
            <li><Link href="/properties" className="hover:text-ink">Properties</Link></li>
            <li aria-hidden><ChevronRight strokeWidth={1.5} className="size-3.5" /></li>
            <li><Link href={`/properties?cat=${p.category}`} className="hover:text-ink">{CATEGORY_LABEL[p.category]}</Link></li>
            <li aria-hidden><ChevronRight strokeWidth={1.5} className="size-3.5" /></li>
            <li><Link href={`/properties?city=${encodeURIComponent(p.city)}`} className="hover:text-ink">{p.city}</Link></li>
            <li aria-hidden><ChevronRight strokeWidth={1.5} className="size-3.5" /></li>
            <li aria-current="page" className="truncate text-ink">{p.title}</li>
          </ol>
        </nav>

        <Gallery images={p.images} title={p.title} />

        <div className="mt-8 grid gap-12 lg:mt-10 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div className="min-w-0 space-y-14">
            <header>
              <div className="flex flex-wrap gap-1.5">
                <Badge tone={p.listingType === "sale" ? "outline" : "accent"}>{listingLabel[p.listingType]}</Badge>
                <Badge tone="outline">{p.subType}</Badge>
                {p.verified && (
                  <Badge tone="outline" className="text-success">
                    <BadgeCheck strokeWidth={1.5} className="size-3.5" aria-hidden /> Verified
                  </Badge>
                )}
                {p.reraId && (
                  <Badge tone="outline">
                    <ShieldCheck strokeWidth={1.5} className="size-3.5" aria-hidden /> RERA
                  </Badge>
                )}
                {p.featured && <Badge tone="solid">Featured</Badge>}
              </div>
              <h1 className="mt-5 text-[36px] leading-[1.04] sm:text-[48px] lg:text-[56px]">{p.title}</h1>
              <p className="mt-4 flex items-start gap-2 text-[15px] text-ink-muted">
                <MapPin strokeWidth={1.5} className="mt-0.5 size-4 shrink-0" aria-hidden />
                {p.address}
              </p>
              <div className="mt-5 flex items-baseline gap-3 lg:hidden">
                <p className="font-display text-[36px] leading-none tabular">{formatPrice(p.price, p.listingType)}</p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <ShareButton title={p.title} />
                <ShortlistButton id={p.id} title={p.title} variant="outline" />
                <CompareToggle id={p.id} title={p.title} variant="outline" />
                <span className="ml-auto text-[12px] text-ink-muted">
                  {timeAgo(p.postedOn)} · ID {p.id}
                </span>
              </div>
            </header>

            <Section id="overview" title="Overview">
              <SpecGrid property={p} />
            </Section>

            <Section id="highlights" title="Why we like it">
              <ol className="grid gap-x-8 sm:grid-cols-2">
                {p.highlights.map((h, i) => (
                  <li key={h} className="flex gap-4 border-b border-line py-4">
                    <span className="font-display text-[20px] leading-none tabular text-highlight-ink" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] leading-snug">{h}</span>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="about" title="About this property">
              <ReadMore text={p.description} />
            </Section>

            <Section id="amenities" title={`Amenities · ${p.amenities.length}`}>
              <AmenityList amenities={p.amenities} />
            </Section>

            <Section id="location" title="Location">
              <LocationMap property={p} />
              <div className="mt-8">
                <NearbyList nearby={p.nearby} />
              </div>
            </Section>

            {p.listingType === "sale" && (
              <Section id="emi" title="EMI calculator">
                <EmiCalculator price={p.price} />
              </Section>
            )}

            <Section id="legal" title="RERA & legal">
              <dl className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
                {[
                  ["RERA registration", p.reraId ?? (p.category === "farmland" ? "Not applicable (agricultural / standalone)" : "Not applicable (completed before RERA)")],
                  ["Title status", p.verified ? "Clear — verified by Sukh legal desk" : "Verification in progress"],
                  ["Possession", p.possession === "Under construction" && p.possessionDate ? `Under construction · RERA date ${formatDate(p.possessionDate)}` : p.possession],
                  ["Listing reference", `${p.id} · posted ${formatDate(p.postedOn, { day: "numeric", month: "short", year: "numeric" })}`],
                ].map(([k, v]) => (
                  <div key={k} className="bg-surface p-5">
                    <dt className="text-[12px] text-ink-muted">{k}</dt>
                    <dd className="mt-1 break-words text-[14px] font-semibold tabular">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 max-w-[68ch] text-[13px] leading-relaxed text-ink-muted">
                We share the title report, encumbrance certificate and approved plans with serious buyers after a site visit. Please verify the RERA number on the state authority&rsquo;s website before you pay a booking amount.
              </p>
            </Section>
          </div>

          <aside aria-label="Enquire about this property" className="hidden lg:block">
            <div className="sticky top-24">
              <EnquiryCard property={p} />
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <section aria-labelledby="similar" className="mt-24 border-t border-line pt-14">
            <div className="flex items-end justify-between gap-6">
              <h2 id="similar" className="text-[32px] leading-tight sm:text-[40px]">
                Similar <em className="font-light italic">{CATEGORY_LABEL[p.category].toLowerCase()}</em> listings
              </h2>
              <Link href={`/properties?cat=${p.category}`} className="hidden shrink-0 text-[13px] font-semibold underline decoration-line underline-offset-4 hover:decoration-ink sm:inline">
                View all
              </Link>
            </div>
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s) => (
                <li key={s.id}>
                  <PropertyCard property={s} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <MobileActionBar property={p} />
    </>
  );
}
