"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import type { ListingLite } from "@/lib/nav";
import { useOrigin } from "@/lib/useOrigin";
import { WhatsAppIcon } from "@/components/ui/Icons";

export function ContactFab({ listings }: { listings: ListingLite[] }) {
  const pathname = usePathname();
  const origin = useOrigin();
  const slug = pathname.startsWith("/properties/") ? pathname.split("/")[2] : null;
  const listing = slug ? listings.find((l) => l.slug === slug) : undefined;

  const message = listing
    ? `Hello Sukh, I'm interested in "${listing.title}" (${listing.locality}, ${listing.city}). ${origin}${pathname}`
    : "Hello Sukh, I'd like to speak to an advisor about a property.";

  return (
    <div
      className={`fixed right-4 z-40 flex-col gap-2 transition-[bottom] duration-300 ease-out sm:right-6 ${listing ? "hidden lg:flex" : "flex"}`}
      style={{ bottom: "calc(16px + var(--dock, 0px) + var(--tray, 0px))" }}
    >
      <a
        href={`tel:${site.phone.tel}`}
        aria-label={`Call Sukh Corporation on ${site.phone.display}`}
        className="inline-flex size-12 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
      >
        <Phone strokeWidth={1.5} className="size-5" />
      </a>
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with an advisor on WhatsApp"
        className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-ink shadow-float transition-transform duration-200 hover:-translate-y-0.5"
      >
        <WhatsAppIcon className="size-[22px]" />
      </a>
    </div>
  );
}
