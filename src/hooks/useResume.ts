"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import { ApiError } from "@/lib/api-error";
import { jobSeekerService } from "@/services/jobseeker.service";

import type {
  Resume,
} from "@/types/resume";


interface UseResumeReturn {
  resume: Resume | null;

  loading: boolean;

  uploading: boolean;

  error: string | null;

  refetch: () => Promise<void>;

  updateResume: (
    file: File,
  ) => Promise<void>;
}


export function useResume(): UseResumeReturn {

  const [resume, setResume] =
    useState<Resume | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);


  const loadResume = useCallback(
    async () => {

      try {

        setLoading(true);
        setError(null);

        const response =
          await jobSeekerService.getMyResume();

        if (!response.success) {

          const message =
            response.message ||
            "Unable to load resume.";

          setResume(null);
          setError(message);

          return;
        }

        const data =
          response.data;

        if (
          !data ||
          (
            data.id === null &&
            !data.resumeUrl &&
            !data.filePath &&
            !data.fileUrl
          )
        ) {

          setResume(null);

          return;
        }

        setResume(data);

      } catch (error: unknown) {

        let message =
          "Unable to load resume.";

        if (
          error instanceof ApiError
        ) {
          message = error.message;

        } else if (
          error instanceof Error
        ) {
          message = error.message;
        }

        setResume(null);
        setError(message);

        toast.error(message);

      } finally {

        setLoading(false);
      }

    },
    [],
  );


  useEffect(() => {

    loadResume();

  }, [loadResume]);


  const updateResume = async (
    file: File,
  ): Promise<void> => {

    try {

      setUploading(true);
      setError(null);

      const response =
        await jobSeekerService.updateResume(file);

      if (!response.success) {

        const message =
          response.message ||
          "Unable to update resume.";

        setError(message);

        toast.error(message);

        return;
      }

      toast.success(
        response.message ||
        "Resume updated successfully.",
      );

      await loadResume();

    } catch (error: unknown) {

      let message =
        "Unable to update resume.";

      if (
        error instanceof ApiError
      ) {
        message = error.message;

      } else if (
        error instanceof Error
      ) {
        message = error.message;
      }

      setError(message);

      toast.error(message);

    } finally {

      setUploading(false);
    }
  };


  const refetch = async (): Promise<void> => {
    await loadResume();
  };


  return {
    resume,
    loading,
    uploading,
    error,
    refetch,
    updateResume,
  };
}