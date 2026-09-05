
"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import { ApiError } from "@/lib/api-error";
import { companyHiringOverviewService } from "@/services/company-hiring-overview.service";

import type {
  CompanyHiringOverview,
} from "@/types/company-hiring-overview";

interface UseCompanyHiringOverviewReturn {
  overview: CompanyHiringOverview | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCompanyHiringOverview(): UseCompanyHiringOverviewReturn {
  const [overview, setOverview] =
    useState<CompanyHiringOverview | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const fetchHiringOverview = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response =
        await companyHiringOverviewService.getHiringOverview();

      if (!response.success || !response.data) {
        throw new Error(
          response.message ||
            "Failed to load hiring overview",
        );
      }

      setOverview(response.data);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Failed to load hiring overview";

      setError(message);
      setOverview(null);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchHiringOverview();
  }, [fetchHiringOverview]);

  return {
    overview,
    loading,
    error,
    refetch: fetchHiringOverview,
  };
}
