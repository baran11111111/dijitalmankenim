import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

// İnce çizgili, iç içe geçmiş D ve M harfleri
export function MonogramMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.2}
      strokeLinejoin="miter"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 22 V78 H44 A28 28 0 0 0 44 22 Z" />
      <path d="M34 78 V22 L56 62 L78 22 V78" />
    </svg>
  );
}

// Instagram profilindeki krem "DM" monogramıyla aynı logo
export function Logo({ className, variant = "dark" }: LogoProps) {
  const light = variant === "light";

  return (
    <Link
      href="/"
      aria-label="Dijital Mankenim — ana sayfa"
      className={cn("group flex items-center gap-3", className)}
    >
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#efe9d2] text-[#4a4a3f] shadow-[inset_0_0_0_1px_rgba(74,74,63,0.15)]">
        <MonogramMark className="h-7 w-7" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[22px] leading-none",
            light ? "text-cream" : "text-ink"
          )}
        >
          Dijital Mankenim
        </span>
        <span
          className={cn(
            "mt-1 text-[9px] font-bold uppercase tracking-[0.28em]",
            light ? "text-cream/50" : "text-stone"
          )}
        >
          AI Studio
        </span>
      </span>
    </Link>
  );
}
