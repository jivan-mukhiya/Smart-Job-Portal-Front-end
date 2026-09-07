  export const api = {
    // ============================================================
    // AUTH
    // ============================================================

    auth: {
      // POST /auth/login
      login: "/auth/login",

      // POST /auth/register
      register: "/auth/register",

      // POST /auth/refresh
      refresh: "/auth/refresh",

      // POST /auth/logout
      logout: "/auth/logout",
    },

    // ============================================================
    // PUBLIC / COMPANY DASHBOARD
    // ============================================================

    dashboard: {
      // GET /dashboard/statistics
      statistics: "/dashboard/statistics",

      // GET /dashboard/company/hiring-overview
      companyHiringOverview:
        "/dashboard/company/hiring-overview",
    },

    // ============================================================
    // ADMIN DASHBOARD
    // ============================================================

    adminDashboard: {
      // GET /admin/dashboard/statistics
      statistics:
        "/admin/dashboard/statistics",
    },

    // ============================================================
    // USERS
    // ============================================================

    users: {
      // GET /users?page=0&size=20
      all: "/users",

      // GET /users/{userId}
      byId: (id: number | string) =>
        `/users/${id}`,

      // DELETE /users/{userId}
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
      published: "/jobs/published",

      // GET /jobs/me
      me: "/jobs/me",

      // GET /jobs/{jobId}
      // PUT /jobs/{jobId}
      // DELETE /jobs/{jobId}
      byId: (id: number | string) =>
        `/jobs/${id}`,

      // PATCH /jobs/{jobId}/publish
      publish: (id: number | string) =>
        `/jobs/${id}/publish`,

      // PATCH /jobs/{jobId}/close
      close: (id: number | string) =>
        `/jobs/${id}/close`,

      // PATCH /jobs/{jobId}/status?status={status}
      status: (id: number | string) =>
        `/jobs/${id}/status`,

      // GET /jobs/company/{companyId}
      byCompany: (companyId: number | string) =>
        `/jobs/company/${companyId}`,
    },

    // ============================================================
    // COMPANIES
    // ============================================================

    companies: {
      // ==========================================================
      // ADMIN / ALL COMPANIES
      //
      // GET /companies?page=0&size=20
      //
      // Protected endpoint.
      // Use this for ADMIN company management.
      // ==========================================================
      all: "/companies",

      // ==========================================================
      // ACTIVE COMPANIES
      //
      // GET /companies/active?page=0&size=20
      //
      // Use this for active/public company listing.
      // ==========================================================
      active: "/companies/active",

      // ==========================================================
      // MY COMPANY
      //
      // GET /companies/me
      //
      // Use this for the currently logged-in COMPANY.
      // ==========================================================
      me: "/companies/me",

      // ==========================================================
      // CREATE COMPANY
      //
      // POST /companies
      // ==========================================================
      create: "/companies",

      // ==========================================================
      // COMPANY BY ID
      //
      // GET /companies/{companyId}
      // ==========================================================
      byId: (id: number | string) =>
        `/companies/${id}`,

      // ==========================================================
      // UPDATE COMPANY
      //
      // PUT /companies/{companyId}
      // ==========================================================
      update: (id: number | string) =>
        `/companies/${id}`,

      // ==========================================================
      // UPDATE COMPANY STATUS
      //
      // PATCH /companies/{companyId}/status
      // ==========================================================
      status: (id: number | string) =>
        `/companies/${id}/status`,
    },

    // ============================================================
    // JOB SEEKERS
    // ============================================================

    jobseekers: {
      // GET /job-seekers
      all: "/job-seekers",

      // GET /job-seekers/me
      me: "/job-seekers/me",

      // GET /job-seekers/{jobSeekerId}
      byId: (id: number | string) =>
        `/job-seekers/${id}`,

      // GET /job-seekers/me/resume
      // PUT /job-seekers/me/resume
      // DELETE /job-seekers/me/resume
      resume: "/job-seekers/me/resume",

      // PUT /job-seekers/me/resume-url
      resumeUrl:
        "/job-seekers/me/resume-url",
    },

    // ============================================================
    // APPLICATIONS
    // ============================================================

    applications: {
      // Jobseeker applies for a job
      apply: (jobId: number | string) =>
        `/applications/jobs/${jobId}`,

      // Jobseeker's own applications
      me: "/applications/me",

      // Company's received applications
      company: "/applications/company",

      // Company's single application
      companyById: (
        applicationId: number | string,
      ) =>
        `/applications/company/${applicationId}`,

      // Generic application by ID
      byId: (
        applicationId: number | string,
      ) =>
        `/applications/${applicationId}`,

      // Jobseeker withdraws application
      withdraw: (
        applicationId: number | string,
      ) =>
        `/applications/me/${applicationId}/withdraw`,

      // Company changes application status
      updateStatus: (
        applicationId: number | string,
      ) =>
        `/applications/${applicationId}/status`,
    },
  } as const;