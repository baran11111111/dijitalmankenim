import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { YonetimSidebar } from "@/components/yonetim/sidebar";

async function getAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  const session = await prisma.adminSession.findFirst({
    where: { token, expiresAt: { gt: new Date() } },
  });
  return session;
}

export default async function YonetimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminUser();
  if (!session) redirect("/yonetim/giris");

  return (
    <div className="flex min-h-screen bg-[#07090f]">
      <YonetimSidebar adminEmail={session.email} />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
