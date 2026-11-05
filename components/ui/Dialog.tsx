"use client";

import * as RD from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const DialogRoot = RD.Root;
export const DialogTrigger = RD.Trigger;
export const DialogClose = RD.Close;

export function CloseButton({ className, label = "Close" }: { className?: string; label?: string }) {
  return (
    <RD.Close
      aria-label={label}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-accent-2",
        className,
      )}
    >
      <X strokeWidth={1.5} className="size-5" />
    </RD.Close>
  );
}

/** Centred modal dialog. */
export function DialogContent({
  title,
  description,
  hideTitle,
  className,
  children,
}: {
  title: string;
  description?: string;
  hideTitle?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <RD.Portal>
      <RD.Overlay className="anim-overlay fixed inset-0 z-[80] bg-[rgb(var(--scrim)/0.55)] backdrop-blur-[2px]" />
      <RD.Content
        className={cn(
          "anim-dialog fixed left-1/2 top-1/2 z-[81] max-h-[calc(100dvh-32px)] w-[calc(100vw-32px)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-card border border-line bg-surface shadow-float focus:outline-none",
          className,
        )}
      >
        <div className={cn("flex items-start justify-between gap-4 px-6 pt-5 sm:px-8", hideTitle && "sr-only")}>
          <div>
            <RD.Title className="font-display text-2xl">{title}</RD.Title>
            {description && <RD.Description className="mt-1 text-sm text-ink-muted">{description}</RD.Description>}
          </div>
          {!hideTitle && <CloseButton className="-mr-3 -mt-1" />}
        </div>
        {hideTitle && !description && <RD.Description className="sr-only">{title}</RD.Description>}
        {children}
      </RD.Content>
    </RD.Portal>
  );
}

/** Bottom sheet on mobile; optional right drawer from md up. */
export function SheetContent({
  title,
  description,
  side = "bottom",
  className,
  footer,
  children,
}: {
  title: string;
  description?: string;
  side?: "bottom" | "right";
  className?: string;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <RD.Portal>
      <RD.Overlay className="anim-overlay fixed inset-0 z-[80] bg-[rgb(var(--scrim)/0.5)]" />
      <RD.Content
        className={cn(
          "fixed z-[81] flex flex-col bg-surface shadow-float focus:outline-none",
          side === "bottom"
            ? "anim-sheet-bottom inset-x-0 bottom-0 max-h-[88dvh] rounded-t-[24px]"
            : "anim-sheet-right inset-y-0 right-0 w-full max-w-md",
          className,
        )}
      >
        {side === "bottom" && <div aria-hidden className="mx-auto mt-3 h-1 w-10 rounded-full bg-line" />}
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <div>
            <RD.Title className="font-display text-xl">{title}</RD.Title>
            {description ? (
              <RD.Description className="text-[13px] text-ink-muted">{description}</RD.Description>
            ) : (
              <RD.Description className="sr-only">{title}</RD.Description>
            )}
          </div>
          <CloseButton className="-mr-2" />
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">{children}</div>
        {footer && <div className="border-t border-line bg-surface px-5 py-3 pb-[max(12px,env(safe-area-inset-bottom))]">{footer}</div>}
      </RD.Content>
    </RD.Portal>
  );
}
