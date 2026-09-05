
import {
  BriefcaseBusiness,
  Eye,
  Star,
  UserRound,
  Users,
} from "lucide-react";

interface AdminCompanyStatisticsProps {
  statistics: {
    profileViews: number;
    followers: number;
    activeJobs: number;
    totalJobsPosted: number;
    totalApplicants: number;
    averageRating: number;
  };
}

export function AdminCompanyStatistics({
  statistics,
}: AdminCompanyStatisticsProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-base font-bold text-slate-950">
          Company Statistics
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Platform activity and company performance
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatisticCard
          icon={<Eye size={18} />}
          label="Profile Views"
          value={statistics.profileViews}
        />

        <StatisticCard
          icon={<Users size={18} />}
          label="Followers"
          value={statistics.followers}
        />

        <StatisticCard
          icon={<BriefcaseBusiness size={18} />}
          label="Active Jobs"
          value={statistics.activeJobs}
        />

        <StatisticCard
          icon={<BriefcaseBusiness size={18} />}
          label="Jobs Posted"
          value={statistics.totalJobsPosted}
        />

        <StatisticCard
          icon={<UserRound size={18} />}
          label="Total Applicants"
          value={statistics.totalApplicants}
        />

        <StatisticCard
          icon={<Star size={18} />}
          label="Average Rating"
          value={statistics.averageRating.toFixed(1)}
        />
      </div>
    </section>
  );
}

interface StatisticCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function StatisticCard({
  icon,
  label,
  value,
}: StatisticCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
          {icon}
        </div>

        <div>
          <p className="text-xs text-slate-400">
            {label}
          </p>

          <p className="mt-0.5 text-lg font-bold text-slate-950">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
