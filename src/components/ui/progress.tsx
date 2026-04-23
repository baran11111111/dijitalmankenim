import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
  showLabel?: boolean;
}

export function Progress({ value, className, showLabel }: ProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="w-full bg-[var(--surface)] rounded-full h-2.5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-[var(--text-muted)] mt-1 text-right">
          %{Math.round(value)}
        </p>
      )}
    </div>
  );
}
