import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ChipProps = ComponentProps<"button"> & { active?: boolean };

/** Toggle chip — announces state with aria-pressed. */
export function Chip({ active, className, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-10 items-center gap-1.5 rounded-chip border px-3.5 text-[13px] font-medium transition-colors duration-200",
        active
          ? "border-primary bg-primary text-primary-ink"
          : "border-line bg-surface text-ink hover:border-ink/40",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
