"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import { ApiError } from "@/lib/api-error";
import { companyService } from "@/services/company.service";

import type { Company } from "@/types/company";

interface UseMyCompanyReturn {
  company: Company | null;

  loading: boolean;

  error: string | null;

  companyNotFound: boolean;

  refetch: () => Promise<void>;
}

export function useMyCompany(): UseMyCompanyReturn {
  const [company, setCompany] =
    useState<Company | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [companyNotFound, setCompanyNotFound] =
    useState(false);

  const loadCompany = useCallback(
    async () => {
      try {
        setLoading(true);

        setError(null);

        setCompanyNotFound(false);

        const response =
          await companyService.getMyCompany();

        /* =================================================
           COMPANY EXISTS
        ================================================= */

        if (
          response.success &&
          response.data
        ) {
          setCompany(response.data);

          setCompanyNotFound(false);

          return;
        }

        /* =================================================
           SUCCESS BUT NO COMPANY

           data: null
        ================================================= */

        if (
          response.success &&
          !response.data
        ) {
          setCompany(null);

          setCompanyNotFound(true);

          return;
        }

        /* =================================================
           SUCCESS FALSE
        ================================================= */

        const message =
          response.message ||
          "Unable to load your company.";

        if (
          message
            .toLowerCase()
            .includes("company not found")
        ) {
          setCompany(null);

          setCompanyNotFound(true);

          setError(null);

          return;
        }

        setCompany(null);

        setCompanyNotFound(false);

        setError(message);
      } catch (error: unknown) {
        /* =================================================
           404 = COMPANY DOES NOT EXIST
        ================================================= */

        if (isNotFoundError(error)) {
          setCompany(null);

          setCompanyNotFound(true);

          setError(null);

          return;
        }

        /* =================================================
           REAL ERROR
        ================================================= */

        const message =
          getErrorMessage(
            error,
            "Unable to load your company.",
          );

        setCompany(null);

        setCompanyNotFound(false);

        setError(message);

        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    loadCompany();
  }, [loadCompany]);

  const refetch = useCallback(
    async () => {
      await loadCompany();
    },
    [loadCompany],
  );

  return {
    company,
    loading,
    error,
    companyNotFound,
    refetch,
  };
}

/* =========================================================
   ERROR MESSAGE
========================================================= */

function getErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (error instanceof ApiError) {
    return error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    const value =
      error as {
        message?: unknown;
      };

    if (
      typeof value.message === "string" &&
      value.message
    ) {
      return value.message;
    }
  }

  return fallback;
}

/* =========================================================
   404 DETECTION
========================================================= */

function isNotFoundError(
  error: unknown,
): boolean {
  if (error instanceof ApiError) {
    const apiError =
      error as ApiError & {
        status?: number;

        statusCode?: number;

        response?: {
          status?: number;
        };
      };

    if (
      apiError.status === 404 ||
      apiError.statusCode === 404 ||
      apiError.response?.status === 404
    ) {
      return true;
    }

    if (
      apiError.message
        ?.toLowerCase()
        .includes("company not found")
    ) {
      return true;
    }
  }

  if (
    error instanceof Error &&
    error.message
      .toLowerCase()
      .includes("company not found")
  ) {
    return true;
  }

  if (
    typeof error === "object" &&
    error !== null
  ) {
    const value =
      error as {
        status?: unknown;

        statusCode?: unknown;

        message?: unknown;

        response?: {
          status?: unknown;
        };
      };

    if (
      value.status === 404 ||
      value.statusCode === 404 ||
      value.response?.status === 404
    ) {
      return true;
    }

    if (
      typeof value.message === "string" &&
      value.message
        .toLowerCase()
        .includes("company not found")
    ) {
      return true;
    }
  }

  return false;
}
