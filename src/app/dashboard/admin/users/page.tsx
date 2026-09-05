
"use client";

import {
  Loader2,
  RefreshCw,
} from "lucide-react";

import { AdminUserTable } from "@/components/admin/users/AdminUserTable";
import { useUsers } from "@/hooks/useUsers";

export default function AdminUsersPage() {
  const {
    users,
    loading,
    loadingMore,
    deletingUserId,
    error,
    hasMore,
    totalElements,
    loadMore,
    deleteUser,
    refetch,
  } = useUsers();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Manage Users
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage registered users.
          </p>
        </div>

        <button
          type="button"
          onClick={refetch}
          disabled={loading}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>
      </div>

      {/* ========================================================
          ERROR
      ======================================================== */}

      {error && users.length === 0 && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-700">
            {error}
          </p>

          <button
            type="button"
            onClick={refetch}
            className="mt-2 text-xs font-semibold text-red-700 underline underline-offset-2 hover:text-red-800"
          >
            Try again
          </button>
        </div>
      )}

      {/* ========================================================
          INITIAL LOADING
      ======================================================== */}

      {loading && users.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col items-center gap-3">
            <Loader2
              size={30}
              className="animate-spin text-slate-400"
            />

            <p className="text-sm font-medium text-slate-500">
              Loading users...
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* ======================================================
              TABLE
          ====================================================== */}

          <AdminUserTable
            users={users}
            onDelete={deleteUser}
            deletingUserId={
              deletingUserId
            }
          />

          {/* ======================================================
              LOAD MORE
          ====================================================== */}

          {users.length > 0 &&
            hasMore && (
              <div className="mt-6 flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadingMore ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />

                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </button>

                <p className="text-xs text-slate-400">
                  Showing {users.length}{" "}
                  of {totalElements} users
                </p>
              </div>
            )}

          {/* ======================================================
              ALL USERS LOADED
          ====================================================== */}

          {users.length > 0 &&
            !hasMore && (
              <div className="mt-6 text-center">
                <p className="text-xs font-medium text-slate-400">
                  Showing all{" "}
                  {users.length} users
                </p>
              </div>
            )}
        </>
      )}
    </main>
  );
}