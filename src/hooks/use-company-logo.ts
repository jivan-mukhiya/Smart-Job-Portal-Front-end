"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { ApiError } from "@/lib/api-error";
import { companyService } from "@/services/company.service";

/* ============================================================
   TYPES
============================================================ */

interface UseCompanyLogoReturn {
  logoUrl: string | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/* ============================================================
   USE COMPANY LOGO
============================================================ */

export function useCompanyLogo(
  companyId: number | string | null | undefined,
): UseCompanyLogoReturn {
  const [logoUrl, setLogoUrl] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  /* ==========================================================
     LOAD LOGO
  ========================================================== */

  const loadLogo = useCallback(
    async () => {
      // No company ID
      if (
        companyId === null ||
        companyId === undefined
      ) {
        setLogoUrl(null);
        setError(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response =
          await companyService.getCompanyLogo(
            companyId,
          );

        if (!response.success) {
          throw new Error(
            response.message ||
              "Failed to load company logo.",
          );
        }

        /*
         * Backend already returns the complete URL:
         *
         * http://localhost:9000/api/v1/files/uploads/...
         *
         * Do NOT encode or modify this URL.
         */
        setLogoUrl(
          response.data ?? null,
        );
      } catch (error: unknown) {
        let message =
          "Failed to load company logo.";

        if (error instanceof ApiError) {
          message = error.message;
        } else if (error instanceof Error) {
          message = error.message;
        }

        setError(message);
        setLogoUrl(null);
      } finally {
        setLoading(false);
      }
    },
    [companyId],
  );

  /* ==========================================================
     LOAD WHEN COMPANY ID CHANGES
  ========================================================== */

  useEffect(() => {
    void loadLogo();
  }, [loadLogo]);

  /* ==========================================================
     RETURN
  ========================================================== */

  return {
    logoUrl,
    loading,
    error,
    refetch: loadLogo,
  };
}