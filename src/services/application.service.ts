import { api } from "@/config/api";
import { apiClient } from "@/lib/api-client";

import type {
  ApplicationDetailsResponse,
  ApplicationHistoryResponse,
  JobApplicationRequest,
  JobApplicationResponse,
  UpdateApplicationStatusRequest,
  UpdateApplicationStatusResponse,
} from "@/types/application";

export const applicationService = {
  // ============================================================
  // JOBSEEKER
  // APPLY FOR JOB
  //
  // POST /applications/jobs/{jobId}
  // ============================================================

  applyForJob(
    jobId: number | string,
    data: JobApplicationRequest,
  ): Promise<JobApplicationResponse> {
    return apiClient<JobApplicationResponse>(
      api.applications.apply(jobId),
      {
        method: "POST",
        data,
      },
    );
  },

  // ============================================================
  // JOBSEEKER
  // GET MY APPLICATIONS
  //
  // GET /applications/me
  // ============================================================

  getMyApplications(
    page = 0,
    size = 10,
  ): Promise<ApplicationHistoryResponse> {
    return apiClient<ApplicationHistoryResponse>(
      api.applications.me,
      {
        method: "GET",
        params: {
          page,
          size,
        },
      },
    );
  },

  // ============================================================
  // COMPANY
  // GET COMPANY APPLICATIONS
  //
  // GET /applications/company
  //
  // Example:
  // GET /applications/company?page=0&size=20
  // ============================================================

  getCompanyApplications(
    page = 0,
    size = 20,
  ): Promise<ApplicationHistoryResponse> {
    return apiClient<ApplicationHistoryResponse>(
      api.applications.company,
      {
        method: "GET",
        params: {
          page,
          size,
        },
      },
    );
  },

  // ============================================================
  // COMPANY
  // GET SINGLE APPLICATION
  //
  // GET /applications/company/{applicationId}
  //
  // Example:
  // GET /applications/company/1
  // ============================================================

  getCompanyApplicationById(
    applicationId: number | string,
  ): Promise<ApplicationDetailsResponse> {
    return apiClient<ApplicationDetailsResponse>(
      api.applications.companyById(applicationId),
      {
        method: "GET",
      },
    );
  },

  // ============================================================
  // COMPANY
  // UPDATE APPLICATION STATUS
  //
  // PATCH /applications/{applicationId}/status
  //
  // Body:
  // {
  //   "status": "SHORTLISTED"
  // }
  // ============================================================

  updateApplicationStatus(
    applicationId: number | string,
    data: UpdateApplicationStatusRequest,
  ): Promise<UpdateApplicationStatusResponse> {
    return apiClient<UpdateApplicationStatusResponse>(
      api.applications.updateStatus(applicationId),
      {
        method: "PATCH",
        data,
      },
    );
  },

  // ============================================================
  // JOBSEEKER
  // WITHDRAW APPLICATION
  //
  // PATCH /applications/me/{applicationId}/withdraw
  // ============================================================

  withdrawApplication(
    applicationId: number | string,
  ): Promise<JobApplicationResponse> {
    return apiClient<JobApplicationResponse>(
      api.applications.withdraw(applicationId),
      {
        method: "PATCH",
      },
    );
  },
};