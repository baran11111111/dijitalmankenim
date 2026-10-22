import Image from "next/image";
import { ContactButtons } from "@/components/shared/contact-buttons";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-wine text-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="eyebrow text-cream/60">İlk adım</p>
          <h2 className="font-display mt-4 text-5xl leading-[1] sm:text-7xl">
            Bir ürününüzle <em>deneyin.</em>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/70">
            En çok satmak istediğiniz ürünün fotoğrafını gönderin. 200 TL&apos;lik deneme
            çekimiyle sonucu kendi ürününüzde görün, sonra karar verin.
          </p>
          <ContactButtons tone="light" className="mt-10" instagramLabel="Fotoğrafımı Göndereceğim" />
        </div>

        <div className="relative mx-auto hidden h-[420px] w-full max-w-sm lg:block">
          <div className="absolute left-0 top-8 h-80 w-56 -rotate-6 overflow-hidden rounded-2xl border-4 border-cream/90 shadow-2xl">
            <Image src="/images/once-sonra/kadife-once.jpg" alt="Askıdaki kadife elbise" fill className="object-cover" sizes="224px" />
          </div>
          <div className="absolute right-0 top-0 h-96 w-64 rotate-3 overflow-hidden rounded-2xl border-4 border-cream shadow-2xl">
            <Image src="/images/once-sonra/kadife-sonra.jpg" alt="Kadife elbise AI mankende" fill className="object-cover object-top" sizes="256px" />
          </div>
        </div>
      </div>
    </section>
  );
}
