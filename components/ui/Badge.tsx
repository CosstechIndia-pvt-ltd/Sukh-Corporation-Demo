import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "plain" | "accent" | "solid" | "outline";

const tones: Record<Tone, string> = {
  plain: "bg-surface/95 text-ink",
  accent: "bg-accent text-ink",
  solid: "bg-primary text-primary-ink",
  outline: "border border-line text-ink",
};

export function Badge({ tone = "plain", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-chip px-2 text-[10.5px] font-semibold uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
