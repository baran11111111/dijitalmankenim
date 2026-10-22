import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Ürünüm görselde aslına uygun mu görünecek?",
    a: "Kumaşın dokusu, rengi, deseni ve düğme, yaka gibi detayların aslına uygun kalmasına özen gösteriyoruz. Beğenmediğiniz ya da ürününüzü yansıtmadığını düşündüğünüz kareleri revize ediyoruz.",
  },
  {
    q: "Nasıl bir fotoğraf göndermeliyim?",
    a: "Telefonla çekilmiş, net ve iyi ışık almış bir fotoğraf yeterli. Ürün askıda, mankende ya da düz bir zemine serili olabilir. Önemli detaylar varsa (arka sırt, işleme, etiket) onların da yakın çekimini ekleyin.",
  },
  {
    q: "Mankeni, mekânı ve pozu seçebilir miyim?",
    a: "Evet. Kadın, erkek ya da tesettürlü manken; stüdyo, ev, sokak veya özel bir mekân — istediğiniz tarzı DM'de anlatın ya da beğendiğiniz bir örnek görsel gönderin.",
  },
  {
    q: "Sipariş ve ödeme nasıl oluyor?",
    a: "Instagram'dan yazıyorsunuz, ürününüze ve ihtiyacınıza göre paketi birlikte belirliyoruz. Onayınızdan sonra ödeme detaylarını iletiyor ve üretime başlıyoruz.",
  },
  {
    q: "Görselleri nerede kullanabilirim?",
    a: "Teslim edilen görselleri Instagram, web siteniz ve pazaryeri mağazalarınız gibi kendi satış kanallarınızda kullanabilirsiniz. Pazaryerlerinin görsel kurallarını ayrıca kontrol etmenizi öneririz.",
  },
  {
    q: "Gönderdiğim fotoğraflar ne oluyor?",
    a: "Yalnızca sizin siparişinizi hazırlamak için kullanılır. İzniniz olmadan çalışmanızı örnek olarak paylaşmayız.",
  },
];

export function Faq() {
  return (
    <section id="sss" className="scroll-mt-20 bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <div>
          <p className="eyebrow text-wine">Sık sorulan sorular</p>
          <h2 className="font-display mt-4 text-5xl leading-[1] text-ink sm:text-6xl">
            Aklınızdaki <em>sorular.</em>
          </h2>
          <p className="mt-6 max-w-sm text-stone">
            Burada yoksa DM&apos;den sorun, hızlıca dönelim.
          </p>
        </div>

        <div className="border-t border-line">
          {faqs.map((item) => (
            <details key={item.q} className="faq group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-ink">
                {item.q}
                <Plus className="faq-icon h-5 w-5 flex-shrink-0 text-wine transition-transform duration-200" />
              </summary>
              <p className="-mt-1 pb-6 pr-10 leading-relaxed text-stone">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
