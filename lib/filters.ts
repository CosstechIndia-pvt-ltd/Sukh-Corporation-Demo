import type { Category, Furnishing, ListingType } from "@/data/types";
import type { CardData } from "./specs";
import { areaInSqft, formatCompactINR, formatINR, formatPrice } from "./format";

export const PAGE_SIZE = 12;

export const SUBTYPES: Record<Category, string[]> = {
  residential: ["Apartment", "Villa", "Independent House", "Builder Floor", "Penthouse", "Residential Plot"],
  commercial: ["Office Space", "Retail Shop", "Showroom", "Warehouse", "Co-working Floor"],
  farmland: ["Agricultural Land", "Farmhouse", "Orchard Land"],
};

export const CATEGORY_LABEL: Record<Category, string> = {
  residential: "Residential",
  commercial: "Commercial",
  farmland: "Farmland",
};

export const FURNISHING: Furnishing[] = ["Unfurnished", "Semi-furnished", "Fully furnished"];

export const SORTS = [
  { id: "relevance", label: "Relevance" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "newest", label: "Newest first" },
  { id: "ppsf", label: "Price per sq.ft" },
  { id: "area-desc", label: "Area: large to small" },
] as const;
export type SortId = (typeof SORTS)[number]["id"];

/** Budget scales. Sale in rupees up to ₹20 Cr; rent/lease monthly up to ₹15 L. */
export const BUDGET = {
  sale: {
    min: 0,
    max: 20_00_00_000,
    step: 5_00_000,
    presets: [
      { label: "Under ₹1 Cr", min: 0, max: 1_00_00_000 },
      { label: "₹1–3 Cr", min: 1_00_00_000, max: 3_00_00_000 },
      { label: "₹3–7 Cr", min: 3_00_00_000, max: 7_00_00_000 },
      { label: "₹7 Cr+", min: 7_00_00_000, max: 20_00_00_000 },
    ],
  },
  rent: {
    min: 0,
    max: 15_00_000,
    step: 5_000,
    presets: [
      { label: "Under ₹50k", min: 0, max: 50_000 },
      { label: "₹50k–1.5 L", min: 50_000, max: 1_50_000 },
      { label: "₹1.5–5 L", min: 1_50_000, max: 5_00_000 },
      { label: "₹5 L+", min: 5_00_000, max: 15_00_000 },
    ],
  },
} as const;

export function budgetScale(type: ListingType | undefined) {
  return type === "rent" || type === "lease" ? BUDGET.rent : BUDGET.sale;
}

export type Filters = {
  q: string;
  type?: ListingType;
  cat?: Category;
  sub: string[];
  city: string[];
  loc: string[];
  min?: number;
  max?: number;
  bhk: number[];
  amin?: number;
  amax?: number;
  furn: Furnishing[];
  poss?: "ready" | "uc";
  amen: string[];
  verified: boolean;
  featured: boolean;
  sort: SortId;
  view: "grid" | "list";
  page: number;
};

export const EMPTY_FILTERS: Filters = {
  q: "",
  sub: [],
  city: [],
  loc: [],
  bhk: [],
  furn: [],
  amen: [],
  verified: false,
  featured: false,
  sort: "relevance",
  view: "grid",
  page: 1,
};

type ParamSource = { get(name: string): string | null };

const list = (v: string | null) => (v ? v.split(",").map((s) => s.trim()).filter(Boolean) : []);
const num = (v: string | null) => {
  if (v === null || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
};
const oneOf = <T extends string>(v: string | null, options: readonly T[]) =>
  v && (options as readonly string[]).includes(v) ? (v as T) : undefined;

export function parseFilters(sp: ParamSource): Filters {
  const cat = oneOf(sp.get("cat"), ["residential", "commercial", "farmland"] as const);
  return {
    q: sp.get("q")?.trim() ?? "",
    type: oneOf(sp.get("type"), ["sale", "rent", "lease"] as const),
    cat,
    sub: list(sp.get("sub")).filter((s) => (cat ? SUBTYPES[cat].includes(s) : true)),
    city: list(sp.get("city")),
    loc: list(sp.get("loc")),
    min: num(sp.get("min")),
    max: num(sp.get("max")),
    bhk: list(sp.get("bhk"))
      .map(Number)
      .filter((n) => n >= 1 && n <= 5),
    amin: num(sp.get("amin")),
    amax: num(sp.get("amax")),
    furn: list(sp.get("furn")).filter((f): f is Furnishing => (FURNISHING as string[]).includes(f)),
    poss: oneOf(sp.get("poss"), ["ready", "uc"] as const),
    amen: list(sp.get("amen")),
    verified: sp.get("verified") === "1",
    featured: sp.get("featured") === "1",
    sort: oneOf(sp.get("sort"), SORTS.map((s) => s.id)) ?? "relevance",
    view: sp.get("view") === "list" ? "list" : "grid",
    page: Math.max(1, Math.min(50, Number(sp.get("page")) || 1)),
  };
}

export function serializeFilters(f: Filters): string {
  const p = new URLSearchParams();
  if (f.q) p.set("q", f.q);
  if (f.type) p.set("type", f.type);
  if (f.cat) p.set("cat", f.cat);
  if (f.sub.length) p.set("sub", f.sub.join(","));
  if (f.city.length) p.set("city", f.city.join(","));
  if (f.loc.length) p.set("loc", f.loc.join(","));
  if (f.min !== undefined) p.set("min", String(f.min));
  if (f.max !== undefined) p.set("max", String(f.max));
  if (f.bhk.length) p.set("bhk", f.bhk.join(","));
  if (f.amin !== undefined) p.set("amin", String(f.amin));
  if (f.amax !== undefined) p.set("amax", String(f.amax));
  if (f.furn.length) p.set("furn", f.furn.join(","));
  if (f.poss) p.set("poss", f.poss);
  if (f.amen.length) p.set("amen", f.amen.join(","));
  if (f.verified) p.set("verified", "1");
  if (f.featured) p.set("featured", "1");
  if (f.sort !== "relevance") p.set("sort", f.sort);
  if (f.view !== "grid") p.set("view", f.view);
  if (f.page > 1) p.set("page", String(f.page));
  return p.toString();
}

const norm = (s: string) => s.toLowerCase().normalize("NFKD");

export function matches(p: CardData, f: Filters): boolean {
  if (f.q) {
    const hay = norm(`${p.title} ${p.locality} ${p.city} ${p.subType} ${p.address}`);
    const terms = norm(f.q).split(/\s+/).filter(Boolean);
    if (!terms.every((t) => hay.includes(t))) return false;
  }
  if (f.type && p.listingType !== f.type) return false;
  if (f.cat && p.category !== f.cat) return false;
  if (f.sub.length && !f.sub.includes(p.subType)) return false;
  if (f.city.length && !f.city.includes(p.city)) return false;
  if (f.loc.length && !f.loc.includes(p.locality)) return false;
  if (f.type && (f.min !== undefined || f.max !== undefined)) {
    if (f.min !== undefined && p.price < f.min) return false;
    const scale = budgetScale(f.type);
    if (f.max !== undefined && f.max < scale.max && p.price > f.max) return false;
  }
  if (f.bhk.length) {
    if (!p.bhk) return false;
    const ok = f.bhk.some((b) => (b === 5 ? p.bhk! >= 5 : p.bhk === b));
    if (!ok) return false;
  }
  if (f.amin !== undefined || f.amax !== undefined) {
    const sqft = areaInSqft(p.area);
    if (f.amin !== undefined && sqft < f.amin) return false;
    if (f.amax !== undefined && sqft > f.amax) return false;
  }
  if (f.furn.length && (!p.furnishing || !f.furn.includes(p.furnishing))) return false;
  if (f.poss === "ready" && p.possession !== "Ready to move") return false;
  if (f.poss === "uc" && p.possession !== "Under construction") return false;
  if (f.amen.length && !f.amen.every((a) => p.amenities.includes(a))) return false;
  if (f.verified && !p.verified) return false;
  if (f.featured && !p.featured) return false;
  return true;
}

const time = (iso: string) => new Date(iso).getTime();

export function sortProperties<T extends CardData>(items: T[], sort: SortId): T[] {
  const arr = [...items];
  switch (sort) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "newest":
      return arr.sort((a, b) => time(b.postedOn) - time(a.postedOn));
    case "ppsf":
      // Listings without a per-sq.ft figure (farmland) go last.
      return arr.sort((a, b) => (a.pricePerSqft ?? Infinity) - (b.pricePerSqft ?? Infinity));
    case "area-desc":
      return arr.sort((a, b) => areaInSqft(b.area) - areaInSqft(a.area));
    default:
      return arr.sort((a, b) => Number(b.featured) - Number(a.featured) || time(b.postedOn) - time(a.postedOn));
  }
}

export function applyFilters<T extends CardData>(items: T[], f: Filters): T[] {
  return sortProperties(
    items.filter((p) => matches(p, f)),
    f.sort,
  );
}

export function countActive(f: Filters): number {
  return (
    (f.q ? 1 : 0) +
    (f.type ? 1 : 0) +
    (f.cat ? 1 : 0) +
    f.sub.length +
    f.city.length +
    f.loc.length +
    (f.min !== undefined || f.max !== undefined ? 1 : 0) +
    f.bhk.length +
    (f.amin !== undefined || f.amax !== undefined ? 1 : 0) +
    f.furn.length +
    (f.poss ? 1 : 0) +
    f.amen.length +
    (f.verified ? 1 : 0) +
    (f.featured ? 1 : 0)
  );
}

export type ActiveChip = { key: string; label: string; remove: (f: Filters) => Filters };

const TYPE_LABEL: Record<ListingType, string> = { sale: "Buy", rent: "Rent", lease: "Lease" };

export function activeChips(f: Filters): ActiveChip[] {
  const chips: ActiveChip[] = [];
  const without = <K extends keyof Filters>(k: K, v: Filters[K]) => (x: Filters) => ({ ...x, [k]: v, page: 1 });
  if (f.q) chips.push({ key: "q", label: `“${f.q}”`, remove: without("q", "") });
  if (f.type)
    chips.push({ key: "type", label: TYPE_LABEL[f.type], remove: (x) => ({ ...x, type: undefined, min: undefined, max: undefined, page: 1 }) });
  if (f.cat) chips.push({ key: "cat", label: CATEGORY_LABEL[f.cat], remove: (x) => ({ ...x, cat: undefined, sub: [], page: 1 }) });
  f.sub.forEach((s) => chips.push({ key: `sub-${s}`, label: s, remove: (x) => ({ ...x, sub: x.sub.filter((v) => v !== s), page: 1 }) }));
  f.city.forEach((c) =>
    chips.push({ key: `city-${c}`, label: c, remove: (x) => ({ ...x, city: x.city.filter((v) => v !== c), loc: [], page: 1 }) }),
  );
  f.loc.forEach((l) => chips.push({ key: `loc-${l}`, label: l, remove: (x) => ({ ...x, loc: x.loc.filter((v) => v !== l), page: 1 }) }));
  if (f.type && (f.min !== undefined || f.max !== undefined)) {
    const scale = budgetScale(f.type);
    const fmt = (n: number) => (f.type === "sale" ? formatCompactINR(n) : formatPrice(n, "rent"));
    const lo = f.min ?? scale.min;
    const hi = f.max ?? scale.max;
    const label = hi >= scale.max ? `${fmt(lo)}+` : lo <= 0 ? `Under ${fmt(hi)}` : `${fmt(lo)} – ${fmt(hi)}`;
    chips.push({ key: "budget", label, remove: (x) => ({ ...x, min: undefined, max: undefined, page: 1 }) });
  }
  f.bhk.forEach((b) =>
    chips.push({ key: `bhk-${b}`, label: b === 5 ? "5+ BHK" : `${b} BHK`, remove: (x) => ({ ...x, bhk: x.bhk.filter((v) => v !== b), page: 1 }) }),
  );
  if (f.amin !== undefined || f.amax !== undefined) {
    const label =
      f.amin !== undefined && f.amax !== undefined
        ? `${formatINR(f.amin)}–${formatINR(f.amax)} sq.ft`
        : f.amin !== undefined
          ? `${formatINR(f.amin)}+ sq.ft`
          : `Up to ${formatINR(f.amax!)} sq.ft`;
    chips.push({ key: "area", label, remove: (x) => ({ ...x, amin: undefined, amax: undefined, page: 1 }) });
  }
  f.furn.forEach((v) => chips.push({ key: `furn-${v}`, label: v, remove: (x) => ({ ...x, furn: x.furn.filter((y) => y !== v), page: 1 }) }));
  if (f.poss) chips.push({ key: "poss", label: f.poss === "ready" ? "Ready to move" : "Under construction", remove: without("poss", undefined) });
  f.amen.forEach((a) => chips.push({ key: `amen-${a}`, label: a, remove: (x) => ({ ...x, amen: x.amen.filter((v) => v !== a), page: 1 }) }));
  if (f.verified) chips.push({ key: "verified", label: "Verified only", remove: without("verified", false) });
  if (f.featured) chips.push({ key: "featured", label: "Featured only", remove: without("featured", false) });
  return chips;
}

/** Clears filters but keeps presentation preferences. */
export function clearFilters(f: Filters): Filters {
  return { ...EMPTY_FILTERS, sort: f.sort, view: f.view };
}

/** Helpful relaxations for the empty state — each one is a single change likely to return results. */
export function suggestRelaxations(all: CardData[], f: Filters): { label: string; next: Filters; count: number }[] {
  return activeChips(f)
    .map((chip) => {
      const next = chip.remove(f);
      return { label: `Remove ${chip.label}`, next, count: applyFilters(all, next).length };
    })
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);
}
