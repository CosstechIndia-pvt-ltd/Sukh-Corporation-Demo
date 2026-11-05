"use client";

import * as Slider from "@radix-ui/react-slider";

export function RangeSlider({
  min,
  max,
  step,
  value,
  onValueChange,
  onValueCommit,
  format,
  label,
}: {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onValueChange: (v: [number, number]) => void;
  onValueCommit?: (v: [number, number]) => void;
  format: (n: number) => string;
  label: string;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-[13px] font-semibold tabular text-ink">
        <span>{format(value[0])}</span>
        <span aria-hidden className="mx-2 h-px flex-1 bg-line" />
        <span>{value[1] >= max ? `${format(max)}+` : format(value[1])}</span>
      </div>
      <Slider.Root
        min={min}
        max={max}
        step={step}
        value={value}
        minStepsBetweenThumbs={1}
        onValueChange={(v) => onValueChange([v[0], v[1]])}
        onValueCommit={(v) => onValueCommit?.([v[0], v[1]])}
        className="relative flex h-6 w-full touch-none select-none items-center"
      >
        <Slider.Track className="relative h-px grow bg-line">
          <Slider.Range className="absolute h-[2px] -translate-y-[0.5px] bg-primary" />
        </Slider.Track>
        {[0, 1].map((i) => (
          <Slider.Thumb
            key={i}
            aria-label={`${label} ${i === 0 ? "minimum" : "maximum"}`}
            className="block size-6 rounded-full border border-primary bg-surface shadow-soft transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          />
        ))}
      </Slider.Root>
    </div>
  );
}
