import { cities } from "@/data/cities";
import { properties } from "@/data/properties";
import type { Category, ListingType, Property } from "@/data/types";

/** Lightweight listing index shipped to client chrome (compare tray, FAB). */
export type ListingLite = Pick<Property, "id" | "slug" | "title" | "locality" | "city" | "price" | "listingType"> & {
  image: string;
  alt: string;
};

export function getListingIndex(): ListingLite[] {
  return properties.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    locality: p.locality,
    city: p.city,
    price: p.price,
    listingType: p.listingType,
    image: p.images[0].src,
    alt: p.images[0].alt,
  }));
}

export type NavData = {
  categories: {
    id: Category;
    label: string;
    total: number;
    links: { label: string; href: string; count: number }[];
  }[];
  cities: { name: string; count: number }[];
};

const count = (fn: (p: Property) => boolean) => properties.filter(fn).length;

export function getNavData(): NavData {
  const mk = (cat: Category, label: string, rentType: ListingType, rentLabel: string, subs: string[]) => ({
    id: cat,
    label,
    total: count((p) => p.category === cat),
    links: [
      { label: `Buy ${label.toLowerCase()}`, href: `/properties?cat=${cat}&type=sale`, count: count((p) => p.category === cat && p.listingType === "sale") },
      {
        label: rentLabel,
        href: `/properties?cat=${cat}&type=${rentType}`,
        count: count((p) => p.category === cat && p.listingType === rentType),
      },
      ...subs.map((s) => ({
        label: s === "Apartment" ? "Apartments" : s === "Villa" ? "Villas" : s,
        href: `/properties?cat=${cat}&sub=${encodeURIComponent(s)}`,
        count: count((p) => p.subType === s),
      })),
    ],
  });
  return {
    categories: [
      mk("residential", "Residential", "rent", "Rent a home", ["Apartment", "Villa", "Independent House", "Penthouse"]),
      mk("commercial", "Commercial", "lease", "Lease office & retail", ["Office Space", "Retail Shop", "Warehouse"]),
      mk("farmland", "Farmland", "lease", "Lease a farmhouse", ["Agricultural Land", "Farmhouse", "Orchard Land"]),
    ],
    cities: cities.map((c) => ({ name: c.name, count: count((p) => p.city === c.name) })),
  };
}
