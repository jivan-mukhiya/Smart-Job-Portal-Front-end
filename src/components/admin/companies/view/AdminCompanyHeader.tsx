
import {
  BriefcaseBusiness,
  Building2,
} from "lucide-react";

import { AdminCompanyStatusBadge } from "@/components/admin/companies/AdminCompanyStatusBadge";

import type { CompanyStatus } from "@/types/admin-company";

interface AdminCompanyHeaderProps {
  id: number;
  companyName: string;
  industry: string | null;
  status: CompanyStatus;
  active: boolean;
  logoUrl: string | null;
  bannerUrl: string | null;
}

export function AdminCompanyHeader({
  id,
  companyName,
  industry,
  status,
  active,
  logoUrl,
  bannerUrl,
}: AdminCompanyHeaderProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* BANNER */}

      <div className="relative h-52 bg-slate-100">
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt={`${companyName} banner`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Building2
              size={48}
              className="text-slate-300"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* COMPANY HEADER */}

      <div className="relative px-6 pb-6 sm:px-8">
        <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            {/* LOGO */}

            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${companyName} logo`}
                className="h-28 w-28 rounded-2xl border-4 border-white bg-white object-cover shadow-md"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-white bg-slate-100 text-3xl font-bold text-slate-500 shadow-md">
                {companyName.charAt(0).toUpperCase()}
              </div>
            )}

            {/* NAME */}

            <div className="pb-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                  {companyName}
                </h1>

                <AdminCompanyStatusBadge
                  status={status}
                />
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Company ID: {id}
              </p>

              <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600">
                <BriefcaseBusiness size={14} />
                {industry || "Industry not specified"}
              </p>
            </div>
          </div>

          {/* ACTIVE */}

          <div className="pb-1">
            {active ? (
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                Active Company
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                Inactive Company
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
