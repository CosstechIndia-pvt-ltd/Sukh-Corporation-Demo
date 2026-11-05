"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { useTheme } from "@/lib/store";

function ThemeSync() {
  const theme = useTheme((s) => s.theme);
  const first = useRef(true);
  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute("data-theme") === theme) {
      first.current = false;
      return;
    }
    // Animate colour changes only for user-initiated switches, never on first paint.
    if (!first.current) root.classList.add("theme-transition");
    root.setAttribute("data-theme", theme);
    first.current = false;
    const t = window.setTimeout(() => root.classList.remove("theme-transition"), 350);
    return () => window.clearTimeout(t);
  }, [theme]);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ThemeSync />
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
