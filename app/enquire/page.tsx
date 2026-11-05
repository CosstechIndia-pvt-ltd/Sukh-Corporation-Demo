import type { Metadata } from "next";
import { Suspense } from "react";
import { cities } from "@/data/cities";
import { getListingIndex } from "@/lib/nav";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { Eyebrow } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Enquire — talk to an advisor",
  description: "Tell us what you are looking for. A Sukh advisor in your city will call you within 2 working hours.",
};

export default function EnquirePage() {
  return (
    <div className="grain">
      <div className="container-x pb-24 pt-10 lg:pt-16">
        <header className="max-w-3xl border-b border-line pb-10">
          <Eyebrow>Enquire</Eyebrow>
          <h1 className="mt-5 text-[40px] leading-[1.03] sm:text-[60px]">
            Tell us what you need. <em className="font-light italic">We&rsquo;ll do the legwork.</em>
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted">
            Three short sections, about two minutes. Your details go to one advisor — never to developers or other agents.
          </p>
        </header>
        <div className="mt-12">
          <Suspense fallback={<div className="skeleton h-[720px] rounded-card" role="status" aria-label="Loading form" />}>
            <EnquiryForm listings={getListingIndex()} cities={cities.map((c) => c.name)} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
