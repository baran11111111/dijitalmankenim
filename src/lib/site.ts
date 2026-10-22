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

// Aynı ürünün (katlanmış tişört) farklı manken ve sahnelerdeki görselleri
export const productVariants = [
  { src: "/images/once-sonra/tisort-studyo.jpg", label: "Beyaz stüdyo" },
  { src: "/images/once-sonra/tisort-poz.jpg", label: "Farklı poz" },
  { src: "/images/once-sonra/tisort-sari.jpg", label: "Farklı manken" },
  { src: "/images/once-sonra/tisort-pembe.jpg", label: "Renkli fon" },
];
