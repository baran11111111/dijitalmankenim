import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { MobileCta } from "@/components/shared/mobile-cta";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const SITE_DESCRIPTION =
  "Askıdaki ürün fotoğrafınızı gönderin, 48 saatte profesyonel AI manken görselleriniz hazır. Butikler, toptancılar ve e-ticaret satıcıları için 200 TL'den başlayan paketler.";

export const metadata: Metadata = {
  title: "Dijital Mankenim — Ürününüz, AI Mankende",
  description: SITE_DESCRIPTION,
  keywords: [
    "dijital manken",
    "AI manken",
    "yapay zeka manken",
    "ürün fotoğrafçılığı",
    "butik ürün çekimi",
    "e-ticaret görsel",
  ],
  openGraph: {
    title: "Dijital Mankenim — Ürününüz, AI Mankende",
    description: SITE_DESCRIPTION,
    locale: "tr_TR",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f0e6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${playfair.variable} ${inter.variable} ${instrument.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden w-full relative">
        <Navbar />
        <main className="flex-1 w-full overflow-x-hidden">{children}</main>
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}
