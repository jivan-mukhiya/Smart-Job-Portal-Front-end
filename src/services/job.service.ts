import { api } from "@/config/api";
import { apiClient } from "@/lib/api-client";

import type {
  JobMutationResponse,
  JobRequest,
  JobResponse,
  JobsPageData,
  MyJobsResponse,
  PublishedJobsResponse,
  RecommendedJobsResponse,
} from "@/types/job";

export const jobService = {
  // ============================================================
  // GET PUBLISHED JOBS
  // ============================================================

  getPublishedJobs(
    page: number = 0,
    size: number = 20,
    search?: string,
    location?: string,
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

          ...(location?.trim()
            ? {
                location: location.trim(),
              }
            : {}),
        },
      },
    );
  },

  // ============================================================
  // GET RECOMMENDED JOBS
  // ============================================================

  getRecommendedJobs(
    page: number = 0,
    size: number = 10,
    search?: string,
    location?: string,
  ): Promise<RecommendedJobsResponse> {
    return apiClient<RecommendedJobsResponse>(
      api.recommendations.jobs,
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

          ...(location?.trim()
            ? {
                location: location.trim(),
              }
            : {}),
        },
      },
    );
  },

  // ============================================================
  // GET MY JOBS
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