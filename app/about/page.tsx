import type { Metadata } from "next";
import { awards, milestones, team } from "@/data/team";
import { certifications } from "@/data/certifications";
import { site } from "@/data/site";
import { unsplash } from "@/lib/images";
import { CertificateGrid } from "@/components/about/CertificateGrid";
import { CtaBand } from "@/components/home/CtaBand";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";

export const metadata: Metadata = {
  title: "About Sukh & our certifications",
  description: "Founded in Bandra in 2004, Sukh Corporation advises families and businesses on homes, offices and farmland across 12 cities. RERA-registered in five states, ISO 9001:2015 certified.",
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

export default function AboutPage() {
  return (
    <>
      <section className="grain">
        <div className="container-x grid gap-12 pb-20 pt-10 lg:grid-cols-12 lg:pb-28 lg:pt-16">
          <div className="lg:col-span-7">
            <Eyebrow>About Sukh · Since 2004</Eyebrow>
            <h1 className="mt-6 text-[42px] leading-[1.02] sm:text-[64px] lg:text-[76px]">
              We list fewer properties, <em className="font-light italic text-primary">so we can stand behind each one.</em>
            </h1>
          </div>
          <div className="flex flex-col justify-end gap-6 lg:col-span-4 lg:col-start-9">
            <p className="text-[17px] leading-relaxed text-ink-muted">
              Sukh began in 2004 as a two-desk office on Hill Road, Bandra. Twenty-two years later we work across twelve cities and three kinds of property, but the habit that built the firm hasn&rsquo;t changed: we read the paperwork before we show you the view.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-accent-2">
        <div className="container-x grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <SmartImage src={unsplash("1600566753190-17f0baa2a6c3", { w: 1200 })} alt="Timber and concrete house with a lawn, from one of our early mandates" sizes="(min-width: 1024px) 40vw, 100vw" wrapperClassName="aspect-[4/5] rounded-media" />
          </div>
          <figure className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            <Eyebrow>A note from the founder</Eyebrow>
            <blockquote className="mt-8 space-y-6 font-display text-[22px] font-light leading-[1.45] sm:text-[26px]">
              <p>
                &ldquo;My first client was a schoolteacher buying a one-room flat in Khar. She had saved for eleven years. I remember thinking that if the title was wrong, it wouldn&rsquo;t be a bad deal — it would be her whole life.
              </p>
              <p>
                That is still how we work. Every listing is read by a lawyer before an advisor sees it. Every client has one person who answers the phone. We would rather lose a sale than make one we have to apologise for.&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              <span className="flex size-14 items-center justify-center rounded-full bg-primary font-display text-[20px] text-primary-ink" aria-hidden>
                HS
              </span>
              <span>
                <span className="block font-semibold">Harpreet Sukhija</span>
                <span className="text-[13px] text-ink-muted">Founder &amp; Chairman</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="container-x py-20 lg:py-28">
        <SectionHeading eyebrow="Milestones" title={<>Twenty-two years, <em className="font-light italic">briefly.</em></>} />
        <ol className="mt-14 border-t border-line">
          {milestones.map((m) => (
            <Reveal as="li" key={m.year} className="grid gap-2 border-b border-line py-7 sm:grid-cols-[140px_1fr_1.4fr] sm:gap-8">
              <span className="font-display text-[34px] font-light leading-none tabular text-highlight-ink sm:text-[40px]">{m.year}</span>
              <h3 className="text-[22px] leading-tight sm:text-[24px]">{m.title}</h3>
              <p className="text-[15px] leading-relaxed text-ink-muted">{m.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section aria-label="Sukh in numbers" className="border-y border-line bg-surface">
        <dl className="container-x grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4">
          {[...site.stats.slice(0, 2), { value: "12", label: "cities, 4 regional offices" }, { value: "38", label: "advisors and lawyers" }].map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-2 text-[13px] text-ink-muted">{s.label}</dt>
              <dd className="font-display text-[40px] font-light leading-none tabular sm:text-[52px]">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-x py-20 lg:py-28">
        <SectionHeading eyebrow="Leadership" title="The people who sign off." intro="Each of them still takes client calls — usually the difficult ones." />
        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((t, i) => (
            <li key={t.name}>
              <div className={`grain flex aspect-[5/4] items-end justify-between rounded-card p-6 ${i % 3 === 0 ? "bg-primary text-primary-ink" : i % 3 === 1 ? "bg-accent text-ink" : "bg-accent-2 text-ink"}`}>
                <span className="font-display text-[88px] font-light leading-[0.8] tracking-[-0.04em]" aria-hidden>
                  {initials(t.name)}
                </span>
                <span className="eyebrow opacity-80">Since {t.since}</span>
              </div>
              <h3 className="mt-5 text-[26px] leading-tight">{t.name}</h3>
              <p className="mt-1 text-[13px] font-semibold text-ink-muted">{t.role}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{t.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="certifications" className="scroll-mt-24 border-t border-line bg-surface-2 py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading eyebrow={`Certifications · ${certifications.length}`} title={<>Registered, audited, <em className="font-light italic">accountable.</em></>} intro="Our RERA agent registrations by state, our quality certification and our professional memberships. Select any card to view the certificate." />
          <div className="mt-12">
            <CertificateGrid items={certifications} />
          </div>
        </div>
      </section>

      <section className="container-x grid gap-16 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <Eyebrow>Awards &amp; recognition</Eyebrow>
          <ul className="mt-8 border-t border-line">
            {awards.map((a) => (
              <li key={a.title} className="grid grid-cols-[64px_1fr] gap-4 border-b border-line py-5">
                <span className="tabular text-[14px] text-ink-muted">{a.year}</span>
                <span>
                  <span className="block text-[16px] font-semibold">{a.title}</span>
                  <span className="text-[13px] text-ink-muted">{a.by}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Eyebrow>Offices</Eyebrow>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
            {site.offices.map((o) => (
              <li key={o.city} className="bg-surface p-5">
                <p className="font-display text-[24px] leading-none">{o.city}</p>
                <p className="eyebrow mt-2 text-[10px] text-ink-muted">{o.label}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">{o.address}</p>
                <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="mt-2 inline-block text-[13px] font-semibold tabular hover:text-primary">
                  {o.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={<>Have a property in mind? <em className="font-light italic">Start with a call.</em></>} />
    </>
  );
}
