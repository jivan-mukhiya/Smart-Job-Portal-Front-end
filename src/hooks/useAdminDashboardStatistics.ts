"use client";

import {
useCallback,
useEffect,
useState,
} from "react";

import { toast } from "sonner";

import { ApiError } from "@/lib/api-error";

import { adminDashboardService } from "@/services/admin-dashboard.service";

import type {
AdminDashboardStatistics,
} from "@/types/admin-dashboard";

// ============================================================
// HOOK RETURN TYPE
// ============================================================

interface UseAdminDashboardStatisticsReturn {

statistics:
AdminDashboardStatistics | null;

loading: boolean;

error: string | null;

refetch: () => Promise<void>;
}

// ============================================================
// USE ADMIN DASHBOARD STATISTICS
// ============================================================

export function useAdminDashboardStatistics():
UseAdminDashboardStatisticsReturn {

const [
statistics,
setStatistics,
] = useState<AdminDashboardStatistics | null>(null);

const [
loading,
setLoading,
] = useState(true);

const [
error,
setError,
] = useState<string | null>(null);

// ============================================================
// LOAD ADMIN DASHBOARD STATISTICS
// ============================================================

const loadStatistics =
useCallback(
async (): Promise<void> => {

    try {

      setLoading(true);

      setError(null);


      console.log(
        "[useAdminDashboardStatistics] Loading admin dashboard statistics...",
      );


      // ======================================================
      // API REQUEST
      // ======================================================

      const response =
        await adminDashboardService.getStatistics();


      // ======================================================
      // API FAILURE
      // ======================================================

      if (!response.success) {

        const message =
          response.message ||
          "Unable to load admin dashboard statistics.";

        setStatistics(null);

        setError(message);

        toast.error(message);

        return;
      }


      // ======================================================
      // EMPTY DATA
      // ======================================================

      if (!response.data) {

        const message =
          "Admin dashboard statistics are not available.";


        setStatistics(null);

        setError(message);

        toast.error(message);

        return;
      }


      // ======================================================
      // SUCCESS
      // ======================================================
      setStatistics(response.data);

    } catch (err: unknown) {

      // ======================================================
      // ERROR MESSAGE
      // ======================================================

      let message =
        "Unable to load admin dashboard statistics.";


      if (err instanceof ApiError) {

        message = err.message;

      } else if (err instanceof Error) {

        message = err.message;
      }


      // ======================================================
      // UPDATE STATE
      // ======================================================

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

const refetch =
useCallback(
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
