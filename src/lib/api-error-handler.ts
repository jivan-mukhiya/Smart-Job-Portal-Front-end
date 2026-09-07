import { ApiError, ValidationError } from "./api-error";

export interface ParsedApiError {
  message: string;
  status: number;
  code: string;
  errorCode: string;
  error?: string;
  path?: string;
  timestamp?: string;
  errors: ValidationError[];
  fieldErrors: Record<string, string>;
}

export function parseApiError(error: unknown): ParsedApiError {
  // =============================================================
  // ApiError
  // =============================================================

  if (error instanceof ApiError) {
    const fieldErrors: Record<string, string> = {};

    error.errors.forEach((item) => {
      if (item.field && item.message) {
        fieldErrors[item.field] = item.message;
      }
    });

    return {
      message:
        error.message ||
        error.error ||
        "Something went wrong. Please try again.",

      status: error.status || 500,

      code: error.code || "UNKNOWN_ERROR",

      errorCode: error.errorCode || "UNKNOWN_ERROR",

      error: error.error,

      path: error.path,

      timestamp: error.timestamp,

      errors: error.errors || [],

      fieldErrors,
    };
  }

  // =============================================================
  // Normal Error
  // =============================================================

  if (error instanceof Error) {
    return {
      message:
        error.message ||
        "Something went wrong. Please try again.",

      status: 500,

      code: "CLIENT_ERROR",

      errorCode: "CLIENT_ERROR",

      errors: [],

      fieldErrors: {},
    };
  }

  // =============================================================
  // String error
  // =============================================================

  if (typeof error === "string") {
    return {
      message: error,

      status: 500,

      code: "UNKNOWN_ERROR",

      errorCode: "UNKNOWN_ERROR",

      errors: [],

      fieldErrors: {},
    };
  }

  // =============================================================
  // Unknown object
  // =============================================================

  if (error && typeof error === "object") {
    const obj = error as Record<string, unknown>;

    const errors = Array.isArray(obj.errors)
      ? (obj.errors as ValidationError[])
      : [];

    const fieldErrors: Record<string, string> = {};

    errors.forEach((item) => {
      if (item?.field && item?.message) {
        fieldErrors[item.field] = item.message;
      }
    });

    return {
      message:
        typeof obj.message === "string"
          ? obj.message
          : typeof obj.error === "string"
            ? obj.error
            : "Something went wrong. Please try again.",

      status:
        typeof obj.status === "number"
          ? obj.status
          : 500,

      code:
        typeof obj.code === "string"
          ? obj.code
          : "UNKNOWN_ERROR",

      errorCode:
        typeof obj.errorCode === "string"
          ? obj.errorCode
          : typeof obj.code === "string"
            ? obj.code
            : "UNKNOWN_ERROR",

      error:
        typeof obj.error === "string"
          ? obj.error
          : undefined,

      path:
        typeof obj.path === "string"
          ? obj.path
          : undefined,

      timestamp:
        typeof obj.timestamp === "string"
          ? obj.timestamp
          : undefined,

      errors,

      fieldErrors,
    };
  }

  // =============================================================
  // Fallback
  // =============================================================

  return {
    message: "Something went wrong. Please try again.",

    status: 500,

    code: "UNKNOWN_ERROR",

    errorCode: "UNKNOWN_ERROR",

    errors: [],

    fieldErrors: {},
  };
}