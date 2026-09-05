  "use client";

  import {
    BriefcaseBusiness,
    CalendarDays,
    GraduationCap,
    MapPin,
    Users,
    Wallet,
  } from "lucide-react";

  import type { Job } from "@/types/job";

  interface JobViewSummaryProps {
    job: Job;
  }

  function formatDate(value: string | null) {
    if (!value) return "Not specified";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Not specified";
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function formatValue(value: string | null) {
    if (!value) return "Not specified";

    return value
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  export function JobViewSummary({
    job,
  }: JobViewSummaryProps) {
    const salary =
      job.salaryRange ||
      (job.salaryCurrency
        ? `${job.salaryCurrency} ${
            job.salaryNegotiable
              ? "Negotiable"
              : "Fixed"
          }`
        : "Not specified");

    const items = [
      {
        icon: Wallet,
        label: "Salary",
        value: salary,
      },
      {
        icon: BriefcaseBusiness,
        label: "Job Type",
        value: formatValue(job.jobType),
      },
      {
        icon: GraduationCap,
        label: "Job Level",
        value: formatValue(job.jobLevel),
      },
      {
        icon: BriefcaseBusiness,
        label: "Experience",
        value:
          job.experienceRequired !== null
            ? `${job.experienceRequired}+ years`
            : "Not specified",
      },
      {
        icon: Users,
        label: "Vacancies",
        value: job.vacancies ?? 0,
      },
      {
        icon: CalendarDays,
        label: "Application Deadline",
        value: formatDate(
          job.applicationDeadline,
        ),
      },
      {
        icon: MapPin,
        label: "Location",
        value:
          job.location || "Not specified",
      },
      {
        icon: Users,
        label: "Applications",
        value: job.applicationCount ?? 0,
      },
    ];

    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-bold text-gray-900">
          Job Overview
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex min-w-0 gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <Icon className="h-5 w-5 text-gray-600" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500">
                    {item.label}
                  </p>

                  <p className="mt-1 break-words text-sm font-semibold text-gray-900">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ADDRESS */}

        {job.address && (
          <div className="mt-5 border-t border-gray-100 pt-5">
            <p className="text-xs font-medium text-gray-500">
              Address
            </p>

            <p className="mt-1 text-sm text-gray-700">
              {job.address}
            </p>
          </div>
        )}

        {/* EDUCATION */}

        {job.educationRequired && (
          <div className="mt-4">
            <p className="text-xs font-medium text-gray-500">
              Education
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-700">
              {job.educationRequired}
            </p>
          </div>
        )}
      </div>
    );
  }