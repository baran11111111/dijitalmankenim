"use client";

import { usePathname } from "next/navigation";
import { INSTAGRAM_DM_URL, WHATSAPP_URL } from "@/lib/site";
import { InstagramIcon, WhatsAppIcon } from "./brand-icons";

// Telefonda ekranın altında sabit duran sipariş butonu
export function MobileCta() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div data-konum="mobil-alt-bar" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 p-3 backdrop-blur-md sm:hidden">
      <div className="flex gap-2">
        <a
          href={INSTAGRAM_DM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-bold text-cream"
        >
          <InstagramIcon size={17} />
          DM ile Sipariş Ver
        </a>
        {WHATSAPP_URL && (
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp'tan yaz"
            className="flex w-14 items-center justify-center rounded-full bg-whatsapp text-white"
          >
            <WhatsAppIcon size={20} />
          </a>
        )}
      </div>
    </div>
  );
}
