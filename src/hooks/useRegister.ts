"use client";

import { useState } from "react";
import { toast } from "sonner";

import { ApiError } from "@/lib/api-error";
import { authService } from "@/services/auth.service";

import type {
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";

interface UseRegisterReturn {
  register: (
    data: RegisterRequest
  ) => Promise<RegisterResponse | null>;

  loading: boolean;

  error: string | null;

  fieldErrors: Record<string, string>;

  success: string | null;
}

export function useRegister(): UseRegisterReturn {

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [fieldErrors, setFieldErrors] =
    useState<Record<string, string>>({});

  const [success, setSuccess] =
    useState<string | null>(null);

  const register = async (
    data: RegisterRequest
  ): Promise<RegisterResponse | null> => {

    try {

      setLoading(true);

      /*
       * Clear previous errors
       */
      setError(null);

      setFieldErrors({});

      setSuccess(null);

      /*
       * Call registration API
       */
      const response =
        await authService.register(data);

      /*
       * Success
       */
      const successMessage =
        response.message ||
        "Registration successful.";

      setSuccess(successMessage);

      toast.success(successMessage);

      return response;

    } catch (error: unknown) {

      /*
       * Backend returned ApiError
       */
      if (error instanceof ApiError) {

        /*
         * Convert:
         *
         * [
         *   {
         *     field: "password",
         *     message: "Password must be between 8 and 100 characters"
         *   }
         * ]
         *
         * into:
         *
         * {
         *   password:
         *     "Password must be between 8 and 100 characters"
         * }
         */

        const errors: Record<string, string> = {};

        error.errors.forEach(
          (validationError) => {

            errors[
              validationError.field
            ] = validationError.message;

          }
        );

        setFieldErrors(errors);

        /*
         * Field validation error
         */
        if (error.errors.length > 0) {

          /*
           * Don't show "Validation failed"
           * inside the general error box.
           */
          setError(null);

          toast.error(
            "Please correct the highlighted fields."
          );

        } else {

          /*
           * General backend error
           */
          setError(error.message);

          toast.error(error.message);
        }

      } else if (error instanceof Error) {

        /*
         * Normal JavaScript error
         */
        setError(error.message);

        toast.error(error.message);

      } else {

        /*
         * Unknown error
         */
        const message =
          "Registration failed.";

        setError(message);

        toast.error(message);
      }

      return null;

    } finally {

      setLoading(false);
    }
  };

  return {
    register,
    loading,
    error,
    fieldErrors,
    success,
  };
}