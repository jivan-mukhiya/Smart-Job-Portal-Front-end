"use client";

import {
  CheckCircle2,
  Globe,
  MapPin,
} from "lucide-react";

import type { Company } from "@/types/company";

interface CompanyProfileHeaderProps {
  company: Company;
}

export function CompanyProfileHeader({
  company,
}: CompanyProfileHeaderProps) {
  const logoUrl =
    company.images?.logoUrl ?? null;

  const bannerUrl =
    company.images?.bannerUrl ?? null;

  const location = [
    company.address?.city,
    company.address?.state,
    company.address?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const initials = company.companyName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* Banner */}

      <div className="relative h-56 bg-slate-100 sm:h-72">
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt={`${company.companyName} banner`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="
              flex
              h-full
              items-center
              justify-center
              bg-slate-100
            "
          >
            <Globe
              size={42}
              className="text-slate-300"
            />
          </div>
        )}

        {/* Subtle overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/30
            via-transparent
            to-transparent
          "
        />
      </div>

      {/* Profile information */}

      <div className="relative px-5 pb-6 sm:px-8">
        {/* Logo */}

        <div
          className="
            -mt-14
            flex
            h-28
            w-28
            items-center
            justify-center
            overflow-hidden
            rounded-3xl
            border-4
            border-white
            bg-slate-50
            shadow-lg
          "
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${company.companyName} logo`}
              className="
                h-full
                w-full
                object-contain
                p-3
              "
            />
          ) : (
            <span
              className="
                text-3xl
                font-bold
                text-slate-700
              "
            >
              {initials}
            </span>
          )}
        </div>

        {/* Company info */}

        <div className="mt-5">
          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1
                  className="
                    text-2xl
                    font-bold
                    tracking-tight
                    text-slate-950
                    sm:text-3xl
                  "
                >
                  {company.companyName}
                </h1>

                {company.approved && (
                  <CheckCircle2
                    size={20}
                    className="text-blue-500"
                    fill="currentColor"
                    stroke="white"
                  />
                )}
              </div>

              <p
                className="
                  mt-1.5
                  text-sm
                  font-medium
                  text-slate-500
                "
              >
                {company.industry ||
                  "Technology company"}
              </p>
            </div>

            {/* Status */}

            <div className="flex items-center gap-2">
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-emerald-200
                  bg-emerald-50
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-emerald-700
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                {company.status || "ACTIVE"}
              </span>
            </div>
          </div>

          {/* Location */}

          {location && (
            <div
              className="
                mt-5
                flex
                items-center
                gap-2
                text-sm
                text-slate-500
              "
            >
              <MapPin
                size={16}
                className="text-slate-400"
              />

              <span>{location}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}