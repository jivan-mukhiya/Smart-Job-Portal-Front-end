"use client";

import { useCallback, useEffect, useState } from "react";

import { jobSeekerService } from "@/services/jobseeker.service";

interface UseJobSeekerProfileImageOptions {
  enabled?: boolean;
}

export function useJobSeekerProfileImage(
  options: UseJobSeekerProfileImageOptions = {},
) {
  const {
    enabled = true,
  } = options;

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const fetchProfileImage = useCallback(async () => {
    if (!enabled) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response =
        await jobSeekerService.getMyProfileImage();

      setImageUrl(
        response.data ?? null,
      );
    } catch (err) {
      console.error(
        "Failed to fetch job seeker profile image:",
        err,
      );

      setImageUrl(null);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load profile image",
      );
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      setImageUrl(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    fetchProfileImage();
  }, [
    enabled,
    fetchProfileImage,
  ]);

  return {
    imageUrl,
    isLoading,
    error,
    refetch: fetchProfileImage,
  };
}