"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { SectionBadge } from "@/components/shared/section-badge";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Uretim ne kadar surer?",
    a: "Foto uretimleri ortalama 5-17 saniye, video uretimleri ise modele gore 20-60 saniye surer.",
  },
  {
    q: "Ucretsiz deneme var mi?",
    a: "Evet. Yeni hesaplarda otomatik olarak 5 ucretsiz token tanimlanir.",
  },
  {
    q: "API erisimi sunuyor musunuz?",
    a: "Evet. Dashboard > API Erisim bolumunden anahtar olusturup entegrasyona baslayabilirsiniz.",
  },
];

export function Faq() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-[var(--background)] py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <SectionBadge
            icon={<HelpCircle className="h-4 w-4 text-[var(--primary)]" />}
            text="SSS"
          />
          <h2 className="mt-5 text-3xl font-bold text-[var(--text)] sm:text-5xl">
            Sık Sorulan Sorular
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => (
            <button
              key={faq.q}
              className="w-full rounded-xl border border-[var(--border)] bg-white p-5 text-left"
              onClick={() => setActive(index === active ? -1 : index)}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium text-[var(--text)]">{faq.q}</p>
                <ChevronDown
                  className={cn("h-4 w-4 text-[var(--text-muted)] transition-transform", active === index && "rotate-180")}
                />
              </div>
              {active === index ? (
                <p className="mt-3 text-sm text-[var(--text-secondary)]">{faq.a}</p>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
