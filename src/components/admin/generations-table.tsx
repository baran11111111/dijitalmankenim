import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const rows = [
  { id: "GN-9012", user: "test@test.com", status: "COMPLETED", type: "PHOTO" },
  { id: "GN-9011", user: "brand@shop.com", status: "PROCESSING", type: "VIDEO" },
  { id: "GN-9010", user: "user@mail.com", status: "FAILED", type: "PHOTO" },
];

export function GenerationsTable() {
  return (
    <Card>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[var(--text-muted)]">
              <th className="py-2">ID</th>
              <th className="py-2">Kullanici</th>
              <th className="py-2">Tip</th>
              <th className="py-2">Durum</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[var(--border-light)]">
                <td className="py-3">{row.id}</td>
                <td className="py-3">{row.user}</td>
                <td className="py-3">{row.type}</td>
                <td className="py-3">
                  <Badge
                    variant={
                      row.status === "FAILED"
                        ? "error"
                        : row.status === "PROCESSING"
                          ? "warning"
                          : "success"
                    }
                  >
                    {row.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
