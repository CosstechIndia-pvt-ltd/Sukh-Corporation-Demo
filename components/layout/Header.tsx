"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Heart, Menu, Phone } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import type { NavData } from "@/lib/nav";
import { useShortlist } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import { Wordmark } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export function Header({ nav }: { nav: NavData }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const shortlistCount = useShortlist((s) => s.ids.length);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  const openMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 160);
  };

  const solid = scrolled || !isHome || megaOpen;

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={cn(
        "relative inline-flex h-11 items-center px-3 text-[14px] font-medium text-ink transition-colors hover:text-primary",
        pathname.startsWith(href) &&
          "after:absolute after:inset-x-3 after:bottom-2 after:h-px after:bg-highlight after:content-['']",
      )}
    >
      {label}
    </Link>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        solid ? "border-b border-line bg-bg/92 backdrop-blur-md supports-[backdrop-filter]:bg-bg/80" : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-chip focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-ink"
      >
        Skip to content
      </a>
      <div
        className={cn(
          "container-x flex items-center justify-between gap-6 transition-[height] duration-300 ease-out",
          scrolled ? "h-16" : "h-[76px] lg:h-[88px]",
        )}
      >
        <Link href="/" className="shrink-0 rounded-chip">
          <Wordmark compact={scrolled} />
          <span className="sr-only"> — home</span>
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          <div ref={megaRef} onMouseEnter={openMega} onMouseLeave={scheduleClose}>
            <button
              type="button"
              aria-expanded={megaOpen}
              aria-controls="mega-menu"
              onClick={() => setMegaOpen((v) => !v)}
              className={cn(
                "inline-flex h-11 items-center gap-1.5 px-3 text-[14px] font-medium text-ink transition-colors hover:text-primary",
                pathname.startsWith("/properties") &&
                  "relative after:absolute after:inset-x-3 after:bottom-2 after:h-px after:bg-highlight after:content-['']",
              )}
            >
              Properties
              <ChevronDown strokeWidth={1.5} className={cn("size-4 transition-transform duration-200", megaOpen && "rotate-180")} />
            </button>
            <MegaMenu id="mega-menu" open={megaOpen} nav={nav} onNavigate={() => setMegaOpen(false)} />
          </div>
          {navLink("/about", "About")}
          {navLink("/compare", "Compare")}
          {navLink("/enquire", "Enquire")}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={`tel:${site.phone.tel}`}
            className="hidden h-11 items-center gap-2 px-2 text-[13px] font-semibold tabular text-ink transition-colors hover:text-primary xl:inline-flex"
          >
            <Phone strokeWidth={1.5} className="size-4" />
            {site.phone.display}
          </a>
          <Link
            href="/shortlist"
            aria-label={`Shortlist${hydrated && shortlistCount ? `, ${shortlistCount} saved` : ""}`}
            className="relative inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-accent-2"
          >
            <Heart strokeWidth={1.5} className="size-5" />
            {hydrated && shortlistCount > 0 && (
              <span className="absolute right-1 top-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-[18px] tabular text-primary-ink">
                {shortlistCount}
              </span>
            )}
          </Link>
          <ButtonLink href="/enquire" size="sm" className="hidden sm:inline-flex">
            Enquire
          </ButtonLink>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-accent-2 lg:hidden"
          >
            <Menu strokeWidth={1.5} className="size-5" />
          </button>
        </div>
      </div>
      <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} nav={nav} />
    </header>
  );
}

function MegaMenu({ id, open, nav, onNavigate }: { id: string; open: boolean; nav: NavData; onNavigate: () => void }) {
  return (
    <div id={id} hidden={!open} className="absolute inset-x-0 top-full">
      <div className="container-x pt-3">
        <div
          data-state={open ? "open" : "closed"}
          className="anim-pop grid grid-cols-[1fr_1fr_1fr_1.1fr] overflow-hidden rounded-card border border-line bg-surface shadow-float"
        >
          {nav.categories.map((c) => (
            <div key={c.id} className="border-r border-line p-7">
              <p className="eyebrow mb-1 text-ink-muted">
                {c.label} · {c.total} listings
              </p>
              <Link
                href={`/properties?cat=${c.id}`}
                onClick={onNavigate}
                className="group mb-5 inline-flex items-center gap-1 font-display text-[26px] leading-tight text-ink hover:text-primary"
              >
                {c.label}
                <ArrowUpRight strokeWidth={1.5} className="size-5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <ul className="space-y-0.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={onNavigate}
                      className="flex min-h-9 items-center justify-between rounded-chip px-2 -mx-2 text-[14px] text-ink transition-colors hover:bg-accent-2"
                    >
                      {l.label}
                      <span className="text-[12px] tabular text-ink-muted">{l.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="bg-accent-2 p-7">
            <p className="eyebrow mb-4 text-ink-muted">By city</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5">
              {nav.cities.map((c) => (
                <li key={c.name}>
                  <Link
                    href={`/properties?city=${encodeURIComponent(c.name)}`}
                    onClick={onNavigate}
                    className="flex min-h-9 items-center justify-between text-[14px] text-ink transition-colors hover:text-primary"
                  >
                    {c.name}
                    <span className="text-[12px] tabular text-ink-muted">{c.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/properties"
              onClick={onNavigate}
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
            >
              View all properties
              <ArrowUpRight strokeWidth={1.5} className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
