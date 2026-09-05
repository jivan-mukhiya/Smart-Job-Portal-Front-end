import Link from "next/link";
import {
  Eye,
  MoreHorizontal,
  Pencil,
} from "lucide-react";

import { routes } from "@/config/routes";

interface JobActionsProps {
  jobId: number;
}

export function JobActions({
  jobId,
}: JobActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">

      {/* View */}

      <Link
        href={routes.jobs.details(jobId)}
        title="View job"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          text-slate-500
          transition
          hover:bg-slate-100
          hover:text-slate-950
        "
      >
        <Eye size={17} />
      </Link>


      {/* Edit */}

      <Link
        href={routes.company.jobs.edit(jobId)}
        title="Edit job"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          text-slate-500
          transition
          hover:bg-slate-100
          hover:text-slate-950
        "
      >
        <Pencil size={17} />
      </Link>


      {/* More */}

      <button
        type="button"
        title="More actions"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          text-slate-500
          transition
          hover:bg-slate-100
          hover:text-slate-950
        "
      >
        <MoreHorizontal size={17} />
      </button>

    </div>
  );
}