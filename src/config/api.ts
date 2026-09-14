export const api = {
  // ============================================================
  // AUTHENTICATION
  // ============================================================

  auth: {
    login: "/auth/login",

    register: "/auth/register",

    refresh: "/auth/refresh",

    logout: "/auth/logout",
  },

  // ============================================================
  // DASHBOARD
  // ============================================================

  dashboard: {
    statistics: "/dashboard/statistics",

    companyHiringOverview:
      "/dashboard/company/hiring-overview",
  },

  // ============================================================
  // ADMIN DASHBOARD
  // ============================================================

  adminDashboard: {
    statistics: "/admin/dashboard/statistics",
  },

  // ============================================================
  // USERS
  // ============================================================

  users: {
    all: "/users",

    byId: (id: number | string) =>
      `/users/${id}`,

    delete: (id: number | string) =>
      `/users/${id}`,
  },

  // ============================================================
  // JOBS
  // ============================================================

  jobs: {
    // GET /jobs
    all: "/jobs",

    // GET /jobs/search
    search: "/jobs/search",

    // GET /jobs/published
    //
    // Public searchable jobs:
    // /jobs/published?page=0&size=20&search=java
    //
    published: "/jobs/published",

    // GET /jobs/me
    //
    // Company's own jobs:
    // /jobs/me?page=0&size=20&search=java
    //
    me: "/jobs/me",

    // GET /jobs/{jobId}
    byId: (id: number | string) =>
      `/jobs/${id}`,

    // PATCH /jobs/{jobId}/publish
    publish: (id: number | string) =>
      `/jobs/${id}/publish`,

    // PATCH /jobs/{jobId}/close
    close: (id: number | string) =>
      `/jobs/${id}/close`,

    // PATCH /jobs/{jobId}/status
    status: (id: number | string) =>
      `/jobs/${id}/status`,

    // GET /jobs/company/{companyId}
    byCompany: (companyId: number | string) =>
      `/jobs/company/${companyId}`,
  },

  // ============================================================
  // JOB RECOMMENDATIONS
  // ============================================================

  // Protected backend endpoint:
  //
  // GET /recommendations/jobs
  //
  // Only JOB_SEEKER can access this endpoint.
  //
  // Example:
  // /recommendations/jobs?page=0&size=10
  //
  // Search:
  // /recommendations/jobs?page=0&size=10&search=java

  recommendations: {
    jobs: "/recommendations/jobs",
  },

  // ============================================================
  // COMPANIES
  // ============================================================

  companies: {
    // GET /companies
    //
    // ADMIN only
    //
    all: "/companies",

    // GET /companies/active
    //
    // Public active companies
    //
    active: "/companies/active",

    // GET /companies/me
    //
    // Logged-in company
    //
    me: "/companies/me",

    // POST /companies
    create: "/companies",

    // GET /companies/{companyId}
    //
    // Public / authenticated depending on backend security
    //
    byId: (id: number | string) =>
      `/companies/${id}`,

    // GET /companies/{companyId}/logo
    //
    // Public company logo
    //
    // Example:
    // /companies/4/logo
    //
    logo: (id: number | string) =>
      `/companies/${id}/logo`,

    // PUT /companies/{companyId}
    update: (id: number | string) =>
      `/companies/${id}`,

    // PATCH /companies/{companyId}/status
    //
    // ADMIN only
    //
    status: (id: number | string) =>
      `/companies/${id}/status`,
  },

  // ============================================================
  // JOB SEEKERS
  // ============================================================

  jobseekers: {
    // GET /job-seekers
    //
    // ADMIN only
    //
    all: "/job-seekers",

    // GET /job-seekers/me
    //
    // Logged-in job seeker
    //
    me: "/job-seekers/me",

    // GET /job-seekers/me/profile-image
    //
    // Logged-in job seeker's profile image
    //
    // Returns:
    // {
    //   success: true,
    //   message: "...",
    //   data: "http://localhost:9000/api/v1/files/uploads/jobseeker/profile/...",
    //   timestamp: "..."
    // }
    //
    profileImage: "/job-seekers/me/profile-image",

    // GET /job-seekers/{id}
    byId: (id: number | string) =>
      `/job-seekers/${id}`,

    // Upload / replace resume
    //
    // PUT /job-seekers/me/resume
    //
    resume: "/job-seekers/me/resume",

    // Resume URL
    //
    // PUT /job-seekers/me/resume-url
    //
    resumeUrl: "/job-seekers/me/resume-url",
  },

  // ============================================================
  // APPLICATIONS
  // ============================================================

  applications: {
    // POST /applications/jobs/{jobId}
    //
    // Job seeker applies for a job
    //
    apply: (jobId: number | string) =>
      `/applications/jobs/${jobId}`,

    // GET /applications/me
    //
    // Job seeker's own applications
    //
    me: "/applications/me",

    // GET /applications/company
    //
    // Company's received applications
    //
    company: "/applications/company",

    // GET /applications/company/{applicationId}
    //
    // Company application detail
    //
    companyById: (
      applicationId: number | string,
    ) =>
      `/applications/company/${applicationId}`,

    // GET /applications/{applicationId}
    byId: (
      applicationId: number | string,
    ) =>
      `/applications/${applicationId}`,

    // PATCH/PUT /applications/me/{applicationId}/withdraw
    //
    // Job seeker withdraws application
    //
    withdraw: (
      applicationId: number | string,
    ) =>
      `/applications/me/${applicationId}/withdraw`,

    // PATCH /applications/{applicationId}/status
    //
    // Company updates application status
    //
    updateStatus: (
      applicationId: number | string,
    ) =>
      `/applications/${applicationId}/status`,
  },
} as const;