
import type { CompanyStatus } from "@/types/admin-company";

interface AdminCompanyStatusBadgeProps {
  status: CompanyStatus;
}

const statusConfig: Record<
  CompanyStatus,
  {
    label: string;
    className: string;
  }
> = {
  PENDING: {
    label: "Pending",
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
  },

  APPROVED: {
    label: "Approved",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },

  REJECTED: {
    label: "Rejected",
    className:
      "border-red-200 bg-red-50 text-red-700",
  },

  SUSPENDED: {
    label: "Suspended",
    className:
      "border-slate-200 bg-slate-100 text-slate-700",
  },
};

export function AdminCompanyStatusBadge({
  status,
}: AdminCompanyStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
