import { ArrowUpRight } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";

export function CtaBand({
  title = (
    <>
      Not sure where to start? <em className="font-light italic">Talk to an advisor.</em>
    </>
  ),
  text = "Tell us what you need in a sentence or two. A senior advisor in your city will call within two working hours — no obligation, no spam.",
}: {
  title?: React.ReactNode;
  text?: string;
}) {
  return (
    <section className="container-x py-16 lg:py-20">
      <div className="grain relative overflow-hidden rounded-media bg-primary px-6 py-14 text-primary-ink sm:px-12 lg:grid lg:grid-cols-12 lg:items-end lg:gap-10 lg:px-16 lg:py-20 [--grain-opacity:0.12]">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full border border-primary-ink/15" />
        <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 size-48 rounded-full border border-primary-ink/10" />
        <h2 className="relative text-[36px] leading-[1.04] sm:text-[48px] lg:col-span-7 lg:text-[60px]">{title}</h2>
        <div className="relative mt-8 lg:col-span-5 lg:mt-0">
          <p className="max-w-md text-[15px] leading-relaxed opacity-85">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/enquire" variant="inverse" size="lg">
              Enquire now
              <ArrowUpRight strokeWidth={1.5} className="size-4" />
            </ButtonLink>
            <ButtonAnchor
              href={whatsappLink("Hello Sukh, I'd like to speak to an advisor.")}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="rounded-chip border border-primary-ink/40 text-primary-ink hover:bg-primary-ink/10"
              variant="ghost"
            >
              <WhatsAppIcon className="size-4" />
              WhatsApp us
            </ButtonAnchor>
          </div>
        </div>
      </div>
    </section>
  );
}
