import { StatsCards } from "@/components/dashboard/stats-cards";
import { StatsCharts } from "@/components/admin/stats-charts";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[var(--text)]">Admin Dashboard</h1>
      <StatsCards />
      <StatsCharts />
    </div>
  );
}
