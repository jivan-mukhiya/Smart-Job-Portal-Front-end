import {
  Eye,
  BriefcaseBusiness,
  Users,
} from "lucide-react";

interface CompanyStatsProps {
  views: number;
  applicants: number;
  jobCount: number;
}

export function CompanyStats({
  views,
  applicants,
  jobCount,
}: CompanyStatsProps) {
  return (
    <section className="grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:grid-cols-3">
      {/* Profile Views */}
      <Stat
        icon={<Eye size={20} />}
        value={views.toLocaleString()}
        label="Profile Views"
      />

      {/* Active Jobs */}
      <Stat
        icon={<BriefcaseBusiness size={20} />}
        value={jobCount.toLocaleString()}
        label="Active Jobs"
      />

      {/* Total Applicants */}
      <Stat
        icon={<Users size={20} />}
        value={applicants.toLocaleString()}
        label="Total Applicants"
      />
    </section>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-slate-200 p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        {icon}
      </div>

      <div>
        <p className="text-xl font-bold text-slate-950">
          {value}
        </p>

        <p className="mt-0.5 text-xs text-slate-500">
          {label}
        </p>
      </div>
    </div>
  );
}