"use client";

import {
  AlertCircle,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock3,
  Loader2,
  MapPin,
  Wallet,
} from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { useMyApplications } from "@/hooks/useMyApplications";

import type { JobApplication } from "@/types/application";

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatSalary(
  min: number | null,
  max: number | null,
  currency: string | null,
) {
  if (min == null && max == null) {
    return "Salary not specified";
  }

  const currencyText = currency
    ? `${currency} `
    : "";

  if (min != null && max != null) {
    return `${currencyText}${min.toLocaleString()} - ${max.toLocaleString()}`;
  }

  if (min != null) {
    return `${currencyText}${min.toLocaleString()}+`;
  }

  return `${currencyText}${max?.toLocaleString()}`;
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const normalizedStatus =
    status?.toUpperCase() || "UNKNOWN";

  const statusStyles: Record<string, string> = {
    APPLIED:
      "border-blue-200 bg-blue-50 text-blue-700",

    REVIEWING:
      "border-yellow-200 bg-yellow-50 text-yellow-700",

    SHORTLISTED:
      "border-green-200 bg-green-50 text-green-700",

    INTERVIEW:
      "border-purple-200 bg-purple-50 text-purple-700",

    ACCEPTED:
      "border-green-200 bg-green-50 text-green-700",

    REJECTED:
      "border-red-200 bg-red-50 text-red-700",

    WITHDRAWN:
      "border-gray-200 bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
        statusStyles[normalizedStatus] ||
        "border-gray-200 bg-gray-100 text-gray-600"
      }`}
    >
      {normalizedStatus.replaceAll("_", " ")}
    </span>
  );
}

function ApplicationCard({
  application,
  onWithdraw,
  withdrawing,
}: {
  application: JobApplication;
  onWithdraw: (
    applicationId: number,
  ) => Promise<boolean>;
  withdrawing: boolean;
}) {
  const [showDetails, setShowDetails] =
    useState(false);

  const {
    id,
    status,
    appliedAt,
    expectedSalary,
    noticePeriodDays,
    coverLetter,
    candidateNotes,
    job,
    resume,
  } = application;

  const canWithdraw =
    status !== "WITHDRAWN" &&
    status !== "REJECTED";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {job.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <Building2 className="h-4 w-4" />

            <span>
              {job.companyName ||
                "Company not specified"}
            </span>
          </div>
        </div>

        <div>
          <StatusBadge status={status} />
        </div>
      </div>

      {/* Job Information */}
      <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0" />

          <span>
            {job.location ||
              "Location not specified"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 shrink-0" />

          <span>
            {formatSalary(
              job.salaryMin,
              job.salaryMax,
              job.salaryCurrency,
            )}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 shrink-0" />

          <span>
            Applied {formatDate(appliedAt)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 shrink-0" />

          <span>
            {noticePeriodDays != null
              ? `${noticePeriodDays} days notice`
              : "Notice not specified"}
          </span>
        </div>
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="mt-5 rounded-lg bg-gray-50 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Expected Salary */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Expected Salary
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {expectedSalary != null
                  ? `${job.salaryCurrency || ""} ${expectedSalary.toLocaleString()}`
                  : "Not specified"}
              </p>
            </div>

            {/* Resume */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Resume
              </p>

              <p className="mt-1 truncate text-sm font-medium text-gray-900">
                {resume?.fileName ||
                  "No resume attached"}
              </p>
            </div>
          </div>

          {/* Cover Letter */}
          {coverLetter && (
            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Cover Letter
              </p>

              <p className="mt-1 whitespace-pre-line text-sm leading-6 text-gray-700">
                {coverLetter}
              </p>
            </div>
          )}

          {/* Candidate Notes */}
          {candidateNotes && (
            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Candidate Notes
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-700">
                {candidateNotes}
              </p>
            </div>
          )}

          {/* Rejection Reason */}
          {application.rejectionReason && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-red-600">
                Rejection Reason
              </p>

              <p className="mt-1 text-sm text-red-700">
                {application.rejectionReason}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setShowDetails(
              (previous) => !previous,
            )
          }
          className="w-full sm:w-auto"
        >
          {showDetails
            ? "Hide Details"
            : "View Application"}
        </Button>

        {canWithdraw && (
          <Button
            type="button"
            variant="outline"
            disabled={withdrawing}
            onClick={() =>
              onWithdraw(id)
            }
            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 sm:w-auto"
          >
            {withdrawing
              ? "Withdrawing..."
              : "Withdraw"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default function ApplicationHistory() {
  const {
    applications,
    loading,
    loadingMore,
    error,
    totalElements,
    hasMore,
    loadMore,
    withdrawApplication,
  } = useMyApplications();

  const [withdrawingId, setWithdrawingId] =
    useState<number | null>(null);

  const handleWithdraw = async (
    applicationId: number,
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to withdraw this application?",
    );

    if (!confirmed) {
      return false;
    }

    try {
      setWithdrawingId(applicationId);

      return await withdrawApplication(
        applicationId,
      );
    } finally {
      setWithdrawingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
              <BriefcaseBusiness className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Application History
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                View and manage all your job
                applications.
              </p>
            </div>
          </div>
        </div>

        {/* Application List */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* List Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                My Applications
              </h2>

              {!loading && (
                <p className="mt-1 text-sm text-gray-500">
                  Showing{" "}
                  {applications.length} of{" "}
                  {totalElements} applications
                </p>
              )}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin" />

                <span>
                  Loading applications...
                </span>
              </div>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="max-w-md text-center">
                <AlertCircle className="mx-auto h-10 w-10 text-red-500" />

                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  Unable to load applications
                </h3>

                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Empty */}
          {!loading &&
            !error &&
            applications.length === 0 && (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="text-center">
                  <BriefcaseBusiness className="mx-auto h-10 w-10 text-gray-300" />

                  <h3 className="mt-4 text-base font-semibold text-gray-900">
                    No applications yet
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Your submitted job applications
                    will appear here.
                  </p>
                </div>
              </div>
            )}

          {/* Applications */}
          {!loading &&
            !error &&
            applications.length > 0 && (
              <>
                <div className="mt-6 space-y-4">
                  {applications.map(
                    (application) => (
                      <ApplicationCard
                        key={application.id}
                        application={
                          application
                        }
                        onWithdraw={
                          handleWithdraw
                        }
                        withdrawing={
                          withdrawingId ===
                          application.id
                        }
                      />
                    ),
                  )}
                </div>

                {/* View More */}
                {hasMore && (
                  <div className="mt-8 flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={loadingMore}
                      onClick={loadMore}
                      className="min-w-[150px]"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "View More"
                      )}
                    </Button>
                  </div>
                )}

                {/* All Loaded */}
                {!hasMore && (
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                      All applications loaded.
                    </p>
                  </div>
                )}
              </>
            )}
        </div>
      </div>
    </main>
  );
}