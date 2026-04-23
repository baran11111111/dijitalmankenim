import { PricingSection } from "@/components/landing/pricing-section";
import { Card, CardContent } from "@/components/ui/card";

const history = [
  { date: "13 Nisan 2026", action: "Paket Satin Alimi", amount: "+200" },
  { date: "13 Nisan 2026", action: "Foto Uretimi", amount: "-1" },
  { date: "12 Nisan 2026", action: "Video Uretimi", amount: "-3" },
];

export default function TokenlerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[var(--text)]">Tokenler</h1>
      <Card>
        <CardContent>
          <p className="text-sm text-[var(--text-secondary)]">Guncel Bakiye</p>
          <p className="mt-2 text-4xl font-semibold text-[var(--text)]">124 Token</p>
        </CardContent>
      </Card>
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <PricingSection />
      </div>
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold text-[var(--text)]">Islem Gecmisi</h2>
          <div className="mt-4 space-y-3">
            {history.map((item) => (
              <div key={`${item.date}-${item.action}`} className="flex items-center justify-between rounded-lg border border-[var(--border-light)] p-3">
                <div>
                  <p className="font-medium text-[var(--text)]">{item.action}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{item.date}</p>
                </div>
                <span className="text-sm font-semibold text-[var(--primary)]">{item.amount}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
