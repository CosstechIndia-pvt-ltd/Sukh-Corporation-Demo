"use client";

import { Check, GitCompare } from "lucide-react";
import { cn } from "@/lib/cn";
import { COMPARE_LIMIT, useCompare, useToast } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";

export function CompareToggle({
  id,
  title,
  variant = "inline",
  className,
}: {
  id: string;
  title: string;
  variant?: "inline" | "outline";
  className?: string;
}) {
  const hydrated = useHydrated();
  const active = useCompare((s) => s.ids.includes(id)) && hydrated;
  const toggle = useCompare((s) => s.toggle);
  const toast = useToast((s) => s.show);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `Remove ${title} from compare` : `Add ${title} to compare`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!toggle(id)) toast(`You can compare up to ${COMPARE_LIMIT} properties at a time`);
      }}
      className={cn(
        "inline-flex items-center gap-2 text-[13px] font-medium transition-colors",
        variant === "inline"
          ? "-mr-2 min-h-11 rounded-chip px-2 text-ink-muted hover:text-ink"
          : "h-11 rounded-chip border border-line px-4 font-semibold text-ink hover:border-ink/40",
        active && "text-ink",
        className,
      )}
    >
      {variant === "inline" ? (
        <span
          aria-hidden
          className={cn(
            "inline-flex size-[18px] items-center justify-center rounded-[4px] border transition-colors",
            active ? "border-primary bg-primary text-primary-ink" : "border-ink/30",
          )}
        >
          {active && <Check strokeWidth={2.5} className="size-3" />}
        </span>
      ) : (
        <GitCompare strokeWidth={1.5} className="size-[18px]" />
      )}
      {active ? "Comparing" : "Compare"}
    </button>
  );
}
