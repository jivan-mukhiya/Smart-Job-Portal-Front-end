
import {
  BriefcaseBusiness,
  Building2,
  FileText,
  Users,
} from "lucide-react";

import type {
  AdminPlatformStatistics,
} from "@/types/admin-dashboard";


// ============================================================
// PROPS
// ============================================================

interface AdminStatisticsProps {
  statistics: AdminPlatformStatistics | null;
  loading: boolean;
}


// ============================================================
// ADMIN STATISTICS
// ============================================================

export function AdminStatistics({
  statistics,
  loading,
}: AdminStatisticsProps) {

  return (
    <section>

      {/* ======================================================
          SECTION HEADER
          ====================================================== */}

      <div>

        <h2 className="text-base font-bold text-slate-950">
          Platform Statistics
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Overview of your job portal.
        </p>

      </div>


      {/* ======================================================
          STATISTICS CARDS
          ====================================================== */}

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatisticCard
          title="Companies"
          value={
            loading
              ? "..."
              : String(statistics?.companies ?? 0)
          }
          description="Registered companies"
          icon={<Building2 size={20} />}
        />


        <StatisticCard
          title="Users"
          value={
            loading
              ? "..."
              : String(statistics?.users ?? 0)
          }
          description="Registered users"
          icon={<Users size={20} />}
        />


        <StatisticCard
          title="Jobs"
          value={
            loading
              ? "..."
              : String(statistics?.jobs ?? 0)
          }
          description="Total jobs"
          icon={<BriefcaseBusiness size={20} />}
        />


        <StatisticCard
          title="Applications"
          value={
            loading
              ? "..."
              : String(statistics?.applications ?? 0)
          }
          description="Total applications"
          icon={<FileText size={20} />}
        />

      </div>

    </section>
  );
}


// ============================================================
// STATISTIC CARD
// ============================================================

interface StatisticCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}


function StatisticCard({
  title,
  value,
  description,
  icon,
}: StatisticCardProps) {

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        {/* ====================================================
            VALUE
            ==================================================== */}

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>

        </div>


        {/* ====================================================
            ICON
            ==================================================== */}

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          {icon}
        </div>

      </div>


      {/* ======================================================
          DESCRIPTION
          ====================================================== */}

      <p className="mt-4 text-xs text-slate-400">
        {description}
      </p>

    </div>
  );
}