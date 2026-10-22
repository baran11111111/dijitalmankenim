import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { INSTAGRAM_DM_URL, WHATSAPP_URL } from "@/lib/site";
import { InstagramIcon, WhatsAppIcon } from "./brand-icons";

interface ContactButtonsProps {
  tone?: "dark" | "light";
  className?: string;
  instagramLabel?: string;
}

// Instagram DM (ana aksiyon) + WhatsApp (numara tanımlıysa)
export function ContactButtons({
  tone = "dark",
  className,
  instagramLabel = "Instagram'dan DM At",
}: ContactButtonsProps) {
  const onDark = tone === "light";

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      <a
        href={INSTAGRAM_DM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-sm font-bold transition-all duration-200",
          onDark
            ? "bg-cream text-ink hover:bg-white"
            : "bg-ink text-cream hover:bg-wine"
        )}
      >
        <InstagramIcon size={18} />
        {instagramLabel}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
      {WHATSAPP_URL && (
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center justify-center gap-2.5 rounded-full border px-7 py-4 text-sm font-bold transition-all duration-200",
            onDark
              ? "border-cream/25 text-cream hover:border-cream/60"
              : "border-ink/20 text-ink hover:border-whatsapp hover:text-whatsapp"
          )}
        >
          <WhatsAppIcon size={18} />
          WhatsApp
        </a>
      )}
    </div>
  );
}
