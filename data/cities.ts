import { unsplash } from "@/lib/images";

export type City = {
  name: string;
  state: string;
  localities: string[];
  image: string;
  imageAlt: string;
  note: string;
};

export const cities: City[] = [
  {
    name: "Mumbai",
    state: "Maharashtra",
    localities: ["Bandra West", "Powai", "Thane West"],
    image: unsplash("1562979314-bee7453e911c", { w: 1200 }),
    imageAlt: "Bandra–Worli Sea Link at dusk, Mumbai",
    note: "Sea-facing homes and high-street retail",
  },
  {
    name: "Pune",
    state: "Maharashtra",
    localities: ["Baner", "Kharadi", "Hinjewadi"],
    image: unsplash("1545324418-cc1a3fa10c00", { w: 1200 }),
    imageAlt: "Residential tower against a clear sky",
    note: "IT corridors and family apartments",
  },
  {
    name: "Bengaluru",
    state: "Karnataka",
    localities: ["Whitefield", "Indiranagar", "Sarjapur Road"],
    image: unsplash("1588416936097-41850ab3d86d", { w: 1200 }),
    imageAlt: "Vidhana Soudha, Bengaluru",
    note: "Villas, co-working and tech-park offices",
  },
  {
    name: "Hyderabad",
    state: "Telangana",
    localities: ["Gachibowli", "Jubilee Hills", "Kokapet"],
    image: unsplash("1551161242-b5af797b7233", { w: 1200 }),
    imageAlt: "Charminar, Hyderabad",
    note: "Grade-A offices and independent villas",
  },
  {
    name: "Gurugram",
    state: "Haryana",
    localities: ["Golf Course Road", "Sector 65"],
    image: unsplash("1486406146926-c627a92ad1ab", { w: 1200 }),
    imageAlt: "Glass towers seen from street level",
    note: "Builder floors and high-rise living",
  },
  {
    name: "Noida",
    state: "Uttar Pradesh",
    localities: ["Sector 150"],
    image: unsplash("1515263487990-61b07816b324", { w: 1200 }),
    imageAlt: "Modern apartment block with balconies",
    note: "Low-density, green-belt apartments",
  },
  {
    name: "Ahmedabad",
    state: "Gujarat",
    localities: ["SG Highway", "Bopal"],
    image: unsplash("1596176530529-78163a4f7af2", { w: 1200 }),
    imageAlt: "City lights at dusk seen from above",
    note: "Showrooms and plotted development",
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    localities: ["Vaishali Nagar", "Ajmer Road"],
    image: unsplash("1477587458883-47145ed94245", { w: 1200 }),
    imageAlt: "Hawa Mahal, Jaipur",
    note: "Independent houses and farmhouses",
  },
  {
    name: "Indore",
    state: "Madhya Pradesh",
    localities: ["Vijay Nagar", "Super Corridor"],
    image: unsplash("1460317442991-0ec209397118", { w: 1200 }),
    imageAlt: "Apartment building with balconies",
    note: "Value apartments and IT office space",
  },
  {
    name: "Goa",
    state: "Goa",
    localities: ["Assagao", "Siolim"],
    image: unsplash("1512343879784-a960bf40e7f2", { w: 1200 }),
    imageAlt: "Palm-lined beach in North Goa",
    note: "Courtyard villas and orchard land",
  },
  {
    name: "Nashik",
    state: "Maharashtra",
    localities: ["Igatpuri", "Dindori"],
    image: unsplash("1560493676-04071c5f467b", { w: 1200 }),
    imageAlt: "Rows of young crops under a wide sky",
    note: "Vineyards and irrigated farmland",
  },
  {
    name: "Lonavala",
    state: "Maharashtra",
    localities: ["Tungarli", "Pawna Lake"],
    image: unsplash("1572782252655-9c8771392601", { w: 1200 }),
    imageAlt: "Green Sahyadri ridges during the monsoon",
    note: "Weekend farmhouses in the ghats",
  },
];
