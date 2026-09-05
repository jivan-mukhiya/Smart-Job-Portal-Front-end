import { api } from "@/config/api";
import { apiClient } from "@/lib/api-client";

import type {
  JobSeekerProfileResponse,
} from "@/types/jobseeker";

import type {
  ResumeResponse,
  UpdateResumeUrlResponse,
} from "@/types/resume";


export const jobSeekerService = {

  /* =========================================================
     GET MY PROFILE
  ========================================================= */

  getMyProfile(): Promise<JobSeekerProfileResponse> {
    return apiClient<JobSeekerProfileResponse>(
      api.jobseekers.me,
      {
        method: "GET",
      }
    );
  },


  /* =========================================================
     CREATE JOB SEEKER PROFILE
  ========================================================= */

  createProfile(
    formData: FormData
  ): Promise<JobSeekerProfileResponse> {

    return apiClient<JobSeekerProfileResponse>(
      api.jobseekers.all,
      {
        method: "POST",
        data: formData,

        /*
         * Do NOT manually set:
         *
         * Content-Type: multipart/form-data
         *
         * Axios automatically generates:
         *
         * multipart/form-data; boundary=...
         */
      }
    );
  },


  /* =========================================================
     UPDATE MY JOB SEEKER PROFILE
  ========================================================= */

  updateMyProfile(
    formData: FormData
  ): Promise<JobSeekerProfileResponse> {

    return apiClient<JobSeekerProfileResponse>(
      api.jobseekers.me,
      {
        method: "PUT",
        data: formData,
      }
    );
  },


  /* =========================================================
     GET MY RESUME
  ========================================================= */

  getMyResume(): Promise<ResumeResponse> {

    return apiClient<ResumeResponse>(
      api.jobseekers.resume,
      {
        method: "GET",
      }
    );
  },


  /* =========================================================
     UPLOAD MY RESUME
  ========================================================= */

  updateResume(
    file: File
  ): Promise<JobSeekerProfileResponse> {

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    return apiClient<JobSeekerProfileResponse>(
      api.jobseekers.resume,
      {
        method: "PUT",
        data: formData,
      }
    );
  },


  /* =========================================================
     UPDATE MY RESUME URL
  ========================================================= */

  updateResumeUrl(
    resumeUrl: string
  ): Promise<UpdateResumeUrlResponse> {

    return apiClient<UpdateResumeUrlResponse>(
      api.jobseekers.resumeUrl,
      {
        method: "PUT",

        params: {
          resumeUrl,
        },
      }
    );
  },


  /* =========================================================
     REMOVE MY RESUME
  ========================================================= */

  removeResume(): Promise<void> {

    return apiClient<void>(
      api.jobseekers.resume,
      {
        method: "DELETE",
      }
    );
  },

};