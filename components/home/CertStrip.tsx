import Link from "next/link";
import { CertBadge } from "@/components/ui/CertBadge";

const items = [
  { kind: "rera", label: "RERA registered", sub: "MH · KA · TS · HR · GJ" },
  { kind: "iso", label: "ISO 9001:2015", sub: "Quality management" },
  { kind: "credai", label: "CREDAI member", sub: "MCHI chapter" },
  { kind: "igbc", label: "IGBC Green AP", sub: "4 accredited advisors" },
] as const;

export function CertStrip() {
  return (
    <section aria-label="Certifications" className="border-y border-line bg-surface">
      <div className="container-x flex flex-col gap-8 py-12 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-[240px] font-display text-[22px] leading-tight">
          Registered, audited and <em className="italic">accountable.</em>
        </p>
        <ul className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
          {items.map((c) => (
            <li key={c.kind} className="flex items-center gap-4 text-ink-muted">
              <CertBadge kind={c.kind} className="size-14 shrink-0 text-ink/70" />
              <div>
                <p className="text-[13px] font-semibold text-ink">{c.label}</p>
                <p className="text-[12px]">{c.sub}</p>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/about#certifications" className="text-[13px] font-semibold underline decoration-line underline-offset-4 hover:decoration-ink">
          View certificates
        </Link>
      </div>
    </section>
  );
}
