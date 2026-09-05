
import { api } from "@/config/api";
import { apiClient } from "@/lib/api-client";

import type {
  AdminDashboardStatisticsResponse,
} from "@/types/admin-dashboard";


// ============================================================
// ADMIN DASHBOARD SERVICE
// ============================================================

export const adminDashboardService = {

  // ============================================================
  // GET ADMIN DASHBOARD STATISTICS
  //
  // GET /admin/dashboard/statistics
  //
  // Full backend URL:
  // http://localhost:9000/api/v1/admin/dashboard/statistics
  //
  // Authentication:
  // ADMIN JWT required.
  // ============================================================

  getStatistics():
    Promise<AdminDashboardStatisticsResponse> {

    return apiClient<AdminDashboardStatisticsResponse>(
      api.adminDashboard.statistics,
      {
        method: "GET",
      },
    );
  },
};