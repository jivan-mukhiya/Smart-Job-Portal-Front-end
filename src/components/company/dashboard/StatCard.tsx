
import type { ReactNode } from "react";

// ============================================================
// STAT CARD PROPS
// ============================================================

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}

// ============================================================
// STAT CARD
// ============================================================

export function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">

      {/* =====================================================
          TOP
      ===================================================== */}

      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>


        {/* =====================================================
            ICON
        ===================================================== */}

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-950 group-hover:text-white">
          {icon}
        </div>

      </div>


      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <p className="mt-4 text-xs leading-5 text-slate-400">
        {description}
      </p>

    </div>
  );
}