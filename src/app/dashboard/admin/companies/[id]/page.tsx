
"use client";

import {
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

import Link from "next/link";

import {
  useParams,
  useRouter,
} from "next/navigation";

import { useCompany } from "@/hooks/useCompany";

import { AdminCompanyView } from "@/components/admin/companies/view/AdminCompanyView";

import { routes } from "@/config/routes";

export default function AdminCompanyViewPage() {
  const params = useParams();

  const router = useRouter();

  const id = String(params.id);

  const {
    company,
    loading,
    error,
    refetch,
  } = useCompany(id);

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return (
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <Link
              href={
                routes.admin.companies.all
              }
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
            >
              <ArrowLeft size={16} />

              Back to Companies
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
            <RefreshCw
              size={30}
              className="mx-auto animate-spin text-slate-400"
            />

            <p className="mt-3 text-sm font-medium text-slate-600">
              Loading company...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* ==========================================================
     ERROR
  ========================================================== */

  if (error || !company) {
    return (
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <Link
              href={
                routes.admin.companies.all
              }
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
            >
              <ArrowLeft size={16} />

              Back to Companies
            </Link>
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-16 text-center">
            <p className="text-sm font-semibold text-red-700">
              {error ||
                "Company not found."}
            </p>

            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() =>
                  void refetch()
                }
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-red-200 bg-white px-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              >
                <RefreshCw size={15} />

                Try Again
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    routes.admin.companies
                      .all,
                  )
                }
                className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Companies
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ==========================================================
     REAL COMPANY DATA
  ========================================================== */

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <AdminCompanyView
        company={company}
      />
    </main>
  );
}