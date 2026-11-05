"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/cn";
import { useShortlist, useToast } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";

export function ShortlistButton({
  id,
  title,
  variant = "overlay",
  className,
}: {
  id: string;
  title: string;
  variant?: "overlay" | "outline";
  className?: string;
}) {
  const hydrated = useHydrated();
  const saved = useShortlist((s) => s.ids.includes(id)) && hydrated;
  const toggle = useShortlist((s) => s.toggle);
  const toast = useToast((s) => s.show);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from shortlist` : `Save ${title} to shortlist`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
        toast(saved ? "Removed from shortlist" : "Saved to your shortlist");
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-[background-color,color,transform] duration-200 active:scale-95",
        variant === "overlay"
          ? "size-10 rounded-full bg-surface/90 text-ink shadow-soft backdrop-blur hover:bg-surface"
          : "h-11 rounded-chip border border-line px-4 text-[13px] font-semibold text-ink hover:border-ink/40",
        className,
      )}
    >
      <Heart strokeWidth={1.5} className={cn("size-[18px] transition-colors", saved && "fill-primary text-primary")} />
      {variant === "outline" && (saved ? "Saved" : "Save")}
    </button>
  );
}
