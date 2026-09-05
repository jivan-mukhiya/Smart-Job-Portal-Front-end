
import { api } from "@/config/api";
import { apiClient } from "@/lib/api-client";

import type {
  DashboardStatisticsResponse,
} from "@/types/dashboard";

// ============================================================
// DASHBOARD SERVICE
// ============================================================

export const dashboardService = {

  // ============================================================
  // GET DASHBOARD STATISTICS
  //
  // GET /dashboard/statistics
  //
  // Full backend URL:
  // http://localhost:9000/api/v1/dashboard/statistics
  //
  // This endpoint is PUBLIC.
  // No authentication is required.
  // ============================================================

  getStatistics(): Promise<DashboardStatisticsResponse> {
    return apiClient<DashboardStatisticsResponse>(
      api.dashboard.statistics,
      {
        method: "GET",
      },
    );
  },
};
