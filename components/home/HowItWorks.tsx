import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { title: "Shortlist", time: "Day 1–3", text: "A 20-minute call, then a written shortlist of three to five properties — with the reasons we left others out." },
  { title: "Site visit", time: "Week 1", text: "Your advisor visits with you, at the hour you would actually commute. We bring the floor plan and the title summary." },
  { title: "Documentation", time: "Week 2–4", text: "Agreement drafted by our legal desk, loan paperwork coordinated, stamp duty and registration fees calculated to the rupee." },
  { title: "Handover", time: "Registration day", text: "We walk the property with you before keys change hands, and check meters, society NOC and utility transfers." },
];

export function HowItWorks() {
  return (
    <section className="container-x py-20 lg:py-28">
      <SectionHeading eyebrow="How it works" title="Four steps, one advisor." intro="A typical purchase closes in four to six weeks; a rental in about ten days." />
      <Reveal>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          <span aria-hidden className="absolute left-[11px] top-3 h-[calc(100%-24px)] w-px bg-line md:left-0 md:right-0 md:top-[11px] md:h-px md:w-auto" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative grid grid-cols-[24px_1fr] gap-5 md:block">
              <span className="relative z-10 flex size-6 items-center justify-center rounded-full border border-highlight bg-bg" aria-hidden>
                <span className="size-2 rounded-full bg-primary" />
              </span>
              <div className="md:mt-8 md:pr-6">
                <p className="eyebrow text-ink-muted">
                  Step {String(i + 1).padStart(2, "0")} · {s.time}
                </p>
                <h3 className="mt-3 text-[26px] leading-none sm:text-[30px]">{s.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
