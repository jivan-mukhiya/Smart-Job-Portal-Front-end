"use client";

import { useCallback, useEffect, useState } from "react";

import type { JobSeekerProfile } from "@/types/jobseeker";
import { jobSeekerService } from "@/services/jobseeker.service";

export function useJobSeekerProfile() {
  const [profile, setProfile] =
    useState<JobSeekerProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [profileNotFound, setProfileNotFound] =
    useState(false);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    setProfileNotFound(false);

    try {
      const response =
        await jobSeekerService.getMyProfile();

      setProfile(response.data);
    } catch (err: any) {
      /*
       * =======================================================
       * EXTRACT BACKEND ERROR
       * =======================================================
       */

      const backendError =
        err?.response?.data ??
        err?.data ??
        err;

      const status =
        backendError?.status ??
        err?.response?.status;

      const code =
        backendError?.code ??
        err?.code;

      const errorType =
        backendError?.error ??
        err?.error;

      const message =
        backendError?.message ??
        err?.message;

      /*
       * =======================================================
       * PROFILE DOES NOT EXIST
       * =======================================================
       */

      const isProfileNotFound =
        status === 404 ||
        code === "JOBSEEKER_001" ||
        code === "JOB_SEEKER_NOT_FOUND" ||
        errorType === "JOB_SEEKER_NOT_FOUND" ||
        message === "Job seeker not found";

      if (isProfileNotFound) {
        setProfile(null);
        setProfileNotFound(true);
        setError(null);

        return;
      }

      /*
       * =======================================================
       * OTHER ERROR
       * =======================================================
       */

      setProfile(null);
      setProfileNotFound(false);

      setError(
        message ||
          "Unable to load your profile."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    profileNotFound,
    refetch: fetchProfile,
  };
}