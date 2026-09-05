"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import { ApiError } from "@/lib/api-error";
import { applicationService } from "@/services/application.service";

import type {
  JobApplication,
} from "@/types/application";

/* =========================================================
   CONSTANTS
========================================================= */

const PAGE_SIZE = 20;

/* =========================================================
   RETURN TYPE
========================================================= */

interface UseCompanyApplicationsReturn {
  applications: JobApplication[];

  loading: boolean;

  loadingMore: boolean;

  error: string | null;

  totalElements: number;

  totalPages: number;

  currentPage: number;

  hasMore: boolean;

  loadMore: () => Promise<void>;

  refresh: () => Promise<void>;
}

/* =========================================================
   HOOK
========================================================= */

export function useCompanyApplications(): UseCompanyApplicationsReturn {
  const [applications, setApplications] = useState<
    JobApplication[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [loadingMore, setLoadingMore] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [totalElements, setTotalElements] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(0);

  const [currentPage, setCurrentPage] =
    useState(0);

  const [hasMore, setHasMore] =
    useState(false);

  /* =========================================================
     LOAD FIRST PAGE
  ========================================================= */

  const loadFirstPage = useCallback(
    async (): Promise<void> => {
      try {
        setLoading(true);

        setError(null);

        const response =
          await applicationService.getCompanyApplications(
            0,
            PAGE_SIZE,
          );

        console.log(
          "[useCompanyApplications] response:",
          response,
        );

        if (!response.success) {
          const message =
            response.message ||
            "Unable to load company applications.";

          setApplications([]);

          setError(message);

          setTotalElements(0);

          setTotalPages(0);

          setCurrentPage(0);

          setHasMore(false);

          toast.error(message);

          return;
        }

        const page = response.data;

        if (!page) {
          const message =
            "Application data was not returned.";

          setApplications([]);

          setError(message);

          setTotalElements(0);

          setTotalPages(0);

          setCurrentPage(0);

          setHasMore(false);

          toast.error(message);

          return;
        }

        setApplications(
          page.content ?? [],
        );

        setTotalElements(
          page.totalElements ?? 0,
        );

        setTotalPages(
          page.totalPages ?? 0,
        );

        setCurrentPage(
          page.page ?? 0,
        );

        setHasMore(
          !page.last &&
            (page.page ?? 0) + 1 <
              (page.totalPages ?? 0),
        );
      } catch (err: unknown) {
        let message =
          "Unable to load company applications.";

        if (err instanceof ApiError) {
          message = err.message;
        } else if (err instanceof Error) {
          message = err.message;
        }

        console.error(
          "[useCompanyApplications] loadFirstPage:",
          err,
        );

        setApplications([]);

        setError(message);

        setTotalElements(0);

        setTotalPages(0);

        setCurrentPage(0);

        setHasMore(false);

        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  /* =========================================================
     LOAD MORE
  ========================================================= */

  const loadMore = useCallback(
    async (): Promise<void> => {
      if (loading || loadingMore || !hasMore) {
        return;
      }

      try {
        setLoadingMore(true);

        setError(null);

        const nextPage =
          currentPage + 1;

        console.log(
          "[useCompanyApplications] loading page:",
          nextPage,
        );

        const response =
          await applicationService.getCompanyApplications(
            nextPage,
            PAGE_SIZE,
          );

        console.log(
          "[useCompanyApplications] load more response:",
          response,
        );

        if (!response.success) {
          const message =
            response.message ||
            "Unable to load more applications.";

          setError(message);

          toast.error(message);

          return;
        }

        const page = response.data;

        if (!page) {
          const message =
            "Application data was not returned.";

          setError(message);

          toast.error(message);

          return;
        }

        setApplications(
          (previous) => [
            ...previous,
            ...(page.content ?? []),
          ],
        );

        setTotalElements(
          page.totalElements ?? 0,
        );

        setTotalPages(
          page.totalPages ?? 0,
        );

        setCurrentPage(
          page.page ?? nextPage,
        );

        setHasMore(
          !page.last &&
            (page.page ?? nextPage) + 1 <
              (page.totalPages ?? 0),
        );
      } catch (err: unknown) {
        let message =
          "Unable to load more applications.";

        if (err instanceof ApiError) {
          message = err.message;
        } else if (err instanceof Error) {
          message = err.message;
        }

        console.error(
          "[useCompanyApplications] loadMore:",
          err,
        );

        setError(message);

        toast.error(message);
      } finally {
        setLoadingMore(false);
      }
    },
    [
      currentPage,
      hasMore,
      loading,
      loadingMore,
    ],
  );

  /* =========================================================
     REFRESH
  ========================================================= */

  const refresh = useCallback(
    async (): Promise<void> => {
      await loadFirstPage();
    },
    [loadFirstPage],
  );

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    void loadFirstPage();
  }, [loadFirstPage]);

  /* =========================================================
     RETURN
  ========================================================= */

  return {
    applications,

    loading,

    loadingMore,

    error,

    totalElements,

    totalPages,

    currentPage,

    hasMore,

    loadMore,

    refresh,
  };
}