import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export const controlClass =
  "w-full min-h-12 rounded-chip border border-line bg-surface px-4 text-[15px] text-ink placeholder:text-ink-muted/80 transition-colors duration-200 hover:border-ink/30 focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-primary aria-[invalid=true]:border-danger";

export function Field({
  label,
  htmlFor,
  hint,
  error,
  optional,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="flex items-baseline justify-between text-[13px] font-semibold text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-ink-muted">Optional</span>}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-[13px] text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-[13px] text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(controlClass, className)} {...props} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<"textarea">>(function Textarea(
  { className, ...props },
  ref,
) {
  return <textarea ref={ref} className={cn(controlClass, "min-h-32 py-3 leading-relaxed", className)} {...props} />;
});

/** Native select, fully restyled — best accessibility and mobile behaviour. */
export const Select = forwardRef<HTMLSelectElement, ComponentProps<"select"> & { wrapperClassName?: string }>(
  function Select({ className, wrapperClassName, children, ...props }, ref) {
    return (
      <div className={cn("relative", wrapperClassName)}>
        <select ref={ref} className={cn(controlClass, "appearance-none pr-10", className)} {...props}>
          {children}
        </select>
        <ChevronDown
          aria-hidden
          strokeWidth={1.5}
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
        />
      </div>
    );
  },
);
