import type { Metadata } from "next";
import { SimplePage } from "@/components/shared/simple-page";
import { ContactButtons } from "@/components/shared/contact-buttons";
import { INSTAGRAM_USERNAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim — Dijital Mankenim",
};

export default function IletisimPage() {
  return (
    <SimplePage eyebrow="İletişim" title={<>Bize <em>yazın.</em></>}>
      <p>
        Sipariş, fiyat ve tüm sorularınız için en hızlı yol Instagram DM.
        Ürün fotoğrafınızı doğrudan mesaja ekleyebilirsiniz.
      </p>
      <p>
        Instagram: <strong>@{INSTAGRAM_USERNAME}</strong>
      </p>
      <ContactButtons className="!mt-10" />
    </SimplePage>
  );
}
