import {
  BriefcaseBusiness,
  Building2,
  MapPin,
} from "lucide-react";

import { StatusBadge } from "@/components/ui/StatusBadge";

interface JobHeaderProps {
  title: string;
  companyName: string;
  location: string;
  status: string;
  jobType: string;
  jobLevel: string;
}

export function JobHeader({
  title,
  companyName,
  location,
  status,
  jobType,
  jobLevel,
}: JobHeaderProps) {
  return (
    <section className="border-b border-slate-200 bg-white">

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* Breadcrumb */}

        <div className="mb-6 text-sm text-slate-400">
          Jobs
          <span className="mx-2">/</span>
          Job Details
        </div>


        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

          {/* Left */}

          <div className="flex gap-4">

            {/* Icon */}

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">

              <BriefcaseBusiness size={28} />

            </div>


            {/* Information */}

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  {title}
                </h1>

                <StatusBadge status={status} />

              </div>


              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">

                <div className="flex items-center gap-1.5">

                  <Building2 size={16} />

                  {companyName}

                </div>


                <div className="flex items-center gap-1.5">

                  <MapPin size={16} />

                  {location}

                </div>

              </div>

            </div>

          </div>


          {/* Job badges */}

          <div className="flex flex-wrap gap-2">

            <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
              {jobType}
            </span>

            <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
              {jobLevel}
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}