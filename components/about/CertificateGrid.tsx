"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Certification } from "@/data/certifications";
import { formatDate } from "@/lib/format";
import { CertBadge } from "@/components/ui/CertBadge";
import { Monogram } from "@/components/ui/Brand";
import { DialogContent, DialogRoot } from "@/components/ui/Dialog";

export function CertificateGrid({ items }: { items: Certification[] }) {
  const [active, setActive] = useState<Certification | null>(null);
  return (
    <>
      <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {items.map((c) => (
          <li key={c.id} className="bg-surface">
            <button type="button" onClick={() => setActive(c)} className="group flex h-full w-full flex-col p-6 text-left transition-colors hover:bg-accent-2/60">
              <CertBadge kind={c.kind} className="size-14 text-ink/70" />
              <p className="mt-6 text-[15px] font-semibold leading-snug">{c.title}</p>
              <p className="mt-1 text-[13px] text-ink-muted">{c.issuer}</p>
              <dl className="mt-auto grid w-full gap-3 pt-6 text-[12px]">
                <div className="min-w-0">
                  <dt className="text-ink-muted">Certificate no.</dt>
                  <dd className="mt-0.5 break-all font-semibold tabular">{c.number}</dd>
                </div>
                <div className="flex justify-between gap-3 border-t border-line pt-3">
                  <dt className="text-ink-muted">Valid till</dt>
                  <dd className="font-semibold tabular">{formatDate(c.validTill, { day: "numeric", month: "short", year: "numeric" })}</dd>
                </div>
              </dl>
              <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-semibold underline decoration-line underline-offset-4 group-hover:decoration-ink">
                View certificate <ArrowUpRight strokeWidth={1.5} className="size-3.5" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <DialogRoot open={Boolean(active)} onOpenChange={(v) => !v && setActive(null)}>
        {active && (
          <DialogContent title={active.title} description={active.issuer} className="max-w-3xl">
            <div className="p-4 sm:p-8">
              <div className="grain relative border border-line bg-surface-2 p-2 [--grain-opacity:0.1]">
                <div className="border border-highlight/60 px-6 py-10 text-center sm:px-14 sm:py-14">
                  <Monogram className="mx-auto size-10 text-ink" />
                  <p className="eyebrow mt-6 text-ink-muted">Certificate of {active.kind === "rera" ? "registration" : active.kind === "credai" ? "membership" : active.kind === "igbc" ? "accreditation" : "conformity"}</p>
                  <p className="mt-6 text-[14px] text-ink-muted">This is to certify that</p>
                  <p className="mt-2 font-display text-[30px] leading-tight sm:text-[38px]">Sukh Corporation Pvt. Ltd.</p>
                  <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-ink-muted">
                    has been {active.kind === "rera" ? "registered as a real estate agent" : active.kind === "credai" ? "admitted as an associate member" : active.kind === "igbc" ? "recognised for its accredited green-building professionals" : "assessed and found to conform to ISO 9001:2015"} — scope: {active.scope}.
                  </p>
                  <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-6 border-t border-line pt-6 text-left text-[12px]">
                    <div>
                      <p className="text-ink-muted">Certificate no.</p>
                      <p className="mt-1 break-all font-semibold tabular">{active.number}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-ink-muted">Valid till</p>
                      <p className="mt-1 font-semibold tabular">{formatDate(active.validTill, { day: "numeric", month: "long", year: "numeric" })}</p>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-center">
                    <CertBadge kind={active.kind} className="size-20 text-ink/60" />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-[12px] text-ink-muted">Specimen preview for this demo. Certificate numbers are fictional.</p>
            </div>
          </DialogContent>
        )}
      </DialogRoot>
    </>
  );
}
