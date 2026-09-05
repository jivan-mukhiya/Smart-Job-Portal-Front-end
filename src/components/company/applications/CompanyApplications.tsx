"use client";

import {
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  CalendarDays,
  Eye,
  FileText,
  Users,
} from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";

import { Button } from "@/components/ui/Button";

import { StatusBadge } from "@/components/ui/StatusBadge";

import { routes } from "@/config/routes";

import { ApplicationsHeader } from "./ApplicationsHeader";

import { useCompanyApplications } from "@/hooks/useCompanyApplications";

export function CompanyApplications() {
  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const {
    applications,
    loading,
    loadingMore,
    error,
    totalElements,
    hasMore,
    loadMore,
  } = useCompanyApplications();

  /* =========================================================
     SEARCH + STATUS FILTER
  ========================================================= */

  const filteredApplications =
    useMemo(() => {
      const searchValue =
        search
          .toLowerCase()
          .trim();

      return applications.filter(
        (application) => {
          const applicantName =
            application.applicant?.fullName
              ?.toLowerCase() ?? "";

          const applicantEmail =
            application.applicant?.email
              ?.toLowerCase() ?? "";

          const jobTitle =
            application.job?.title
              ?.toLowerCase() ?? "";

          const matchesSearch =
            !searchValue ||
            applicantName.includes(
              searchValue,
            ) ||
            applicantEmail.includes(
              searchValue,
            ) ||
            jobTitle.includes(
              searchValue,
            );

          const matchesStatus =
            statusFilter === "ALL" ||
            application.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      );
    }, [
      applications,
      search,
      statusFilter,
    ]);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const totalApplications =
    totalElements;

  const newApplications =
    applications.filter(
      (application) =>
        application.status ===
        "APPLIED",
    ).length;

  const shortlistedApplications =
    applications.filter(
      (application) =>
        application.status ===
        "SHORTLISTED",
    ).length;

  /* =========================================================
     INITIAL LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="space-y-6">

        <ApplicationsHeader
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950" />

          <p className="mt-4 text-sm text-slate-500">
            Loading applications...
          </p>

        </div>

      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <div className="space-y-6">

        <ApplicationsHeader
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

          <FileText
            size={30}
            className="mx-auto text-red-400"
          />

          <h3 className="mt-4 font-semibold text-red-900">
            Unable to load applications
          </h3>

          <p className="mt-2 text-sm text-red-700">
            {error}
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <ApplicationsHeader
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* =========================================================
          STATISTICS
      ========================================================= */}

      <div className="grid gap-4 sm:grid-cols-3">

        <ApplicationStat
          icon={
            <FileText size={20} />
          }
          label="Total Applications"
          value={totalApplications}
        />

        <ApplicationStat
          icon={
            <Users size={20} />
          }
          label="New Applications"
          value={newApplications}
        />

        <ApplicationStat
          icon={
            <Users size={20} />
          }
          label="Shortlisted"
          value={
            shortlistedApplications
          }
        />

      </div>

      {/* =========================================================
          TABLE
      ========================================================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>
                Applicant
              </TableHead>

              <TableHead>
                Job
              </TableHead>

              <TableHead>
                Experience
              </TableHead>

              <TableHead>
                Education
              </TableHead>

              <TableHead>
                Applied Date
              </TableHead>

              <TableHead>
                Status
              </TableHead>

              <TableHead className="text-right">
                Action
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {filteredApplications.length >
            0 ? (

              filteredApplications.map(
                (application) => (

                  <TableRow
                    key={
                      application.id
                    }
                  >

                    {/* =================================================
                        APPLICANT
                    ================================================= */}

                    <TableCell>

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">

                          {application
                            .applicant
                            ?.fullName
                            ?.charAt(0)
                            ?.toUpperCase() ??
                            "?"}

                        </div>

                        <div>

                          <p className="font-semibold text-slate-950">

                            {
                              application
                                .applicant
                                ?.fullName
                            }

                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">

                            {
                              application
                                .applicant
                                ?.email
                            }

                          </p>

                        </div>

                      </div>

                    </TableCell>

                    {/* =================================================
                        JOB
                    ================================================= */}

                    <TableCell>

                      <Link
                        href={
                          routes.company.jobs.view(
                            application
                              .job
                              .jobId,
                          )
                        }
                        className="font-semibold text-slate-900 transition hover:text-slate-500"
                      >

                        {
                          application
                            .job
                            ?.title
                        }

                      </Link>

                    </TableCell>

                    {/* =================================================
                        EXPERIENCE
                    ================================================= */}

                    <TableCell>

                      {application
                        .applicant
                        ?.yearsOfExperience ??
                        0}{" "}

                      {application
                        .applicant
                        ?.yearsOfExperience ===
                      1
                        ? "year"
                        : "years"}

                    </TableCell>

                    {/* =================================================
                        EDUCATION
                    ================================================= */}

                    <TableCell>

                      {
                        application
                          .applicant
                          ?.highestEducation ??
                          "Not provided"
                      }

                    </TableCell>

                    {/* =================================================
                        APPLIED DATE
                    ================================================= */}

                    <TableCell>

                      <div className="flex items-center gap-2 whitespace-nowrap">

                        <CalendarDays
                          size={15}
                          className="text-slate-400"
                        />

                        {formatDate(
                          application.appliedAt,
                        )}

                      </div>

                    </TableCell>

                    {/* =================================================
                        STATUS
                    ================================================= */}

                    <TableCell>

                      <StatusBadge
                        status={
                          application.status
                        }
                      />

                    </TableCell>

                    {/* =================================================
                        ACTION
                    ================================================= */}

                    <TableCell>

                      <div className="flex justify-end">

                        <Link
                          href={
                            routes.company
                              .applications
                              .details(
                                application.id,
                              )
                          }
                        >

                          <Button
                            variant="outline"
                            size="sm"
                            leftIcon={
                              <Eye
                                size={15}
                              />
                            }
                          >
                            View
                          </Button>

                        </Link>

                      </div>

                    </TableCell>

                  </TableRow>

                ),
              )

            ) : (

              <TableRow>

                <TableCell
                  colSpan={7}
                  className="py-16 text-center"
                >

                  <div className="flex flex-col items-center">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">

                      <FileText
                        size={25}
                        className="text-slate-400"
                      />

                    </div>

                    <h3 className="mt-4 font-semibold text-slate-950">

                      No applications found

                    </h3>

                    <p className="mt-1 text-sm text-slate-500">

                      Try changing your search
                      or status filter.

                    </p>

                  </div>

                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </div>

      {/* =========================================================
          VIEW MORE
      ========================================================= */}

      {applications.length > 0 && (
        <div className="flex flex-col items-center gap-3">

          <p className="text-sm text-slate-500">

            Showing{" "}

            <span className="font-semibold text-slate-700">
              {applications.length}
            </span>

            {" "}of{" "}

            <span className="font-semibold text-slate-700">
              {totalElements}
            </span>

            {" "}applications

          </p>

          {hasMore && (

            <Button
              variant="outline"
              onClick={() => {
                void loadMore();
              }}
              disabled={loadingMore}
            >

              {loadingMore ? (
                <>
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-950" />

                  Loading...
                </>
              ) : (
                "View More"
              )}

            </Button>

          )}

          {!hasMore && (
            <p className="text-xs text-slate-400">
              All applications loaded.
            </p>
          )}

        </div>
      )}

    </div>
  );
}

/* ================================================================
   STAT CARD
================================================================ */

function ApplicationStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          {icon}
        </div>

        <div>

          <p className="text-xs font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-1 text-xl font-bold text-slate-950">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}

/* ================================================================
   DATE FORMAT
================================================================ */

function formatDate(
  value: string,
): string {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  ).format(date);
}