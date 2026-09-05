
export interface AdminPlatformStatistics {

  // Total registered companies.
  companies: number;

  // Total registered users.
  users: number;

  // Total jobs in the system.
  jobs: number;

  // Total applications received.
  applications: number;
}


// ============================================================
// COMPANY STATISTICS
// ============================================================

export interface AdminCompanyStatistics {

  // Total registered companies.
  total: number;

  // Total active and approved companies.
  active: number;

  // Companies waiting for approval.
  pendingApproval: number;

  // Inactive companies.
  inactive: number;
}


// ============================================================
// USER STATISTICS
// ============================================================

export interface AdminUserStatistics {

  // Total registered users.
  total: number;

  // Currently active users.
  active: number;

  // Total job seeker users.
  jobSeekers: number;

  // Total admin users.
  admins: number;
}


// ============================================================
// ADMIN DASHBOARD STATISTICS
// ============================================================

export interface AdminDashboardStatistics {

  // Platform-wide statistics.
  platform: AdminPlatformStatistics;

  // Company management statistics.
  companies: AdminCompanyStatistics;

  // User management statistics.
  users: AdminUserStatistics;
}


// ============================================================
// ADMIN DASHBOARD API RESPONSE
//
// GET /admin/dashboard/statistics
//
// Full backend URL:
// http://localhost:9000/api/v1/admin/dashboard/statistics
//
// Authentication:
// ADMIN JWT required.
// ============================================================

export interface AdminDashboardStatisticsResponse {

  success: boolean;

  message: string;

  data: AdminDashboardStatistics | null;

  timestamp?: string;
}