import type { Property } from "@/data/types";
import { formatArea, formatCompactINR, formatDate, formatINR } from "@/lib/format";

type Row = [string, string | undefined];

export function specRows(p: Property): Row[] {
  const area: Row = [`Area (${p.area.type})`, formatArea(p.area)];
  const possession: Row = [
    "Possession",
    p.possession === "Under construction" && p.possessionDate ? `By ${formatDate(p.possessionDate)}` : p.possession,
  ];
  const age: Row = ["Age", p.ageYears !== undefined ? `${p.ageYears} year${p.ageYears === 1 ? "" : "s"}` : p.possession === "Under construction" ? "New construction" : undefined];
  const floor: Row = ["Floor", p.floor !== undefined && p.totalFloors ? `${p.floor === 0 ? "Ground" : p.floor} of ${p.totalFloors}` : p.totalFloors ? `${p.totalFloors}-storey` : undefined];

  if (p.category === "farmland") {
    return [
      ["Type", p.subType],
      area,
      ["Price per acre", p.listingType === "sale" ? formatCompactINR(p.price / p.area.value) : undefined],
      ["Water source", p.waterSource],
      ["Soil", p.soilType],
      ["Road access", p.roadAccess],
      ["Boundary", p.boundary],
      ["Survey no.", p.surveyNo],
      ["House", p.bhk ? `${p.bhk} BHK, ${p.bathrooms} baths` : undefined],
      ["Furnishing", p.furnishing],
      possession,
    ];
  }
  if (p.category === "commercial") {
    return [
      ["Type", p.subType],
      area,
      ["Rate", p.pricePerSqft ? `₹${formatINR(p.pricePerSqft)}/sq.ft${p.listingType === "sale" ? "" : "/month"}` : undefined],
      floor,
      ["Washrooms", p.washrooms?.toString()],
      ["Parking", p.parkingSlots !== undefined ? (p.parkingSlots === 0 ? "Street / public lot" : `${p.parkingSlots} slots`) : undefined],
      ["Pantry", p.pantry === undefined ? undefined : p.pantry ? "Yes" : "No"],
      ["Power backup", p.powerBackup],
      ["Furnishing", p.furnishing],
      possession,
      age,
    ];
  }
  return [
    ["Type", p.subType],
    ["Configuration", p.bhk ? `${p.bhk} BHK` : undefined],
    area,
    ["Price per sq.ft", p.pricePerSqft && p.listingType === "sale" ? `₹${formatINR(p.pricePerSqft)}` : undefined],
    ["Bathrooms", p.bathrooms?.toString()],
    ["Balconies", p.balconies?.toString()],
    floor,
    ["Facing", p.facing],
    ["Furnishing", p.furnishing],
    ["Parking", p.parkingSlots ? `${p.parkingSlots} covered` : undefined],
    ["Road", p.roadAccess],
    possession,
    age,
  ];
}

export function SpecGrid({ property }: { property: Property }) {
  const rows = specRows(property).filter((r): r is [string, string] => Boolean(r[1]));
  return (
    <dl className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3">
      {rows.map(([k, v]) => (
        <div key={k} className="border-b border-r border-line px-4 py-4 sm:px-5">
          <dt className="text-[12px] text-ink-muted">{k}</dt>
          <dd className="mt-1 text-[15px] font-semibold tabular text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
