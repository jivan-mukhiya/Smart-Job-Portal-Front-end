"use client";

import type { CompanyStatus } from "@/types/company";

interface AdminCompanyStatusBadgeProps {
  status: CompanyStatus;
}

export function AdminCompanyStatusBadge({
  status,
}: AdminCompanyStatusBadgeProps) {
  const styles: Record<
    CompanyStatus,
    string
  > = {
    PENDING:
      "bg-yellow-100 text-yellow-800",

    APPROVED:
      "bg-green-100 text-green-800",

    REJECTED:
      "bg-red-100 text-red-800",

    SUSPENDED:
      "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}