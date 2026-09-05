"use client";

import {
  CircleX,
  Loader2,
  Send,
} from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";

import { ApiError } from "@/lib/api-error";
import { jobService } from "@/services/job.service";

import type { Job } from "@/types/job";

interface JobViewActionsProps {
  job: Job;
  onUpdated?: (job: Job) => void;
}

export function JobViewActions({
  job,
  onUpdated,
}: JobViewActionsProps) {
  const [loading, setLoading] =
    useState(false);

  const status =
    job.status?.toUpperCase() || "";

  const isPublished =
    status === "PUBLISHED" ||
    status === "ACTIVE";

  const isClosed =
    status === "CLOSED";

  const handlePublish = async () => {
    try {
      setLoading(true);

      const response =
        await jobService.publishJob(
          job.id,
        );

      if (!response.success) {
        throw new Error(
          response.message ||
            "Failed to publish job.",
        );
      }

      toast.success(
        response.message ||
          "Job published successfully.",
      );

      if (response.data) {
        onUpdated(response.data);
      }
    } catch (error: unknown) {
      let message =
        "Failed to publish job.";

      if (error instanceof ApiError) {
        message = error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = async () => {
    try {
      setLoading(true);

      const response =
        await jobService.closeJob(
          job.id,
        );

      if (!response.success) {
        throw new Error(
          response.message ||
            "Failed to close job.",
        );
      }

      toast.success(
        response.message ||
          "Job closed successfully.",
      );

      if (response.data) {
        onUpdated(response.data);
      }
    } catch (error: unknown) {
      let message =
        "Failed to close job.";

      if (error instanceof ApiError) {
        message = error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">
        Job Status
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Manage the current status of this job.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {/* PUBLISH */}

        {!isPublished && !isClosed && (
          <Button
            type="button"
            onClick={() => {
              void handlePublish();
            }}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}

            Publish Job
          </Button>
        )}

        {/* CLOSE */}

        {isPublished && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              void handleClose();
            }}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CircleX className="mr-2 h-4 w-4" />
            )}

            Close Job
          </Button>
        )}
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <p className="text-xs text-gray-500">
          Current status
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-900">
          {job.status || "Unknown"}
        </p>
      </div>
    </div>
  );
}