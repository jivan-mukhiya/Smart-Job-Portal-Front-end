"use client";

import {
  Building2,
  MapPin,
} from "lucide-react";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { useCompanyLogo } from "@/hooks/use-company-logo";

interface JobHeaderProps {
  title: string;
  companyName: string;
  companyId: number | string;
  companyLogo?: string | null;
  location: string;
  status: string;
  jobType: string;
  jobLevel: string;
}

export function JobHeader({
  title,
  companyName,
  companyId,
  companyLogo,
  location,
  status,
  jobType,
  jobLevel,
}: JobHeaderProps) {
  /**
   * Only fetch the logo if it wasn't already
   * supplied by the JobCard / Job API.
   */
  const {
    logoUrl: fetchedLogoUrl,
    loading: logoLoading,
  } = useCompanyLogo(
    companyLogo
      ? null
      : companyId,
  );

  const logoUrl =
    companyLogo ||
    fetchedLogoUrl ||
    null;

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* ================================================= */}
        {/* BREADCRUMB */}
        {/* ================================================= */}

        <div className="mb-6 text-sm text-slate-400">
          Jobs
          <span className="mx-2">
            /
          </span>
          Job Details
        </div>

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            {/* ============================================= */}
            {/* COMPANY LOGO */}
            {/* ============================================= */}

            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={`${companyName} logo`}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display =
                      "none";
                  }}
                />
              ) : logoLoading ? (
                <div className="h-full w-full animate-pulse bg-slate-200" />
              ) : (
                <Building2
                  size={28}
                  className="text-slate-500"
                />
              )}
            </div>

            {/* ============================================= */}
            {/* JOB INFORMATION */}
            {/* ============================================= */}

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  {title}
                </h1>

                <StatusBadge status={status} />
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Building2 size={16} />
                  {companyName}
                </div>

                <div className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  {location}
                </div>
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* JOB TYPE / LEVEL */}
          {/* ================================================= */}

          <div className="flex flex-wrap gap-2">
            <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
              {jobType}
            </span>

            <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
              {jobLevel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}