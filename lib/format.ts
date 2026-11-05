import type { Area, ListingType } from "@/data/types";

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** Indian digit grouping: 125000 → "1,25,000" */
export function formatINR(value: number): string {
  return inr.format(Math.round(value));
}

function trim(n: number, digits: number) {
  return Number(n.toFixed(digits)).toString();
}

/** Compact Indian price: ₹6.75 Cr, ₹85 L, ₹45,000 */
export function formatCompactINR(value: number): string {
  if (value >= 1_00_00_000) return `₹${trim(value / 1_00_00_000, 2)} Cr`;
  if (value >= 1_00_000) return `₹${trim(value / 1_00_000, 2)} L`;
  return `₹${formatINR(value)}`;
}

/** Listing price: sale → ₹6.75 Cr · rent/lease → ₹45,000/mo (₹4.5 L/mo above a lakh) */
export function formatPrice(value: number, listingType: ListingType = "sale"): string {
  if (listingType === "sale") return formatCompactINR(value);
  return `${value >= 10_00_000 ? formatCompactINR(value) : `₹${formatINR(value)}`}/mo`;
}

const unitLabel: Record<Area["unit"], [string, string]> = {
  sqft: ["sq.ft", "sq.ft"],
  sqyd: ["sq.yd", "sq.yd"],
  acre: ["acre", "acres"],
};

/** 1,450 sq.ft · 2.5 acres · 300 sq.yd */
export function formatArea(area: Pick<Area, "value" | "unit">): string {
  const [one, many] = unitLabel[area.unit];
  const value = area.unit === "acre" ? trim(area.value, 2) : formatINR(area.value);
  return `${value} ${area.value === 1 ? one : many}`;
}

/** Normalises any area to square feet for comparisons and sorting. */
export function areaInSqft(area: Pick<Area, "value" | "unit">): number {
  if (area.unit === "acre") return area.value * 43_560;
  if (area.unit === "sqyd") return area.value * 9;
  return area.value;
}

export function daysBetween(fromISO: string, now: Date = REFERENCE_DATE): number {
  const ms = now.getTime() - new Date(fromISO).getTime();
  return Math.max(0, Math.floor(ms / 86_400_000));
}

/** Fixed "today" so static pages and the client agree (demo data is dated Nov 2026). */
export const REFERENCE_DATE = new Date("2026-11-05T09:00:00+05:30");

export function timeAgo(iso: string, now: Date = REFERENCE_DATE): string {
  const d = daysBetween(iso, now);
  if (d === 0) return "Posted today";
  if (d === 1) return "Posted yesterday";
  if (d < 7) return `Posted ${d} days ago`;
  if (d < 30) {
    const w = Math.floor(d / 7);
    return `Posted ${w} week${w > 1 ? "s" : ""} ago`;
  }
  const m = Math.floor(d / 30);
  return `Posted ${m} month${m > 1 ? "s" : ""} ago`;
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { month: "short", year: "numeric" }) {
  return new Intl.DateTimeFormat("en-IN", opts).format(new Date(iso));
}

export const listingLabel: Record<ListingType, string> = {
  sale: "For sale",
  rent: "For rent",
  lease: "For lease",
};

export function pluralise(n: number, one: string, many = `${one}s`) {
  return `${n} ${n === 1 ? one : many}`;
}
