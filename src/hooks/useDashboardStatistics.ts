
"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import { ApiError } from "@/lib/api-error";

import { dashboardService } from "@/services/dashboard.service";

import type {
  DashboardStatistics,
} from "@/types/dashboard";

// ============================================================
// HOOK RETURN TYPE
// ============================================================

interface UseDashboardStatisticsReturn {
  statistics: DashboardStatistics | null;

  loading: boolean;

  error: string | null;

  refetch: () => Promise<void>;
}

// ============================================================
// USE DASHBOARD STATISTICS
// ============================================================

export function useDashboardStatistics(): UseDashboardStatisticsReturn {

  const [statistics, setStatistics] =
    useState<DashboardStatistics | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);


  // ============================================================
  // LOAD DASHBOARD STATISTICS
  // ============================================================

  const loadStatistics = useCallback(
    async (): Promise<void> => {

      try {

        setLoading(true);

        setError(null);


        console.log(
          "[useDashboardStatistics] Loading dashboard statistics...",
        );


        // ========================================================
        // API REQUEST
        // ========================================================

        const response =
          await dashboardService.getStatistics();


        console.log(
          "[useDashboardStatistics] API response:",
          response,
        );


        // ========================================================
        // API FAILURE
        // ========================================================

        if (!response.success) {

          const message =
            response.message ||
            "Unable to load dashboard statistics.";


          console.error(
            "[useDashboardStatistics]",
            message,
          );


          setStatistics(null);

          setError(message);

          toast.error(message);

          return;
        }


        // ========================================================
        // EMPTY DATA
        // ========================================================

        if (!response.data) {

          const message =
            "Dashboard statistics are not available.";


          console.error(
            "[useDashboardStatistics]",
            message,
          );


          setStatistics(null);

          setError(message);

          toast.error(message);

          return;
        }


        // ========================================================
        // SUCCESS
        // ========================================================

        console.log(
          "[useDashboardStatistics] Loaded statistics:",
          response.data,
        );


        setStatistics(response.data);

      } catch (err: unknown) {

        // ========================================================
        // ERROR MESSAGE
        // ========================================================

        let message =
          "Unable to load dashboard statistics.";


        if (err instanceof ApiError) {

          message = err.message;

        } else if (err instanceof Error) {

          message = err.message;
        }


        // ========================================================
        // LOG ERROR
        // ========================================================

        console.error(
          "[useDashboardStatistics] Failed to load statistics:",
          err,
        );


        // ========================================================
        // UPDATE STATE
        // ========================================================

        setStatistics(null);

        setError(message);

        toast.error(message);

      } finally {

        setLoading(false);
      }

    },
    [],
  );


  // ============================================================
  // LOAD ON COMPONENT MOUNT
  // ============================================================

  useEffect(() => {

    void loadStatistics();

  }, [loadStatistics]);


  // ============================================================
  // REFETCH
  // ============================================================

  const refetch = useCallback(
    async (): Promise<void> => {

      await loadStatistics();

    },
    [loadStatistics],
  );


  // ============================================================
  // RETURN
  // ============================================================

  return {
    statistics,

    loading,

    error,

    refetch,
  };
}