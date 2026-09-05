import {
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import type {
  JobApplication,
} from "@/types/application";

import {
  formatDateTime,
  formatStatus,
} from "./formatters";

interface Props {
  application: JobApplication;
}

export function ApplicationTimeline({
  application,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white">

      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <CalendarDays
            size={18}
          />
        </div>

        <div>

          <h2 className="font-bold text-slate-950">
            Timeline
          </h2>

          <p className="text-xs text-slate-500">
            Application activity
          </p>

        </div>

      </div>

      <div className="space-y-5 p-6">

        <TimelineItem
          title="Application Submitted"
          date={
            application.appliedAt
          }
        />

        {application.reviewedAt && (
          <TimelineItem
            title="Application Reviewed"
            date={
              application.reviewedAt
            }
          />
        )}

        {application.interviewAt && (
          <TimelineItem
            title="Interview"
            date={
              application.interviewAt
            }
          />
        )}

        <TimelineItem
          title={`Current Status: ${formatStatus(
            application.status,
          )}`}
        />

      </div>

    </section>
  );
}

/* =========================================================
   TIMELINE ITEM
========================================================= */

function TimelineItem({
  title,
  date,
}: {
  title: string;
  date?: string;
}) {
  return (
    <div className="flex gap-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white">
        <CheckCircle2
          size={15}
        />
      </div>

      <div className="pt-1">

        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        {date && (
          <p className="mt-1 text-xs text-slate-400">
            {formatDateTime(
              date,
            )}
          </p>
        )}

      </div>

    </div>
  );
}