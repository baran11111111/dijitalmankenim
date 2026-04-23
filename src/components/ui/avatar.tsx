import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  size?: "sm" | "md" | "lg";
  fallback?: string;
}

export function Avatar({
  className,
  src,
  alt,
  size = "md",
  fallback,
  ...props
}: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt || "Avatar"}
        className={cn(
          "rounded-full object-cover",
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center font-medium",
        sizes[size],
        className
      )}
      {...props}
    >
      {fallback ? (
        fallback.charAt(0).toUpperCase()
      ) : (
        <User className="w-1/2 h-1/2" />
      )}
    </div>
  );
}
