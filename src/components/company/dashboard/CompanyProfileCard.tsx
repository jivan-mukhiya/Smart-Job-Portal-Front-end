import {
  ArrowRight,
  Building2,
  CheckCircle2,
  MapPin,
} from "lucide-react";

import Link from "next/link";

export function CompanyProfileCard() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* =====================================================
          BANNER
      ===================================================== */}

      <div className="relative h-24 bg-slate-950">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_40%)]" />

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="px-5 pb-6 sm:px-6">

        {/* Logo */}

        <div className="-mt-8">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-slate-100 text-slate-800 shadow-sm">
            <Building2 size={25} />
          </div>

        </div>


        {/* Company Information */}

        <div className="mt-4">

          <div className="flex items-center gap-2">

            <h2 className="text-lg font-bold text-slate-950">
              Smart Tech
            </h2>

            <CheckCircle2
              size={17}
              className="shrink-0 text-emerald-500"
            />

          </div>

          <p className="mt-1 text-sm text-slate-500">
            Information Technology
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin size={14} />
            Kathmandu, Nepal
          </div>

        </div>


        {/* =====================================================
            PROFILE COMPLETION
        ===================================================== */}

        <div className="mt-6">

          <div className="flex items-center justify-between">

            <p className="text-xs font-semibold text-slate-700">
              Profile completion
            </p>

            <p className="text-xs font-bold text-slate-900">
              80%
            </p>

          </div>


          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-slate-950"
              style={{ width: "80%" }}
            />

          </div>


          <p className="mt-2 text-xs text-slate-400">
            Complete your profile to attract more candidates.
          </p>

        </div>


        {/* =====================================================
            BUTTON
        ===================================================== */}

        <Link
          href="/dashboard/company/profile/view"
          className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Manage Profile

          <ArrowRight size={15} />

        </Link>

      </div>

    </section>
  );
}