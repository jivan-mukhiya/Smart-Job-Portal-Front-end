import {
  BriefcaseBusiness,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import Link from "next/link";

import type {
  JobApplication,
} from "@/types/application";

import type {
  JobSeekerProfile,
} from "@/types/jobseeker";

import {
  StatusBadge,
} from "@/components/ui/StatusBadge";

import {
  routes,
} from "@/config/routes";

interface Props {
  application: JobApplication;

  profile: JobSeekerProfile | null;
}

export function ApplicationHeader({
  application,
  profile,
}: Props) {
  const applicant =
    application.applicant;

  const job =
    application.job;

  const imageUrl =
    profile?.profileImage
      ?.imageUrl ?? null;

  const name =
    applicant.fullName ??
    "Unknown Applicant";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

        {/* ===================================================
            APPLICANT
        =================================================== */}

        <div className="flex items-start gap-4">

          <ProfileImage
            imageUrl={imageUrl}
            name={name}
          />

          <div>

            <h1 className="text-2xl font-bold text-slate-950">
              {name}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {applicant.professionalTitle ??
                profile?.professionalTitle ??
                "Job Seeker"}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">

              {applicant.email && (
                <span className="inline-flex items-center gap-2">
                  <Mail size={15} />
                  {applicant.email}
                </span>
              )}

              {applicant.phone && (
                <span className="inline-flex items-center gap-2">
                  <Phone size={15} />
                  {applicant.phone}
                </span>
              )}

              {applicant.address && (
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} />
                  {applicant.address}
                </span>
              )}

            </div>
          </div>
        </div>

        {/* ===================================================
            JOB
        =================================================== */}

        <div className="w-full rounded-xl bg-slate-50 p-5 lg:max-w-sm">

          <div className="flex items-center justify-between gap-3">

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Applied For
            </p>

            <StatusBadge
              status={
                application.status
              }
            />

          </div>

          <Link
            href={
              routes.company.jobs.view(
                job.jobId,
              )
            }
            className="mt-2 block text-base font-bold text-slate-950 hover:text-slate-600"
          >
            {job.title ??
              "Unknown Position"}
          </Link>

          <div className="mt-3 space-y-2 text-sm text-slate-500">

            <div className="flex items-center gap-2">
              <MapPin size={14} />

              {job.location ??
                "Location not provided"}
            </div>

            <div className="flex items-center gap-2">
              <BriefcaseBusiness
                size={14}
              />

              {formatValue(
                job.jobType,
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

/* =========================================================
   PROFILE IMAGE
========================================================= */

function ProfileImage({
  imageUrl,
  name,
}: {
  imageUrl: string | null;
  name: string;
}) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className="h-16 w-16 shrink-0 rounded-2xl object-cover"
      />
    );
  }

  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-xl font-bold text-slate-700">
      {name
        .charAt(0)
        .toUpperCase()}
    </div>
  );
}

/* =========================================================
   VALUE FORMATTER
========================================================= */

function formatValue(
  value: string | null | undefined,
) {
  if (!value) {
    return "Not provided";
  }

  return value
    .toLowerCase()
    .split("_")
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}