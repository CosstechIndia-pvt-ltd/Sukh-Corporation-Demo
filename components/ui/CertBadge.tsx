import type { Certification } from "@/data/certifications";
import { cn } from "@/lib/cn";

/** Original monochrome seals — deliberately not the real trademarked logos. */
export function CertBadge({ kind, className }: { kind: Certification["kind"]; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.25 } as const;
  const text = { fill: "currentColor", fontFamily: "var(--font-manrope), sans-serif", textAnchor: "middle" } as const;
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={labels[kind]} className={cn("size-20", className)}>
      {kind === "rera" && (
        <>
          <circle cx="60" cy="60" r="54" {...common} />
          <circle cx="60" cy="60" r="46" {...common} strokeDasharray="1.5 3" />
          <path d="M40 66l20-18 20 18M45 62v14h30V62" {...common} />
          <text x="60" y="40" fontSize="10" fontWeight="700" letterSpacing="3" {...text}>RERA</text>
          <text x="60" y="92" fontSize="6.5" fontWeight="600" letterSpacing="1.6" {...text}>REGISTERED</text>
        </>
      )}
      {kind === "iso" && (
        <>
          <path d="M60 6l47 27v54l-47 27-47-27V33z" {...common} />
          <path d="M60 16l38 22v44l-38 22-38-22V38z" {...common} strokeDasharray="1.5 3" />
          <text x="60" y="58" fontSize="17" fontWeight="300" letterSpacing="1" fontFamily="var(--font-fraunces), serif" fill="currentColor" textAnchor="middle">ISO</text>
          <text x="60" y="73" fontSize="8" fontWeight="700" letterSpacing="1.2" {...text}>9001:2015</text>
          <text x="60" y="86" fontSize="5.5" fontWeight="600" letterSpacing="1.4" {...text}>QUALITY</text>
        </>
      )}
      {kind === "credai" && (
        <>
          <path d="M60 8l44 14v34c0 28-20 46-44 56C36 102 16 84 16 56V22z" {...common} />
          <path d="M42 54h36M42 62h36M42 70h24" {...common} />
          <text x="60" y="42" fontSize="9" fontWeight="700" letterSpacing="2.4" {...text}>CREDAI</text>
          <text x="60" y="88" fontSize="6" fontWeight="600" letterSpacing="1.6" {...text}>MEMBER</text>
        </>
      )}
      {kind === "igbc" && (
        <>
          <circle cx="60" cy="60" r="54" {...common} />
          <path d="M60 86c-14-8-18-24-10-40 8 4 18 10 22 22 3 9-2 15-12 18zM60 86V58" {...common} />
          <text x="60" y="34" fontSize="9" fontWeight="700" letterSpacing="2.4" {...text}>IGBC</text>
          <text x="60" y="102" fontSize="6" fontWeight="600" letterSpacing="1.6" {...text}>GREEN AP</text>
        </>
      )}
    </svg>
  );
}

const labels: Record<Certification["kind"], string> = {
  rera: "RERA registered seal",
  iso: "ISO 9001:2015 certified seal",
  credai: "CREDAI member seal",
  igbc: "IGBC green building seal",
};
