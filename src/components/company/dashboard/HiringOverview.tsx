
"use client";

import type { ReactNode } from "react";

import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  FileText,
  Users,
} from "lucide-react";

import Link from "next/link";

import { routes } from "@/config/routes";
import { useCompanyHiringOverview } from "@/hooks/useCompanyHiringOverview";

export function HiringOverview() {
  const {
    overview,
    loading,
    error,
  } = useCompanyHiringOverview();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start justify-between gap-4">

        <div>
          <h2 className="text-base font-bold text-slate-950">
            Hiring Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            A quick look at your current hiring activity.
          </p>
        </div>

        <Link
          href={routes.company.applications.all}
          className="hidden items-center gap-1.5 text-xs font-semibold text-slate-600 transition hover:text-slate-950 sm:flex"
        >
          View applications
          <ArrowRight size={14} />
        </Link>

      </div>


      {/* =====================================================
          API ERROR
      ===================================================== */}

      {error && !loading && (
        <p className="mt-4 text-xs text-red-500">
          Unable to load hiring overview.
        </p>
      )}


      {/* =====================================================
          OVERVIEW ITEMS
      ===================================================== */}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">

        <OverviewItem
          icon={<FileText size={18} />}
          title="New Applications"
          value={
            loading
              ? "—"
              : String(
                  overview?.newApplicationsThisWeek ?? 0,
                )
          }
          description="Received this week"
        />

        <OverviewItem
          icon={<Users size={18} />}
          title="Candidates"
          value={
            loading
              ? "—"
              : String(
                  overview?.shortlistedCandidates ?? 0,
                )
          }
          description="Currently shortlisted"
        />

        <OverviewItem
          icon={<BriefcaseBusiness size={18} />}
          title="Active Positions"
          value={
            loading
              ? "—"
              : String(
                  overview?.activeJobs ?? 0,
                )
          }
          description="Currently accepting"
        />

        <OverviewItem
          icon={<Clock3 size={18} />}
          title="Interviews"
          value={
            loading
              ? "—"
              : String(
                  overview?.upcomingInterviews ?? 0,
                )
          }
          description="Upcoming interviews"
        />

      </div>


      {/* =====================================================
          BOTTOM
      ===================================================== */}

      <div className="mt-6 rounded-xl bg-slate-50 p-4">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Keep your hiring moving
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Review new applications and update candidate statuses.
            </p>
          </div>

          <Link
            href={routes.company.applications.all}
            className="hidden h-9 items-center gap-2 rounded-lg bg-slate-950 px-3 text-xs font-semibold text-white transition hover:bg-slate-800 sm:flex"
          >
            Review
            <ArrowRight size={14} />
          </Link>

        </div>

      </div>

    </section>
  );
}


/* ============================================================
   OVERVIEW ITEM
============================================================ */

interface OverviewItemProps {
  icon: ReactNode;
  title: string;
  value: string;
  description: string;
}

function OverviewItem({
  icon,
  title,
  value,
  description,
}: OverviewItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50">

      {/* Icon */}

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        {icon}
      </div>


      {/* Content */}

      <div className="min-w-0 flex-1">

        <div className="flex items-center justify-between gap-3">

          <p className="truncate text-sm font-semibold text-slate-900">
            {title}
          </p>

          <p className="text-lg font-bold text-slate-950">
            {value}
          </p>

        </div>

        <p className="mt-0.5 text-xs text-slate-400">
          {description}
        </p>

      </div>

    </div>
  );
}