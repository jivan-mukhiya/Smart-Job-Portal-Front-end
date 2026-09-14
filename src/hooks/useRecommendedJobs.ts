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

  search: string;

  setSearch: (search: string) => void;

  goToPage: (page: number) => Promise<void>;

  refetch: () => Promise<void>;
}

export function usePublishedJobs(
  initialPage: number = 0,
  size: number = 20,
  initialSearch: string = "",
): UsePublishedJobsReturn {
  const [jobs, setJobs] = useState<Job[]>([]);

  const [page, setPage] =
    useState(initialPage);

  const [totalPages, setTotalPages] =
    useState(0);

  const [totalElements, setTotalElements] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [search, setSearchState] =
    useState(initialSearch);

  // ============================================================
  // LOAD PUBLISHED JOBS
  // ============================================================

  const loadJobs = useCallback(
    async (
      pageNumber: number,
      searchValue: string = search,
    ) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await jobService.getPublishedJobs(
            pageNumber,
            size,
            searchValue,
          );

        if (!response.success) {
          const message =
            response.message ||
            "Unable to load published jobs.";

          setError(message);
          setJobs([]);

          return;
        }

        setJobs(
          response.data.content ?? [],
        );

        setPage(response.data.page);

        setTotalPages(
          response.data.totalPages,
        );

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
    [search, size],
  );

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    loadJobs(
      initialPage,
      initialSearch,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    initialPage,
    initialSearch,
    size,
  ]);

  // ============================================================
  // SEARCH
  // ============================================================

  const setSearch = useCallback(
    (value: string) => {
      setSearchState(value);

      /**
       * Always return to page 0
       * when a new search is performed.
       */
      loadJobs(0, value);
    },
    [loadJobs],
  );

  // ============================================================
  // PAGINATION
  // ============================================================

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

    await loadJobs(
      pageNumber,
      search,
    );
  };

  // ============================================================
  // REFETCH
  // ============================================================

  const refetch = async (): Promise<void> => {
    await loadJobs(
      page,
      search,
    );
  };

  return {
    jobs,

    page,
    totalPages,
    totalElements,

    loading,
    error,

    search,
    setSearch,

    goToPage,
    refetch,
  };
}