import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Clock3,
  Heart,
  MapPin,
} from "lucide-react";

import { routes } from "@/config/routes";

import type { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
}

function formatPostedDate(
  date: string | null,
): string {
  if (!date) {
    return "Recently";
  }

  const postedDate = new Date(date);

  if (Number.isNaN(postedDate.getTime())) {
    return "Recently";
  }

  const now = new Date();

  const difference =
    now.getTime() - postedDate.getTime();

  const minutes = Math.floor(
    difference / (1000 * 60),
  );

  const hours = Math.floor(
    difference / (1000 * 60 * 60),
  );

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24),
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return postedDate.toLocaleDateString();
}

function getSalary(job: Job): string {
  if (job.salaryRange) {
    return job.salaryRange;
  }

  if (
    job.salaryMin !== null &&
    job.salaryMax !== null
  ) {
    const currency =
      job.salaryCurrency ?? "";

    return `${currency} ${job.salaryMin} - ${job.salaryMax}`.trim();
  }

  if (job.salaryMin !== null) {
    const currency =
      job.salaryCurrency ?? "";

    return `${currency} ${job.salaryMin}+`.trim();
  }

  if (job.salaryNegotiable) {
    return "Negotiable";
  }

  return "Salary not specified";
}

export function JobCard({
  job,
}: JobCardProps) {
  const skills = [
    ...(job.requiredSkills ?? []),
  ]
    .sort(
      (a, b) =>
        a.displayOrder -
        b.displayOrder,
    )
    .slice(0, 5);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-4">
          {/* Company Logo */}
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 text-slate-700">
            {job.companyLogo ? (
              <Image
                src={job.companyLogo}
                alt={`${job.companyName ?? "Company"} logo`}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <Building2 size={23} />
            )}
          </div>

          {/* Job Information */}
          <div className="min-w-0">
            <h3 className="truncate font-bold text-slate-950">
              {job.title ??
                "Untitled Job"}
            </h3>

            <p className="mt-1 truncate text-sm text-slate-500">
              {job.companyName ??
                "Company"}
            </p>
          </div>
        </div>

        {/* Save Job */}
        <button
          type="button"
          aria-label={`Save ${
            job.title ?? "job"
          }`}
          className="shrink-0 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-950"
        >
          <Heart size={19} />
        </button>
      </div>

      {/* Job Details */}
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
        {job.location && (
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {job.location}
          </span>
        )}

        {job.jobType && (
          <span className="flex items-center gap-1.5">
            <BriefcaseBusiness
              size={14}
            />
            {job.jobType}
          </span>
        )}

        <span className="flex items-center gap-1.5">
          <Clock3 size={14} />
          {formatPostedDate(
            job.postedDate,
          )}
        </span>
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
            >
              {skill.skillName}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
        <p className="text-sm font-semibold text-slate-950">
          {getSalary(job)}
        </p>

        <Link
          href={`${routes.jobs.all}/${job.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition-colors hover:text-slate-950"
        >
          View job

          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}