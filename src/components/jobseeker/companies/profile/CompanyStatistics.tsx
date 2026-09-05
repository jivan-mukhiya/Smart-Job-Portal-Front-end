import {
  BriefcaseBusiness,
  Eye,
  Users,
} from "lucide-react";

import type { CompanyStatistics as Statistics } from "@/types/company";

interface CompanyStatisticsProps {
  statistics?: Statistics | null;
}

export function CompanyStatistics({
  statistics,
}: CompanyStatisticsProps) {
  const stats = statistics ?? {
    profileViews: 0,
    followers: 0,
    activeJobs: 0,
    totalJobsPosted: 0,
    totalApplicants: 0,
    averageRating: 0,
  };

  const items = [
    {
      label: "Profile Views",
      value: stats.profileViews,
      icon: Eye,
    },
    {
      label: "Active Jobs",
      value: stats.activeJobs,
      icon: BriefcaseBusiness,
    },
    {
      label: "Total Jobs Posted",
      value: stats.totalJobsPosted,
      icon: BriefcaseBusiness,
    },
    {
      label: "Total Applicants",
      value: stats.totalApplicants,
      icon: Users,
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <h2 className="text-lg font-bold text-slate-950">
        Company Statistics
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="
                group
                flex
                min-h-[150px]
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-5
                text-center
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-slate-300
                hover:bg-white
                hover:shadow-sm
              "
            >
              {/* Icon */}
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                  shadow-sm
                  ring-1
                  ring-slate-200
                  transition
                  group-hover:scale-105
                "
              >
                <Icon
                  size={20}
                  strokeWidth={1.8}
                  className="text-slate-600"
                />
              </div>

              {/* Value */}
              <p className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
                {item.value}
              </p>

              {/* Label */}
              <p className="mt-1 text-xs font-semibold text-slate-500">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}