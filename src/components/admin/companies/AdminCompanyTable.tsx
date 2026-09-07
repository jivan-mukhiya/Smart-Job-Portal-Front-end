"use client";

import { Building2 } from "lucide-react";

import type { AdminCompany } from "@/types/admin-company";

import { AdminCompanyActions } from "./AdminCompanyActions";
import { AdminCompanyStatusBadge } from "./AdminCompanyStatusBadge";

interface AdminCompanyTableProps {
  companies: AdminCompany[];

  loading: boolean;

  page: number;

  totalPages: number;

  onPageChange: (page: number) => void;

  onStatusUpdated?: () => Promise<void>;
}

export function AdminCompanyTable({
  companies,
  loading,
  page,
  totalPages,
  onPageChange,
  onStatusUpdated,
}: AdminCompanyTableProps) {
  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-10 text-center">
        <p className="text-sm text-gray-500">
          Loading companies...
        </p>
      </div>
    );
  }

  /*
   * ============================================================
   * EMPTY
   * ============================================================
   */

  if (companies.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-10 text-center">
        <Building2 className="mx-auto h-10 w-10 text-gray-300" />

        <p className="mt-3 text-sm font-medium text-gray-700">
          No companies found.
        </p>

        <p className="mt-1 text-sm text-gray-500">
          There are no companies available on this page.
        </p>
      </div>
    );
  }

  /*
   * ============================================================
   * TABLE
   * ============================================================
   */

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Company
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Industry
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Email
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {companies.map((company) => (
              <tr
                key={company.id}
                className="transition-colors hover:bg-gray-50"
              >
                {/* ==================================================
                    COMPANY
                ================================================== */}

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                      {company.logoUrl ? (
                        <img
                          src={company.logoUrl}
                          alt={`${company.companyName} logo`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Building2 className="h-5 w-5 text-gray-400" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium text-gray-900">
                        {company.companyName}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-500">
                        ID: {company.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* ==================================================
                    INDUSTRY
                ================================================== */}

                <td className="px-6 py-4 text-sm text-gray-600">
                  {company.industry || "—"}
                </td>

                {/* ==================================================
                    EMAIL
                ================================================== */}

                <td className="px-6 py-4">
                  {company.email ? (
                    <a
                      href={`mailto:${company.email}`}
                      className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                    >
                      {company.email}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">
                      —
                    </span>
                  )}
                </td>

                {/* ==================================================
                    PHONE
                ================================================== */}

                <td className="px-6 py-4">
                  {company.phone ? (
                    <a
                      href={`tel:${company.phone}`}
                      className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                    >
                      {company.phone}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">
                      —
                    </span>
                  )}
                </td>

                {/* ==================================================
                    STATUS
                ================================================== */}

                <td className="px-6 py-4">
                  <AdminCompanyStatusBadge
                    status={company.status}
                  />
                </td>

                {/* ==================================================
                    ACTIONS
                ================================================== */}

                <td className="px-6 py-4">
                  <AdminCompanyActions
                    companyId={company.id}
                    status={company.status}
                    onStatusUpdated={onStatusUpdated}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ==========================================================
          PAGINATION
      ========================================================== */}

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <p className="text-sm text-gray-500">
            Page{" "}
            <span className="font-medium text-gray-700">
              {page + 1}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-700">
              {totalPages}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 0}
              onClick={() =>
                onPageChange(page - 1)
              }
              className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={
                page >= totalPages - 1
              }
              onClick={() =>
                onPageChange(page + 1)
              }
              className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}