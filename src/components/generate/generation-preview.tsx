import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function GenerationPreview({
  templateImage,
  productImage,
}: {
  templateImage?: string;
  productImage?: string;
}) {
  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-semibold text-[var(--text)]">Onizleme</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="relative h-56 overflow-hidden rounded-xl bg-[var(--surface)]">
            {templateImage ? (
              <Image src={templateImage} alt="Sablon" fill className="object-cover" sizes="40vw" />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-[var(--text-muted)]">
                Sablon secin
              </div>
            )}
          </div>
          <div className="relative h-56 overflow-hidden rounded-xl bg-[var(--surface)]">
            {productImage ? (
              <Image src={productImage} alt="Urun" fill className="object-cover" sizes="40vw" />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-[var(--text-muted)]">
                Urun gorseli yukleyin
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
