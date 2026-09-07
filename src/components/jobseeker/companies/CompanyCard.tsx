"use client";

import { Building2, BriefcaseBusiness, MapPin } from "lucide-react";

import { useRouter } from "next/navigation";

import { routes } from "@/config/routes";

interface CompanyCardProps {
  companyId: number;

  companyName: string;

  industry?: string | null;

  logoUrl?: string | null;

  address?: string | null;

  totalJobs?: number;
}

export function CompanyCard({
  companyId,
  companyName,
  industry,
  logoUrl,
  address,
  totalJobs = 0,
}: CompanyCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(
      routes.companies.details(companyId),
    );
  };

  return (
    <article
      onClick={handleClick}
      className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${companyName} logo`}
              className="h-full w-full object-cover"
            />
          ) : (
            <Building2 className="h-7 w-7 text-gray-400" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold text-gray-900">
            {companyName}
          </h2>

          {industry && (
            <p className="mt-1 truncate text-sm text-gray-500">
              {industry}
            </p>
          )}
        </div>
      </div>

      {address && (
        <div className="mt-5 flex items-start gap-2 text-sm text-gray-500">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />

          <span>{address}</span>
        </div>
      )}

      <div className="mt-5 flex items-center gap-2 text-sm text-gray-600">
        <BriefcaseBusiness className="h-4 w-4" />

        <span>
          {totalJobs}{" "}
          {totalJobs === 1 ? "active job" : "active jobs"}
        </span>
      </div>
    </article>
  );
}