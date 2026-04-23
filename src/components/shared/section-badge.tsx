import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

export function SectionBadge({ icon, text, className }: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/8 px-4 py-1.5 text-sm font-semibold text-[var(--gold-dark)]",
        className
      )}
    >
      {icon}
      {text}
    </div>
  );
}
