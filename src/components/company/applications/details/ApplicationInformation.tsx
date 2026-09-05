import {
  BriefcaseBusiness,
} from "lucide-react";

import type {
  JobApplication,
} from "@/types/application";

import {
  DetailRow,
} from "./DetailRow";

import {
  formatDate,
  formatSalary,
} from "./formatters";

interface Props {
  application: JobApplication;
}

export function ApplicationInformation({
  application,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white">

      <Header />

      <div className="divide-y divide-slate-100">

        <DetailRow
          label="Application ID"
          value={`#${application.id}`}
        />

        <DetailRow
          label="Expected Salary"
          value={
            application.expectedSalary !==
            null
              ? formatSalary(
                  application.expectedSalary,
                  application.job.salaryCurrency,
                )
              : "Not provided"
          }
        />

        <DetailRow
          label="Notice Period"
          value={
            application.noticePeriodDays !==
            null
              ? `${application.noticePeriodDays} days`
              : "Not provided"
          }
        />

        <DetailRow
          label="Applied"
          value={formatDate(
            application.appliedAt,
          )}
        />

        <DetailRow
          label="Reviewed"
          value={formatDate(
            application.reviewedAt,
          )}
        />

        <DetailRow
          label="Interview"
          value={formatDate(
            application.interviewAt,
          )}
        />

      </div>
    </section>
  );
}

/* =========================================================
   HEADER
========================================================= */

function Header() {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
        <BriefcaseBusiness
          size={18}
        />
      </div>

      <div>

        <h2 className="font-bold text-slate-950">
          Application Details
        </h2>

        <p className="text-xs text-slate-500">
          Application information
        </p>

      </div>

    </div>
  );
}