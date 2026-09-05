
import { api } from "@/config/api";
import { apiClient } from "@/lib/api-client";

import type {
  CompanyHiringOverviewResponse,
} from "@/types/company-hiring-overview";

export const companyHiringOverviewService = {
  getHiringOverview(): Promise<CompanyHiringOverviewResponse> {
    return apiClient<CompanyHiringOverviewResponse>(
      api.dashboard.companyHiringOverview,
      {
        method: "GET",
      },
    );
  },
};
