"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { jobSeekerService } from "@/services/jobseeker.service";

import type {
  JobSeekerProfile,
} from "@/types/jobseeker";

interface UseJobSeekerByIdReturn {
  profile: JobSeekerProfile | null;

  loading: boolean;

  error: string | null;

  refetch: () => Promise<void>;
}

export function useJobSeekerById(
  jobSeekerId: number | null | undefined,
): UseJobSeekerByIdReturn {
  const [profile, setProfile] =
    useState<JobSeekerProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const fetchProfile =
    useCallback(async () => {
      /* =======================================================
         VALIDATE ID
      ======================================================= */

      if (
        jobSeekerId === null ||
        jobSeekerId === undefined
      ) {
        setProfile(null);

        setError(
          "Job seeker ID is required.",
        );

        setLoading(false);

        return;
      }

      if (
        !Number.isInteger(jobSeekerId) ||
        jobSeekerId <= 0
      ) {
        setProfile(null);

        setError(
          "Invalid job seeker ID.",
        );

        setLoading(false);

        return;
      }

      /* =======================================================
         FETCH PROFILE
      ======================================================= */

      try {
        setLoading(true);

        setError(null);

        console.log(
          "[useJobSeekerById] loading:",
          jobSeekerId,
        );

        const response =
          await jobSeekerService.getById(
            jobSeekerId,
          );

        console.log(
          "[useJobSeekerById] response:",
          response,
        );

        if (!response.success) {
          setProfile(null);

          setError(
            response.message ||
              "Unable to load job seeker.",
          );

          return;
        }

        if (!response.data) {
          setProfile(null);

          setError(
            "Job seeker was not found.",
          );

          return;
        }

        setProfile(
          response.data,
        );
      } catch (err: any) {
        console.error(
          "[useJobSeekerById] error:",
          err,
        );

        const backendError =
          err?.response?.data ??
          err?.data ??
          err;

        const message =
          backendError?.message ??
          err?.message ??
          "Unable to load job seeker.";

        setProfile(null);

        setError(message);
      } finally {
        setLoading(false);
      }
    }, [jobSeekerId]);

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    void fetchProfile();
  }, [fetchProfile]);

  /* =========================================================
     RETURN
  ========================================================= */

  return {
    profile,

    loading,

    error,

    refetch: fetchProfile,
  };
}