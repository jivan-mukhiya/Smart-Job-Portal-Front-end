
import { AdminCompanyStatusBadge } from "@/components/admin/companies/AdminCompanyStatusBadge";

import type { CompanyStatus } from "@/types/admin-company";

interface AdminCompanyStatusProps {
  status: CompanyStatus;
  approved: boolean;
  active: boolean;
}

export function AdminCompanyStatus({
  status,
  approved,
  active,
}: AdminCompanyStatusProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-base font-bold text-slate-950">
        Company Status
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-slate-500">
            Current Status
          </span>

          <AdminCompanyStatusBadge status={status} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Approved
          </span>

          <span
            className={
              approved
                ? "text-sm font-semibold text-emerald-600"
                : "text-sm font-semibold text-red-600"
            }
          >
            {approved ? "Yes" : "No"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Active
          </span>

          <span
            className={
              active
                ? "text-sm font-semibold text-emerald-600"
                : "text-sm font-semibold text-slate-500"
            }
          >
            {active ? "Yes" : "No"}
          </span>
        </div>
      </div>
    </section>
  );
}
