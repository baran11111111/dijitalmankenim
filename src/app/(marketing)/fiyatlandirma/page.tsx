import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FiyatlandirmaPage() {
  const plans = [
    { name: "Deneme Çekimi", tokens: "1 Fotoğraf", price: "200 TL" },
    { name: "Stüdyo Standart", tokens: "10 Fotoğraf", price: "1000 TL" },
    { name: "Dinamik Stüdyo", tokens: "15 Fotoğraf + 1 Video", price: "2250 TL", popular: true },
    { name: "Premium Prodüksiyon", tokens: "50 Fotoğraf + 3 Video", price: "6000 TL" },
  ];

  return (
    <div className="bg-[var(--background)] px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold text-[var(--text)]">Fiyatlandirma</h1>
        <p className="mt-2 text-[var(--text-secondary)]">Token bazli esnek paketler.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Card key={plan.name} hover>
              <CardContent>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold text-[var(--text)]">{plan.name}</h2>
                  {plan.popular ? <Badge variant="popular">Popular</Badge> : null}
                </div>
                <p className="text-2xl font-bold text-[var(--text)]">{plan.price}</p>
                <p className="text-sm text-[var(--text-secondary)]">{plan.tokens}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
