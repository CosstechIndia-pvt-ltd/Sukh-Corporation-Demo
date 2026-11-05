import { site } from "@/data/site";

export function TrustStrip() {
  return (
    <section aria-label="Sukh Corporation in numbers" className="border-y border-line">
      <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
        {site.stats.map((s, i) => (
          <div
            key={s.label}
            className={[
              "flex flex-col gap-1 py-8 lg:py-10",
              i % 2 === 1 ? "border-l border-line pl-5 sm:pl-8" : "",
              i >= 2 ? "border-t border-line lg:border-t-0" : "",
              i === 2 ? "lg:border-l lg:pl-8" : "",
              i > 0 && i !== 2 ? "lg:pl-8" : "",
            ].join(" ")}
          >
            <dt className="order-2 text-[13px] text-ink-muted">{s.label}</dt>
            <dd className="order-1 font-display text-[34px] font-light leading-none tracking-[-0.02em] tabular sm:text-[44px]">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
