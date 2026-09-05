
"use client";

import { RefreshCw } from "lucide-react";

import { AdminCompanyTable } from "@/components/admin/companies/AdminCompanyTable";
import { useCompanies } from "@/hooks/useCompanies";

export default function AdminCompaniesPage() {
  const {
    companies,
    loading,
    error,
    totalElements,
    page,
    totalPages,
    goToPage,
    refetch,
  } = useCompanies();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Manage Companies
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Review and manage registered
            companies.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void refetch()}
          disabled={loading}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>
      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && !loading && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* =====================================================
          LOADING
      ====================================================== */}

      {loading ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="px-6 py-16 text-center">
            <RefreshCw
              size={28}
              className="mx-auto animate-spin text-slate-400"
            />

            <p className="mt-3 text-sm font-medium text-slate-600">
              Loading companies...
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* =================================================
              TABLE
          ================================================== */}

          <AdminCompanyTable
            companies={companies}
            onStatusUpdated={refetch}
          />

          {/* =================================================
              PAGINATION
          ================================================== */}

          {totalPages > 1 && (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Page{" "}
                <span className="font-semibold text-slate-700">
                  {page + 1}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                  {totalPages}
                </span>

                <span className="ml-2 text-slate-400">
                  ({totalElements} companies)
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page === 0}
                  onClick={() =>
                    goToPage(page - 1)
                  }
                  className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={
                    page >=
                    totalPages - 1
                  }
                  onClick={() =>
                    goToPage(page + 1)
                  }
                  className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              TOTAL
          ================================================== */}

          {totalPages <= 1 &&
            totalElements > 0 && (
              <p className="mt-4 text-xs text-slate-400">
                {totalElements}{" "}
                {totalElements === 1
                  ? "company"
                  : "companies"}{" "}
                found.
              </p>
            )}
        </>
      )}
    </main>
  );
}