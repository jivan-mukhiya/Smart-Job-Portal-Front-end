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
import type { AdminCompany } from "@/types/admin-company";

interface UseAdminCompaniesReturn {
  companies: AdminCompany[];

  page: number;

  totalPages: number;

  totalElements: number;

  loading: boolean;

  error: string | null;

  goToPage: (page: number) => void;

  refetch: () => Promise<void>;
}

const PAGE_SIZE = 20;

export function useAdminCompanies(): UseAdminCompaniesReturn {
  const [companies, setCompanies] =
    useState<AdminCompany[]>([]);

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
      // ADMIN PAGE USES /companies
      //
      // This returns ALL companies.
      // ========================================================

      const response =
        await companyService.getCompanies(
          page,
          PAGE_SIZE,
        );

      if (!response.success) {
        const message =
          response.message ||
          "Unable to load companies.";

        setError(message);
        setCompanies([]);

        return;
      }

      const content =
        response.data?.content ?? [];

      const adminCompanies: AdminCompany[] =
        content.map(
          (company: Company) => ({
            id: company.id,

            companyName:
              company.companyName,

            industry:
              company.industry,

            email:
              company.email,

            phone:
              company.phone,

            status:
              company.status,

            approved:
              company.approved,

            active:
              company.active,

            logoUrl:
              company.images?.logoUrl ??
              null,
          }),
        );

      setCompanies(adminCompanies);

      setTotalPages(
        response.data?.totalPages ?? 0,
      );

      setTotalElements(
        response.data?.totalElements ?? 0,
      );
    } catch (error: unknown) {
      let message =
        "Unable to load companies.";

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