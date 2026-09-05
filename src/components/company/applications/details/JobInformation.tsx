import {
  BriefcaseBusiness,
  ExternalLink,
} from "lucide-react";

import Link from "next/link";

import type {
  ApplicationJob,
} from "@/types/application";

import {
  routes,
} from "@/config/routes";

import {
  DetailRow,
} from "./DetailRow";

import {
  formatSalaryRange,
  formatStatus,
} from "./formatters";

interface Props {
  job: ApplicationJob;
}

export function JobInformation({
  job,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white">

      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <BriefcaseBusiness
            size={18}
          />
        </div>

        <div>

          <h2 className="font-bold text-slate-950">
            Job Information
          </h2>

          <p className="text-xs text-slate-500">
            Position details
          </p>

        </div>

      </div>

      <div className="divide-y divide-slate-100">

        <DetailRow
          label="Position"
          value={
            job.title ??
            "Not provided"
          }
        />

        <DetailRow
          label="Company"
          value={
            job.companyName ??
            "Not provided"
          }
        />

        <DetailRow
          label="Location"
          value={
            job.location ??
            "Not provided"
          }
        />

        <DetailRow
          label="Job Type"
          value={formatStatus(
            job.jobType,
          )}
        />

        <DetailRow
          label="Job Level"
          value={formatStatus(
            job.jobLevel,
          )}
        />

        <DetailRow
          label="Salary"
          value={formatSalaryRange(
            job.salaryMin,
            job.salaryMax,
            job.salaryCurrency,
          )}
        />

      </div>

      <div className="border-t border-slate-100 p-5">

        <Link
          href={
            routes.company.jobs.view(
              job.jobId,
            )
          }
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          View Job

          <ExternalLink
            size={15}
          />
        </Link>

      </div>

    </section>
  );
}