
"use client";

import {
  Ban,
  Check,
  Eye,
  Loader2,
  X,
} from "lucide-react";

import Link from "next/link";

import {
  useState,
} from "react";

import { toast } from "sonner";

import { routes } from "@/config/routes";
import { ApiError } from "@/lib/api-error";
import { companyService } from "@/services/company.service";

import type {
  CompanyStatus,
} from "@/types/company";

interface AdminCompanyActionsProps {
  companyId: number;

  status: CompanyStatus;

  onStatusUpdated?: () => Promise<void> | void;
}

export function AdminCompanyActions({
  companyId,
  status,
  onStatusUpdated,
}: AdminCompanyActionsProps) {
  const [loadingStatus, setLoadingStatus] =
    useState<CompanyStatus | null>(null);

  const updateStatus = async (
    nextStatus: CompanyStatus,
  ) => {
    try {
      setLoadingStatus(nextStatus);

      const response =
        await companyService.updateCompanyStatus(
          companyId,
          nextStatus,
        );

      if (!response.success) {
        const message =
          response.message ||
          "Unable to update company status.";

        toast.error(message);

        return;
      }

      toast.success(
        response.message ||
          `Company status changed to ${nextStatus}.`,
      );

      /*
       * Refresh parent company list.
       */
      await onStatusUpdated?.();
    } catch (error: unknown) {
      let message =
        "Unable to update company status.";

      if (error instanceof ApiError) {
        message = error.message;
      } else if (
        error instanceof Error
      ) {
        message = error.message;
      }

      toast.error(message);
    } finally {
      setLoadingStatus(null);
    }
  };

  const isLoading =
    loadingStatus !== null;

  return (
    <div className="flex items-center gap-2">
      {/* =====================================================
          VIEW
      ====================================================== */}

      <Link
        href={routes.admin.companies.details(
          companyId,
        )}
        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
      >
        <Eye size={14} />

        View
      </Link>

      {/* =====================================================
          PENDING
      ====================================================== */}

      {status === "PENDING" && (
        <>
          <button
            type="button"
            disabled={isLoading}
            onClick={() =>
              updateStatus("APPROVED")
            }
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingStatus ===
            "APPROVED" ? (
              <Loader2
                size={14}
                className="animate-spin"
              />
            ) : (
              <Check size={14} />
            )}

            Approve
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={() =>
              updateStatus("REJECTED")
            }
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingStatus ===
            "REJECTED" ? (
              <Loader2
                size={14}
                className="animate-spin"
              />
            ) : (
              <X size={14} />
            )}

            Reject
          </button>
        </>
      )}

      {/* =====================================================
          APPROVED
      ====================================================== */}

      {status === "APPROVED" && (
        <button
          type="button"
          disabled={isLoading}
          onClick={() =>
            updateStatus("SUSPENDED")
          }
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loadingStatus ===
          "SUSPENDED" ? (
            <Loader2
              size={14}
              className="animate-spin"
            />
          ) : (
            <Ban size={14} />
          )}

          Suspend
        </button>
      )}

      {/* =====================================================
          REJECTED
      ====================================================== */}

      {status === "REJECTED" && (
        <button
          type="button"
          disabled={isLoading}
          onClick={() =>
            updateStatus("APPROVED")
          }
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loadingStatus ===
          "APPROVED" ? (
            <Loader2
              size={14}
              className="animate-spin"
            />
          ) : (
            <Check size={14} />
          )}

          Approve
        </button>
      )}

      {/* =====================================================
          SUSPENDED
      ====================================================== */}

      {status === "SUSPENDED" && (
        <button
          type="button"
          disabled={isLoading}
          onClick={() =>
            updateStatus("APPROVED")
          }
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loadingStatus ===
          "APPROVED" ? (
            <Loader2
              size={14}
              className="animate-spin"
            />
          ) : (
            <Check size={14} />
          )}

          Approve
        </button>
      )}
    </div>
  );
}
