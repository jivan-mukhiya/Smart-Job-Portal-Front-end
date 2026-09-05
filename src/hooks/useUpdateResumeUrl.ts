"use client";

import {
  useState,
} from "react";

import { toast } from "sonner";

import { ApiError } from "@/lib/api-error";
import { jobSeekerService } from "@/services/jobseeker.service";

import type {
  UpdateResumeUrlResponse,
} from "@/types/resume";


interface UseUpdateResumeUrlReturn {

  updateResumeUrl: (
    resumeUrl: string
  ) => Promise<UpdateResumeUrlResponse | null>;

  loading: boolean;

  error: string | null;
}


export function useUpdateResumeUrl():
  UseUpdateResumeUrlReturn {

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);


  const updateResumeUrl =
    async (
      resumeUrl: string
    ): Promise<UpdateResumeUrlResponse | null> => {

      try {

        setLoading(true);

        setError(null);


        const response =
          await jobSeekerService
            .updateResumeUrl(
              resumeUrl
            );


        if (!response.success) {

          const message =
            response.message ||
            "Unable to update resume URL.";

          setError(message);

          toast.error(message);

          return null;
        }


        toast.success(
          response.message ||
          "Resume URL updated successfully."
        );


        return response;

      } catch (error: unknown) {

        let message =
          "Unable to update resume URL.";


        if (error instanceof ApiError) {

          message =
            error.message;

        } else if (
          error instanceof Error
        ) {

          message =
            error.message;
        }


        setError(message);

        toast.error(message);

        return null;

      } finally {

        setLoading(false);
      }
    };


  return {
    updateResumeUrl,
    loading,
    error,
  };
}