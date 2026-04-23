import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function TokenBalance() {
  return (
    <Card>
      <CardContent>
        <p className="text-sm text-[var(--text-secondary)]">Mevcut Bakiyeniz</p>
        <p className="mt-2 text-4xl font-semibold text-[var(--text)]">124</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">Yaklasik 124 foto uretimi</p>
        <div className="mt-5">
          <Link href="/dashboard/tokenler">
            <Button className="w-full">Token Satin Al</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
