"use client";

import * as Popover from "@radix-ui/react-popover";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { useTheme } from "@/lib/store";
import { THEMES } from "@/lib/themes";
import { useHydrated } from "@/lib/useHydrated";

function Swatch({ colors, className }: { colors: readonly string[]; className?: string }) {
  return (
    <span aria-hidden className={cn("relative inline-flex size-7 overflow-hidden rounded-full ring-1 ring-line", className)}>
      <span className="absolute inset-0" style={{ background: colors[0] }} />
      <span className="absolute inset-y-0 right-0 w-1/2" style={{ background: colors[1] }} />
      <span className="absolute bottom-0 right-0 h-1/2 w-1/2" style={{ background: colors[2] }} />
    </span>
  );
}

/** Showcase-only control: lets the client preview the five palettes. */
export function ThemeSwitcher() {
  const hydrated = useHydrated();
  const { theme, setTheme } = useTheme();
  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label={`Theme: ${current.name}. Change theme`}
        className="fixed left-4 z-40 inline-flex h-11 items-center gap-2.5 rounded-full border border-line bg-surface/95 pl-1.5 pr-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink shadow-soft backdrop-blur transition-[bottom,transform] duration-300 hover:-translate-y-0.5 sm:left-6"
        style={{ bottom: "calc(16px + var(--dock, 0px) + var(--tray, 0px))" }}
      >
        <Swatch colors={hydrated ? current.swatch : THEMES[0].swatch} className="size-8" />
        Theme
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          align="start"
          sideOffset={10}
          className="anim-pop z-[70] w-[272px] rounded-card border border-line bg-surface p-2 shadow-float focus:outline-none"
        >
          <p className="eyebrow px-3 pb-2 pt-2 text-ink-muted">Palette</p>
          <ul role="radiogroup" aria-label="Choose a colour theme">
            {THEMES.map((t) => {
              const active = hydrated && t.id === theme;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                      "flex min-h-12 w-full items-center gap-3 rounded-[8px] px-3 text-left text-[14px] text-ink transition-colors",
                      active ? "bg-accent-2" : "hover:bg-accent-2/60",
                    )}
                  >
                    <Swatch colors={t.swatch} />
                    <span className="flex-1 font-display text-[17px]">{t.name}</span>
                    {active && <Check strokeWidth={1.5} className="size-4" />}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="px-3 pb-2 pt-3 text-[12px] leading-snug text-ink-muted">Preview only — the final site ships with one palette.</p>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
