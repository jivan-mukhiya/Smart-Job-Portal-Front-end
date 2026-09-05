"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
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

  const [imageError, setImageError] =
    useState(false);

  const initials = companyName
    ? companyName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "CO";

  const hasLogo =
    Boolean(logoUrl) && !imageError;

  const handleCompanyView = () => {
    router.push(
      routes.companies.details(companyId),
    );
  };

  return (
    <article
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-slate-300
        hover:shadow-xl
        hover:shadow-slate-200/50
      "
    >
      <div
        className="
          absolute
          inset-x-0
          top-0
          h-1
          bg-slate-950
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* Header */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div
          className="
            relative
            flex
            h-16
            w-16
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            shadow-sm
            transition-transform
            duration-300
            group-hover:scale-[1.03]
          "
        >
          {hasLogo ? (
            <img
              src={logoUrl!}
              alt={`${companyName} logo`}
              className="
                h-full
                w-full
                object-contain
                p-2
              "
              loading="lazy"
              onError={() => {
                setImageError(true);
              }}
            />
          ) : (
            <span
              className="
                text-lg
                font-bold
                tracking-tight
                text-slate-700
              "
            >
              {initials}
            </span>
          )}
        </div>

        <span
          className="
            rounded-full
            border
            border-slate-200
            bg-slate-50
            px-2.5
            py-1
            text-[10px]
            font-bold
            uppercase
            tracking-wider
            text-slate-500
          "
        >
          Company
        </span>
      </div>

      {/* Company Information */}

      <div className="mt-5">
        <h3
          className="
            line-clamp-1
            text-lg
            font-bold
            tracking-tight
            text-slate-950
            transition-colors
            group-hover:text-slate-700
          "
          title={companyName}
        >
          {companyName}
        </h3>

        <p
          className="
            mt-1.5
            line-clamp-1
            text-sm
            font-medium
            text-slate-500
          "
        >
          {industry || "Technology company"}
        </p>
      </div>

      <div className="my-5 h-px bg-slate-100" />

      {/* Details */}

      <div className="space-y-3.5">
        {address ? (
          <div
            className="
              flex
              min-w-0
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-slate-50
                text-slate-500
              "
            >
              <MapPin
                size={15}
                strokeWidth={2}
              />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                Location
              </p>

              <p
                className="
                  mt-0.5
                  truncate
                  text-sm
                  font-medium
                  text-slate-600
                "
                title={address}
              >
                {address}
              </p>
            </div>
          </div>
        ) : (
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-slate-50
                text-slate-400
              "
            >
              <MapPin size={15} />
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                Location
              </p>

              <p
                className="
                  mt-0.5
                  text-sm
                  font-medium
                  text-slate-400
                "
              >
                Location not provided
              </p>
            </div>
          </div>
        )}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-slate-100
            bg-slate-50/70
            px-3
            py-2.5
          "
        >
          <div
            className="
              flex
              items-center
              gap-2.5
            "
          >
            <BriefcaseBusiness
              size={16}
              className="text-slate-500"
            />

            <span
              className="
                text-sm
                font-medium
                text-slate-600
              "
            >
              Open positions
            </span>
          </div>

          <span
            className="
              rounded-full
              bg-slate-950
              px-2.5
              py-1
              text-xs
              font-bold
              text-white
            "
          >
            {totalJobs}
          </span>
        </div>
      </div>

      {/* Button */}

      <div className="mt-auto pt-6">
        <Button
          type="button"
          variant="outline"
          fullWidth
          rightIcon={
            <ArrowRight
              size={16}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-0.5
              "
            />
          }
          onClick={handleCompanyView}
        >
          View Company
        </Button>
      </div>
    </article>
  );
}