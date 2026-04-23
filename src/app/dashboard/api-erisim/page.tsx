import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ApiErisimPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[var(--text)]">API Erisimi</h1>
      <Card>
        <CardContent className="space-y-4">
          <p className="text-sm text-[var(--text-secondary)]">
            API anahtariniz ile /api/v1 endpointleri uzerinden uretim baslatabilirsiniz.
          </p>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 text-sm">
            dm_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </div>
          <Button variant="outline">API Anahtarini Yenile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-3">
          <h2 className="text-lg font-semibold text-[var(--text)]">Ornek cURL</h2>
          <pre className="overflow-x-auto rounded-lg bg-black p-4 text-xs text-white">
{`curl -X POST "$NEXT_PUBLIC_APP_URL/api/v1/generate" \\
  -H "Authorization: Bearer dm_live_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{"templateId":"tmp-1","inputImageUrl":"https://...","type":"PHOTO"}'`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
