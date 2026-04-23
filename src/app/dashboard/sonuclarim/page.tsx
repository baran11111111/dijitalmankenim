import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const results = Array.from({ length: 8 }, (_, index) => ({
  id: `RES-${100 + index}`,
  image: `https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=${900 + index}&auto=format&fit=crop`,
  date: "13 Nisan 2026",
  status: index % 4 === 0 ? "FAILED" : "COMPLETED",
  photoTokens: index % 3 === 0 ? 3 : 1,
}));

export default function SonuclarimPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-semibold text-[var(--text)]">Sonuclarim</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {results.map((result) => (
          <Card key={result.id} hover className="overflow-hidden">
            <div className="relative h-48">
              <Image src={result.image} alt={result.id} fill className="object-cover" sizes="20vw" />
            </div>
            <CardContent>
              <div className="mb-2 flex items-center justify-between">
                <p className="font-semibold text-[var(--text)]">{result.id}</p>
                <Badge variant={result.status === "FAILED" ? "error" : "success"}>
                  {result.status === "FAILED" ? "Basarisiz" : "Tamamlandi"}
                </Badge>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{result.date}</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {result.photoTokens} kredi
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
