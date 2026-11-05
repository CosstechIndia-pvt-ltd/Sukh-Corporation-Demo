import Link from "next/link";
import { cities } from "@/data/cities";
import { site } from "@/data/site";
import { Wordmark } from "@/components/ui/Brand";
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from "@/components/ui/Icons";

const socialIcon = { Instagram: InstagramIcon, LinkedIn: LinkedInIcon, YouTube: YouTubeIcon } as const;

const categories = [
  { label: "Apartments", href: "/properties?cat=residential&sub=Apartment" },
  { label: "Villas", href: "/properties?cat=residential&sub=Villa" },
  { label: "Office space", href: "/properties?cat=commercial&sub=Office%20Space" },
  { label: "Retail & showrooms", href: "/properties?cat=commercial" },
  { label: "Warehouses", href: "/properties?cat=commercial&sub=Warehouse" },
  { label: "Farmland", href: "/properties?cat=farmland" },
  { label: "Farmhouses", href: "/properties?cat=farmland&sub=Farmhouse" },
];

const quick = [
  { label: "Buy", href: "/properties?type=sale" },
  { label: "Rent", href: "/properties?type=rent" },
  { label: "Lease", href: "/properties?type=lease" },
  { label: "About Sukh", href: "/about" },
  { label: "Certifications", href: "/about#certifications" },
  { label: "Shortlist", href: "/shortlist" },
  { label: "Enquire", href: "/enquire" },
];

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow mb-5 font-sans text-ink-muted">{title}</h2>
      {children}
    </div>
  );
}

const linkCls = "inline-flex min-h-8 items-center text-[14px] text-ink transition-colors hover:text-primary";

export function Footer() {
  const year = 2026;
  return (
    <footer className="grain border-t border-line bg-surface-2">
      <div className="container-x pb-10 pt-16 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-md">
            <Wordmark />
            <p className="mt-8 font-display text-[28px] leading-[1.15] tracking-[-0.02em] text-ink">
              One advisor, from the first site visit to the day you get the keys.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-muted">
              Homes, offices and farmland across 12 Indian cities, every listing checked by our in-house legal desk before we show it to you.
            </p>
            <div className="mt-8 flex gap-1">
              {site.socials.map((s) => {
                const Icon = socialIcon[s.name as keyof typeof socialIcon];
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Sukh Corporation on ${s.name}`}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            <Col title="Explore">
              <ul>
                {quick.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
            <Col title="Categories">
              <ul>
                {categories.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
            <Col title="Cities">
              <ul className="columns-1">
                {cities.map((c) => (
                  <li key={c.name}>
                    <Link href={`/properties?city=${encodeURIComponent(c.name)}`} className={linkCls}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
            <Col title="Offices">
              <ul className="space-y-4">
                {site.offices.map((o) => (
                  <li key={o.city} className="text-[13px] leading-relaxed text-ink-muted">
                    <span className="block font-semibold text-ink">{o.city}</span>
                    {o.address}
                    <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="mt-0.5 block tabular text-ink hover:text-primary">
                      {o.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-line pt-8 text-[12.5px] leading-relaxed text-ink-muted lg:grid-cols-[2fr_1fr]">
          <p>
            <span className="font-semibold text-ink">RERA.</span> Sukh Corporation is registered as a real estate agent with MahaRERA (A51800004104), K-RERA, TS-RERA, HRERA and GujRERA. Project RERA numbers are shown on each listing. Prices, availability and specifications are indicative and subject to change; please verify all details before you transact.
          </p>
          <div className="flex flex-col gap-1 lg:items-end lg:text-right">
            <p>© {year} Sukh Corporation Pvt. Ltd. All rights reserved.</p>
            <p className="font-semibold text-ink">{site.disclaimer}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
