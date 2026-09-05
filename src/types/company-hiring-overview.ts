
export interface CompanyHiringOverview {
  totalJobs: number;
  activeJobs: number;
  newApplicationsThisWeek: number;
  shortlistedCandidates: number;
  upcomingInterviews: number;
}

export interface CompanyHiringOverviewResponse {
  success: boolean;
  message: string;
  data: CompanyHiringOverview | null;
  timestamp?: string;
}
