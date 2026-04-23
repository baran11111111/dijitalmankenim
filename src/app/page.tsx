import { Hero } from "@/components/landing/hero";
import { InstagramSection } from "@/components/landing/instagram-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaSection } from "@/components/landing/cta-section";

export default function Home() {
  return (
    <>
      {/* 1. Hero — açıklama + CTA */}
      <Hero />

      {/* 2. Instagram'dan Ulaş — doğrudan aksiyon */}
      <InstagramSection />

      {/* 3. Nasıl Çalışır — 3 adım süreci */}
      <HowItWorks />

      {/* 4. Fiyatlandırma — 4 gerçek paket */}
      <PricingSection />

      {/* 5. Referanslar — müşteri görüşleri */}
      <Testimonials />

      {/* 7. CTA + WhatsApp */}
      <CtaSection />
    </>
  );
}
