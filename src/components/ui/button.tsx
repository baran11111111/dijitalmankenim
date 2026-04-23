"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "accent" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-sm",
      outline:
        "border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary-50)]",
      ghost: "text-[var(--primary)] hover:bg-[var(--primary-50)]",
      accent: "bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)]",
      danger: "bg-[var(--error)] text-white hover:bg-red-600",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-8 py-3.5 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
        {rightIcon && !loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
export type { ButtonProps };
