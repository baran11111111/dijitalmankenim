import { Quote } from "lucide-react";
import { SectionBadge } from "@/components/shared/section-badge";

export function Testimonials() {
  return (
    <section id="referanslar" className="bg-[var(--background)] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center">
          <SectionBadge
            icon={<Quote className="h-4 w-4 text-[var(--gold)]" />}
            text="Referanslar"
          />
          <h2 className="mt-5 text-3xl font-bold text-[var(--text)] sm:text-5xl">
            Dünyanın dört bir yanından{" "}
            <br />
            <span className="text-accent-italic">markalar tarafından seviliyor</span>
          </h2>
          <span className="gold-divider mt-4" />
        </div>
      </div>
    </section>
  );
}
