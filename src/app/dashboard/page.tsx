import Link from "next/link";
import { Plus, Coins } from "lucide-react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentGenerations } from "@/components/dashboard/recent-generations";
import { TokenBalance } from "@/components/dashboard/token-balance";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold text-[var(--text)]">Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/dashboard/uret">
            <Button rightIcon={<Plus className="h-4 w-4" />}>Yeni Uretim</Button>
          </Link>
          <Link href="/dashboard/tokenler">
            <Button variant="outline" rightIcon={<Coins className="h-4 w-4" />}>
              Token Al
            </Button>
          </Link>
        </div>
      </div>
      <StatsCards />
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <RecentGenerations />
        <TokenBalance />
      </div>
    </div>
  );
}
