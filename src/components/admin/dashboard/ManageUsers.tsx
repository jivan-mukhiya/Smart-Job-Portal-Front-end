import {
ArrowRight,
CheckCircle2,
UserRound,
Users,
} from "lucide-react";

import Link from "next/link";

import { routes } from "@/config/routes";

import type {
AdminUserStatistics,
} from "@/types/admin-dashboard";

// ============================================================
// PROPS
// ============================================================

interface ManageUsersProps {
statistics: AdminUserStatistics | null;
loading: boolean;
}

// ============================================================
// MANAGE USERS
// ============================================================

export function ManageUsers({
statistics,
loading,
}: ManageUsersProps) {

return ( <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

  {/* ======================================================
      HEADER
      ====================================================== */}

  <div className="flex items-start justify-between gap-4">

    <div className="flex items-center gap-3">

      {/* ====================================================
          ICON
          ==================================================== */}

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        <Users size={20} />
      </div>


      {/* ====================================================
          TITLE
          ==================================================== */}

      <div>

        <h2 className="text-base font-bold text-slate-950">
          Manage Users
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage platform users.
        </p>

      </div>

    </div>


    {/* ====================================================
        MANAGE LINK
        ==================================================== */}

    <Link
      href={routes.admin.users.all}
      className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-slate-600 transition hover:text-slate-950"
    >
      Manage
      <ArrowRight size={14} />
    </Link>

  </div>


  {/* ======================================================
      USER STATISTICS
      ====================================================== */}

  <div className="mt-6 grid gap-3 sm:grid-cols-2">

    <UserStat
      icon={<Users size={16} />}
      label="Total Users"
      value={
        loading
          ? "..."
          : String(statistics?.total ?? 0)
      }
    />


    <UserStat
      icon={<CheckCircle2 size={16} />}
      label="Active Users"
      value={
        loading
          ? "..."
          : String(statistics?.active ?? 0)
      }
    />


    <UserStat
      icon={<UserRound size={16} />}
      label="Job Seekers"
      value={
        loading
          ? "..."
          : String(statistics?.jobSeekers ?? 0)
      }
    />


    <UserStat
      icon={<UserRound size={16} />}
      label="Admins"
      value={
        loading
          ? "..."
          : String(statistics?.admins ?? 0)
      }
    />

  </div>

</section>

);
}

// ============================================================
// USER STAT
// ============================================================

interface UserStatProps {
icon: React.ReactNode;
label: string;
value: string;
}

function UserStat({
icon,
label,
value,
}: UserStatProps) {

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
