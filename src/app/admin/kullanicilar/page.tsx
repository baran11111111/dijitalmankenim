import { UsersTable } from "@/components/admin/users-table";

export default function AdminKullanicilarPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[var(--text)]">Kullanici Yonetimi</h1>
      <UsersTable />
    </div>
  );
}
