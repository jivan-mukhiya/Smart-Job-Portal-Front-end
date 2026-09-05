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

const PAGE_SIZE = 10;

interface UseMyApplicationsReturn {
  applications: JobApplication[];

  loading: boolean;
  loadingMore: boolean;

  error: string | null;

  totalElements: number;

  hasMore: boolean;

  loadMore: () => Promise<void>;

  withdrawApplication: (
    applicationId: number,
  ) => Promise<boolean>;

  refresh: () => Promise<void>;
}

export function useMyApplications(): UseMyApplicationsReturn {
  const [applications, setApplications] =
    useState<JobApplication[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [currentPage, setCurrentPage] =
    useState(0);

  const [totalElements, setTotalElements] =
    useState(0);

  const [hasMore, setHasMore] =
    useState(false);

  const loadApplications = useCallback(
    async (
      page: number,
      append: boolean,
    ) => {
      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        setError(null);

        const response =
          await applicationService.getMyApplications(
            page,
            PAGE_SIZE,
          );

        if (!response.success) {
          const message =
            response.message ||
            "Unable to load applications.";

          setError(message);

          return;
        }

        const pageData = response.data;

        setApplications((previous) => {
          if (!append) {
            return pageData.content;
          }

          return [
            ...previous,
            ...pageData.content,
          ];
        });

        setCurrentPage(pageData.page);

        setTotalElements(
          pageData.totalElements,
        );

        setHasMore(!pageData.last);
      } catch (err: unknown) {
        let message =
          "Unable to load applications.";

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
            (err as { message?: unknown })
              .message ?? message,
          );
        }

        setError(message);

        toast.error(message);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [],
  );

  /* =========================================================
     INITIAL LOAD

     GET /applications/me?page=0&size=10
  ========================================================= */

  useEffect(() => {
    loadApplications(0, false);
  }, [loadApplications]);

  /* =========================================================
     VIEW MORE

     page 0 -> 1
     page 1 -> 2
     page 2 -> 3
  ========================================================= */

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) {
      return;
    }

    await loadApplications(
      currentPage + 1,
      true,
    );
  }, [
    currentPage,
    hasMore,
    loadApplications,
    loadingMore,
  ]);

  /* =========================================================
     WITHDRAW APPLICATION

     PATCH /applications/me/{id}/withdraw
  ========================================================= */

  const withdrawApplication =
    useCallback(
      async (
        applicationId: number,
      ): Promise<boolean> => {
        try {
          const response =
            await applicationService.withdrawApplication(
              applicationId,
            );

          if (!response.success) {
            toast.error(
              response.message ||
                "Unable to withdraw application.",
            );

            return false;
          }

          /*
           * Update only the withdrawn application
           * without calling the history API again.
           */

          setApplications((previous) =>
            previous.map((application) =>
              application.id === applicationId
                ? {
                    ...application,
                    status: "WITHDRAWN",
                  }
                : application,
            ),
          );

          toast.success(
            response.message ||
              "Application withdrawn successfully.",
          );

          return true;
        } catch (err: unknown) {
          let message =
            "Unable to withdraw application.";

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
              (err as { message?: unknown })
                .message ?? message,
            );
          }

          toast.error(message);

          return false;
        }
      },
      [],
    );

  /* =========================================================
     REFRESH
  ========================================================= */

  const refresh = useCallback(async () => {
    setCurrentPage(0);

    await loadApplications(0, false);
  }, [loadApplications]);

  return {
    applications,
    loading,
    loadingMore,
    error,
    totalElements,
    hasMore,
    loadMore,
    withdrawApplication,
    refresh,
  };
}