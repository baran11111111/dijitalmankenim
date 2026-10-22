export const INSTAGRAM_USERNAME = "dijitalmankenim";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;
// Instagram uygulamasında doğrudan DM ekranını açar
export const INSTAGRAM_DM_URL = `https://ig.me/m/${INSTAGRAM_USERNAME}`;

// Ülke koduyla, boşluksuz yazın (örn. "905551234567"). Boş kalırsa WhatsApp butonları gizlenir.
export const WHATSAPP_NUMBER = "";
export const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Merhaba, ürünlerim için manken görseli hakkında bilgi almak istiyorum."
    )}`
  : null;

export type BeforeAfter = {
  title: string;
  before: string;
  after: string;
};

// Müşteri işleri — önce (askı/zemin fotoğrafı) ve sonra (AI manken) görselleri
export const beforeAfterWorks: BeforeAfter[] = [
  {
    title: "Kadife Elbise",
    before: "/images/once-sonra/kadife-once.jpg",
    after: "/images/once-sonra/kadife-sonra.jpg",
  },
  {
    title: "Eşofman Takımı",
    before: "/images/once-sonra/esofman-once.jpg",
    after: "/images/once-sonra/esofman-sonra.jpg",
  },
  {
    title: "Pijama Takımı",
    before: "/images/once-sonra/pijama-once.jpg",
    after: "/images/once-sonra/pijama-sonra.jpg",
  },
  {
    title: "İşlemeli Gömlek",
    before: "/images/once-sonra/gomlek-once.jpg",
    after: "/images/once-sonra/gomlek-sonra.jpg",
  },
];
