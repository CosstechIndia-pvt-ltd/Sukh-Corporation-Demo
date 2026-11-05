"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect } from "react";
import { useToast } from "@/lib/store";

export function Toast() {
  const { message, key, hide } = useToast();

  useEffect(() => {
    if (!message) return;
    const t = window.setTimeout(hide, 2800);
    return () => window.clearTimeout(t);
  }, [message, key, hide]);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-[90] flex justify-center px-4">
      <AnimatePresence>
        {message && (
          <m.div
            key={key}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="rounded-chip bg-ink px-4 py-2.5 text-[13px] font-medium text-bg shadow-float"
          >
            {message}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
