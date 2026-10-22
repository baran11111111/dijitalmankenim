"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function BeforeAfterSlider({
  before,
  after,
  alt,
  className,
  sizes = "(max-width: 1024px) 90vw, 420px",
  priority = false,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <div className={cn("relative select-none overflow-hidden", className)}>
      {/* Sonra — tam görsel */}
      <Image
        src={after}
        alt={`${alt} — AI manken görseli`}
        fill
        priority={priority}
        className="object-cover object-top"
        sizes={sizes}
      />

      {/* Önce — sol tarafa kırpılmış */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${alt} — ürün fotoğrafı`}
          fill
          priority={priority}
          className="object-cover object-top"
          sizes={sizes}
        />
      </div>

      {/* Etiketler */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        Önce
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-wine px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cream">
        Sonra
      </span>

      {/* Ayırıcı çizgi + tutamak */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs font-bold text-[var(--primary)] shadow-lg">
          ⇆
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label={`${alt}: önce ve sonra karşılaştırması`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
