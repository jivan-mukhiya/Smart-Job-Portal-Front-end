"use client";

import {
  Bell,
  Building2,
  ChevronRight,
} from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

      {/* =====================================================
          LEFT
      ===================================================== */}

      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-slate-500">
            Company Dashboard
          </p>

          <ChevronRight
            size={14}
            className="text-slate-300"
          />

          <p className="text-sm text-slate-400">
            Overview
          </p>
        </div>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Good morning, Smart Tech
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Manage your jobs, review candidates, and keep your hiring activity
          moving forward.
        </p>
      </div>


      {/* =====================================================
          RIGHT
      ===================================================== */}

      <div className="flex items-center gap-3">
        {/* Company */}

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white">
            <Building2 size={17} />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-xs font-bold text-slate-900">
              Smart Tech
            </p>

            <p className="mt-0.5 text-[11px] text-slate-500">
              Company account
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}