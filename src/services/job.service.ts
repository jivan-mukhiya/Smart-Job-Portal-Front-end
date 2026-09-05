// src/services/job.service.ts

import { api } from "@/config/api";
import { apiClient } from "@/lib/api-client";

import type {
  JobMutationResponse,
  JobRequest,
  JobResponse,
  JobsPageData,
  MyJobsResponse,
  PublishedJobsResponse,
} from "@/types/job";

export const jobService = {
  // ============================================================
  // GET PUBLISHED JOBS
  //
  // GET /jobs/published?page=0&size=20
  // GET /jobs/published?page=0&size=20&search=java
  // ============================================================

  getPublishedJobs(
    page: number = 0,
    size: number = 20,
    search?: string,
  ): Promise<PublishedJobsResponse> {
    return apiClient<PublishedJobsResponse>(
      api.jobs.published,
      {
        method: "GET",

        params: {
          page,
          size,

          ...(search?.trim()
            ? {
                search: search.trim(),
              }
            : {}),
        },
      },
    );
  },

  // ============================================================
  // GET MY JOBS
  //
  // GET /jobs/me?page=0&size=20
  // GET /jobs/me?page=0&size=20&search=java
  // ============================================================

  getMyJobs(
    page: number = 0,
    size: number = 20,
    search?: string,
  ): Promise<MyJobsResponse> {
    return apiClient<MyJobsResponse>(
      api.jobs.me,
      {
        method: "GET",

        params: {
          page,
          size,

          ...(search?.trim()
            ? {
                search: search.trim(),
              }
            : {}),
        },
      },
    );
  },

  // ============================================================
  // GET JOB BY ID
  //
  // GET /jobs/{jobId}
  // ============================================================

  getJobById(
    id: number | string,
  ): Promise<JobResponse> {
    return apiClient<JobResponse>(
      api.jobs.byId(id),
      {
        method: "GET",
      },
    );
  },

  // ============================================================
  // CREATE JOB
  //
  // POST /jobs
  // ============================================================

  createJob(
    data: JobRequest,
  ): Promise<JobMutationResponse> {
    return apiClient<JobMutationResponse>(
      api.jobs.all,
      {
        method: "POST",

        data,
      },
    );
  },

  // ============================================================
  // UPDATE JOB
  //
  // PUT /jobs/{jobId}
  // ============================================================

  updateJob(
    id: number | string,
    data: JobRequest,
  ): Promise<JobMutationResponse> {
    return apiClient<JobMutationResponse>(
      api.jobs.byId(id),
      {
        method: "PUT",

        data,
      },
    );
  },

  // ============================================================
  // DELETE JOB
  //
  // DELETE /jobs/{jobId}
  // ============================================================

  deleteJob(
    id: number | string,
  ): Promise<JobMutationResponse> {
    return apiClient<JobMutationResponse>(
      api.jobs.byId(id),
      {
        method: "DELETE",
      },
    );
  },

  // ============================================================
  // PUBLISH JOB
  //
  // PATCH /jobs/{jobId}/publish
  // ============================================================

  publishJob(
    id: number | string,
  ): Promise<JobMutationResponse> {
    return apiClient<JobMutationResponse>(
      api.jobs.publish(id),
      {
        method: "PATCH",
      },
    );
  },

  // ============================================================
  // CLOSE JOB
  //
  // PATCH /jobs/{jobId}/close
  // ============================================================

  closeJob(
    id: number | string,
  ): Promise<JobMutationResponse> {
    return apiClient<JobMutationResponse>(
      api.jobs.close(id),
      {
        method: "PATCH",
      },
    );
  },

  // ============================================================
  // CHANGE JOB STATUS
  //
  // PATCH /jobs/{jobId}/status?status={status}
  //
  // Example:
  // status = "ACTIVE"
  // status = "CLOSED"
  // status = "DRAFT"
  // ============================================================

  updateJobStatus(
    id: number | string,
    status: string,
  ): Promise<JobMutationResponse> {
    return apiClient<JobMutationResponse>(
      api.jobs.status(id),
      {
        method: "PATCH",

        params: {
          status,
        },
      },
    );
  },

  // ============================================================
  // GET JOBS BY COMPANY
  //
  // GET /jobs/company/{companyId}?page=0&size=20
  // ============================================================

  getJobsByCompany(
    companyId: number | string,
    page: number = 0,
    size: number = 20,
  ): Promise<{
    success: boolean;
    message: string;
    data: JobsPageData;
    timestamp?: string;
  }> {
    return apiClient(
      api.jobs.byCompany(companyId),
      {
        method: "GET",

        params: {
          page,
          size,
        },
      },
    );
  },
};