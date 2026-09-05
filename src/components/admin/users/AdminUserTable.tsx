
"use client";

import {
  CalendarDays,
  Mail,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

import type { AdminUser } from "@/types/admin-user";

interface AdminUserTableProps {
  users: AdminUser[];
}

export function AdminUserTable({
  users,
}: AdminUserTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* ========================================================
          TABLE
      ======================================================== */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {/* USER */}

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                User
              </th>

              {/* EMAIL */}

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </th>

              {/* ROLE */}

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Role
              </th>

              {/* STATUS */}

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              {/* CREATED */}

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Created
              </th>

              {/* UPDATED */}

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Updated
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr
                key={user.id}
                className="transition hover:bg-slate-50"
              >
                {/* ==================================================
                    USER
                ================================================== */}

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-500">
                      {getInitial(user.fullName)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-950">
                        {user.fullName || "Unknown User"}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        ID: {user.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* ==================================================
                    EMAIL
                ================================================== */}

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Mail
                      size={14}
                      className="shrink-0 text-slate-400"
                    />

                    <span className="max-w-[220px] truncate text-sm text-slate-600">
                      {user.email || "—"}
                    </span>
                  </div>
                </td>

                {/* ==================================================
                    ROLE
                ================================================== */}

                <td className="px-5 py-4">
                  <UserRoleBadge role={user.role} />
                </td>

                {/* ==================================================
                    STATUS
                ================================================== */}

                <td className="px-5 py-4">
                  {user.active ? (
                    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                      Inactive
                    </span>
                  )}
                </td>

                {/* ==================================================
                    CREATED
                ================================================== */}

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={14}
                      className="shrink-0 text-slate-400"
                    />

                    <span className="text-sm text-slate-600">
                      {formatDate(user.createdAt)}
                    </span>
                  </div>
                </td>

                {/* ==================================================
                    UPDATED
                ================================================== */}

                <td className="px-5 py-4">
                  <span className="text-sm text-slate-600">
                    {formatDate(user.updatedAt)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ========================================================
          EMPTY STATE
      ======================================================== */}

      {users.length === 0 && (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <Users
              size={28}
              className="text-slate-300"
            />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-700">
            No users found
          </p>

          <p className="mt-1 text-xs text-slate-400">
            There are currently no users to display.
          </p>
        </div>
      )}

      {/* ========================================================
          FOOTER
      ======================================================== */}

      {users.length > 0 && (
        <div className="border-t border-slate-200 px-5 py-3">
          <p className="text-xs text-slate-400">
            Showing {users.length} users
          </p>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   ROLE BADGE
============================================================ */

function UserRoleBadge({
  role,
}: {
  role: AdminUser["role"];
}) {
  const config = {
    ADMIN: {
      label: "Admin",

      className:
        "border-purple-200 bg-purple-50 text-purple-700",

      icon: <ShieldCheck size={14} />,
    },

    COMPANY: {
      label: "Company",

      className:
        "border-blue-200 bg-blue-50 text-blue-700",

      icon: <Users size={14} />,
    },

    JOB_SEEKER: {
      label: "Job Seeker",

      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700",

      icon: <UserRound size={14} />,
    },
  }[role];

  if (!config) {
    return (
      <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-500">
        Unknown
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.icon}

      {config.label}
    </span>
  );
}

/* ============================================================
   INITIAL
============================================================ */

function getInitial(
  fullName: string | null | undefined,
) {
  if (!fullName?.trim()) {
    return "?";
  }

  return fullName
    .trim()
    .charAt(0)
    .toUpperCase();
}

/* ============================================================
   DATE FORMAT
============================================================ */

function formatDate(
  value: string | null | undefined,
) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      dateStyle: "medium",
    },
  ).format(date);
}