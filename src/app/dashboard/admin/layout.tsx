
import type { ReactNode } from "react";

import { AdminFooter } from "@/components/admin/layout/AdminFooter";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <AdminHeader />

      <main className="flex-1">
        {children}
      </main>

      <AdminFooter />
    </div>
  );
}
