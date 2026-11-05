import {
  ArrowUpDown,
  Baby,
  BadgeCheck,
  Building2,
  Car,
  Cctv,
  Coffee,
  Droplets,
  Dumbbell,
  Fence,
  Flame,
  Home,
  Lightbulb,
  ParkingCircle,
  Phone,
  ShieldCheck,
  Sofa,
  Sprout,
  Sun,
  Trees,
  Truck,
  Users,
  Waves,
  Wifi,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Lift: ArrowUpDown,
  "Power backup": Zap,
  "24×7 security": ShieldCheck,
  "Covered parking": Car,
  Gym: Dumbbell,
  "Swimming pool": Waves,
  Clubhouse: Building2,
  "Children's play area": Baby,
  "Landscaped garden": Trees,
  "Private garden": Trees,
  "Rainwater harvesting": Droplets,
  "Piped gas": Flame,
  Intercom: Phone,
  CCTV: Cctv,
  "Visitor parking": ParkingCircle,
  "Jogging track": Sprout,
  "Servant room": Home,
  "Modular kitchen": Sofa,
  "Wi-Fi ready": Wifi,
  Cafeteria: Coffee,
  "Conference rooms": Users,
  "Fire safety": Flame,
  "Central AC": Wind,
  "Loading dock": Truck,
  Borewell: Droplets,
  "Drip irrigation": Sprout,
  "Farm pond": Waves,
  "Caretaker cottage": Home,
  "Fenced boundary": Fence,
  "Solar panels": Sun,
  "Pet friendly": BadgeCheck,
  "Sea view": Waves,
};

export function AmenityList({ amenities }: { amenities: string[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
      {amenities.map((a) => {
        const Icon = ICONS[a] ?? Lightbulb;
        return (
          <li key={a} className="flex min-h-12 items-center gap-3 border-b border-line text-[14px]">
            <Icon strokeWidth={1.5} className="size-[18px] shrink-0 text-primary" aria-hidden />
            {a}
          </li>
        );
      })}
    </ul>
  );
}
