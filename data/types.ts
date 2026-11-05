export type ListingType = "sale" | "rent" | "lease";
export type Category = "residential" | "commercial" | "farmland";
export type Facing =
  | "North"
  | "East"
  | "South"
  | "West"
  | "North-East"
  | "North-West"
  | "South-East"
  | "South-West";
export type Furnishing = "Unfurnished" | "Semi-furnished" | "Fully furnished";
export type Possession = "Ready to move" | "Under construction";
export type NearbyType = "metro" | "school" | "hospital" | "mall" | "airport" | "highway";

export type Area = {
  value: number;
  unit: "sqft" | "sqyd" | "acre";
  type: "carpet" | "built-up" | "super built-up" | "plot";
};

export type Advisor = { name: string; phone: string; photo: string };

export type Property = {
  id: string;
  slug: string;
  title: string;
  listingType: ListingType;
  category: Category;
  subType: string;
  city: string;
  locality: string;
  address: string;
  coordinates: { lat: number; lng: number };
  price: number;
  maintenance?: number;
  securityDeposit?: number;
  pricePerSqft?: number;
  area: Area;
  bhk?: number;
  bathrooms?: number;
  balconies?: number;
  floor?: number;
  totalFloors?: number;
  facing?: Facing;
  furnishing?: Furnishing;
  possession: Possession;
  possessionDate?: string;
  ageYears?: number;
  reraId?: string;
  washrooms?: number;
  parkingSlots?: number;
  pantry?: boolean;
  powerBackup?: string;
  waterSource?: string;
  soilType?: string;
  roadAccess?: string;
  boundary?: string;
  surveyNo?: string;
  amenities: string[];
  highlights: string[];
  description: string;
  nearby: { name: string; type: NearbyType; distanceKm: number }[];
  images: { src: string; alt: string }[];
  postedOn: string;
  verified: boolean;
  featured: boolean;
  advisor: Advisor;
};
