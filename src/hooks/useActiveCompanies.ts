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

interface UseActiveCompaniesReturn {
  companies: Company[];

  page: number;

  totalPages: number;

  totalElements: number;

  loading: boolean;

  error: string | null;

  goToPage: (page: number) => void;

  refetch: () => Promise<void>;
}

const PAGE_SIZE = 20;

export function useActiveCompanies(): UseActiveCompaniesReturn {
  const [companies, setCompanies] =
    useState<Company[]>([]);

  const [page, setPage] = useState(0);

  const [totalPages, setTotalPages] =
    useState(0);

  const [totalElements, setTotalElements] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadCompanies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // ========================================================
      // IMPORTANT:
      // PUBLIC PAGE USES /companies/active
      // ========================================================

      const response =
        await companyService.getActiveCompanies(
          page,
          PAGE_SIZE,
        );

      if (!response.success) {
        const message =
          response.message ||
          "Unable to load active companies.";

        setError(message);
        setCompanies([]);

        return;
      }

      setCompanies(
        response.data?.content ?? [],
      );

      setTotalPages(
        response.data?.totalPages ?? 0,
      );

      setTotalElements(
        response.data?.totalElements ?? 0,
      );
    } catch (error: unknown) {
      let message =
        "Unable to load active companies.";

      if (error instanceof ApiError) {
        message = error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      setError(message);
      setCompanies([]);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    void loadCompanies();
  }, [loadCompanies]);

  const goToPage = (nextPage: number) => {
    if (nextPage < 0) {
      return;
    }

    if (
      totalPages > 0 &&
      nextPage >= totalPages
    ) {
      return;
    }

    setPage(nextPage);
  };

  const refetch = async () => {
    await loadCompanies();
  };

  return {
    companies,
    page,
    totalPages,
    totalElements,
    loading,
    error,
    goToPage,
    refetch,
  };
}