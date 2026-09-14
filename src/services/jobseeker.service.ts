import { api } from "@/config/api";
import { apiClient } from "@/lib/api-client";

import type {
  JobSeekerProfileResponse,
  JobSeekerProfileImageResponse,
} from "@/types/jobseeker";

import type {
  ResumeResponse,
  UpdateResumeUrlResponse,
} from "@/types/resume";

export const jobSeekerService = {
  /* =========================================================
     GET MY PROFILE

     GET /job-seekers/me
  ========================================================= */

  getMyProfile(): Promise<JobSeekerProfileResponse> {
    return apiClient<JobSeekerProfileResponse>(
      api.jobseekers.me,
      {
        method: "GET",
      },
    );
  },

  /* =========================================================
     GET MY PROFILE IMAGE

     GET /job-seekers/me/profile-image

     Response:
     {
       success: true,
       message: "...",
       data: "http://localhost:9000/api/v1/files/uploads/...",
       timestamp: "..."
     }
  ========================================================= */

  getMyProfileImage(): Promise<JobSeekerProfileImageResponse> {
    return apiClient<JobSeekerProfileImageResponse>(
      api.jobseekers.profileImage,
      {
        method: "GET",
      },
    );
  },

  /* =========================================================
     GET JOB SEEKER BY ID

     GET /job-seekers/{jobSeekerId}

     Example:
     GET /job-seekers/4
  ========================================================= */

  getById(
    jobSeekerId: number | string,
  ): Promise<JobSeekerProfileResponse> {
    return apiClient<JobSeekerProfileResponse>(
      api.jobseekers.byId(jobSeekerId),
      {
        method: "GET",
      },
    );
  },

  /* =========================================================
     CREATE JOB SEEKER PROFILE

     POST /job-seekers
  ========================================================= */

  createProfile(
    formData: FormData,
  ): Promise<JobSeekerProfileResponse> {
    return apiClient<JobSeekerProfileResponse>(
      api.jobseekers.all,
      {
        method: "POST",
        data: formData,
      },
    );
  },

  /* =========================================================
     UPDATE MY JOB SEEKER PROFILE

     PUT /job-seekers/me
  ========================================================= */

  updateMyProfile(
    formData: FormData,
  ): Promise<JobSeekerProfileResponse> {
    return apiClient<JobSeekerProfileResponse>(
      api.jobseekers.me,
      {
        method: "PUT",
        data: formData,
      },
    );
  },

  /* =========================================================
     GET MY RESUME

     GET /job-seekers/me/resume
  ========================================================= */

  getMyResume(): Promise<ResumeResponse> {
    return apiClient<ResumeResponse>(
      api.jobseekers.resume,
      {
        method: "GET",
      },
    );
  },

  /* =========================================================
     UPLOAD / REPLACE MY RESUME

     PUT /job-seekers/me/resume
  ========================================================= */

  updateResume(
    file: File,
  ): Promise<ResumeResponse> {
    const formData = new FormData();

    formData.append(
      "file",
      file,
    );

    return apiClient<ResumeResponse>(
      api.jobseekers.resume,
      {
        method: "PUT",
        data: formData,
      },
    );
  },

  /* =========================================================
     UPDATE MY RESUME URL

     PUT /job-seekers/me/resume-url
  ========================================================= */

  updateResumeUrl(
    resumeUrl: string,
  ): Promise<UpdateResumeUrlResponse> {
    return apiClient<UpdateResumeUrlResponse>(
      api.jobseekers.resumeUrl,
      {
        method: "PUT",

        params: {
          resumeUrl,
        },
      },
    );
  },

  /* =========================================================
     REMOVE MY RESUME

     DELETE /job-seekers/me/resume
  ========================================================= */

  removeResume(): Promise<void> {
    return apiClient<void>(
      api.jobseekers.resume,
      {
        method: "DELETE",
      },
    );
  },
};