/* =========================================================
   FORMAT STATUS
========================================================= */

export function formatStatus(
  value:
    | string
    | null
    | undefined,
): string {
  if (!value) {
    return "Not provided";
  }

  return value
    .toLowerCase()
    .split("_")
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}

/* =========================================================
   FORMAT DATE
========================================================= */

export function formatDate(
  value:
    | string
    | null
    | undefined,
): string {
  if (!value) {
    return "Not available";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "Not available";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  ).format(date);
}

/* =========================================================
   FORMAT DATE TIME
========================================================= */

export function formatDateTime(
  value:
    | string
    | null
    | undefined,
): string {
  if (!value) {
    return "Not available";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "Not available";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    },
  ).format(date);
}

/* =========================================================
   FORMAT SALARY
========================================================= */

export function formatSalary(
  value: number,
  currency:
    | string
    | null
    | undefined,
): string {
  return `${
    currency ?? "NPR"
  } ${new Intl.NumberFormat(
    "en-US",
    {
      maximumFractionDigits: 0,
    },
  ).format(value)}`;
}

/* =========================================================
   FORMAT SALARY RANGE
========================================================= */

export function formatSalaryRange(
  min:
    | number
    | null
    | undefined,

  max:
    | number
    | null
    | undefined,

  currency:
    | string
    | null
    | undefined,
): string {
  if (
    min == null &&
    max == null
  ) {
    return "Not provided";
  }

  if (min == null) {
    return `Up to ${formatSalary(
      max!,
      currency,
    )}`;
  }

  if (max == null) {
    return `From ${formatSalary(
      min,
      currency,
    )}`;
  }

  return `${formatSalary(
    min,
    currency,
  )} - ${formatSalary(
    max,
    currency,
  )}`;
}