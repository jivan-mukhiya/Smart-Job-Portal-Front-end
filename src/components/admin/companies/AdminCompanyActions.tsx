"use client";

import {
  CheckCircle2,
  Eye,
  XCircle,
} from "lucide-react";

import { useState } from "react";

import { toast } from "sonner";

import { routes } from "@/config/routes";
import { ApiError } from "@/lib/api-error";
import { companyService } from "@/services/company.service";

import type { CompanyStatus } from "@/types/company";

interface AdminCompanyActionsProps {
  companyId: number;

  status: CompanyStatus;

  onStatusUpdated?: () => Promise<void>;
}

export function AdminCompanyActions({
  companyId,
  status,
  onStatusUpdated,
}: AdminCompanyActionsProps) {
  const [loading, setLoading] =
    useState(false);

  const updateStatus = async (
    nextStatus: CompanyStatus,
  ) => {
    try {
      setLoading(true);

      await companyService.updateCompanyStatus(
        companyId,
        nextStatus,
      );

      toast.success(
        `Company status updated to ${nextStatus}.`,
      );

      await onStatusUpdated?.();
    } catch (error: unknown) {
      let message =
        "Unable to update company status.";

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

  /*
   * ============================================================
   * VIEW
   * ============================================================
   *
   * IMPORTANT:
   * This uses the company ID.
   *
   * Example:
   * companyId = 5
   *
   * routes.companies.details(5)
   * -> /companies/5
   *
   * Keep this if your existing routes.companies.details()
   * is already correct and working.
   */

  const viewHref =
    routes.companies.details(companyId);

  return (
    <div className="flex items-center justify-end gap-2 whitespace-nowrap">
      {/* ========================================================
          VIEW
      ======================================================== */}

      <a
        href={viewHref}
        className="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
      >
        <Eye className="mr-1.5 h-4 w-4" />
        View
      </a>

      {/* ========================================================
          PENDING
          APPROVE / REJECT
      ======================================================== */}

      {status === "PENDING" && (
        <>
          <button
            type="button"
            disabled={loading}
            onClick={() =>
              void updateStatus("APPROVED")
            }
            className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCircle2 className="mr-1.5 h-4 w-4" />
            Approve
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              void updateStatus("REJECTED")
            }
            className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <XCircle className="mr-1.5 h-4 w-4" />
            Reject
          </button>
        </>
      )}

      {/* ========================================================
          APPROVED
          SUSPEND
      ======================================================== */}

      {status === "APPROVED" && (
        <button
          type="button"
          disabled={loading}
          onClick={() =>
            void updateStatus("SUSPENDED")
          }
          className="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Suspend
        </button>
      )}

      {/* ========================================================
          REJECTED
          APPROVE
      ======================================================== */}

      {status === "REJECTED" && (
        <button
          type="button"
          disabled={loading}
          onClick={() =>
            void updateStatus("APPROVED")
          }
          className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCircle2 className="mr-1.5 h-4 w-4" />
          Approve
        </button>
      )}

      {/* ========================================================
          SUSPENDED
          APPROVE
      ======================================================== */}

      {status === "SUSPENDED" && (
        <button
          type="button"
          disabled={loading}
          onClick={() =>
            void updateStatus("APPROVED")
          }
          className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCircle2 className="mr-1.5 h-4 w-4" />
          Approve
        </button>
      )}
    </div>
  );
}