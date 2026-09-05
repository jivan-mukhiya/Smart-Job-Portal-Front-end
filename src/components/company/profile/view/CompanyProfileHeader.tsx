"use client";

import {
  Building2,
  CheckCircle2,
  Edit3,
  MapPin,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { routes } from "@/config/routes";

interface CompanyProfileHeaderProps {
  companyName: string;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  status: string;
  active: boolean;
  industry?: string | null;
  profileExists?: boolean;
}

export function CompanyProfileHeader({
  companyName,
  logoUrl,
  bannerUrl,
  status,
  active,
  industry,
  profileExists = true,
}: CompanyProfileHeaderProps) {
  const router = useRouter();

  const displayName =
    companyName || "Company Profile";

  const handleProfileAction = () => {
    router.push(
      profileExists
        ? routes.company.profile.edit
        : routes.company.profile.add,
    );
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white">

      {/* =====================================================
          COVER
      ===================================================== */}

      <div
        className="relative h-32 bg-slate-950 sm:h-40"
        style={
          bannerUrl
            ? {
                backgroundImage: `url(${bannerUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >

        {!bannerUrl && (
          <div className="absolute inset-0 bg-slate-950" />
        )}

        {bannerUrl && (
          <div className="absolute inset-0 bg-slate-950/30" />
        )}

      </div>

      {/* =====================================================
          PROFILE CONTENT
      ===================================================== */}

      <div className="px-6 pb-7 sm:px-8">

        <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

          {/* =================================================
              COMPANY INFORMATION
          ================================================= */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

            {/* LOGO */}

            <div className="relative z-20 shrink-0">

              {logoUrl ? (
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg sm:h-28 sm:w-28">

                  <img
                    src={logoUrl}
                    alt={`${displayName} logo`}
                    className="h-full w-full object-cover"
                  />

                </div>
              ) : (
                <ProfileAvatar
                  name={displayName}
                  size="xl"
                />
              )}

            </div>

            {/* INFORMATION */}

            <div className="pb-1">

              <div className="flex items-center gap-2">

                <h2 className="text-2xl font-bold text-slate-950">
                  {displayName}
                </h2>

                {profileExists &&
                  status === "APPROVED" && (
                    <CheckCircle2
                      size={18}
                      className="text-emerald-500"
                    />
                  )}

              </div>

              <p className="mt-1 text-sm font-medium text-slate-600 sm:text-base">
                {industry ||
                  "Industry not provided"}
              </p>

              <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">

                <Building2 size={15} />

                <span>
                  {profileExists
                    ? "Company"
                    : "Company profile not created"}
                </span>

              </div>

            </div>

          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="flex flex-wrap items-center gap-3">

            {profileExists && status && (
              <StatusBadge
                status={status}
              />
            )}

            {profileExists && active && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                Active

              </span>
            )}

            <Button
              type="button"
              variant="outline"
              size="sm"
              leftIcon={
                <Edit3 size={16} />
              }
              onClick={handleProfileAction}
            >
              {profileExists
                ? "Edit Profile"
                : "Create Profile"}
            </Button>

          </div>

        </div>

      </div>

    </section>
  );
}