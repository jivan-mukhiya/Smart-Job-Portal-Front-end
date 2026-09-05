// src/components/company/jobs/ManageJobs.tsx

"use client";

import {
  BriefcaseBusiness,
  CheckCircle2,
  CircleX,
  Clock3,
  Edit3,
  Eye,
  MapPin,
  Plus,
  Search,
  Users,
} from "lucide-react";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";

import { routes } from "@/config/routes";

import { useMyJobs } from "@/hooks/useMyJobs";

import type { Job } from "@/types/job";

// ============================================================
// SUMMARY CARD
// ============================================================

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
}

function SummaryCard({
  title,
  value,
  icon: Icon,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100">
          <Icon className="h-5 w-5 text-gray-600" />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// JOBS HEADER
// ============================================================

interface JobsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

function JobsHeader({
  search,
  onSearchChange,
}: JobsHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Manage Jobs
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Create, manage, and track your job postings.
        </p>
      </div>

      {/* ADD JOB */}
      <Link href={routes.company.jobs.add}>
        <Button className="inline-flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Job
        </Button>
      </Link>

      {/* SEARCH */}
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search jobs by title..."
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
        />
      </div>
    </div>
  );
}

// ============================================================
// JOB TABLE ROW
// ============================================================

interface JobTableRowProps {
  job: Job;
}

function JobTableRow({
  job,
}: JobTableRowProps) {
  return (
    <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
      {/* ======================================================
          JOB
      ====================================================== */}

      <td className="px-6 py-4">
        <div className="min-w-0">
          <Link
            href={routes.company.jobs.view(job.id)}
            className="block text-sm font-semibold text-gray-900 hover:text-blue-600"
          >
            {job.title || "Untitled Job"}
          </Link>

          <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5" />

            <span>
              {job.location ||
                "Location not specified"}
            </span>
          </div>
        </div>
      </td>

      {/* ======================================================
          TYPE
      ====================================================== */}

      <td className="px-6 py-4">
        <span className="text-sm text-gray-700">
          {job.jobType || "—"}
        </span>
      </td>

      {/* ======================================================
          VACANCIES
      ====================================================== */}

      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-sm text-gray-700">
          <Users className="h-4 w-4 text-gray-400" />

          {job.vacancies ?? 0}
        </div>
      </td>

      {/* ======================================================
          APPLICATIONS
      ====================================================== */}

      <td className="px-6 py-4">
        <span className="text-sm font-medium text-gray-700">
          {job.applicationCount ?? 0}
        </span>
      </td>

      {/* ======================================================
          STATUS
      ====================================================== */}

      <td className="px-6 py-4">
        <StatusBadge
          status={
            job.status || "UNKNOWN"
          }
        />
      </td>

      {/* ======================================================
          ACTIONS
      ====================================================== */}

      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">

          {/* ==================================================
              VIEW
          ================================================== */}

          <Link
            href={routes.company.jobs.view(job.id)}
            title="View job"
            aria-label={`View ${job.title || "job"}`}
            className="inline-flex rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <Eye className="h-4 w-4" />
          </Link>

          {/* ==================================================
              EDIT
          ================================================== */}

          <Link
            href={routes.company.jobs.edit(job.id)}
            title="Edit job"
            aria-label={`Edit ${job.title || "job"}`}
            className="inline-flex rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-blue-600"
          >
            <Edit3 className="h-4 w-4" />
          </Link>

        </div>
      </td>
    </tr>
  );
}

// ============================================================
// LOADING ROWS
// ============================================================

function LoadingRows() {
  return (
    <>
      {Array.from({
        length: 5,
      }).map((_, index) => (
        <tr
          key={index}
          className="border-b border-gray-100"
        >
          {Array.from({
            length: 6,
          }).map((__, cellIndex) => (
            <td
              key={cellIndex}
              className="px-6 py-5"
            >
              <div className="h-4 w-full max-w-[180px] animate-pulse rounded bg-gray-200" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

interface EmptyStateProps {
  searching: boolean;
  onClear: () => void;
}

function EmptyState({
  searching,
  onClear,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <BriefcaseBusiness className="h-7 w-7 text-gray-400" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-gray-900">
        {searching
          ? "No jobs found"
          : "No jobs yet"}
      </h3>

      <p className="mt-1 max-w-md text-sm text-gray-500">
        {searching
          ? "No job matches your search. Try another job title."
          : "You have not created any job postings yet."}
      </p>

      {searching ? (
        <Button
          type="button"
          onClick={onClear}
          className="mt-5"
        >
          Clear Search
        </Button>
      ) : (
        <Link
          href={routes.company.jobs.add}
          className="mt-5"
        >
          <Button className="inline-flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Your First Job
          </Button>
        </Link>
      )}
    </div>
  );
}

// ============================================================
// MANAGE JOBS
// ============================================================

export function ManageJobs() {
  const [search, setSearch] =
    useState("");

  // ==========================================================
  // JOB DATA
  //
  // GET /api/v1/jobs/me?page=0&size=20&search=java
  // ==========================================================

  const {
    jobs,
    loading,
    loadingMore,
    error,
    totalElements,
    hasMore,
    loadMore,
    refetch,
  } = useMyJobs(search, 20);

  // ==========================================================
  // SUMMARY
  // ==========================================================

  const openJobs =
    jobs.filter(
      (job) =>
        job.active &&
        job.status?.toUpperCase() ===
          "ACTIVE",
    ).length;

  const closedJobs =
    jobs.filter(
      (job) =>
        !job.active ||
        job.status?.toUpperCase() ===
          "CLOSED",
    ).length;

  const totalVacancies =
    jobs.reduce(
      (total, job) =>
        total +
        (Number(job.vacancies) || 0),
      0,
    );

  // ==========================================================
  // SEARCH
  // ==========================================================

  const handleSearchChange = (
    value: string,
  ) => {
    setSearch(value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="space-y-6">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <JobsHeader
        search={search}
        onSearchChange={
          handleSearchChange
        }
      />

      {/* ======================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Jobs"
          value={totalElements}
          icon={BriefcaseBusiness}
        />

        <SummaryCard
          title="Open Jobs"
          value={openJobs}
          icon={CheckCircle2}
        />

        <SummaryCard
          title="Closed Jobs"
          value={closedJobs}
          icon={CircleX}
        />

        <SummaryCard
          title="Total Vacancies"
          value={totalVacancies}
          icon={Users}
        />
      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <CircleX className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">
                Failed to load jobs
              </p>

              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={() => {
                  void refetch();
                }}
                className="mt-3 text-sm font-semibold text-red-800 underline hover:no-underline"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          JOBS TABLE
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* ====================================================
            TABLE HEADER
        ==================================================== */}

        <div className="flex flex-col gap-2 border-b border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Your Jobs
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {search.trim()
                ? `Search results for "${search.trim()}"`
                : "Manage all your job postings"}
            </p>
          </div>

          {!loading && (
            <div className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-900">
                {jobs.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-900">
                {totalElements}
              </span>{" "}
              jobs
            </div>
          )}
        </div>

        {/* ====================================================
            TABLE
        ==================================================== */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Job
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Type
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Vacancies
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Applications
                </th>

                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {/* LOADING */}

              {loading ? (
                <LoadingRows />
              ) : jobs.length > 0 ? (
                /* JOBS */

                jobs.map((job) => (
                  <JobTableRow
                    key={job.id}
                    job={job}
                  />
                ))
              ) : (
                /* EMPTY */

                <tr>
                  <td colSpan={6}>
                    <EmptyState
                      searching={Boolean(
                        search.trim(),
                      )}
                      onClear={
                        clearSearch
                      }
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ======================================================
            LOAD MORE
        ====================================================== */}

        {!loading && hasMore && (
          <div className="flex justify-center border-t border-gray-200 px-6 py-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                void loadMore();
              }}
              disabled={loadingMore}
              className="inline-flex items-center gap-2"
            >
              {loadingMore ? (
                <>
                  <Clock3 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "View More Jobs"
              )}
            </Button>
          </div>
        )}

        {/* ======================================================
            END OF LIST
        ====================================================== */}

        {!loading &&
          !hasMore &&
          jobs.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-500">
              You have reached the end of
              the job list.
            </div>
          )}
      </div>
    </div>
  );
}