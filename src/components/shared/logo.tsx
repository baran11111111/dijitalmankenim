import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

// Instagram profilindeki krem "DM" monogramıyla uyumlu logo
export function Logo({ className, variant = "dark" }: LogoProps) {
  const light = variant === "light";

  return (
    <Link
      href="/"
      aria-label="Dijital Mankenim — ana sayfa"
      className={cn("group flex items-center gap-3", className)}
    >
      <span
        className={cn(
          "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border",
          light ? "border-cream/30 bg-cream text-ink" : "border-ink/15 bg-cream text-ink"
        )}
      >
        <span className="font-display text-[19px] leading-none tracking-[-0.06em]">DM</span>
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
