import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-ink-muted", className)}>
      <span aria-hidden className="h-px w-6 bg-highlight" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <Tag className="text-[34px] leading-[1.05] sm:text-[44px] lg:text-[52px]">{title}</Tag>
        {intro && <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-muted sm:text-base">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
