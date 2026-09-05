"use client";

import { Building2, Sparkles } from "lucide-react";

import { CompanyCard } from "./CompanyCard";

import type { Company } from "@/types/company";

interface CompanyListProps {
  companies: Company[];
}

export function CompanyList({
  companies,
}: CompanyListProps) {
  /*
   * =========================================================
   * EMPTY STATE
   * =========================================================
   */

  if (!companies || companies.length === 0) {
    return (
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          px-6
          py-20
          text-center
          shadow-sm
        "
      >
        {/* Decorative background */}
        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-48
            w-48
            rounded-full
            bg-slate-100
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-20
            -left-20
            h-48
            w-48
            rounded-full
            bg-slate-100
            blur-3xl
          "
        />

        {/* Icon */}
        <div
          className="
            relative
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            shadow-sm
          "
        >
          <Building2
            size={28}
            strokeWidth={1.8}
            className="text-slate-400"
          />
        </div>

        {/* Heading */}
        <h3
          className="
            relative
            mt-5
            text-xl
            font-bold
            tracking-tight
            text-slate-950
          "
        >
          No companies found
        </h3>

        {/* Description */}
        <p
          className="
            relative
            mx-auto
            mt-2
            max-w-md
            text-sm
            leading-6
            text-slate-500
          "
        >
          There are no active companies available
          at the moment. Please check back later for
          new opportunities.
        </p>

        {/* Small status */}
        <div
          className="
            relative
            mx-auto
            mt-6
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-slate-200
            bg-slate-50
            px-3
            py-1.5
            text-xs
            font-semibold
            text-slate-500
          "
        >
          <Sparkles
            size={13}
          />

          New companies will appear here
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * COMPANY GRID
   * =========================================================
   */

  return (
    <div
      className="
        grid
        gap-5
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >
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