"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { Monogram } from "./Brand";

type SmartImageProps = Omit<ImageProps, "placeholder" | "onError" | "onLoad"> & {
  wrapperClassName?: string;
};

/**
 * next/image wrapper with a token-coloured blurred placeholder and a graceful fallback.
 * Always fills its wrapper — size the wrapper with aspect-ratio or explicit height.
 */
export function SmartImage({ className, wrapperClassName, alt, ...props }: SmartImageProps) {
  // Priority (LCP) images paint immediately — fading them in would delay LCP until hydration.
  const [loaded, setLoaded] = useState(Boolean(props.priority));
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-surface-2", wrapperClassName)}>
      {!loaded && !failed && (
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_80%_at_30%_20%,var(--accent-2),var(--surface-2)_60%,var(--accent)_140%)] blur-xl"
        />
      )}
      {failed ? (
        <div role="img" aria-label={alt} className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-accent-2 text-ink-muted">
          <Monogram className="size-8 opacity-60" />
          <span className="eyebrow text-[10px]">Photo coming soon</span>
        </div>
      ) : (
        <Image
          {...props}
          alt={alt}
          fill
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "object-cover transition-[opacity,transform] duration-500 ease-out",
            loaded ? "opacity-100" : "opacity-0",
            className,
          )}
        />
      )}
    </div>
  );
}
