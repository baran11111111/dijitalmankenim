import { Hero } from "@/components/landing/hero";
import { LookbookStrip } from "@/components/landing/lookbook-strip";
import { WorksSection } from "@/components/landing/works-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CompareSection } from "@/components/landing/compare-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { Faq } from "@/components/landing/faq";
import { CtaSection } from "@/components/landing/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <WorksSection />
      <LookbookStrip />
      <HowItWorks />
      <CompareSection />
      <PricingSection />
      <Faq />
      <CtaSection />
    </>
  );
}
