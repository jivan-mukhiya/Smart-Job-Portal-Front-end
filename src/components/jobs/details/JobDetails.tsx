"use client";

import {
  CalendarDays,
  Clock3,
} from "lucide-react";

import { useJob } from "@/hooks/useJob";

import { JobHeader } from "./JobHeader";
import { JobOverview } from "./JobOverview";
import { JobDescription } from "./JobDescription";
import { JobResponsibilities } from "./JobResponsibilities";
import { JobSkills } from "./JobSkills";
import { JobSpecifications } from "./JobSpecifications";
import { ApplyJobCard } from "./ApplyJobCard";
import { CompanyCard } from "./CompanyCard";

interface JobDetailsProps {
  jobId: number | string;
}

export function JobDetails({
  jobId,
}: JobDetailsProps) {
  const {
    job,
    loading,
    error,
    refetch,
  } = useJob(jobId);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-32 rounded bg-slate-200" />

              <div className="flex gap-4">
                <div className="h-16 w-16 shrink-0 rounded-2xl bg-slate-200" />

                <div className="flex-1 space-y-3">
                  <div className="h-8 w-2/3 rounded bg-slate-200" />

                  <div className="h-4 w-1/3 rounded bg-slate-200" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="space-y-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>

            <div className="space-y-6">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-950">
            Unable to load job
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <button
            type="button"
            onClick={refetch}
            className="mt-6 rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (!job) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-950">
            Job Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The job you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  /* =========================================================
     DATA
  ========================================================= */

  const skills = [
    ...(job.requiredSkills ?? []),
  ].sort(
    (a, b) =>
      a.displayOrder -
      b.displayOrder,
  );

  const benefits = [
    ...(job.benefits ?? []),
  ].sort(
    (a, b) =>
      a.displayOrder -
      b.displayOrder,
  );

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          JOB HEADER
      ===================================================== */}

      <JobHeader
        title={
          job.title ?? "Untitled Job"
        }

        companyName={
          job.companyName ??
          "Unknown Company"
        }

        /*
         * Pass company ID to JobHeader.
         * This is used by useCompanyLogo()
         * if companyLogo is unavailable.
         */
        companyId={
          job.companyId
        }

        /*
         * Pass logo returned by the job API.
         *
         * If this is null, JobHeader will call:
         *
         * GET /companies/{companyId}/logo
         */
        companyLogo={
          job.companyLogo
        }

        location={
          job.location ??
          "Location not specified"
        }

        status={
          job.status ?? "UNKNOWN"
        }

        jobType={formatEnum(
          job.jobType,
        )}

        jobLevel={formatEnum(
          job.jobLevel,
        )}
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-6">

            <JobOverview
              salary={
                job.salaryRange ??
                formatSalary(
                  job.salaryMin,
                  job.salaryMax,
                  job.salaryCurrency,
                  job.salaryNegotiable,
                )
              }

              experience={
                job.experienceRequired ?? 0
              }

              education={
                job.educationRequired ??
                "Not specified"
              }

              vacancy={
                job.vacancies
              }

              jobType={formatEnum(
                job.jobType,
              )}

              jobLevel={formatEnum(
                job.jobLevel,
              )}
            />

            {/* DESCRIPTION */}

            <JobDescription
              description={
                job.description ??
                "No job description available."
              }
            />

            {/* RESPONSIBILITIES */}

            <JobResponsibilities
              responsibilities={
                job.responsibilities ??
                "No responsibilities provided."
              }
            />

            {/* SKILLS */}

            <JobSkills
              skills={skills.map(
                (skill) =>
                  skill.skillName,
              )}
            />

            {/* REQUIREMENTS */}

            <JobSpecifications
              specifications={
                job.requirements ??
                "No requirements provided."
              }
            />

            {/* BENEFITS */}

            {benefits.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-bold text-slate-950">
                  Benefits
                </h2>

                <div className="mt-5 space-y-4">
                  {benefits.map(
                    (benefit) => (
                      <div
                        key={
                          benefit.id
                        }
                        className="rounded-xl bg-slate-50 p-4"
                      >
                        <h3 className="font-semibold text-slate-900">
                          {
                            benefit.benefitName
                          }
                        </h3>

                        {benefit.description && (
                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            {
                              benefit.description
                            }
                          </p>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </section>
            )}

            {/* JOB INFORMATION */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2 text-slate-950">
                <CalendarDays size={19} />

                <h2 className="text-lg font-bold">
                  Job Information
                </h2>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <InfoItem
                  icon={
                    <CalendarDays
                      size={17}
                    />
                  }
                  label="Posted"
                  value={formatDate(
                    job.postedDate,
                  )}
                />

                <InfoItem
                  icon={
                    <Clock3
                      size={17}
                    />
                  }
                  label="Last Updated"
                  value={formatDate(
                    job.lastUpdatedDate,
                  )}
                />

                <InfoItem
                  icon={
                    <CalendarDays
                      size={17}
                    />
                  }
                  label="Application Deadline"
                  value={formatDate(
                    job.applicationDeadline,
                  )}
                />

                <InfoItem
                  icon={
                    <Clock3
                      size={17}
                    />
                  }
                  label="Applications"
                  value={String(
                    job.applicationCount,
                  )}
                />

              </div>
            </section>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">

            <ApplyJobCard
              jobId={job.id}
              status={job.status ?? ""}
            />

            <CompanyCard
              companyId={job.companyId}
              companyName={
                job.companyName ??
                "Unknown Company"
              }
              companyImageUrl={
                job.companyLogo
              }
            />

          </aside>

        </div>
      </div>
    </main>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6">
      <div className="h-5 w-40 rounded bg-slate-200" />

      <div className="mt-5 space-y-3">
        <div className="h-4 w-full rounded bg-slate-200" />

        <div className="h-4 w-5/6 rounded bg-slate-200" />

        <div className="h-4 w-2/3 rounded bg-slate-200" />
      </div>
    </div>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   DATE
========================================================= */

function formatDate(
  date: string | null,
): string {
  if (!date) {
    return "Not available";
  }

  const parsed = new Date(date);

  if (
    Number.isNaN(
      parsed.getTime(),
    )
  ) {
    return "Not available";
  }

  return parsed.toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );
}

/* =========================================================
   ENUM
========================================================= */

function formatEnum(
  value: string | null,
): string {
  if (!value) {
    return "Not specified";
  }

  return value
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}

/* =========================================================
   SALARY
========================================================= */

function formatSalary(
  min: number | null,
  max: number | null,
  currency: string | null,
  negotiable: boolean,
): string {
  const currencyValue =
    currency ?? "";

  if (
    min !== null &&
    max !== null
  ) {
    return `${currencyValue} ${min.toLocaleString()} - ${max.toLocaleString()}${
      negotiable
        ? " (Negotiable)"
        : ""
    }`;
  }

  if (min !== null) {
    return `${currencyValue} ${min.toLocaleString()}${
      negotiable
        ? " (Negotiable)"
        : ""
    }`;
  }

  if (max !== null) {
    return `Up to ${currencyValue} ${max.toLocaleString()}${
      negotiable
        ? " (Negotiable)"
        : ""
    }`;
  }

  return negotiable
    ? "Negotiable"
    : "Not specified";
}