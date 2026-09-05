interface StatusBadgeProps {
  status?: string | null;
}

export function StatusBadge({
  status,
}: StatusBadgeProps) {
  const statusConfig: Record<
    string,
    {
      label: string;
      className: string;
    }
  > = {
    OPEN: {
      label: "Open",
      className:
        "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    },

    CLOSED: {
      label: "Closed",
      className:
        "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
    },

    PENDING: {
      label: "Pending",
      className:
        "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
    },

    ACTIVE: {
      label: "Active",
      className:
        "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    },

    INACTIVE: {
      label: "Inactive",
      className:
        "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200",
    },

    APPROVED: {
      label: "Approved",
      className:
        "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    },

    REJECTED: {
      label: "Rejected",
      className:
        "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
    },

    OPEN_TO_WORK: {
      label: "Open to Work",
      className:
        "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    },
  };


  const normalizedStatus =
    status?.toUpperCase() ?? "UNKNOWN";


  const item = statusConfig[normalizedStatus] ?? {
    label: status ?? "Unknown",
    className:
      "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200",
  };


  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-2.5
        py-1
        text-xs
        font-semibold
        ${item.className}
      `}
    >
      {item.label}
    </span>
  );
}