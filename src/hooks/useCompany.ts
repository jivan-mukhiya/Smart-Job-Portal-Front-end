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

interface UseCompanyReturn {
  company: Company | null;

  loading: boolean;

  error: string | null;

  refetch: () => Promise<void>;
}

export function useCompany(
  id: number | string,
): UseCompanyReturn {
  const [company, setCompany] =
    useState<Company | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadCompany =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await companyService.getCompanyById(
            id,
          );

        if (!response.success) {
          const message =
            response.message ||
            "Unable to load company.";

          setError(message);
          setCompany(null);

          return;
        }

        setCompany(
          response.data ?? null,
        );
      } catch (error: unknown) {
        let message =
          "Unable to load company.";

        if (error instanceof ApiError) {
          message = error.message;
        } else if (
          error instanceof Error
        ) {
          message = error.message;
        }

        setError(message);
        setCompany(null);

        toast.error(message);
      } finally {
        setLoading(false);
      }
    }, [id]);

  useEffect(() => {
    void loadCompany();
  }, [loadCompany]);

  const refetch = async () => {
    await loadCompany();
  };

  return {
    company,
    loading,
    error,
    refetch,
  };
}