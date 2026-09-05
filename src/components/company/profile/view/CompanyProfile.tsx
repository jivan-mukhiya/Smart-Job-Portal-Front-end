"use client";

import { RefreshCw } from "lucide-react";

import { CompanyAbout } from "./CompanyAbout";
import { CompanyAddress } from "./CompanyAddress";
import { CompanyContact } from "./CompanyContact";
import { CompanyProfileHeader } from "./CompanyProfileHeader";
import { CompanySocialLinks } from "./CompanySocialLinks";
import { CompanyStats } from "./CompanyStats";

import { useMyCompany } from "@/hooks/useMyCompany";

export function CompanyProfile() {
  const {
    company,
    loading,
    error,
    companyNotFound,
    refetch,
  } = useMyCompany();

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          {/* PAGE HEADER */}

          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              Company Profile
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View and manage your company information.
            </p>
          </div>

          {/* INLINE SKELETON */}

          <div className="animate-pulse">

            <div className="h-64 rounded-3xl bg-slate-200" />

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">

              <div className="space-y-6">
                <div className="h-48 rounded-2xl bg-slate-200" />
                <div className="h-40 rounded-2xl bg-slate-200" />
                <div className="h-40 rounded-2xl bg-slate-200" />
              </div>

              <div className="space-y-6">
                <div className="h-48 rounded-2xl bg-slate-200" />
                <div className="h-40 rounded-2xl bg-slate-200" />
                <div className="h-32 rounded-2xl bg-slate-200" />
              </div>

            </div>

          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     REAL API ERROR ONLY
     
     company === null is NOT an error.
  ========================================================= */

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              Company Profile
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View and manage your company information.
            </p>
          </div>

          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">

            <h2 className="text-lg font-bold text-slate-950">
              Unable to load company profile
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={refetch}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <RefreshCw size={16} />

              Try Again
            </button>

          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     DISPLAY DATA
     
     When:
     
     company exists
       -> real company data
     
     company doesn't exist
       -> empty/default company data
     
     The SAME UI is rendered in both cases.
  ========================================================= */

  const displayCompany = company ?? {
    id: 0,

    companyName: "",
    industry: "",
    aboutUs: "",
    website: "",
    email: "",
    phone: "",

    status: "",
    approved: false,
    active: false,

    address: {
      addressLine: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },

    images: {
      logoPath: null,
      logoFileName: null,
      logoFileSize: null,
      logoContentType: null,

      bannerPath: null,
      bannerFileName: null,
      bannerFileSize: null,
      bannerContentType: null,

      logoUrl: null,
      bannerUrl: null,
    },

    statistics: {
      profileViews: 0,
      followers: 0,
      activeJobs: 0,
      totalJobsPosted: 0,
      totalApplicants: 0,
      averageRating: 0,
    },

    socialLinks: [],

    createdAt: "",
    updatedAt: "",
  };

  /* =========================================================
     PROFILE PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ===================================================
            COMPANY HEADER
        =================================================== */}

        <CompanyProfileHeader
          companyName={
            displayCompany.companyName
          }
          logoUrl={
            displayCompany.images?.logoUrl
          }
          bannerUrl={
            displayCompany.images?.bannerUrl
          }
          status={displayCompany.status}
          active={displayCompany.active}
          industry={displayCompany.industry}
          profileExists={!companyNotFound}
        />

        {/* ===================================================
            STATS
        =================================================== */}

        <div className="mt-6">
          <CompanyStats
            views={
              displayCompany.statistics
                ?.profileViews ?? 0
            }
            applicants={
              displayCompany.statistics
                ?.totalApplicants ?? 0
            }
            jobCount={
              displayCompany.statistics
                ?.activeJobs ?? 0
            }
          />
        </div>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className="space-y-6">

            <CompanyAbout
              aboutUs={
                displayCompany.aboutUs
              }
            />

            <CompanySocialLinks
              socialLinks={
                displayCompany.socialLinks
              }
            />

          </div>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="space-y-6">

            <CompanyContact
              email={displayCompany.email}
              phone={displayCompany.phone}
              website={displayCompany.website}
            />

            <CompanyAddress
              address={displayCompany.address}
            />

          </aside>

        </div>

      </div>

    </main>
  );
}