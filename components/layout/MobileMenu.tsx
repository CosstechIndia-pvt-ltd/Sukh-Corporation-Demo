"use client";

import * as RD from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ChevronDown, Phone, X } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/cn";
import type { NavData } from "@/lib/nav";
import { Wordmark } from "@/components/ui/Brand";
import { WhatsAppIcon } from "@/components/ui/Icons";

export function MobileMenu({ open, onOpenChange, nav }: { open: boolean; onOpenChange: (v: boolean) => void; nav: NavData }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const close = () => onOpenChange(false);

  return (
    <RD.Root open={open} onOpenChange={onOpenChange}>
      <RD.Portal>
        <RD.Content className="anim-overlay grain fixed inset-0 z-[85] flex flex-col overflow-y-auto bg-bg focus:outline-none">
          <RD.Title className="sr-only">Menu</RD.Title>
          <RD.Description className="sr-only">Site navigation</RD.Description>
          <div className="container-x flex h-[76px] shrink-0 items-center justify-between">
            <Link href="/" onClick={close}>
              <Wordmark />
              <span className="sr-only"> — home</span>
            </Link>
            <RD.Close aria-label="Close menu" className="inline-flex size-11 items-center justify-center rounded-full hover:bg-accent-2">
              <X strokeWidth={1.5} className="size-5" />
            </RD.Close>
          </div>

          <nav aria-label="Mobile" className="container-x flex-1 pb-10 pt-6">
            <p className="eyebrow mb-4 text-ink-muted">Properties</p>
            <ul className="border-t border-line">
              {nav.categories.map((c) => {
                const isOpen = expanded === c.id;
                return (
                  <li key={c.id} className="border-b border-line">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : c.id)}
                      className="flex min-h-16 w-full items-center justify-between text-left"
                    >
                      <span className="font-display text-[30px] leading-none">{c.label}</span>
                      <span className="flex items-center gap-3 text-[13px] text-ink-muted tabular">
                        {c.total}
                        <ChevronDown strokeWidth={1.5} className={cn("size-5 transition-transform", isOpen && "rotate-180")} />
                      </span>
                    </button>
                    {isOpen && (
                      <ul className="grid grid-cols-2 gap-x-4 pb-5">
                        {c.links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} onClick={close} className="flex min-h-11 items-center text-[15px] text-ink">
                              {l.label}
                              <span className="ml-1.5 text-xs text-ink-muted tabular">{l.count}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
              {[
                { href: "/properties", label: "All properties" },
                { href: "/about", label: "About" },
                { href: "/shortlist", label: "Shortlist" },
                { href: "/compare", label: "Compare" },
                { href: "/enquire", label: "Enquire" },
              ].map((l) => (
                <li key={l.href} className="border-b border-line">
                  <Link href={l.href} onClick={close} className="flex min-h-16 items-center justify-between font-display text-[30px] leading-none">
                    {l.label}
                    <ArrowUpRight strokeWidth={1.25} className="size-5 text-ink-muted" />
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow mb-3 mt-10 text-ink-muted">Cities</p>
            <ul className="flex flex-wrap gap-2">
              {nav.cities.map((c) => (
                <li key={c.name}>
                  <Link
                    href={`/properties?city=${encodeURIComponent(c.name)}`}
                    onClick={close}
                    className="inline-flex min-h-10 items-center rounded-chip border border-line px-3 text-[13px]"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="container-x grid shrink-0 grid-cols-2 gap-3 border-t border-line py-4 pb-[max(16px,env(safe-area-inset-bottom))]">
            <a href={`tel:${site.phone.tel}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-chip border border-ink/80 text-sm font-semibold">
              <Phone strokeWidth={1.5} className="size-4" /> Call
            </a>
            <a
              href={whatsappLink("Hello Sukh, I'd like to speak to an advisor.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-chip bg-primary text-sm font-semibold text-primary-ink"
            >
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
          </div>
        </RD.Content>
      </RD.Portal>
    </RD.Root>
  );
}
