"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Phone } from "lucide-react";
import { whatsappLink } from "@/data/site";
import type { Property } from "@/data/types";
import { formatCompactINR, formatINR, formatPrice, listingLabel } from "@/lib/format";
import { priceNote } from "@/lib/specs";
import { useOrigin } from "@/lib/useOrigin";
import { SmartImage } from "@/components/ui/SmartImage";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { controlClass } from "@/components/ui/Field";
import { cn } from "@/lib/cn";

function waText(p: Property, url: string) {
  return `Hello ${p.advisor.name.split(" ")[0]}, I'm interested in "${p.title}" (${p.locality}, ${p.city}) — ${formatPrice(p.price, p.listingType)}. ${url}`;
}

export function EnquiryCard({ property: p }: { property: Property }) {
  const router = useRouter();
  const id = useId();
  const origin = useOrigin();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const note = priceNote(p);
  const url = `${origin}/properties/${p.slug}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
    if (name.trim().length < 2) return setError("Please tell us your name.");
    if (!/^[6-9]\d{9}$/.test(digits)) return setError("Enter a 10-digit Indian mobile number.");
    const q = new URLSearchParams({ property: p.slug, name: name.trim(), phone: digits });
    router.push(`/enquire?${q.toString()}`);
  };

  return (
    <div className="rounded-card border border-line bg-surface p-6 shadow-soft">
      <p className="eyebrow text-ink-muted">{listingLabel[p.listingType]}</p>
      <p className="mt-2 font-display text-[40px] leading-none tracking-[-0.02em] tabular text-ink">{formatPrice(p.price, p.listingType)}</p>
      <dl className="mt-3 space-y-1 text-[13px] text-ink-muted">
        {note && <div className="tabular">{note}</div>}
        {p.maintenance && (
          <div className="flex justify-between">
            <dt>Maintenance</dt>
            <dd className="tabular text-ink">₹{formatINR(p.maintenance)}/mo</dd>
          </div>
        )}
        {p.securityDeposit && (
          <div className="flex justify-between">
            <dt>Security deposit</dt>
            <dd className="tabular text-ink">{formatCompactINR(p.securityDeposit)}</dd>
          </div>
        )}
      </dl>

      <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <SmartImage src={p.advisor.photo} alt={`${p.advisor.name}, your Sukh advisor`} sizes="48px" wrapperClassName="size-12 shrink-0 rounded-full" />
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-ink">{p.advisor.name}</p>
          <p className="text-[12px] text-ink-muted">Your advisor for this property · replies in ~2 hrs</p>
        </div>
      </div>

      <form onSubmit={submit} noValidate className="mt-5 space-y-3" aria-label="Request a callback">
        <p className="text-[13px] font-semibold text-ink">Request a callback</p>
        <div>
          <label htmlFor={`${id}-n`} className="sr-only">
            Your name
          </label>
          <input id={`${id}-n`} autoComplete="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className={cn(controlClass, "min-h-11")} />
        </div>
        <div className="flex">
          <span className="inline-flex items-center rounded-l-chip border border-r-0 border-line bg-surface-2 px-3 text-[14px] tabular text-ink-muted">+91</span>
          <label htmlFor={`${id}-p`} className="sr-only">
            Mobile number
          </label>
          <input
            id={`${id}-p`}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="Mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-e` : undefined}
            className={cn(controlClass, "min-h-11 rounded-l-none tabular")}
          />
        </div>
        {error && (
          <p id={`${id}-e`} role="alert" className="text-[13px] text-danger">
            {error}
          </p>
        )}
        <button type="submit" className="inline-flex h-12 w-full items-center justify-center rounded-chip bg-primary text-sm font-semibold text-primary-ink transition-colors hover:bg-[color-mix(in_oklab,var(--primary)_88%,var(--ink))]">
          Continue to enquiry
        </button>
      </form>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <a href={whatsappLink(waText(p, url))} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-chip border border-line text-[13px] font-semibold text-ink hover:border-ink/40">
          <WhatsAppIcon className="size-4" /> WhatsApp
        </a>
        <a href={`tel:${p.advisor.phone.replace(/\s/g, "")}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-chip border border-line text-[13px] font-semibold text-ink hover:border-ink/40">
          <Phone strokeWidth={1.5} className="size-4" /> Call
        </a>
      </div>
    </div>
  );
}

/** Mobile sticky action bar — reserves space for floating buttons via --dock. */
export function MobileActionBar({ property: p }: { property: Property }) {
  const origin = useOrigin();
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--dock", "76px");
    return () => root.style.setProperty("--dock", "0px");
  }, []);
  const btn = "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-chip text-[14px] font-semibold";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <div className="container-x flex h-[76px] items-center gap-2">
        <div className="mr-1 hidden min-w-0 sm:block">
          <p className="font-display text-[22px] leading-none tabular">{formatPrice(p.price, p.listingType)}</p>
          <p className="truncate text-[12px] text-ink-muted">{p.locality}</p>
        </div>
        <a href={`tel:${p.advisor.phone.replace(/\s/g, "")}`} className={cn(btn, "border border-line text-ink")} aria-label={`Call ${p.advisor.name}`}>
          <Phone strokeWidth={1.5} className="size-4" /> Call
        </a>
        <a href={whatsappLink(waText(p, `${origin}/properties/${p.slug}`))} target="_blank" rel="noopener noreferrer" className={cn(btn, "border border-line text-ink")}>
          <WhatsAppIcon className="size-4" /> WhatsApp
        </a>
        <a href={`/enquire?property=${p.slug}`} className={cn(btn, "bg-primary text-primary-ink")}>
          Enquire
        </a>
      </div>
    </div>
  );
}
