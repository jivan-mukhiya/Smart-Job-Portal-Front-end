"use client";

import {
  ArrowLeft,
  Building2,
  Edit3,
  MapPin,
  Star,
  Zap,
} from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";

import type { Job } from "@/types/job";

interface JobViewHeaderProps {
  job: Job;
}

function getStatusClass(status: string | null) {
  switch (status?.toUpperCase()) {
    case "PUBLISHED":
    case "ACTIVE":
      return "bg-green-100 text-green-700";

    case "CLOSED":
    case "REJECTED":
      return "bg-red-100 text-red-700";

    case "EXPIRED":
      return "bg-orange-100 text-orange-700";

    case "DRAFT":
      return "bg-gray-100 text-gray-700";

    case "PENDING":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function formatStatus(status: string | null) {
  if (!status) return "Unknown";

  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function JobViewHeader({
  job,
}: JobViewHeaderProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* ==================================================
            JOB INFORMATION
        ================================================== */}

        <div className="flex min-w-0 gap-4">
          {/* COMPANY ICON */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.companyName || "Company"}
                className="h-14 w-14 rounded-xl object-cover"
              />
            ) : (
              <Building2 className="h-7 w-7 text-gray-500" />
            )}
          </div>

          <div className="min-w-0">
            {/* STATUS / BADGES */}
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                  job.status,
                )}`}
              >
                {formatStatus(job.status)}
              </span>

              {job.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                  <Star className="h-3.5 w-3.5" />
                  Featured
                </span>
              )}

              {job.urgent && (
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                  <Zap className="h-3.5 w-3.5" />
                  Urgent
                </span>
              )}
            </div>

            {/* TITLE */}
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {job.title || "Untitled Job"}
            </h1>

            {/* COMPANY */}
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-600">
              <Building2 className="h-4 w-4" />
              {job.companyName || "Company"}
            </p>

            {/* LOCATION */}
            {job.location && (
              <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                {job.location}
              </p>
            )}
          </div>
        </div>

        {/* ==================================================
            ACTIONS
        ================================================== */}

        <div className="flex shrink-0 flex-wrap gap-2">
          <Link href={routes.company.jobs.all}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>

          <Link href={routes.company.jobs.edit(job.id)}>
            <Button>
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Job
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}