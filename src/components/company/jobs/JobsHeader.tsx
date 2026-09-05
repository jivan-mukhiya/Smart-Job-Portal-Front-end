import Link from "next/link";
import {
  BriefcaseBusiness,
  Plus,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { routes } from "@/config/routes";

interface JobsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function JobsHeader({
  search,
  onSearchChange,
}: JobsHeaderProps) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

      {/* =========================================================
          TITLE
      ========================================================= */}

      <div>
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
            <BriefcaseBusiness size={21} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              Manage Jobs
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create, manage and monitor your job postings.
            </p>
          </div>

        </div>
      </div>


      {/* =========================================================
          ACTIONS
      ========================================================= */}

      <div className="flex flex-col gap-3 sm:flex-row">

        {/* Search */}

        <div className="w-full sm:w-64">

          <Input
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search jobs..."
            leftIcon={<Search size={17} />}
          />

        </div>


        {/* Add Job */}

        <Link href={routes.company.jobs.create}>
          <Button
            leftIcon={<Plus size={17} />}
          >
            Post Job
          </Button>
        </Link>

      </div>

    </div>
  );
}