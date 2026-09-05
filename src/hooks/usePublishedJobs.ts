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

interface UsePublishedJobsReturn {
  jobs: Job[];

  page: number;
  totalPages: number;
  totalElements: number;

  loading: boolean;
  error: string | null;

  goToPage: (page: number) => Promise<void>;
  refetch: () => Promise<void>;
}

export function usePublishedJobs(
  initialPage: number = 0,
  size: number = 20,
): UsePublishedJobsReturn {
  const [jobs, setJobs] = useState<Job[]>([]);

  const [page, setPage] = useState(initialPage);

  const [totalPages, setTotalPages] = useState(0);

  const [totalElements, setTotalElements] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const loadJobs = useCallback(
    async (pageNumber: number) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await jobService.getPublishedJobs(
            pageNumber,
            size,
          );

        if (!response.success) {
          const message =
            response.message ||
            "Unable to load published jobs.";

          setError(message);
          setJobs([]);

          return;
        }

        setJobs(response.data.content ?? []);

        setPage(response.data.page);

        setTotalPages(response.data.totalPages);

        setTotalElements(
          response.data.totalElements,
        );
      } catch (error: unknown) {
        let message =
          "Unable to load published jobs.";

        if (error instanceof ApiError) {
          message = error.message;
        } else if (error instanceof Error) {
          message = error.message;
        }

        setError(message);
        setJobs([]);

        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [size],
  );

  useEffect(() => {
    loadJobs(initialPage);
  }, [initialPage, loadJobs]);

  const goToPage = async (
    pageNumber: number,
  ): Promise<void> => {
    if (
      pageNumber < 0 ||
      (totalPages > 0 &&
        pageNumber >= totalPages)
    ) {
      return;
    }

    await loadJobs(pageNumber);
  };

  const refetch = async (): Promise<void> => {
    await loadJobs(page);
  };

  return {
    jobs,
    page,
    totalPages,
    totalElements,
    loading,
    error,
    goToPage,
    refetch,
  };
}