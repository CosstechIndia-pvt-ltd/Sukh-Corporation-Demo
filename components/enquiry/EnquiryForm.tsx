"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import { ArrowUpRight, CheckCircle2, Clock, LoaderCircle, Mail, MapPin, Phone } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/cn";
import { BUDGETS, CONTACT_METHODS, INTENTS, enquirySchema, makeReference, todayISO, type EnquiryData, type EnquiryInput } from "@/lib/enquiry";
import { formatDate, formatPrice } from "@/lib/format";
import type { ListingLite } from "@/lib/nav";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";

const noop = () => () => {};

function intentFor(l?: ListingLite): EnquiryInput["intent"] | undefined {
  if (!l) return undefined;
  return l.listingType === "sale" ? "Buy" : l.listingType === "rent" ? "Rent" : "Lease";
}

export function EnquiryForm({ listings, cities }: { listings: ListingLite[]; cities: string[] }) {
  const params = useSearchParams();
  const slugs = (params.get("property") ?? "").split(",").filter(Boolean);
  const selected = slugs.map((s) => listings.find((l) => l.slug === s)).filter((x): x is ListingLite => Boolean(x));
  const today = useSyncExternalStore(noop, () => todayISO(), () => "2026-11-05");
  const [sent, setSent] = useState<{ ref: string; data: EnquiryData } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput, unknown, EnquiryData>({
    resolver: zodResolver(enquirySchema),
    shouldFocusError: true,
    defaultValues: {
      fullName: params.get("name") ?? "",
      mobile: params.get("phone") ?? "",
      email: "",
      intent: intentFor(selected[0]),
      property: selected.map((l) => `${l.title} (${l.id})`).join("; "),
      budget: "",
      city: selected[0]?.city ?? "",
      contactMethod: "Call",
      visitDate: "",
      message: "",
      consent: false,
    },
  });

  useEffect(() => {
    if (params.get("name") && params.get("phone")) setFocus("email");
  }, [params, setFocus]);

  useEffect(() => {
    if (sent) {
      headingRef.current?.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [sent]);

  const onSubmit = async (data: EnquiryData) => {
    await new Promise((r) => setTimeout(r, 900));
    const ref = makeReference();
    try {
      const prev = JSON.parse(localStorage.getItem("sukh-enquiries") ?? "[]") as unknown[];
      localStorage.setItem("sukh-enquiries", JSON.stringify([{ ref, at: new Date().toISOString(), ...data }, ...prev].slice(0, 20)));
    } catch {
      /* storage unavailable — the enquiry is still shown */
    }
    setSent({ ref, data });
  };

  const err = (k: keyof EnquiryInput) => errors[k]?.message as string | undefined;
  const aria = (k: keyof EnquiryInput) => ({
    "aria-invalid": Boolean(errors[k]),
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  if (sent) return <Success ref_={sent.ref} data={sent.data} headingRef={headingRef} selected={selected} />;

  return (
    <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
      <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Enquiry form" className="space-y-10">
        <fieldset className="space-y-6">
          <legend className="eyebrow mb-6 text-ink-muted">01 · About you</legend>
          <Field label="Full name" htmlFor="fullName" error={err("fullName")}>
            <Input id="fullName" autoComplete="name" {...register("fullName")} {...aria("fullName")} />
          </Field>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Mobile number" htmlFor="mobile" error={err("mobile")} hint="10 digits, Indian mobile">
              <div className="flex">
                <span className="inline-flex items-center rounded-l-chip border border-r-0 border-line bg-surface-2 px-3.5 text-[15px] tabular text-ink-muted">+91</span>
                <Input id="mobile" type="tel" inputMode="numeric" autoComplete="tel-national" className="rounded-l-none tabular" {...register("mobile")} {...aria("mobile")} />
              </div>
            </Field>
            <Field label="Email" htmlFor="email" error={err("email")}>
              <Input id="email" type="email" autoComplete="email" {...register("email")} {...aria("email")} />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-6">
          <legend className="eyebrow mb-6 text-ink-muted">02 · What you need</legend>
          <div>
            <p id="intent-label" className="mb-3 text-[13px] font-semibold">I want to</p>
            <div role="radiogroup" aria-labelledby="intent-label" aria-describedby={errors.intent ? "intent-error" : undefined} className="flex flex-wrap gap-2">
              {INTENTS.map((i) => (
                <label key={i} className="relative cursor-pointer">
                  <input type="radio" value={i} {...register("intent")} className="peer sr-only" />
                  <span className="inline-flex min-h-11 items-center rounded-chip border border-line bg-surface px-4 text-[14px] font-medium transition-colors hover:border-ink/40 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">
                    {i}
                  </span>
                </label>
              ))}
            </div>
            {err("intent") && <p id="intent-error" role="alert" className="mt-2 text-[13px] text-danger">{err("intent")}</p>}
          </div>
          <Field label="Property of interest" htmlFor="property" optional hint="Prefilled when you come from a listing.">
            <Input id="property" placeholder="e.g. 2 BHK in Baner, or an office near Gachibowli" {...register("property")} />
          </Field>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Budget" htmlFor="budget" error={err("budget")}>
              <Select id="budget" {...register("budget")} {...aria("budget")}>
                <option value="">Select a range</option>
                {BUDGETS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </Select>
            </Field>
            <Field label="Preferred city" htmlFor="city" error={err("city")}>
              <Select id="city" {...register("city")} {...aria("city")}>
                <option value="">Select a city</option>
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
                <option>Other / open to suggestions</option>
              </Select>
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-6">
          <legend className="eyebrow mb-6 text-ink-muted">03 · How we follow up</legend>
          <div>
            <p id="cm-label" className="mb-3 text-[13px] font-semibold">Preferred contact</p>
            <div role="radiogroup" aria-labelledby="cm-label" className="grid grid-cols-3 gap-2">
              {CONTACT_METHODS.map((m) => {
                const Icon = m === "Call" ? Phone : m === "Email" ? Mail : WhatsAppIcon;
                return (
                  <label key={m} className="cursor-pointer">
                    <input type="radio" value={m} {...register("contactMethod")} className="peer sr-only" />
                    <span className="flex min-h-12 items-center justify-center gap-2 rounded-chip border border-line bg-surface text-[14px] font-medium transition-colors hover:border-ink/40 peer-checked:border-primary peer-checked:bg-accent-2 peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">
                      <Icon strokeWidth={1.5} className="size-4" />
                      {m}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
          <Field label="Preferred site-visit date" htmlFor="visitDate" optional error={err("visitDate")} hint="We confirm the time by phone.">
            <Input id="visitDate" type="date" min={today} className="tabular" {...register("visitDate")} {...aria("visitDate")} />
          </Field>
          <Field label="Anything else we should know?" htmlFor="message" optional error={err("message")}>
            <Textarea id="message" placeholder="Schools you need nearby, move-in date, parking, pets — the specifics help." {...register("message")} {...aria("message")} />
          </Field>
          <div>
            <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed">
              <input
                type="checkbox"
                {...register("consent")}
                {...aria("consent")}
                className="mt-1 size-[18px] shrink-0 cursor-pointer appearance-none rounded-[4px] border border-ink/30 bg-surface bg-center bg-no-repeat checked:border-primary checked:bg-primary checked:bg-[url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2.2'><path d='M3.5 8.5l3 3 6-7'/></svg>&quot;)]"
              />
              <span>
                I agree to be contacted by a Sukh advisor about this enquiry by call, WhatsApp or email. We never share your details with developers or other agents.
              </span>
            </label>
            {err("consent") && <p id="consent-error" role="alert" className="mt-2 text-[13px] text-danger">{err("consent")}</p>}
          </div>
        </fieldset>

        <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-[13px] text-ink-muted">
            <Clock strokeWidth={1.5} className="size-4" aria-hidden />
            {site.responsePromise}
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-13 min-w-48 items-center justify-center gap-2 rounded-chip bg-primary px-8 text-[15px] font-semibold text-primary-ink transition-colors hover:bg-[color-mix(in_oklab,var(--primary)_88%,var(--ink))] disabled:opacity-80"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle strokeWidth={1.5} className="size-4 animate-spin" aria-hidden />
                Sending…
              </>
            ) : (
              "Send enquiry"
            )}
          </button>
        </div>
        <p className="sr-only" aria-live="assertive">
          {Object.keys(errors).length ? `${Object.keys(errors).length} fields need attention.` : ""}
        </p>
      </form>

      <aside className="lg:pt-10">
        <div className="lg:sticky lg:top-28">{selected.length ? <SelectedProperties items={selected} /> : <ContactDetails />}</div>
      </aside>
    </div>
  );
}

function SelectedProperties({ items }: { items: ListingLite[] }) {
  return (
    <div>
      <p className="eyebrow mb-5 text-ink-muted">You&rsquo;re asking about {items.length > 1 ? `${items.length} properties` : ""}</p>
      <ul className="space-y-4">
        {items.map((l, i) => (
          <li key={l.id} className="overflow-hidden rounded-card border border-line bg-surface">
            {i === 0 && items.length === 1 && (
              <div className="relative aspect-[16/10]">
                <Image src={l.image} alt={l.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
              </div>
            )}
            <div className={cn("flex gap-4 p-5", items.length > 1 && "items-center")}>
              {items.length > 1 && (
                <div className="relative size-16 shrink-0 overflow-hidden rounded-chip">
                  <Image src={l.image} alt={l.alt} fill sizes="64px" className="object-cover" />
                </div>
              )}
              <div className="min-w-0">
                <p className="font-display text-[24px] leading-none tabular">{formatPrice(l.price, l.listingType)}</p>
                <p className="mt-2 text-[14px] font-semibold leading-snug">{l.title}</p>
                <p className="text-[13px] text-ink-muted">
                  {l.locality}, {l.city}
                </p>
                <Link href={`/properties/${l.slug}`} className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold underline decoration-line underline-offset-4 hover:decoration-ink">
                  View listing <ArrowUpRight strokeWidth={1.5} className="size-3.5" />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 flex items-start gap-2 text-[13px] leading-relaxed text-ink-muted">
        <Clock strokeWidth={1.5} className="mt-0.5 size-4 shrink-0" aria-hidden />
        {site.responsePromise} The advisor who handles {items.length > 1 ? "these listings" : "this listing"} will be the one who calls.
      </p>
    </div>
  );
}

function ContactDetails() {
  return (
    <div className="space-y-10">
      <div className="rounded-card bg-accent-2 p-6">
        <p className="eyebrow text-ink-muted">Response time</p>
        <p className="mt-3 font-display text-[28px] leading-tight">{site.responsePromise}</p>
        <p className="mt-2 text-[13px] text-ink-muted">{site.hours}. Enquiries after hours are returned by 10:30 am the next working day.</p>
      </div>
      <dl className="space-y-4 text-[15px]">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <dt className="text-ink-muted">Call</dt>
          <dd><a href={`tel:${site.phone.tel}`} className="font-semibold tabular hover:text-primary">{site.phone.display}</a></dd>
        </div>
        <div className="flex items-center justify-between border-b border-line pb-4">
          <dt className="text-ink-muted">WhatsApp</dt>
          <dd><a href={whatsappLink("Hello Sukh, I'd like to speak to an advisor.")} target="_blank" rel="noopener noreferrer" className="font-semibold tabular hover:text-primary">{site.whatsapp.display}</a></dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
          <dt className="text-ink-muted">Email</dt>
          <dd><a href={`mailto:${site.email}`} className="break-all font-semibold hover:text-primary">{site.email}</a></dd>
        </div>
      </dl>
      <div>
        <p className="eyebrow mb-4 text-ink-muted">Offices</p>
        <ul className="space-y-5">
          {site.offices.map((o) => (
            <li key={o.city} className="flex gap-3 text-[14px] leading-relaxed">
              <MapPin strokeWidth={1.5} className="mt-1 size-4 shrink-0 text-ink-muted" aria-hidden />
              <span>
                <span className="font-semibold">{o.city}</span> <span className="text-ink-muted">· {o.label}</span>
                <span className="block text-ink-muted">{o.address}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Success({
  ref_,
  data,
  headingRef,
  selected,
}: {
  ref_: string;
  data: EnquiryData;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  selected: ListingLite[];
}) {
  const rows: [string, string | undefined][] = [
    ["Name", data.fullName],
    ["Mobile", `+91 ${data.mobile.slice(0, 5)} ${data.mobile.slice(5)}`],
    ["Email", data.email],
    ["Looking to", data.intent],
    ["Property", data.property || undefined],
    ["Budget", data.budget],
    ["City", data.city],
    ["Contact by", data.contactMethod],
    ["Site visit", data.visitDate ? formatDate(data.visitDate, { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : undefined],
    ["Message", data.message || undefined],
  ];
  const wa = `Hello Sukh, my enquiry reference is ${ref_}. ${data.property ? `I'm interested in ${data.property}. ` : ""}— ${data.fullName}`;
  return (
    <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
      <div>
        <CheckCircle2 strokeWidth={1.25} className="size-12 text-success" aria-hidden />
        <h2 ref={headingRef} tabIndex={-1} className="mt-6 text-[40px] leading-[1.04] focus:outline-none sm:text-[56px]">
          Thank you, {data.fullName.split(" ")[0]}. <em className="font-light italic">We&rsquo;ve got it.</em>
        </h2>
        <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink-muted">
          Your reference number is <span className="font-semibold tabular text-ink">{ref_}</span>. {site.responsePromise}
        </p>
        <ol className="mt-10 border-t border-line">
          {[
            ["Within 2 working hours", `An advisor ${data.contactMethod === "Email" ? "emails" : data.contactMethod === "WhatsApp" ? "messages you on WhatsApp" : "calls"} to understand what matters to you.`],
            ["Within 2 days", "You receive a written shortlist, with title summaries for each property."],
            ["When you’re ready", data.visitDate ? `We confirm your site visit for ${formatDate(data.visitDate, { day: "numeric", month: "long" })}.` : "We schedule site visits at times that suit your commute."],
          ].map(([t, d], i) => (
            <li key={t} className="grid grid-cols-[48px_1fr] gap-3 border-b border-line py-5">
              <span className="font-display text-[22px] tabular text-highlight-ink">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-semibold">{t}</p>
                <p className="text-[14px] text-ink-muted">{d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonAnchor href={whatsappLink(wa)} target="_blank" rel="noopener noreferrer" size="lg">
            <WhatsAppIcon className="size-4" />
            Continue on WhatsApp
          </ButtonAnchor>
          <ButtonLink href={selected[0] ? `/properties/${selected[0].slug}` : "/properties"} variant="secondary" size="lg">
            {selected[0] ? "Back to the listing" : "Keep browsing"}
          </ButtonLink>
        </div>
      </div>
      <aside className="rounded-card border border-line bg-surface p-6 sm:p-8 lg:self-start">
        <p className="eyebrow text-ink-muted">What you sent</p>
        <dl className="mt-5">
          {rows
            .filter((r): r is [string, string] => Boolean(r[1]))
            .map(([k, v]) => (
              <div key={k} className="grid grid-cols-[110px_1fr] gap-3 border-b border-line py-3 text-[14px] last:border-0">
                <dt className="text-ink-muted">{k}</dt>
                <dd className="break-words">{v}</dd>
              </div>
            ))}
        </dl>
      </aside>
    </div>
  );
}
