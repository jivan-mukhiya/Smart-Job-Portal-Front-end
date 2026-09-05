import Link from "next/link";
import {
  BriefcaseBusiness,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";

export function JobsEmptyState() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">

      <div
        className="
          mx-auto
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-slate-100
          text-slate-500
        "
      >
        <BriefcaseBusiness size={26} />
      </div>


      <h2 className="mt-5 text-lg font-bold text-slate-950">
        No jobs posted yet
      </h2>


      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        You haven't created any job postings yet.
        Post your first job to start finding qualified
        candidates.
      </p>


      <Link
        href={routes.company.jobs.post}
        className="mt-6 inline-block"
      >

        <Button
          leftIcon={<Plus size={17} />}
        >
          Post New Job
        </Button>

      </Link>

    </div>
  );
}