"use client";

import {
  Building2,
  RefreshCw,
} from "lucide-react";

import { useCompanies } from "@/hooks/useCompanies";

import { CompanyList } from "./CompanyList";
import { CompanyPagination } from "./CompanyPagination";

export function CompaniesPage() {
  const {
    companies,
    page,
    totalPages,
    loading,
    error,
    goToPage,
    refetch,
  } = useCompanies();

  /* 
   * =========================================================
   * LOADING STATE
   * =========================================================
   */

  if (loading) {
    return (
      <div className="min-h-full space-y-8 px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8 lg:pt-20 lg:pb-24">
        {/* Header skeleton */}

        <div className="space-y-3 text-center">
          <div className="mx-auto h-10 w-52 animate-pulse rounded-xl bg-slate-200" />

          <div className="mx-auto h-4 w-80 max-w-full animate-pulse rounded bg-slate-200" />
        </div>

        {/* Company cards skeleton */}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[350px] animate-pulse rounded-3xl border border-slate-200 bg-slate-100"
            />
          ))}
        </div>
      </div>
    );
  }

  /* 
   * =========================================================
   * ERROR STATE
   * =========================================================
   */

  if (error) {
    return (
      <div className="min-h-full px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-red-100 bg-white px-6 py-20 text-center shadow-sm">
          {/* Decorative background */}

          <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-red-50 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-slate-50 blur-3xl" />

          {/* Error icon */}

          <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
            <Building2
              size={27}
              className="text-red-400"
            />
          </div>

          {/* Error title */}

          <h3 className="relative mt-5 text-xl font-bold tracking-tight text-slate-950">
            Unable to load companies
          </h3>

          {/* Error message */}

          <p className="relative mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            {error}
          </p>

          {/* Retry button */}

          <button
            type="button"
            onClick={refetch}
            className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <RefreshCw size={16} />

            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* 
   * =========================================================
   * MAIN PAGE
   * =========================================================
   */

  return (
    <div className="min-h-full space-y-10 px-4 pt-12 pb-16 sm:px-6 sm:space-y-12 sm:pt-16 sm:pb-20 lg:px-8 lg:space-y-14 lg:pt-20 lg:pb-24">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Companies
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Explore active companies and discover exciting
          opportunities from growing organizations.
        </p>
      </header>

      {/* =====================================================
          COMPANY LIST
      ===================================================== */}

      <CompanyList companies={companies} />

      {/* =====================================================
          PAGINATION
      ===================================================== */}

      <CompanyPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
}