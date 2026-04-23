import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const rows = [
  { id: "GN-9012", model: "Kadin / Studio", status: "Tamamlandi", token: 1 },
  { id: "GN-9011", model: "Erkek / Sokak", status: "Tamamlandi", token: 1 },
  { id: "GN-9010", model: "Video / Kadin", status: "Isleniyor", token: 3 },
  { id: "GN-9009", model: "Cocuk / Studio", status: "Tamamlandi", token: 1 },
  { id: "GN-9008", model: "Kadin / Outdoor", status: "Basarisiz", token: 1 },
];

export function RecentGenerations() {
  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-semibold text-[var(--text)]">Son Uretimler</h3>
        <div className="mt-4 space-y-3">
          {rows.map((row) => (
            <div key={row.id} className="flex items-center justify-between rounded-lg border border-[var(--border-light)] p-3">
              <div>
                <p className="font-medium text-[var(--text)]">{row.id}</p>
                <p className="text-sm text-[var(--text-secondary)]">{row.model}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={row.status === "Basarisiz" ? "error" : row.status === "Isleniyor" ? "warning" : "success"}>
                  {row.status}
                </Badge>
                <span className="text-sm text-[var(--text-secondary)]">{row.token} token</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
