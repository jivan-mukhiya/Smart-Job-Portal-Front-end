"use client";

import { FileText, Search } from "lucide-react";

import { Input } from "@/components/ui/Input";

interface ApplicationsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export function ApplicationsHeader({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: ApplicationsHeaderProps) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      {/* =====================================================
          TITLE
      ===================================================== */}

      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
            <FileText size={21} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              Job Applications
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review and manage applications from job seekers.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH + STATUS
      ===================================================== */}

      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Search */}

        <div className="w-full sm:w-64">
          <Input
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search applicant or job..."
            leftIcon={<Search size={17} />}
          />
        </div>

        {/* Status */}

        <select
          value={statusFilter}
          onChange={(event) =>
            onStatusChange(event.target.value)
          }
          className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition hover:border-slate-300 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
        >
          <option value="ALL">
            All Status
          </option>

          <option value="APPLIED">
            Applied
          </option>

          <option value="UNDER_REVIEW">
            Under Review
          </option>

          <option value="SHORTLISTED">
            Shortlisted
          </option>

          <option value="INTERVIEW_SCHEDULED">
            Interview Scheduled
          </option>

          <option value="INTERVIEWED">
            Interviewed
          </option>

          <option value="SELECTED">
            Selected
          </option>

          <option value="REJECTED">
            Rejected
          </option>

          <option value="WITHDRAWN">
            Withdrawn
          </option>
        </select>
      </div>
    </div>
  );
}