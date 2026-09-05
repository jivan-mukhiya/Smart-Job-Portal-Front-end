import {
ArrowRight,
Building2,
CheckCircle2,
Clock3,
} from "lucide-react";

import Link from "next/link";

import { routes } from "@/config/routes";

import type {
AdminCompanyStatistics,
} from "@/types/admin-dashboard";

// ============================================================
// PROPS
// ============================================================

interface ManageCompaniesProps {
statistics: AdminCompanyStatistics | null;
loading: boolean;
}

// ============================================================
// MANAGE COMPANIES
// ============================================================

export function ManageCompanies({
statistics,
loading,
}: ManageCompaniesProps) {

return ( <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

```
  {/* ======================================================
      HEADER
      ====================================================== */}

  <div className="flex items-start justify-between gap-4">

    <div className="flex items-center gap-3">

      {/* ====================================================
          ICON
          ==================================================== */}

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        <Building2 size={20} />
      </div>


      {/* ====================================================
          TITLE
          ==================================================== */}

      <div>

        <h2 className="text-base font-bold text-slate-950">
          Manage Companies
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage registered companies.
        </p>

      </div>

    </div>


    {/* ====================================================
        MANAGE LINK
        ==================================================== */}

    <Link
      href={routes.admin.companies.all}
      className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-slate-600 transition hover:text-slate-950"
    >
      Manage
      <ArrowRight size={14} />
    </Link>

  </div>


  {/* ======================================================
      COMPANY STATISTICS
      ====================================================== */}

  <div className="mt-6 grid gap-3 sm:grid-cols-2">

    <ManagementStat
      icon={<Building2 size={16} />}
      label="Total Companies"
      value={
        loading
          ? "..."
          : String(statistics?.total ?? 0)
      }
    />


    <ManagementStat
      icon={<CheckCircle2 size={16} />}
      label="Active Companies"
      value={
        loading
          ? "..."
          : String(statistics?.active ?? 0)
      }
    />


    <ManagementStat
      icon={<Clock3 size={16} />}
      label="Pending Approval"
      value={
        loading
          ? "..."
          : String(statistics?.pendingApproval ?? 0)
      }
    />


    <ManagementStat
      icon={<Building2 size={16} />}
      label="Inactive Companies"
      value={
        loading
          ? "..."
          : String(statistics?.inactive ?? 0)
      }
    />

  </div>

</section>

);
}

// ============================================================
// MANAGEMENT STAT
// ============================================================

interface ManagementStatProps {
icon: React.ReactNode;
label: string;
value: string;
}

function ManagementStat({
icon,
label,
value,
}: ManagementStatProps) {

return ( <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5">

  {/* ======================================================
      ICON
      ====================================================== */}

  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
    {icon}
  </div>


  {/* ======================================================
      CONTENT
      ====================================================== */}

  <div className="min-w-0 flex-1">

    <p className="truncate text-xs text-slate-500">
      {label}
    </p>

    <p className="mt-0.5 text-lg font-bold text-slate-950">
      {value}
    </p>

  </div>

</div>

);
}
