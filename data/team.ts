import { unsplash } from "@/lib/images";
import type { Advisor } from "./types";

export type TeamMember = { name: string; role: string; since: number; bio: string };

export const team: TeamMember[] = [
  {
    name: "Harpreet Sukhija",
    role: "Founder & Chairman",
    since: 2004,
    bio: "Started Sukh from a two-desk office on Hill Road. Still reads every title report above ₹5 Cr himself.",
  },
  {
    name: "Nandini Rao",
    role: "Managing Director",
    since: 2009,
    bio: "Built the Bengaluru and Hyderabad offices. Previously in project finance with a large private bank.",
  },
  {
    name: "Vikram Malhotra",
    role: "Head, Commercial Leasing",
    since: 2012,
    bio: "Has leased over 3.2 million sq.ft of office and retail space across Gurugram, Pune and Hyderabad.",
  },
  {
    name: "Sana Merchant",
    role: "Head, Legal & Compliance",
    since: 2014,
    bio: "Advocate, Bombay High Court. Oversees title diligence, RERA filings and every sale agreement we draft.",
  },
  {
    name: "Rajesh Patil",
    role: "Head, Farmland & Rural Assets",
    since: 2016,
    bio: "Grew up on a grape farm in Dindori. Knows 7/12 extracts, water tables and taluka offices first-hand.",
  },
  {
    name: "Ishita Bhargava",
    role: "Head, Client Experience",
    since: 2019,
    bio: "Runs the advisor desk and the two-hour callback promise. Reads every piece of client feedback.",
  },
];

export const advisors: Record<string, Advisor> = {
  rohan: {
    name: "Rohan Mehta",
    phone: "+91 97133 91199",
    photo: unsplash("1629425733761-caae3b5f2e50", { w: 400, face: true }),
  },
  ananya: {
    name: "Ananya Iyer",
    phone: "+91 97133 91199",
    photo: unsplash("1607746882042-944635dfe10e", { w: 400, face: true }),
  },
  meera: {
    name: "Meera Kulkarni",
    phone: "+91 97133 91199",
    photo: unsplash("1602233158242-3ba0ac4d2167", { w: 400, face: true }),
  },
  kabir: {
    name: "Kabir Sethi",
    phone: "+91 97133 91199",
    photo: unsplash("1595152772835-219674b2a8a6", { w: 400, face: true }),
  },
};

export const milestones = [
  { year: 2004, title: "Two desks on Hill Road", text: "Harpreet Sukhija opens Sukh in Bandra West with one colleague and a rented scooter." },
  { year: 2009, title: "First commercial mandate", text: "Leased 40,000 sq.ft in Powai for a pharmaceutical company — still a client today." },
  { year: 2011, title: "Pune office opens", text: "Baner and Kharadi become our second home as IT hiring reshapes the city." },
  { year: 2014, title: "In-house legal desk", text: "Every listing begins to carry a title report before it is shown to a client." },
  { year: 2016, title: "Farmland practice", text: "Started advising on agricultural land in Nashik and Igatpuri for first-time land buyers." },
  { year: 2017, title: "RERA, from day one", text: "Registered as an agent in Maharashtra on the first day MahaRERA opened applications." },
  { year: 2019, title: "South and North", text: "Bengaluru, Hyderabad and Gurugram offices open within eleven months of each other." },
  { year: 2023, title: "₹1,000 Cr milestone", text: "Cumulative transactions cross ₹1,000 Cr — about a third of it repeat clients." },
  { year: 2026, title: "12 cities, one advisor", text: "One advisor per client, end to end, across 12 cities and three asset classes." },
];

export const awards = [
  { year: 2025, title: "Channel Partner of the Year — West", by: "Realty Review India Awards" },
  { year: 2024, title: "Best Commercial Leasing Advisory", by: "Hyderabad Property Forum" },
  { year: 2023, title: "Excellence in Client Service", by: "Pune Real Estate Conclave" },
  { year: 2021, title: "Top 25 Real Estate Advisors", by: "Indian Property Journal" },
];
