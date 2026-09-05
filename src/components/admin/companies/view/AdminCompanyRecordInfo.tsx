
import { CalendarDays } from "lucide-react";

interface AdminCompanyRecordInfoProps {
  createdAt: string;
  updatedAt: string;
}

export function AdminCompanyRecordInfo({
  createdAt,
  updatedAt,
}: AdminCompanyRecordInfoProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-base font-bold text-slate-950">
        Record Information
      </h2>

      <div className="space-y-4">
        <RecordRow
          label="Created"
          value={formatDate(createdAt)}
        />

        <RecordRow
          label="Last Updated"
          value={formatDate(updatedAt)}
        />
      </div>
    </section>
  );
}

function RecordRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100">
        <CalendarDays
          size={17}
          className="text-slate-500"
        />
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}