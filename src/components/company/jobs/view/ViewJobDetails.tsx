"use client";

import {
  AlertCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { JobViewActions } from "./JobViewActions";
import { JobViewBenefits } from "./JobViewBenefits";
import { JobViewDescription } from "./JobViewDescription";
import { JobViewHeader } from "./JobViewHeader";
import { JobViewSkills } from "./JobViewSkills";
import { JobViewSummary } from "./JobViewSummary";

import { Button } from "@/components/ui/Button";

import { routes } from "@/config/routes";
import { useJob } from "@/hooks/useJob";

import type { Job } from "@/types/job";

export default function ViewJobDetails() {
  const params = useParams();

  const rawId = params?.id;

  const jobId = Array.isArray(rawId)
    ? Number(rawId[0])
    : Number(rawId);

  const {
    job: fetchedJob,
    loading,
    error,
    refetch,
  } = useJob(
    Number.isInteger(jobId) &&
      jobId > 0
      ? jobId
      : null,
  );

  const [updatedJob, setUpdatedJob] =
    useState<Job | null>(null);

  const job = updatedJob || fetchedJob;

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />

          <p className="text-sm text-gray-500">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error || !job) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-red-500" />

          <h2 className="mt-4 text-lg font-bold text-red-800">
            Unable to load job
          </h2>

          <p className="mt-2 text-sm text-red-700">
            {error || "Job was not found."}
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                void refetch();
              }}
            >
              Try Again
            </Button>

            <Link href={routes.company.jobs.all}>
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6 lg:p-8">
        {/* ======================================================
            HEADER
        ====================================================== */}

        <JobViewHeader job={job} />

        {/* ======================================================
            SUMMARY
        ====================================================== */}

        <JobViewSummary job={job} />

        {/* ======================================================
            CONTENT
        ====================================================== */}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* ====================================================
              LEFT
          ==================================================== */}

          <div className="min-w-0 space-y-6">
            <JobViewDescription
              description={job.description}
              responsibilities={
                job.responsibilities
              }
              requirements={
                job.requirements
              }
            />

            <JobViewSkills
              skills={job.requiredSkills || []}
            />

            <JobViewBenefits
              benefits={job.benefits || []}
            />
          </div>

          {/* ====================================================
              RIGHT
          ==================================================== */}

          <aside className="space-y-6">
            <JobViewActions
              job={job}
              onUpdated={(updated) => {
                setUpdatedJob(updated);
              }}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}