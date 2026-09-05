
export interface DashboardStatistics {
  // Total job opportunities on the platform.
  jobOpportunities: number;

  // Total active and approved companies.
  companies: number;

  // Total registered job seekers.
  jobSeekers: number;

  // Total jobs in the system.
  totalJobs: number;

  // Currently active jobs.
  activeJobs: number;

  // Total applications received.
  applications: number;

  // Unique job seekers who have submitted applications.
  candidatesInPipeline: number;
}

// ============================================================
// DASHBOARD STATISTICS API RESPONSE
//
// GET /dashboard/statistics
// ============================================================

export interface DashboardStatisticsResponse {
  success: boolean;

  message: string;

  data: DashboardStatistics | null;

  timestamp?: string;
}