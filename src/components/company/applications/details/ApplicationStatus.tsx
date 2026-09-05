import type {
  ApplicationStatus,
} from "@/types/application";

import {
  formatStatus,
} from "./formatters";

interface Props {
  status: ApplicationStatus;

  options: ApplicationStatus[];

  updating: boolean;

  onChange: (
    status: ApplicationStatus,
  ) => void;
}

export function ApplicationStatusPanel({
  status,
  options,
  updating,
  onChange,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">

      <div className="mb-5">

        <h2 className="text-base font-bold text-slate-950">
          Manage Application
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Move this candidate through the recruitment process.
        </p>

      </div>

      <div className="flex flex-wrap gap-2">

        {options.map(
          option => {
            const active =
              status === option;

            return (
              <button
                key={option}
                type="button"
                disabled={updating}
                onClick={() =>
                  onChange(option)
                }
                className={[
                  "rounded-lg border px-4 py-2.5 text-xs font-semibold transition",
                  active
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50",
                  updating
                    ? "cursor-not-allowed opacity-50"
                    : "",
                ].join(" ")}
              >
                {formatStatus(
                  option,
                )}
              </button>
            );
          },
        )}

      </div>

      {updating && (
        <p className="mt-3 text-xs text-slate-500">
          Updating application status...
        </p>
      )}

      {status === "WITHDRAWN" && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          This application was withdrawn by the job seeker.
        </div>
      )}

    </section>
  );
}