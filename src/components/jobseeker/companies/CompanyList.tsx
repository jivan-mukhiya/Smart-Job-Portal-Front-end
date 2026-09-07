"use client";

import type { Company } from "@/types/company";

import { CompanyCard } from "./CompanyCard";

interface CompanyListProps {
  companies: Company[];
}

export function CompanyList({
  companies,
}: CompanyListProps) {
  if (companies.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-10 text-center">
        <p className="text-sm text-gray-500">
          No active companies found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => {
        const address = company.address
          ? [
              company.address.city,
              company.address.state,
              company.address.country,
            ]
              .filter(Boolean)
              .join(", ")
          : null;

        const totalJobs =
          company.statistics?.activeJobs ?? 0;

        const logoUrl =
          company.images?.logoUrl ?? null;

        return (
          <CompanyCard
            key={company.id}
            companyId={company.id}
            companyName={company.companyName}
            industry={company.industry}
            logoUrl={logoUrl}
            address={address}
            totalJobs={totalJobs}
          />
        );
      })}
    </div>
  );
}