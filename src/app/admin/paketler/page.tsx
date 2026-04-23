import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const packages = [
  { name: "Deneme Çekimi", photoTokens: 1, videoTokens: 0, price: "200 TL" },
  { name: "Stüdyo Standart", photoTokens: 10, videoTokens: 0, price: "1000 TL" },
  { name: "Dinamik Stüdyo", photoTokens: 15, videoTokens: 1, price: "2250 TL" },
  { name: "Premium Prodüksiyon", photoTokens: 50, videoTokens: 3, price: "6000 TL" },
];

export default function AdminPaketlerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[var(--text)]">Token Paketleri</h1>
      <Card>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--text-muted)]">
                <th className="py-2">Paket</th>
                <th className="py-2">Fotoğraf</th>
                <th className="py-2">Video</th>
                <th className="py-2">Fiyat</th>
                <th className="py-2">Islem</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.name} className="border-t border-[var(--border-light)]">
                  <td className="py-3">{pkg.name}</td>
                  <td className="py-3">{pkg.photoTokens}</td>
                  <td className="py-3">{pkg.videoTokens}</td>
                  <td className="py-3">{pkg.price}</td>
                  <td className="py-3">
                    <Button size="sm" variant="outline">
                      Duzenle
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
