import { GenerationsTable } from "@/components/admin/generations-table";

export default function AdminUretimlerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[var(--text)]">Uretim Kayitlari</h1>
      <GenerationsTable />
    </div>
  );
}
