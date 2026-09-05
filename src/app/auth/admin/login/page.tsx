
"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AdminLoginForm } from "@/components/admin/auth/AdminLoginForm";
import { routes } from "@/config/routes";
import { authStorage } from "@/lib/auth-storage";
import { authService } from "@/services/auth.service";

export default function AdminLoginPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleLogin = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const response =
        await authService.login({
          email: data.email,
          password: data.password,
        });

      /*
       * API login failed.
       */
      if (
        !response.success ||
        !response.data?.accessToken
      ) {
        const message =
          response.message ||
          "Login failed.";

        setError(message);
        toast.error(message);

        return;
      }

      /*
       * IMPORTANT:
       *
       * Admin login accepts ONLY ADMIN.
       *
       * COMPANY and JOB_SEEKER
       * are rejected.
       */
      if (
        response.data.role !== "ADMIN"
      ) {
        const message =
          "Access denied. Only administrators can access this portal.";

        setError(message);
        toast.error(message);

        /*
         * Do not store the token of
         * a non-admin user.
         */
        authStorage.clear();

        return;
      }

      /*
       * Save token + user + cookies.
       */
      authStorage.saveLogin(
        response.data,
      );

      toast.success(
        response.message ||
          "Admin login successful.",
      );

      /*
       * Go to admin dashboard.
       */
      router.replace(
        routes.admin.dashboard,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);

        return;
      }

      const message =
        "Unable to login. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to access the admin dashboard
          </p>
        </div>

        <AdminLoginForm
          onSubmit={handleLogin}
          loading={loading}
          error={error}
        />
      </div>
    </main>
  );
}