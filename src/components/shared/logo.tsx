import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

export function Logo({ className, variant = "dark" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2.5 font-bold text-xl tracking-tight",
        className
      )}
    >
      <Image 
        src="/logo.png" 
        alt="Dijital Mankenim Logo" 
        width={220} 
        height={60} 
        className="h-12 sm:h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        priority
      />
    </Link>
  );
}
