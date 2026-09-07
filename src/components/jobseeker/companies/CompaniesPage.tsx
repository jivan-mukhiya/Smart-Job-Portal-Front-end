"use client";

import { useActiveCompanies } from "@/hooks/useActiveCompanies";

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
  } = useActiveCompanies();

  if (loading) {
    return (
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-sm text-gray-500">
            Loading companies...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <p className="text-sm text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white"
            >
              Try again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Companies
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Explore companies and their job opportunities.
          </p>
        </div>

        <CompanyList companies={companies} />

        {totalPages > 1 && (
          <div className="mt-8">
            <CompanyPagination
              page={page}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          </div>
        )}
      </div>
    </section>
  );
}