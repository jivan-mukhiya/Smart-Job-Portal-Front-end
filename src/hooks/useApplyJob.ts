"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

import { ApiError } from "@/lib/api-error";
import { applicationService } from "@/services/application.service";

import type {
  JobApplicationRequest,
  JobApplicationResponse,
} from "@/types/application";

interface UseApplyJobReturn {
  applyJob: (
    jobId: number | string,
    data: JobApplicationRequest,
  ) => Promise<JobApplicationResponse | null>;

  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export function useApplyJob(): UseApplyJobReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const applyJob = useCallback(
    async (
      jobId: number | string,
      data: JobApplicationRequest,
    ): Promise<JobApplicationResponse | null> => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const response =
          await applicationService.applyForJob(jobId, data);

        if (!response.success) {
          const message =
            response.message ||
            "Unable to submit your application.";

          setError(message);
          toast.error(message);

          return response;
        }

        setSuccess(true);

        toast.success(
          response.message ||
            "Application submitted successfully.",
        );

        return response;
      } catch (err: unknown) {
        let message =
          "Unable to submit your application.";

        if (err instanceof ApiError) {
          message = err.message;
        } else if (err instanceof Error) {
          message = err.message;
        } else if (
          typeof err === "object" &&
          err !== null &&
          "message" in err
        ) {
          message = String(
            (err as { message?: unknown }).message ??
              message,
          );
        }

        setError(message);
        setSuccess(false);

        toast.error(message);

        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    applyJob,
    loading,
    error,
    success,
    reset,
  };
}