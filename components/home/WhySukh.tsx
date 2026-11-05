import { unsplash } from "@/lib/images";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";

const points = [
  {
    title: "Verified titles",
    text: "Our legal desk reads the title chain back at least 30 years — 7/12 extracts, mutation entries, encumbrance — before a listing goes live.",
  },
  {
    title: "RERA-compliant projects",
    text: "We list under-construction homes only when the project is RERA-registered and its quarterly progress filings are up to date.",
  },
  {
    title: "Single advisor, end to end",
    text: "The person who shows you the flat is the person who sits beside you at the sub-registrar’s office. No hand-offs, no call centre.",
  },
  {
    title: "Transparent pricing",
    text: "Our fee is fixed in writing before your first site visit — 1% on sales, one month’s rent on leases — and we never take money from both sides.",
  },
];

export function WhySukh() {
  return (
    <section className="grain border-t border-line bg-accent-2">
      <div className="container-x grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="relative lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SmartImage
              src={unsplash("1600607687939-ce8a6c25118c", { w: 1400 })}
              alt="A calm, light-filled living room with timber floors"
              sizes="(min-width: 1024px) 40vw, 100vw"
              wrapperClassName="aspect-[4/5] rounded-media"
            />
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-ink-muted">
              A Baner apartment our team declined to list in 2025 — the society&rsquo;s OC was pending. We list fewer homes so we can stand behind each one.
            </p>
          </div>
        </div>
        <div className="lg:col-span-7 lg:pt-8">
          <Eyebrow>Why Sukh</Eyebrow>
          <h2 className="mt-5 max-w-xl text-[34px] leading-[1.05] sm:text-[44px] lg:text-[52px]">
            Four promises we have kept <em className="font-light italic">since 2004.</em>
          </h2>
          <ol className="mt-12 border-t border-line">
            {points.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.05} className="grid grid-cols-[56px_1fr] gap-4 border-b border-line py-8 sm:grid-cols-[96px_1fr] sm:py-10">
                <span className="font-display text-[34px] font-light leading-none tabular text-highlight-ink sm:text-[48px]" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[24px] leading-tight sm:text-[30px]">{p.title}</h3>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
