import type { Metadata } from "next";
import { SimplePage } from "@/components/shared/simple-page";
import { ContactButtons } from "@/components/shared/contact-buttons";

export const metadata: Metadata = {
  title: "Hakkımızda — Dijital Mankenim",
};

export default function HakkimizdaPage() {
  return (
    <SimplePage eyebrow="Hakkımızda" title={<>Küçük markalar için <em>büyük vitrin.</em></>}>
      <p>
        Dijital Mankenim, butiklerin, toptancıların ve e-ticaret satıcılarının ürünlerini
        yapay zeka ile mankene giydiren bir görsel stüdyosu.
      </p>
      <p>
        Her sezon onlarca yeni ürün çıkaran bir işletme için manken, fotoğrafçı ve stüdyo
        ayarlamak hem pahalı hem yavaş. Biz bu süreci tek bir ürün fotoğrafına indiriyoruz:
        siz telefonla çekip gönderiyorsunuz, biz satışa hazır manken görsellerini teslim
        ediyoruz.
      </p>
      <p>
        Tüm süreci Instagram üzerinden, birebir yazışarak yürütüyoruz. Ne istediğinizi
        anlatmanız yeterli.
      </p>
      <ContactButtons className="!mt-10" />
    </SimplePage>
  );
}
