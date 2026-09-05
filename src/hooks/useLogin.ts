"use client";

import { useState } from "react";
import { toast } from "sonner";

import { ApiError } from "@/lib/api-error";
import { authService } from "@/services/auth.service";

import type {
LoginRequest,
LoginResponse,
} from "@/types/auth";

export type LoginAccountType =
| "JOB_SEEKER"
| "COMPANY"
| "ADMIN";

interface UseLoginReturn {
login: (
data: LoginRequest,
accountType: LoginAccountType,
) => Promise<LoginResponse | null>;

loading: boolean;
error: string | null;
fieldErrors: Record<string, string>;
success: string | null;
}

export function useLogin(): UseLoginReturn {
const [loading, setLoading] = useState(false);

const [error, setError] =
useState<string | null>(null);

const [fieldErrors, setFieldErrors] =
useState<Record<string, string>>({});

const [success, setSuccess] =
useState<string | null>(null);

const login = async (
data: LoginRequest,
accountType: LoginAccountType,
): Promise<LoginResponse | null> => {
try {
setLoading(true);
setError(null);
setFieldErrors({});
setSuccess(null);

  const response =
    await authService.login(data);

  if (
    !response.success ||
    !response.data?.accessToken
  ) {
    const message =
      response.message ||
      "Login failed.";

    setError(message);
    toast.error(message);

    return null;
  }

  const backendRole =
    response.data.role;

  /*
   * ========================================================
   * ROLE VALIDATION
   * ========================================================
   */

  if (
    accountType === "JOB_SEEKER" &&
    backendRole !== "JOB_SEEKER"
  ) {
    const message =
      "This account is not registered as a Job Seeker.";

    setError(message);
    toast.error(message);

    return null;
  }

  if (
    accountType === "COMPANY" &&
    backendRole !== "COMPANY"
  ) {
    const message =
      "This account is not registered as a Company.";

    setError(message);
    toast.error(message);

    return null;
  }

  if (
    accountType === "ADMIN" &&
    backendRole !== "ADMIN"
  ) {
    const message =
      "This account does not have administrator access.";

    setError(message);
    toast.error(message);

    return null;
  }

  /*
   * ========================================================
   * SAVE AUTHENTICATION DATA
   * ========================================================
   */

  localStorage.setItem(
    "accessToken",
    response.data.accessToken,
  );

  localStorage.setItem(
    "refreshToken",
    response.data.refreshToken,
  );

  localStorage.setItem(
    "userId",
    String(response.data.userId),
  );

  localStorage.setItem(
    "fullName",
    response.data.fullName,
  );

  localStorage.setItem(
    "email",
    response.data.email,
  );

  localStorage.setItem(
    "role",
    response.data.role,
  );

  /*
   * ========================================================
   * SUCCESS
   * ========================================================
   */

  const successMessage =
    response.message ||
    "Login successful.";

  setSuccess(successMessage);
  toast.success(successMessage);

  return response;
} catch (error: unknown) {
  /*
   * ========================================================
   * API VALIDATION ERROR
   * ========================================================
   */

  if (error instanceof ApiError) {
    const errors: Record<string, string> = {};

    error.errors.forEach(
      (validationError) => {
        errors[validationError.field] =
          validationError.message;
      },
    );

    setFieldErrors(errors);

    if (error.errors.length > 0) {
      setError(null);

      toast.error(
        "Please correct the highlighted fields.",
      );

      return null;
    }

    setError(error.message);
    toast.error(error.message);

    return null;
  }

  /*
   * ========================================================
   * NORMAL ERROR
   * ========================================================
   */

  if (error instanceof Error) {
    setError(error.message);
    toast.error(error.message);

    return null;
  }

  /*
   * ========================================================
   * UNKNOWN ERROR
   * ========================================================
   */

  const message = "Login failed.";

  setError(message);
  toast.error(message);

  return null;
} finally {
  setLoading(false);
}

};

return {
login,
loading,
error,
fieldErrors,
success,
};
}
