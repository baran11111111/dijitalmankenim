import { Card, CardContent } from "@/components/ui/card";
import { Coins, Sparkles, Calendar, Heart } from "lucide-react";

const stats = [
  { label: "Token Bakiyesi", value: "124", icon: Coins },
  { label: "Toplam Uretim", value: "382", icon: Sparkles },
  { label: "Bu Ay Uretim", value: "47", icon: Calendar },
  { label: "Favoriler", value: "19", icon: Heart },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
                <Icon className="h-4 w-4 text-[var(--primary)]" />
              </div>
              <p className="mt-3 text-3xl font-semibold text-[var(--text)]">{stat.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
