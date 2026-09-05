"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import { ApiError } from "@/lib/api-error";
import { jobService } from "@/services/job.service";

import type { Job } from "@/types/job";

interface UseJobReturn {
  job: Job | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useJob(
  jobId: number | string | null | undefined,
): UseJobReturn {
  const [job, setJob] =
    useState<Job | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadJob = useCallback(
    async (): Promise<void> => {
      console.log(
        "[useJob] jobId:",
        jobId,
      );

      // ========================================================
      // CHECK JOB ID EXISTS
      // ========================================================

      if (
        jobId === null ||
        jobId === undefined ||
        jobId === ""
      ) {
        const message =
          "Job ID is required.";

        console.error(
          "[useJob]",
          message,
        );

        setJob(null);
        setError(message);
        setLoading(false);

        return;
      }

      // ========================================================
      // CONVERT ROUTE ID TO NUMBER
      //
      // Next.js route params are usually strings.
      //
      // "5" -> 5
      // ========================================================

      const numericJobId =
        Number(jobId);

      console.log(
        "[useJob] numericJobId:",
        numericJobId,
      );

      // ========================================================
      // VALIDATE JOB ID
      // ========================================================

      if (
        !Number.isInteger(numericJobId) ||
        numericJobId <= 0
      ) {
        const message =
          "Invalid job ID.";

        console.error(
          "[useJob]",
          message,
          jobId,
        );

        setJob(null);
        setError(message);
        setLoading(false);

        return;
      }

      // ========================================================
      // LOAD JOB
      // ========================================================

      try {
        setLoading(true);
        setError(null);

        console.log(
          "[useJob] requesting job:",
          numericJobId,
        );

        const response =
          await jobService.getJobById(
            numericJobId,
          );

        console.log(
          "[useJob] API response:",
          response,
        );

        // ======================================================
        // API RESPONSE ERROR
        // ======================================================

        if (!response.success) {
          const message =
            response.message ||
            "Unable to load job.";

          setJob(null);
          setError(message);

          toast.error(message);

          return;
        }

        // ======================================================
        // NO JOB FOUND
        // ======================================================

        if (!response.data) {
          const message =
            "Job was not found.";

          setJob(null);
          setError(message);

          toast.error(message);

          return;
        }

        // ======================================================
        // JOB LOADED
        // ======================================================

        console.log(
          "[useJob] loaded job:",
          response.data,
        );

        setJob(response.data);
      } catch (err: unknown) {
        let message =
          "Unable to load job.";

        if (err instanceof ApiError) {
          message = err.message;
        } else if (
          err instanceof Error
        ) {
          message = err.message;
        }

        console.error(
          "[useJob] Failed to load job:",
          err,
        );

        setJob(null);
        setError(message);

        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [jobId],
  );

  // ==========================================================
  // LOAD JOB WHEN ID CHANGES
  // ==========================================================

  useEffect(() => {
    void loadJob();
  }, [loadJob]);

  // ==========================================================
  // REFETCH
  // ==========================================================

  const refetch = useCallback(
    async (): Promise<void> => {
      await loadJob();
    },
    [loadJob],
  );

  return {
    job,
    loading,
    error,
    refetch,
  };
}