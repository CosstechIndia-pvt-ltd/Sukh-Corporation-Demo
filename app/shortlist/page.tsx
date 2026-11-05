import type { Metadata } from "next";
import { properties } from "@/data/properties";
import { toCardData } from "@/lib/specs";
import { ShortlistView } from "@/components/lists/ShortlistView";
import { Eyebrow } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Your shortlist", robots: { index: false } };

export default function ShortlistPage() {
  return (
    <div className="container-x pb-24 pt-10 lg:pt-16">
      <header className="mb-12 border-b border-line pb-10">
        <Eyebrow>Shortlist</Eyebrow>
        <h1 className="mt-5 text-[40px] leading-[1.03] sm:text-[56px]">
          Your saved <em className="font-light italic">properties.</em>
        </h1>
      </header>
      <ShortlistView all={properties.map(toCardData)} />
    </div>
  );
}
