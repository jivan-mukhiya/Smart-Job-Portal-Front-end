
import {
  Building2,
  Mail,
  Phone,
} from "lucide-react";

import { AdminCompanyActions } from "@/components/admin/companies/AdminCompanyActions";
import { AdminCompanyStatusBadge } from "@/components/admin/companies/AdminCompanyStatusBadge";

import type {
  AdminCompany,
} from "@/types/admin-company";

interface AdminCompanyTableProps {
  companies: AdminCompany[];

  onStatusUpdated?: () => Promise<void> | void;
}

export function AdminCompanyTable({
  companies,
  onStatusUpdated,
}: AdminCompanyTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Company
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Industry
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Phone
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Active
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {companies.map((company) => (
              <tr
                key={company.id}
                className="transition hover:bg-slate-50"
              >
                {/* COMPANY */}

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {company.logoUrl ? (
                      <img
                        src={company.logoUrl}
                        alt={`${company.companyName} logo`}
                        className="h-10 w-10 rounded-xl border border-slate-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-500">
                        {company.companyName
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-950">
                        {company.companyName}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        ID: {company.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* INDUSTRY */}

                <td className="px-5 py-4">
                  <span className="text-sm text-slate-600">
                    {company.industry ||
                      "—"}
                  </span>
                </td>

                {/* EMAIL */}

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Mail
                      size={14}
                      className="shrink-0 text-slate-400"
                    />

                    <span className="max-w-[220px] truncate text-sm text-slate-600">
                      {company.email ||
                        "—"}
                    </span>
                  </div>
                </td>

                {/* PHONE */}

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Phone
                      size={14}
                      className="shrink-0 text-slate-400"
                    />

                    <span className="text-sm text-slate-600">
                      {company.phone ||
                        "—"}
                    </span>
                  </div>
                </td>

                {/* STATUS */}

                <td className="px-5 py-4">
                  <AdminCompanyStatusBadge
                    status={company.status}
                  />
                </td>

                {/* ACTIVE */}

                <td className="px-5 py-4">
                  {company.active ? (
                    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                      Inactive
                    </span>
                  )}
                </td>

                {/* ACTIONS */}

                <td className="px-5 py-4">
                  <AdminCompanyActions
                    companyId={company.id}
                    status={company.status}
                    onStatusUpdated={
                      onStatusUpdated
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY */}

      {companies.length === 0 && (
        <div className="px-6 py-16 text-center">
          <Building2
            size={32}
            className="mx-auto text-slate-300"
          />

          <p className="mt-3 text-sm font-semibold text-slate-700">
            No companies found
          </p>

          <p className="mt-1 text-xs text-slate-400">
            There are currently no companies
            to display.
          </p>
        </div>
      )}

      {/* FOOTER */}

      {companies.length > 0 && (
        <div className="border-t border-slate-200 px-5 py-3">
          <p className="text-xs text-slate-400">
            Showing {companies.length}{" "}
            companies
          </p>
        </div>
      )}
    </div>
  );
}