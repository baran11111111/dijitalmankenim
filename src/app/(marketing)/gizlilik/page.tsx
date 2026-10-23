import type { Metadata } from "next";
import { SimplePage } from "@/components/shared/simple-page";
import { INSTAGRAM_USERNAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gizlilik ve KVKK — Dijital Mankenim",
};

// Not: Bu metin genel bir bilgilendirmedir; şirket/şahıs bilgilerinizle güncelleyip
// gerekirse bir hukukçuya kontrol ettirin.
export default function GizlilikPage() {
  return (
    <SimplePage eyebrow="Gizlilik" title={<>Gizlilik ve <em>KVKK.</em></>}>
      <p>
        Bu metin, Dijital Mankenim hizmeti kapsamında bizimle paylaştığınız bilgilerin
        nasıl kullanıldığını açıklar.
      </p>

      <h2>Hangi bilgileri alıyoruz?</h2>
      <p>
        Instagram, WhatsApp veya sitemizdeki ücretsiz örnek formu üzerinden bize gönderdiğiniz
        ürün fotoğrafları, mesajlarınız ve sipariş için gerekli iletişim bilgileriniz
        (Instagram kullanıcı adı, telefon). Form ile gönderilen fotoğraflar erişime kapalı bir
        depolama alanında saklanır.
      </p>

      <h2>Ne için kullanıyoruz?</h2>
      <p>
        Yalnızca siparişinizi hazırlamak, size teslim etmek ve sizinle iletişim kurmak için.
        Ürün fotoğraflarınızı ve size teslim edilen görselleri, izniniz olmadan örnek
        çalışma olarak paylaşmayız.
      </p>

      <h2>Üçüncü taraflar</h2>
      <p>
        Görselleri üretirken yapay zeka hizmet sağlayıcılarından yararlanırız. Mesajlaşma
        Instagram (Meta) ve WhatsApp altyapısı üzerinden gerçekleşir. Bu web sitesi ve form
        ile gönderilen dosyalar Vercel üzerinde barındırılır. Sitenin nasıl kullanıldığını
        anlamak için kişisel veri içermeyen ziyaret istatistikleri (Vercel Analytics) ve
        reklam ölçümü için Meta Pixel kullanılabilir.
      </p>

      <h2>Haklarınız</h2>
      <p>
        6698 sayılı KVKK kapsamında verilerinize erişme, düzeltilmesini veya silinmesini
        isteme hakkınız vardır. Talepleriniz için Instagram&apos;dan{" "}
        <strong>@{INSTAGRAM_USERNAME}</strong> hesabına yazabilirsiniz.
      </p>
    </SimplePage>
  );
}
