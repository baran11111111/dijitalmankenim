import { Bell, Search } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border-light)] bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="relative hidden w-full max-w-md md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            className="h-10 w-full rounded-lg border border-[var(--border)] pl-9 pr-3 text-sm outline-none focus:border-[var(--primary)]"
            placeholder="Sablon veya uretim ara..."
          />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button className="rounded-lg border border-[var(--border)] p-2 text-[var(--text-secondary)]">
            <Bell className="h-4 w-4" />
          </button>
          <Avatar fallback="DM" />
        </div>
      </div>
    </header>
  );
}
