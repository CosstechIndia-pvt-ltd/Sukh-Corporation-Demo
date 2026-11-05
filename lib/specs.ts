import type { Property } from "@/data/types";
import { formatArea, formatCompactINR, formatINR } from "./format";

/** Fields a listing card (and the client-side filter) needs — keeps long copy out of client payloads. */
export type CardData = Omit<Property, "description" | "highlights" | "nearby" | "advisor" | "coordinates">;

export function toCardData(p: Property): CardData {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { description, highlights, nearby, advisor, coordinates, ...rest } = p;
  return { ...rest, images: p.images.slice(0, 5) };
}

const short = (s?: string) => (s ? s.split(/[+(,]/)[0].trim() : undefined);

/** Key spec row, adapted per category. */
export function cardSpecs(p: CardData): string[] {
  if (p.category === "farmland") {
    return [formatArea(p.area), p.bhk ? `${p.bhk} BHK house` : short(p.waterSource), short(p.roadAccess)].filter(Boolean) as string[];
  }
  if (p.category === "commercial") {
    return [
      formatArea(p.area),
      p.washrooms !== undefined ? `${p.washrooms} washroom${p.washrooms === 1 ? "" : "s"}` : undefined,
      p.parkingSlots ? `${p.parkingSlots} parking` : p.furnishing,
    ].filter(Boolean) as string[];
  }
  if (p.subType === "Residential Plot") {
    return [formatArea(p.area), p.facing ? `${p.facing} facing` : undefined, "Plot"].filter(Boolean) as string[];
  }
  return [p.bhk ? `${p.bhk} BHK` : undefined, formatArea(p.area), p.furnishing].filter(Boolean) as string[];
}

/** Secondary price line under the headline price. */
export function priceNote(p: Pick<CardData, "listingType" | "pricePerSqft" | "area" | "price" | "securityDeposit">): string | undefined {
  if (p.area.unit === "acre" && p.listingType === "sale") return `${formatCompactINR(p.price / p.area.value)}/acre`;
  if (p.pricePerSqft) return p.listingType === "sale" ? `₹${formatINR(p.pricePerSqft)}/sq.ft` : `₹${formatINR(p.pricePerSqft)}/sq.ft/mo`;
  if (p.securityDeposit) return `Deposit ${formatCompactINR(p.securityDeposit)}`;
  return undefined;
}
