"use client";

import * as Slider from "@radix-ui/react-slider";
import { useId, useState } from "react";
import { calculateEmi } from "@/lib/emi";
import { formatCompactINR, formatINR } from "@/lib/format";
import { cn } from "@/lib/cn";

function Control({
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix,
  prefix,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  suffix?: string;
  prefix?: string;
  display: string;
}) {
  const id = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <label htmlFor={id} className="text-[13px] font-semibold text-ink">
          {label}
          <span className="block text-[12px] font-normal tabular text-ink-muted">{display}</span>
        </label>
        <div className="flex h-11 w-40 items-center rounded-chip border border-line bg-surface px-3 focus-within:border-primary">
          {prefix && <span className="mr-1 text-[14px] text-ink-muted">{prefix}</span>}
          <input
            id={id}
            inputMode="decimal"
            value={draft ?? (step < 1 ? value.toString() : formatINR(value))}
            onFocus={() => setDraft(String(value))}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => {
              const n = Number((draft ?? "").replace(/[^\d.]/g, ""));
              if (Number.isFinite(n) && draft !== "") onChange(clamp(n));
              setDraft(null);
            }}
            onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
            className="w-full min-w-0 bg-transparent text-right text-[15px] font-semibold tabular text-ink focus:outline-none"
          />
          {suffix && <span className="ml-1 text-[13px] text-ink-muted">{suffix}</span>}
        </div>
      </div>
      <Slider.Root min={min} max={max} step={step} value={[value]} onValueChange={(v) => onChange(v[0])} className="relative mt-4 flex h-6 w-full touch-none select-none items-center">
        <Slider.Track className="relative h-px grow bg-line">
          <Slider.Range className="absolute h-[2px] -translate-y-[0.5px] bg-primary" />
        </Slider.Track>
        <Slider.Thumb aria-label={label} className="block size-5 rounded-full border border-primary bg-surface shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" />
      </Slider.Root>
    </div>
  );
}

function Donut({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest || 1;
  const r = 52;
  const c = 2 * Math.PI * r;
  const p = (principal / total) * c;
  return (
    <svg viewBox="0 0 140 140" className="size-40 shrink-0 -rotate-90" role="img" aria-label={`Principal ${Math.round((principal / total) * 100)}%, interest ${Math.round((interest / total) * 100)}%`}>
      <circle cx="70" cy="70" r={r} fill="none" stroke="var(--accent)" strokeWidth="14" />
      <circle cx="70" cy="70" r={r} fill="none" stroke="var(--primary)" strokeWidth="14" strokeDasharray={`${p} ${c - p}`} className="transition-[stroke-dasharray] duration-300" />
    </svg>
  );
}

export function EmiCalculator({ price }: { price: number }) {
  const maxLoan = Math.round(price * 0.9);
  const [loan, setLoan] = useState(Math.round((price * 0.8) / 1_00_000) * 1_00_000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const { emi, totalInterest, totalPayable } = calculateEmi(loan, rate, years);
  const pct = Math.round((loan / price) * 100);

  return (
    <div className="grid gap-10 rounded-card border border-line bg-surface p-5 sm:p-8 lg:grid-cols-[1.2fr_1fr]">
      <div className="space-y-8">
        <Control label="Loan amount" display={`${pct}% of price · banks lend up to 90%`} value={loan} min={1_00_000} max={maxLoan} step={1_00_000} onChange={setLoan} prefix="₹" />
        <Control label="Interest rate" display="Typical range 8.1–9.5% p.a." value={rate} min={6} max={14} step={0.05} onChange={(n) => setRate(Math.round(n * 100) / 100)} suffix="%" />
        <Control label="Tenure" display="Up to 30 years" value={years} min={1} max={30} step={1} onChange={setYears} suffix="yrs" />
      </div>
      <div className="flex flex-col justify-between gap-6 rounded-card bg-accent-2 p-6">
        <div>
          <p className="eyebrow text-ink-muted">Monthly EMI</p>
          <p className="mt-2 font-display text-[44px] leading-none tabular text-ink" aria-live="polite">
            ₹{formatINR(emi)}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Donut principal={loan} interest={totalInterest} />
          <dl className="space-y-3 text-[13px]">
            <Legend swatch="bg-primary" label="Principal" value={formatCompactINR(loan)} />
            <Legend swatch="bg-accent" label="Total interest" value={formatCompactINR(totalInterest)} />
            <div className="border-t border-line pt-3">
              <dt className="text-ink-muted">Total payable</dt>
              <dd className="font-semibold tabular text-ink">{formatCompactINR(totalPayable)}</dd>
            </div>
          </dl>
        </div>
        <p className="text-[12px] leading-relaxed text-ink-muted">
          Indicative only. Down payment of {formatCompactINR(price - loan)} plus stamp duty and registration (typically 6–7%) are paid upfront.
        </p>
      </div>
    </div>
  );
}

function Legend({ swatch, label, value }: { swatch: string; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-ink-muted">
        <span className={cn("size-2.5 rounded-full", swatch)} aria-hidden />
        {label}
      </dt>
      <dd className="pl-[18px] font-semibold tabular text-ink">{value}</dd>
    </div>
  );
}
