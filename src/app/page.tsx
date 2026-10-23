import { Hero } from "@/components/landing/hero";
import { FilmSection } from "@/components/landing/film-section";
import { LookbookStrip } from "@/components/landing/lookbook-strip";
import { WorksSection } from "@/components/landing/works-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CompareSection } from "@/components/landing/compare-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { Faq } from "@/components/landing/faq";
import { CtaSection } from "@/components/landing/cta-section";
import { CategoriesSection } from "@/components/landing/categories-section";
import { SampleSection } from "@/components/landing/sample-section";

export default function Home() {
  return (
    <>
      <Hero />
      <WorksSection />
      <FilmSection />
      <LookbookStrip />
      <CategoriesSection />
      <HowItWorks />
      <CompareSection />
      <PricingSection />
      <SampleSection />
      <Faq />
      <CtaSection />
    </>
  );
}
