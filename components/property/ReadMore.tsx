"use client";

import { useState } from "react";

export function ReadMore({ text, limit = 420 }: { text: string; limit?: number }) {
  const [open, setOpen] = useState(false);
  const long = text.length > limit;
  const shown = !long || open ? text : text.slice(0, text.lastIndexOf(" ", limit)) + "…";
  return (
    <div>
      <p className="max-w-[68ch] text-[16px] leading-[1.75] text-ink">{shown}</p>
      {long && (
        <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="mt-3 min-h-10 text-[14px] font-semibold underline decoration-line underline-offset-4 hover:decoration-ink">
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
