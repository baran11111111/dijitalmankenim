export type CategoryMedia =
  | { type: "video"; src: string; poster: string; label: string }
  | { type: "image"; src: string; label: string };

export type Category = {
  slug: string;
  // Menü ve kartlarda görünen kısa ad
  name: string;
  // Sayfa başlığı ve Google başlığı
  title: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  headlineEm: string;
  intro: string;
  heroVideo: { src: string; poster: string };
  cardImage: string;
  points: { title: string; text: string }[];
  media: CategoryMedia[];
  faq: { q: string; a: string }[];
};

export const categories: Category[] = [
  {
    slug: "tesettur-giyim-manken-cekimi",
    name: "Tesettür giyim",
    title: "Tesettür Giyim için AI Manken Çekimi",
    metaDescription:
      "Tesettür butikleri için yapay zeka ile manken çekimi. Ferace, tunik, abaya ve tesettür abiyelerinizi tesettürlü mankenler üzerinde, 48 saatte ve 200 TL'den başlayan fiyatlarla gösterin.",
    eyebrow: "Tesettür butikleri için",
    headline: "Tesettür ürünleriniz,",
    headlineEm: "tesettürlü mankende.",
    intro:
      "Tesettür giyimde doğru mankeni bulmak zor ve pahalı. Ürününüzün askıda çekilmiş fotoğrafını gönderin; ferace, tunik, kap, abaya ya da abiyenizi tesettürlü mankenler üzerinde, istediğiniz mekânda gösterelim.",
    heroVideo: { src: "/videos/tesettur-gunluk.mp4", poster: "/videos/tesettur-gunluk.jpg" },
    cardImage: "/videos/tesettur-gunluk.jpg",
    points: [
      { title: "Tesettürlü mankenler", text: "Şal, eşarp ve bone kullanımına uygun, farklı yaş ve tiplerde mankenler." },
      { title: "Günlükten abiyeye", text: "Tunik ve ferace için sokak çekimi, abiye için yalı ya da salon atmosferi." },
      { title: "Kumaşa özen", text: "Kadife, krep, şifon gibi kumaşların dokusunun ve renginin aslına uygun kalmasına özen gösteriyoruz." },
    ],
    media: [
      { type: "video", src: "/videos/tesettur-gunluk.mp4", poster: "/videos/tesettur-gunluk.jpg", label: "Günlük tesettür · Karaköy" },
      { type: "video", src: "/videos/zumrut-yali.mp4", poster: "/videos/zumrut-yali.jpg", label: "Tesettür abiye · Yalı" },
    ],
    faq: [
      { q: "Şal ve eşarp bağlama şeklini seçebilir miyim?", a: "Evet. Beğendiğiniz bir bağlama şeklinin fotoğrafını gönderin, mankende aynı stili kullanmaya çalışalım." },
      { q: "Ürünüm tesettürlü mankende değil askıda çekildi, olur mu?", a: "Olur. Askıda, cansız mankende ya da yere serili fotoğraflar yeterli." },
    ],
  },
  {
    slug: "gelinlik-abiye-manken-cekimi",
    name: "Gelinlik ve abiye",
    title: "Gelinlik ve Abiye için AI Manken Çekimi",
    metaDescription:
      "Gelinlik ve abiye mağazaları için yapay zeka ile manken fotoğrafı ve video. Ürünlerinizi saray balo salonunda, boğazda ya da Kapadokya'da gösterin.",
    eyebrow: "Gelinlik ve abiye mağazaları için",
    headline: "Gelinliğiniz,",
    headlineEm: "balo salonunda.",
    intro:
      "Gelinlik ve abiyede müşteriyi etkileyen şey atmosfer. Mağazanızdaki ürünün fotoğrafından; saray balo salonunda dans eden bir gelin, Kapadokya'da rüzgârda dalgalanan bir abiye ya da yalı merdiveninden inen bir gece elbisesi üretelim.",
    heroVideo: { src: "/videos/gelin-dans.mp4", poster: "/videos/gelin-dans.jpg" },
    cardImage: "/videos/gelin-dans.jpg",
    points: [
      { title: "Etkileyici mekânlar", text: "Balo salonu, saray merdiveni, boğaz kıyısı, Kapadokya — stüdyo kiralamadan." },
      { title: "Hareketli video", text: "Kuyruğun, tülün ve duvağın hareketini gösteren kısa videolar; Reels ve hikâye için hazır." },
      { title: "Koleksiyon çekimi", text: "Sezon koleksiyonunuzun tamamını aynı atmosferde, tutarlı bir çizgide çekelim." },
    ],
    media: [
      { type: "video", src: "/videos/gelin-dans.mp4", poster: "/videos/gelin-dans.jpg", label: "Gelinlik · Balo salonu" },
      { type: "video", src: "/videos/kapadokya.mp4", poster: "/videos/kapadokya.jpg", label: "İpek abiye · Kapadokya" },
      { type: "video", src: "/videos/zumrut-yali.mp4", poster: "/videos/zumrut-yali.jpg", label: "Kadife abiye · Yalı" },
      { type: "image", src: "/images/examples/example-12.png", label: "Gece elbisesi · Saray merdiveni" },
      { type: "image", src: "/images/examples/example-10.png", label: "Saten elbise · Stüdyo" },
      { type: "image", src: "/images/examples/example-01.png", label: "Saten abiye · Gece şehir" },
    ],
    faq: [
      { q: "Gelinliğin işlemeleri ve dantelleri görünür mü?", a: "Ürünün yakın çekim fotoğraflarını da gönderirseniz detayların aslına uygun kalmasına özen gösteriyoruz; beğenmediğiniz kareleri revize ediyoruz." },
      { q: "Video ne kadar sürüyor?", a: "Kısa tanıtım videoları genellikle 8 saniye civarında; Reels ve hikâyeler için ideal." },
    ],
  },
  {
    slug: "e-ticaret-urun-fotografi",
    name: "E-ticaret ve Trendyol",
    title: "Trendyol ve E-ticaret için Mankenli Ürün Fotoğrafı",
    metaDescription:
      "Trendyol, Hepsiburada ve kendi e-ticaret siteniz için yapay zeka ile mankenli ürün fotoğrafı. Beyaz ve gri stüdyo fonu, 48 saatte teslim, 200 TL'den başlayan fiyatlar.",
    eyebrow: "Pazaryeri ve e-ticaret satıcıları için",
    headline: "Listelemeniz için",
    headlineEm: "mankenli fotoğraf.",
    intro:
      "Mankenli ürün fotoğrafı, askıdaki fotoğrafa göre ürünü çok daha anlaşılır gösterir. Ürününüzü düz stüdyo fonunda, önden, yandan ve arkadan mankende gösterelim; listelemelerinize hemen ekleyin.",
    heroVideo: { src: "/videos/manken-tisort.mp4", poster: "/videos/manken-tisort-poster.jpg" },
    cardImage: "/images/once-sonra/tisort-studyo.jpg",
    points: [
      { title: "Düz stüdyo fonu", text: "Beyaz ve gri fon seçenekleri; ürün sayfalarında temiz ve tutarlı bir görünüm." },
      { title: "Farklı açılar ve pozlar", text: "Aynı üründen önden, yandan ve farklı pozlarda birden fazla kare." },
      { title: "Hızlı teslim", text: "48 saatte teslim; yeni ürünü bekletmeden yayına alın." },
    ],
    media: [
      { type: "image", src: "/images/once-sonra/tisort-once.jpg", label: "Gönderilen fotoğraf" },
      { type: "image", src: "/images/once-sonra/tisort-studyo.jpg", label: "Gri stüdyo" },
      { type: "image", src: "/images/once-sonra/tisort-poz.jpg", label: "Farklı poz" },
      { type: "image", src: "/images/once-sonra/tisort-sari.jpg", label: "Farklı manken" },
    ],
    faq: [
      { q: "Görseller pazaryerlerinin kurallarına uygun mu?", a: "Fon, oran ve çözünürlüğü isteğinize göre hazırlıyoruz. Yine de her pazaryerinin güncel görsel kurallarını kontrol etmenizi öneririz." },
      { q: "Aynı ürünü farklı renklerde gösterebilir misiniz?", a: "Her renk için ürün fotoğrafını göndermeniz en doğru sonucu verir." },
    ],
  },
  {
    slug: "toptanci-katalog-cekimi",
    name: "Toptancılar",
    title: "Toptancılar için AI Katalog Çekimi",
    metaDescription:
      "Merter, Laleli ve Osmanbey toptancıları için yapay zeka ile katalog çekimi. Sezonun tüm ürünlerini mankende, yüksek adet için özel fiyatla gösterin.",
    eyebrow: "Toptancılar ve üreticiler için",
    headline: "Bütün sezon,",
    headlineEm: "tek seferde katalogda.",
    intro:
      "Her sezon onlarca, yüzlerce yeni model çıkaran toptancılar için her ürüne manken çekimi yaptırmak imkânsız. Ürünlerinizin fotoğraflarını toplu gönderin; kadın, erkek ve çocuk mankenlerle kataloğunuzu hazırlayalım.",
    heroVideo: { src: "/videos/erkek-takim.mp4", poster: "/videos/erkek-takim.jpg" },
    cardImage: "/videos/erkek-takim.jpg",
    points: [
      { title: "Yüksek adet, özel fiyat", text: "Sezonluk ve aylık düzenli çalışmalar için paket fiyatlarından daha uygun teklif." },
      { title: "Kadın, erkek, çocuk", text: "Tüm reyonlarınız için uygun mankenler; tek yerden, tutarlı bir katalog." },
      { title: "Bayilerinize hazır", text: "Instagram, WhatsApp kataloğu ve bayi sunumları için kullanıma hazır görseller." },
    ],
    media: [
      { type: "video", src: "/videos/erkek-takim.mp4", poster: "/videos/erkek-takim.jpg", label: "Erkek giyim · Bebek sahili" },
      { type: "video", src: "/videos/cocuk-bahce.mp4", poster: "/videos/cocuk-bahce.jpg", label: "Çocuk giyim · Lavanta bahçesi" },
      { type: "image", src: "/images/examples/example-05.png", label: "Erkek takım · Sahil yolu" },
      { type: "image", src: "/images/examples/example-06.png", label: "Aile koleksiyonu" },
    ],
    faq: [
      { q: "Kaç ürünü birden gönderebilirim?", a: "Sınır yok. Adede göre teslim süresini ve özel fiyatı birlikte planlayalım." },
      { q: "Kataloğumuz için aynı mankeni kullanabilir misiniz?", a: "Tutarlı bir katalog için mümkün olduğunca aynı manken ve fon çizgisinde çalışıyoruz; detayları DM'den konuşalım." },
    ],
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
