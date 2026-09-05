"use client";

import { AdminStatistics } from "@/components/admin/dashboard/AdminStatistics";
import { ManageCompanies } from "@/components/admin/dashboard/ManageCompanies";
import { ManageUsers } from "@/components/admin/dashboard/ManageUsers";

import { useAdminDashboardStatistics } from "@/hooks/useAdminDashboardStatistics";

// ============================================================
// ADMIN DASHBOARD PAGE
// ============================================================

export default function AdminDashboardPage() {

const {
statistics,
loading,
error,
refetch,
} = useAdminDashboardStatistics();

return ( <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

  {/* ======================================================
      PAGE HEADER
      ====================================================== */}

  <div>

    <h1 className="text-2xl font-bold tracking-tight text-slate-950">
      Admin Dashboard
    </h1>

    <p className="mt-1 text-sm text-slate-500">
      Manage and monitor your Smart Job Portal.
    </p>

  </div>


  {/* ======================================================
      ERROR
      ====================================================== */}

  {error && !loading && (
    <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

      <p className="text-sm text-red-600">
        {error}
      </p>

      <button
        type="button"
        onClick={() => void refetch()}
        className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-red-600 shadow-sm ring-1 ring-red-200 transition hover:bg-red-100"
      >
        Retry
      </button>

    </div>
  )}


  {/* ======================================================
      PLATFORM STATISTICS
      ====================================================== */}

  <div className="mt-8">

    <AdminStatistics
      statistics={statistics?.platform ?? null}
      loading={loading}
    />

  </div>


  {/* ======================================================
      MANAGEMENT
      ====================================================== */}

  <div className="mt-8 grid gap-6 lg:grid-cols-2">

    <ManageCompanies
      statistics={statistics?.companies ?? null}
      loading={loading}
    />


    <ManageUsers
      statistics={statistics?.users ?? null}
      loading={loading}
    />

  </div>

</div>
);
}
