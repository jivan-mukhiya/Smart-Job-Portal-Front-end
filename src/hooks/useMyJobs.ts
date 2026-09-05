// src/hooks/useMyJobs.ts

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

interface UseMyJobsReturn {
  jobs: Job[];

  loading: boolean;

  loadingMore: boolean;

  error: string | null;

  page: number;

  size: number;

  totalElements: number;

  totalPages: number;

  hasMore: boolean;

  refetch: () => Promise<void>;

  loadMore: () => Promise<void>;
}

export function useMyJobs(
  search: string = "",
  pageSize: number = 20,
): UseMyJobsReturn {
  const [jobs, setJobs] =
    useState<Job[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [page, setPage] =
    useState(0);

  const [totalElements, setTotalElements] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(0);

  const normalizedSearch =
    search.trim();

  const hasMore =
    page + 1 < totalPages;

  // ============================================================
  // LOAD FIRST PAGE
  // ============================================================

  const loadInitialJobs =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await jobService.getMyJobs(
            0,
            pageSize,
            normalizedSearch,
          );

        if (!response.success) {
          throw new Error(
            response.message ||
              "Failed to load jobs.",
          );
        }

        const data = response.data;

        setJobs(
          data?.content ?? [],
        );

        setPage(
          data?.page ?? 0,
        );

        setTotalElements(
          data?.totalElements ?? 0,
        );

        setTotalPages(
          data?.totalPages ?? 0,
        );
      } catch (err: unknown) {
        const message =
          err instanceof ApiError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Failed to load jobs.";

        setError(message);

        setJobs([]);

        setPage(0);

        setTotalElements(0);

        setTotalPages(0);

        toast.error(message);
      } finally {
        setLoading(false);
      }
    }, [
      pageSize,
      normalizedSearch,
    ]);

  // ============================================================
  // LOAD MORE
  // ============================================================

  const loadMore =
    useCallback(async () => {
      if (
        loading ||
        loadingMore ||
        !hasMore
      ) {
        return;
      }

      const nextPage =
        page + 1;

      try {
        setLoadingMore(true);
        setError(null);

        const response =
          await jobService.getMyJobs(
            nextPage,
            pageSize,
            normalizedSearch,
          );

        if (!response.success) {
          throw new Error(
            response.message ||
              "Failed to load more jobs.",
          );
        }

        const data = response.data;

        setJobs((currentJobs) => {
          const jobsMap =
            new Map<number, Job>();

          for (
            const job of currentJobs
          ) {
            jobsMap.set(
              job.id,
              job,
            );
          }

          for (
            const job of
              data?.content ?? []
          ) {
            jobsMap.set(
              job.id,
              job,
            );
          }

          return Array.from(
            jobsMap.values(),
          );
        });

        setPage(
          data?.page ?? nextPage,
        );

        setTotalElements(
          data?.totalElements ?? 0,
        );

        setTotalPages(
          data?.totalPages ?? 0,
        );
      } catch (err: unknown) {
        const message =
          err instanceof ApiError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Failed to load more jobs.";

        setError(message);

        toast.error(message);
      } finally {
        setLoadingMore(false);
      }
    }, [
      loading,
      loadingMore,
      hasMore,
      page,
      pageSize,
      normalizedSearch,
    ]);

  // ============================================================
  // REFETCH
  // ============================================================

  const refetch =
    useCallback(async () => {
      await loadInitialJobs();
    }, [loadInitialJobs]);

  // ============================================================
  // SEARCH CHANGE
  // ============================================================

  useEffect(() => {
    const timer =
      setTimeout(() => {
        void loadInitialJobs();
      }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [loadInitialJobs]);

  return {
    jobs,

    loading,

    loadingMore,

    error,

    page,

    size: pageSize,

    totalElements,

    totalPages,

    hasMore,

    refetch,

    loadMore,
  };
}