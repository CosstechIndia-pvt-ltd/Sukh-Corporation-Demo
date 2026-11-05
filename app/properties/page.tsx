import type { Metadata } from "next";
import { Suspense } from "react";
import { cities } from "@/data/cities";
import { properties } from "@/data/properties";
import { toCardData } from "@/lib/specs";
import { ListingSkeleton } from "@/components/property/CardSkeleton";
import { PropertiesExplorer } from "@/components/search/PropertiesExplorer";
import type { FilterMeta } from "@/components/search/FilterPanel";

export const metadata: Metadata = {
  title: "Properties for sale, rent and lease",
  description: "Verified apartments, villas, offices, retail and farmland across 12 Indian cities. Filter by city, budget, BHK, area and more.",
};

export default function PropertiesPage() {
  const amenityFreq = new Map<string, number>();
  properties.forEach((p) => p.amenities.forEach((a) => amenityFreq.set(a, (amenityFreq.get(a) ?? 0) + 1)));
  const meta: FilterMeta = {
    cities: cities.map((c) => ({
      name: c.name,
      count: properties.filter((p) => p.city === c.name).length,
      localities: [...new Set(properties.filter((p) => p.city === c.name).map((p) => p.locality))],
    })),
    amenities: [...amenityFreq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 16).map(([a]) => a),
  };
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <PropertiesExplorer all={properties.map(toCardData)} meta={meta} />
    </Suspense>
  );
}
