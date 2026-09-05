import type { ReactNode } from "react";

import { CompanyHeader } from "@/components/company/dashboard/CompanyHeader";
import { CompanyFooter } from "@/components/company/dashboard/CompanyFooter";

export default function CompanyDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">

      {/* Header */}

      <CompanyHeader />

      {/* Main */}

      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}

      <CompanyFooter />

    </div>
  );
}