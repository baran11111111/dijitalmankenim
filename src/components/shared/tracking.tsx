"use client";

import { useEffect } from "react";
import Script from "next/script";
import { track } from "@vercel/analytics";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Instagram / WhatsApp butonlarına tıklamaları Vercel Analytics ve Meta Pixel'e bildirir
export function ClickTracker() {
  useEffect(() => {
    function tikla(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;
      const href = link.href;
      const kanal = href.includes("wa.me")
        ? "whatsapp"
        : href.includes("ig.me") || href.includes("instagram.com")
          ? "instagram"
          : null;
      if (!kanal) return;

      const konum =
        link.closest<HTMLElement>("[data-konum]")?.dataset.konum ??
        link.closest("section")?.id ??
        "genel";
      const paket = link.closest<HTMLElement>("[data-paket]")?.dataset.paket;

      track("iletisim_tiklama", { kanal, konum, ...(paket ? { paket } : {}) });
      window.fbq?.("track", "Contact", { kanal, konum, ...(paket ? { paket } : {}) });
    }
    document.addEventListener("click", tikla);
    return () => document.removeEventListener("click", tikla);
  }, []);

  return null;
}

// Meta Pixel — yalnızca NEXT_PUBLIC_META_PIXEL_ID tanımlıysa yüklenir
export function MetaPixel() {
  if (!PIXEL_ID) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
    </Script>
  );
}
