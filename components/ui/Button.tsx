import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-semibold tracking-[0.01em] transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-out disabled:opacity-50 disabled:pointer-events-none active:translate-y-px select-none";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-ink hover:bg-[color-mix(in_oklab,var(--primary)_88%,var(--ink))] rounded-chip",
  secondary: "border border-ink/80 text-ink hover:bg-ink hover:text-bg rounded-chip",
  ghost: "text-ink hover:bg-accent-2 rounded-chip",
  inverse: "bg-primary-ink text-primary hover:bg-[color-mix(in_oklab,var(--primary-ink)_88%,var(--primary))] rounded-chip",
  link: "text-ink underline decoration-line underline-offset-[6px] hover:decoration-ink px-0! h-auto!",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function buttonClass({ variant = "primary", size = "md", className }: Omit<Common, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({ variant, size, className, ...props }: Common & ComponentProps<"button">) {
  return <button type="button" className={buttonClass({ variant, size, className })} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: Common & ComponentProps<typeof Link>) {
  return <Link className={buttonClass({ variant, size, className })} {...props} />;
}

export function ButtonAnchor({ variant, size, className, ...props }: Common & ComponentProps<"a">) {
  return <a className={buttonClass({ variant, size, className })} {...props} />;
}
