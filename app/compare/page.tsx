import type { Metadata } from "next";
import { properties } from "@/data/properties";
import { CompareView, type CompareItem } from "@/components/lists/CompareView";
import { Eyebrow } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Compare properties", robots: { index: false } };

export default function ComparePage() {
  const all: CompareItem[] = properties.map((p) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { description, highlights, advisor, coordinates, ...rest } = p;
    return { ...rest, images: p.images.slice(0, 1) };
  });
  return (
    <div className="container-x pb-24 pt-10 lg:pt-16">
      <header className="mb-10 border-b border-line pb-10">
        <Eyebrow>Compare</Eyebrow>
        <h1 className="mt-5 text-[40px] leading-[1.03] sm:text-[56px]">
          Side by side, <em className="font-light italic">line by line.</em>
        </h1>
      </header>
      <CompareView all={all} />
    </div>
  );
}
