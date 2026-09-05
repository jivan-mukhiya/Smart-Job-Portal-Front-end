
"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import { ApiError } from "@/lib/api-error";
import { userService } from "@/services/user.service";

import type { User } from "@/types/user";

/* ============================================================
   CONSTANTS
============================================================ */

const PAGE_SIZE = 20;

/* ============================================================
   RETURN TYPE
============================================================ */

interface UseUsersReturn {
  users: User[];

  loading: boolean;

  loadingMore: boolean;

  deletingUserId: number | null;

  error: string | null;

  page: number;

  totalElements: number;

  totalPages: number;

  hasMore: boolean;

  loadMore: () => Promise<void>;

  deleteUser: (
    userId: number,
  ) => Promise<void>;

  refetch: () => Promise<void>;
}

/* ============================================================
   HOOK
============================================================ */

export function useUsers(): UseUsersReturn {
  const [users, setUsers] =
    useState<User[]>([]);

  const [page, setPage] =
    useState(0);

  const [totalElements, setTotalElements] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [deletingUserId, setDeletingUserId] =
    useState<number | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  /* ==========================================================
     LOAD FIRST PAGE

     GET /users?page=0&size=20
  ========================================================== */

  const loadFirstPage = useCallback(
    async () => {
      try {
        setLoading(true);

        setError(null);

        const response =
          await userService.getUsers(
            0,
            PAGE_SIZE,
          );

        if (!response.success) {
          throw new Error(
            response.message ||
              "Failed to load users.",
          );
        }

        const pageData =
          response.data;

        setUsers(
          pageData?.content ?? [],
        );

        setPage(
          pageData?.page ?? 0,
        );

        setTotalElements(
          pageData?.totalElements ?? 0,
        );

        setTotalPages(
          pageData?.totalPages ?? 0,
        );
      } catch (error: unknown) {
        let message =
          "Failed to load users.";

        if (error instanceof ApiError) {
          message = error.message;
        } else if (
          error instanceof Error
        ) {
          message = error.message;
        }

        setError(message);

        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  /* ==========================================================
     LOAD MORE

     page 0 = first 20
     page 1 = next 20
     page 2 = next 20

     Existing users are NOT replaced.
     New users are appended.
  ========================================================== */

  const loadMore = useCallback(
    async () => {
      if (loadingMore) {
        return;
      }

      if (
        totalPages > 0 &&
        page >= totalPages - 1
      ) {
        return;
      }

      try {
        setLoadingMore(true);

        setError(null);

        const nextPage =
          page + 1;

        const response =
          await userService.getUsers(
            nextPage,
            PAGE_SIZE,
          );

        if (!response.success) {
          throw new Error(
            response.message ||
              "Failed to load more users.",
          );
        }

        const pageData =
          response.data;

        const newUsers =
          pageData?.content ?? [];

        setUsers(
          (previousUsers) => [
            ...previousUsers,
            ...newUsers,
          ],
        );

        setPage(
          pageData?.page ?? nextPage,
        );

        setTotalElements(
          pageData?.totalElements ??
            totalElements,
        );

        setTotalPages(
          pageData?.totalPages ??
            totalPages,
        );
      } catch (error: unknown) {
        let message =
          "Failed to load more users.";

        if (error instanceof ApiError) {
          message = error.message;
        } else if (
          error instanceof Error
        ) {
          message = error.message;
        }

        setError(message);

        toast.error(message);
      } finally {
        setLoadingMore(false);
      }
    },
    [
      loadingMore,
      page,
      totalPages,
      totalElements,
    ],
  );

  /* ==========================================================
     DELETE USER

     DELETE /users/{id}
  ========================================================== */

  const deleteUser = useCallback(
    async (userId: number) => {
      try {
        setDeletingUserId(userId);

        setError(null);

        const response =
          await userService.deleteUser(
            userId,
          );

        if (!response.success) {
          throw new Error(
            response.message ||
              "Failed to delete user.",
          );
        }

        /*
         * Remove deleted user from
         * the currently displayed list.
         */

        setUsers(
          (previousUsers) =>
            previousUsers.filter(
              (user) =>
                user.id !== userId,
            ),
        );

        /*
         * Update total user count.
         */

        setTotalElements(
          (previousTotal) =>
            Math.max(
              0,
              previousTotal - 1,
            ),
        );

        toast.success(
          response.message ||
            "User deleted successfully.",
        );
      } catch (error: unknown) {
        let message =
          "Failed to delete user.";

        if (error instanceof ApiError) {
          message = error.message;
        } else if (
          error instanceof Error
        ) {
          message = error.message;
        }

        setError(message);

        toast.error(message);
      } finally {
        setDeletingUserId(null);
      }
    },
    [],
  );

  /* ==========================================================
     REFETCH

     Start again from page 0.
  ========================================================== */

  const refetch = useCallback(
    async () => {
      await loadFirstPage();
    },
    [loadFirstPage],
  );

  /* ==========================================================
     INITIAL LOAD
  ========================================================== */

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  /* ==========================================================
     HAS MORE
  ========================================================== */

  const hasMore =
    totalPages > 0 &&
    page < totalPages - 1;

  /* ==========================================================
     RETURN
  ========================================================== */

  return {
    users,

    loading,

    loadingMore,

    deletingUserId,

    error,

    page,

    totalElements,

    totalPages,

    hasMore,

    loadMore,

    deleteUser,

    refetch,
  };
}