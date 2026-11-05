import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";

export default function NotFound() {
  return (
    <section className="grain">
      <div className="container-x grid min-h-[70dvh] items-center gap-12 py-20 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Eyebrow>Error 404 · Page not found</Eyebrow>
          <h1 className="mt-6 text-[48px] leading-[1.02] sm:text-[72px]">
            This address <em className="font-normal italic text-primary">isn&rsquo;t</em> on our books.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted">
            The listing may have been sold or let, or the link was mistyped. Our current properties are a click away.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/properties" size="lg">
              Browse properties
            </ButtonLink>
            <ButtonLink href="/enquire" variant="secondary" size="lg">
              Ask an advisor
            </ButtonLink>
          </div>
        </div>
        <div aria-hidden className="hidden select-none justify-end lg:flex">
          <span className="font-display text-[220px] font-light leading-none tracking-[-0.06em] text-accent">404</span>
        </div>
      </div>
      <p className="sr-only">
        <Link href="/">Return home</Link>
      </p>
    </section>
  );
}
