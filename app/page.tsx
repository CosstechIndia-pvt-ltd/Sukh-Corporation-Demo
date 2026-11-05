import { cities as cityData } from "@/data/cities";
import { properties } from "@/data/properties";
import { testimonials } from "@/data/testimonials";
import { formatPrice } from "@/lib/format";
import { unsplash } from "@/lib/images";
import { toCardData } from "@/lib/specs";
import { CategoryBento, type BentoTile } from "@/components/home/CategoryBento";
import { CertStrip } from "@/components/home/CertStrip";
import { CityGrid, type CityCard } from "@/components/home/CityGrid";
import { CtaBand } from "@/components/home/CtaBand";
import { FeaturedRail } from "@/components/home/FeaturedRail";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhySukh } from "@/components/home/WhySukh";

const count = (fn: (p: (typeof properties)[number]) => boolean) => properties.filter(fn).length;

export default function HomePage() {
  const featured = properties.filter((p) => p.featured).map(toCardData);
  const spotlight = properties.find((p) => p.slug === "4-bhk-portuguese-villa-assagao-pool") ?? properties[0];

  const tiles: BentoTile[] = [
    {
      label: "Apartments",
      href: "/properties?cat=residential&sub=Apartment",
      count: count((p) => p.subType === "Apartment"),
      image: unsplash("1600210492486-724fe5c67fb0", { w: 1400 }),
      alt: "Bright apartment living room",
      note: "Two-bedrooms near the metro to sea-facing three-bedrooms in Bandra.",
    },
    {
      label: "Villas",
      href: "/properties?cat=residential&sub=Villa",
      count: count((p) => p.subType === "Villa"),
      image: unsplash("1613490493576-7fde63acd811", { w: 900 }),
      alt: "Villa with a long lap pool",
      note: "",
    },
    {
      label: "Office spaces",
      href: "/properties?cat=commercial&sub=Office%20Space",
      count: count((p) => p.subType === "Office Space" || p.subType === "Co-working Floor"),
      image: unsplash("1497366811353-6870744d04b2", { w: 900 }),
      alt: "Open-plan office with tall windows",
      note: "",
    },
    {
      label: "Retail",
      href: "/properties?cat=commercial",
      count: count((p) => p.subType === "Retail Shop" || p.subType === "Showroom"),
      image: unsplash("1441986300917-64674bd600d8", { w: 900 }),
      alt: "Retail interior with display shelving",
      note: "",
    },
    {
      label: "Farmland",
      href: "/properties?cat=farmland",
      count: count((p) => p.category === "farmland"),
      image: unsplash("1572782252655-9c8771392601", { w: 1400 }),
      alt: "Green Sahyadri ridges above farmland",
      note: "Vineyards in Dindori, stream-side acres near Igatpuri, a stone farmhouse in Lonavala.",
    },
    {
      label: "Plots",
      href: "/properties?sub=Residential%20Plot&cat=residential",
      count: count((p) => p.subType === "Residential Plot"),
      image: unsplash("1600563438938-a9a27216b4f5", { w: 900 }),
      alt: "Gated plotted community with new homes",
      note: "",
    },
  ];

  const cityCards: CityCard[] = cityData
    .map((c) => {
      const inCity = properties.filter((p) => p.city === c.name);
      const sale = inCity.filter((p) => p.listingType === "sale").sort((a, b) => a.price - b.price)[0];
      const rent = inCity.filter((p) => p.listingType !== "sale").sort((a, b) => a.price - b.price)[0];
      const cheapest = sale ?? rent;
      return {
        name: c.name,
        state: c.state,
        count: inCity.length,
        from: cheapest ? formatPrice(cheapest.price, cheapest.listingType) : "—",
        image: c.image,
        alt: c.imageAlt,
        note: c.note,
      };
    })
    .sort((a, b) => b.count - a.count);

  return (
    <>
      <Hero cities={cityData.map((c) => c.name)} spotlight={spotlight} />
      <TrustStrip />
      <CategoryBento tiles={tiles} />
      <FeaturedRail items={featured} />
      <CityGrid cities={cityCards.slice(0, 8)} more={cityCards.slice(8)} />
      <WhySukh />
      <HowItWorks />
      <Testimonials items={testimonials} />
      <CertStrip />
      <CtaBand />
    </>
  );
}
