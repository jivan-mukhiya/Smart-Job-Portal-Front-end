
import { Building2 } from "lucide-react";

interface AdminCompanyOverviewProps {
  aboutUs: string | null;
}

export function AdminCompanyOverview({
  aboutUs,
}: AdminCompanyOverviewProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100">
          <Building2
            size={18}
            className="text-slate-600"
          />
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-950">
            About Company
          </h2>

          <p className="text-xs text-slate-400">
            Company description
          </p>
        </div>
      </div>

      <p className="text-sm leading-7 text-slate-600">
        {aboutUs || "No company description available."}
      </p>
    </section>
  );
}