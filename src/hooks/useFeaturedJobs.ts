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

interface UseFeaturedJobsReturn {
  jobs: Job[];
  page: number;
  totalPages: number;
  totalElements: number;
  loading: boolean;
  error: string | null;
  isJobSeeker: boolean;
  search: string;
  location: string;
  goToPage: (page: number) => Promise<void>;
  refetch: () => Promise<void>;
}

function getRoleFromCookie(): string | null {
  if (
    typeof document ===
    "undefined"
  ) {
    return null;
  }

  const cookies =
    document.cookie
      .split(";")
      .map((cookie) =>
        cookie.trim(),
      );

  const roleCookie =
    cookies.find((cookie) =>
      cookie.startsWith("role="),
    );

  if (!roleCookie) {
    return null;
  }

  try {
    return decodeURIComponent(
      roleCookie.substring(
        "role=".length,
      ),
    );
  } catch {
    return roleCookie.substring(
      "role=".length,
    );
  }
}

export function useFeaturedJobs(
  initialPage: number = 0,
  size: number = 20,
  search: string = "",
  location: string = "",
): UseFeaturedJobsReturn {
  const [jobs, setJobs] =
    useState<Job[]>([]);

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

  const [isJobSeeker, setIsJobSeeker] =
    useState(false);

  const loadJobs = useCallback(
    async (pageNumber: number) => {
      try {
        setLoading(true);
        setError(null);

        const role =
          getRoleFromCookie();

        const jobSeeker =
          role === "JOB_SEEKER";

        setIsJobSeeker(
          jobSeeker,
        );

        const trimmedSearch =
          search.trim();

        const trimmedLocation =
          location.trim();

        let response;

        // ======================================================
        // JOB SEEKER
        // ======================================================

        if (jobSeeker) {
          response =
            await jobService.getRecommendedJobs(
              pageNumber,
              size,
              trimmedSearch,
              trimmedLocation,
            );
        }

        // ======================================================
        // PUBLIC / OTHER USERS
        // ======================================================

        else {
          response =
            await jobService.getPublishedJobs(
              pageNumber,
              size,
              trimmedSearch,
              trimmedLocation,
            );
        }

        if (!response.success) {
          const message =
            response.message ||
            (jobSeeker
              ? "Unable to load recommended jobs."
              : "Unable to load published jobs.");

          setError(message);
          setJobs([]);

          return;
        }

        setJobs(
          response.data?.content ??
            [],
        );

        setPage(
          response.data?.page ??
            pageNumber,
        );

        setTotalPages(
          response.data?.totalPages ??
            0,
        );

        setTotalElements(
          response.data?.totalElements ??
            0,
        );
      } catch (error: unknown) {
        let message =
          "Unable to load jobs.";

        if (
          error instanceof ApiError
        ) {
          message = error.message;
        } else if (
          error instanceof Error
        ) {
          message = error.message;
        }

        setError(message);
        setJobs([]);

        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [
      size,
      search,
      location,
    ],
  );

  useEffect(() => {
    void loadJobs(
      initialPage,
    );
  }, [
    initialPage,
    loadJobs,
  ]);

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
    );
  };

  const refetch =
    async (): Promise<void> => {
      await loadJobs(page);
    };

  return {
    jobs,
    page,
    totalPages,
    totalElements,
    loading,
    error,
    isJobSeeker,
    search,
    location,
    goToPage,
    refetch,
  };
}