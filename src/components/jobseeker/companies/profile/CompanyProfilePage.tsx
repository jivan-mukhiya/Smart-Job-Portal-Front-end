"use client";

import {
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { useCompany } from "@/hooks/useCompany";
import { CompanyProfileHeader } from "./CompanyProfileHeader";
import { CompanyAbout } from "./CompanyAbout";
import { CompanyStatistics } from "./CompanyStatistics";
import { CompanyContact } from "@/components/company/profile/view/CompanyContact";
import { CompanyAddress } from "./CompanyAddress";
import { CompanySocialLinks } from "./CompanySocialLinks";

interface CompanyProfilePageProps {
  companyId: number;
}

export function CompanyProfilePage({
  companyId,
}: CompanyProfilePageProps) {
  const {
    company,
    loading,
    error,
    refetch,
  } = useCompany(companyId);

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (loading) {
    return (
      <div className="min-h-full bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="h-72 animate-pulse rounded-3xl bg-slate-200" />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="h-72 animate-pulse rounded-3xl bg-slate-200 lg:col-span-2" />
            <div className="h-72 animate-pulse rounded-3xl bg-slate-200" />
          </div>

          <div className="h-64 animate-pulse rounded-3xl bg-slate-200" />
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * ERROR
   * =========================================================
   */

  if (error || !company) {
    return (
      <div className="min-h-full bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-red-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
              <AlertCircle
                size={26}
                className="text-red-500"
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-950">
              Unable to load company
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error || "Company information could not be found."}
            </p>

            <button
              type="button"
              onClick={refetch}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-slate-950
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-slate-800
              "
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * PROFILE
   * =========================================================
   */

  return (
    <main className="min-h-full bg-slate-50">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header / Banner */}

        <CompanyProfileHeader company={company} />

        {/* Main content */}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left */}

          <div className="space-y-6 lg:col-span-2">
            <CompanyAbout
              aboutUs={company.aboutUs}
            />

            <CompanyStatistics
              statistics={company.statistics}
            />
          </div>

          {/* Right */}

          <div className="space-y-6">
            <CompanyContact
              email={company.email}
              phone={company.phone}
              website={company.website}
            />

            <CompanyAddress
              address={company.address}
            />

            <CompanySocialLinks
              socialLinks={company.socialLinks}
            />
          </div>
        </div>
      </div>
    </main>
  );
}