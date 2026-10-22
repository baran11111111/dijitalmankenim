import { cn } from "@/lib/utils";

interface LoopVideoProps {
  src: string;
  poster: string;
  className?: string;
}

// Sessiz, otomatik ve sonsuz dönen arka plan videosu
export function LoopVideo({ src, poster, className }: LoopVideoProps) {
  return (
    <video
      className={cn("h-full w-full object-cover", className)}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
