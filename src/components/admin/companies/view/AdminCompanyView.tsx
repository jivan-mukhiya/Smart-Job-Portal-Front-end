
import { ArrowLeft } from "lucide-react";

import Link from "next/link";

import { routes } from "@/config/routes";
import type { CompanyStatus } from "@/types/admin-company";
import { AdminCompanyOverview } from "./AdminCompanyOverview";
import { AdminCompanyStatistics } from "./AdminCompanyStatistics";
import { AdminCompanySocialLinks } from "./AdminCompanySocialLinks";
import { AdminCompanyContact } from "./AdminCompanyContact";
import { AdminCompanyAddress } from "./AdminCompanyAddress";
import { AdminCompanyStatus } from "./AdminCompanyStatus";
import { AdminCompanyRecordInfo } from "./AdminCompanyRecordInfo";
import { AdminCompanyHeader } from "./AdminCompanyHeader";

export interface AdminCompanyViewData {
  id: number;
  companyName: string;
  industry: string | null;
  aboutUs: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;

  status: CompanyStatus;
  approved: boolean;
  active: boolean;

  address: {
    addressLine: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    postalCode: string | null;
  };

  images: {
    logoUrl: string | null;
    bannerUrl: string | null;
  };

  statistics: {
    profileViews: number;
    followers: number;
    activeJobs: number;
    totalJobsPosted: number;
    totalApplicants: number;
    averageRating: number;
  };

  socialLinks: {
    id: number;
    platform: string;
    url: string;
  }[];

  createdAt: string;
  updatedAt: string;
}

interface AdminCompanyViewProps {
  company: AdminCompanyViewData;
}

export function AdminCompanyView({
  company,
}: AdminCompanyViewProps) {
  return (
    <div className="mx-auto max-w-7xl">
      {/* BACK */}

      <div className="mb-6">
        <Link
          href={routes.admin.companies.all}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
        >
          <ArrowLeft size={16} />
          Back to Companies
        </Link>
      </div>

      {/* HEADER */}

      <AdminCompanyHeader
        id={company.id}
        companyName={company.companyName}
        industry={company.industry}
        status={company.status}
        active={company.active}
        logoUrl={company.images.logoUrl}
        bannerUrl={company.images.bannerUrl}
      />

      {/* CONTENT */}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* LEFT */}

        <div className="space-y-6 lg:col-span-2">
          <AdminCompanyOverview
            aboutUs={company.aboutUs}
          />

          <AdminCompanyStatistics
            statistics={company.statistics}
          />

          <AdminCompanySocialLinks
            socialLinks={company.socialLinks}
          />
        </div>

        {/* RIGHT */}

        <div className="space-y-6">
          <AdminCompanyContact
            email={company.email}
            phone={company.phone}
            website={company.website}
          />

          <AdminCompanyAddress
            address={company.address}
          />

          <AdminCompanyStatus
            status={company.status}
            approved={company.approved}
            active={company.active}
          />

          <AdminCompanyRecordInfo
            createdAt={company.createdAt}
            updatedAt={company.updatedAt}
          />
        </div>
      </div>
    </div>
  );
}
