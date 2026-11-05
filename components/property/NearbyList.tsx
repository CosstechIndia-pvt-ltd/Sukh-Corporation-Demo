import { Hospital, Milestone, Plane, School, ShoppingBag, TrainFront, type LucideIcon } from "lucide-react";
import type { NearbyType, Property } from "@/data/types";

const GROUPS: { type: NearbyType; label: string; icon: LucideIcon }[] = [
  { type: "metro", label: "Transit", icon: TrainFront },
  { type: "school", label: "Schools", icon: School },
  { type: "hospital", label: "Hospitals", icon: Hospital },
  { type: "mall", label: "Shopping", icon: ShoppingBag },
  { type: "airport", label: "Airport", icon: Plane },
  { type: "highway", label: "Highways", icon: Milestone },
];

const dist = (km: number) => (km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(km < 10 ? 1 : 0)} km`);

export function NearbyList({ nearby }: { nearby: Property["nearby"] }) {
  return (
    <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
      {GROUPS.map((g) => {
        const items = nearby.filter((n) => n.type === g.type);
        if (!items.length) return null;
        return (
          <div key={g.type}>
            <p className="eyebrow mb-2 flex items-center gap-2 text-ink-muted">
              <g.icon strokeWidth={1.5} className="size-4" aria-hidden />
              {g.label}
            </p>
            <ul>
              {items.map((n) => (
                <li key={n.name} className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 text-[14px]">
                  <span>{n.name}</span>
                  <span className="shrink-0 tabular text-ink-muted">{dist(n.distanceKm)}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
