"use client";

import { Share2 } from "lucide-react";
import { useToast } from "@/lib/store";

export function ShareButton({ title }: { title: string }) {
  const toast = useToast((s) => s.show);
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text: `${title} — Sukh Corporation`, url });
        return;
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast("Link copied to clipboard");
    } catch {
      toast("Couldn’t copy — please copy the address bar");
    }
  };
  return (
    <button type="button" onClick={share} className="inline-flex h-11 items-center gap-2 rounded-chip border border-line px-4 text-[13px] font-semibold text-ink transition-colors hover:border-ink/40">
      <Share2 strokeWidth={1.5} className="size-[18px]" />
      Share
    </button>
  );
}
