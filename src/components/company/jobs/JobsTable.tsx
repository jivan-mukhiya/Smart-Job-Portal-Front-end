import Link from "next/link";
import {
  MapPin,
  Table,
  Users,
} from "lucide-react";



interface JobsTableProps {
  jobs: any[];
}
import { routes } from "@/config/routes";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { JobActions } from "./JobActions";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

export function JobsTable({
  jobs,
}: JobsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

      <Table>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <TableHeader>

          <TableRow>

            <TableHead>
              Job
            </TableHead>

            <TableHead>
              Location
            </TableHead>

            <TableHead>
              Vacancy
            </TableHead>

            <TableHead>
              Experience
            </TableHead>

            <TableHead>
              Salary
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            <TableHead>
              Posted
            </TableHead>

            <TableHead className="text-right">
              Actions
            </TableHead>

          </TableRow>

        </TableHeader>


        {/* =====================================================
            BODY
        ===================================================== */}

        <TableBody>

          {jobs.map((job) => (

            <TableRow key={job.id}>

              {/* =================================================
                  JOB
              ================================================= */}

              <TableCell>

                <div className="min-w-[220px]">

                  <Link
                    href={routes.jobs.details(job.id)}
                    className="
                      font-semibold
                      text-slate-950
                      transition
                      hover:text-slate-600
                    "
                  >
                    {job.title}
                  </Link>


                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">

                    {job.jobTypeName && (
                      <span>
                        {job.jobTypeName}
                      </span>
                    )}

                    {job.jobTypeName &&
                      job.jobLevelName && (
                        <span>•</span>
                      )}

                    {job.jobLevelName && (
                      <span>
                        {job.jobLevelName}
                      </span>
                    )}

                  </div>

                </div>

              </TableCell>


              {/* =================================================
                  LOCATION
              ================================================= */}

              <TableCell>

                <div className="flex items-center gap-2 whitespace-nowrap">

                  <MapPin
                    size={15}
                    className="shrink-0 text-slate-400"
                  />

                  <span>
                    {job.location || "Not specified"}
                  </span>

                </div>

              </TableCell>


              {/* =================================================
                  VACANCY
              ================================================= */}

              <TableCell>

                <div className="flex items-center gap-2">

                  <Users
                    size={15}
                    className="text-slate-400"
                  />

                  <span className="font-medium">
                    {job.vacancy}
                  </span>

                </div>

              </TableCell>


              {/* =================================================
                  EXPERIENCE
              ================================================= */}

              <TableCell>

                {job.experience === 0
                  ? "Fresher"
                  : `${job.experience} years`}

              </TableCell>


              {/* =================================================
                  SALARY
              ================================================= */}

              <TableCell>

                <span className="whitespace-nowrap font-medium">
                  {job.salary || "Negotiable"}
                </span>

              </TableCell>


              {/* =================================================
                  STATUS
              ================================================= */}

              <TableCell>

                <StatusBadge
                  status={job.status}
                />

              </TableCell>


              {/* =================================================
                  CREATED DATE
              ================================================= */}

              <TableCell>

                <span className="whitespace-nowrap text-xs text-slate-500">

                  {job.createdAt
                    ? new Date(
                        job.createdAt,
                      ).toLocaleDateString()
                    : "-"}

                </span>

              </TableCell>


              {/* =================================================
                  ACTIONS
              ================================================= */}

              <TableCell>

                <JobActions
                  jobId={job.id}
                />

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>
  );
}