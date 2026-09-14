import axios, {
  AxiosRequestConfig,
} from "axios";

import { env } from "@/config/env";

import {
  ApiError,
  ApiErrorResponse,
} from "@/lib/api-error";

import { authStorage } from "@/lib/auth-storage";


/* =============================================================
   AXIOS INSTANCE
============================================================= */

const apiClientInstance = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
});


/* =============================================================
   JWT REQUEST INTERCEPTOR
============================================================= */

apiClientInstance.interceptors.request.use(
  (config) => {

    const token =
      authStorage.getAccessToken();

    const isLoginRequest =
      config.url?.includes("/auth/login");

    const isRegisterRequest =
      config.url?.includes("/auth/register");


    if (
      token &&
      !isLoginRequest &&
      !isRegisterRequest
    ) {

      config.headers =
        config.headers || {};

      config.headers.Authorization =
        `Bearer ${token}`;
    }


    /* =========================================================
       DEVELOPMENT DEBUG
    ========================================================= */

    if (process.env.NODE_ENV === "development") {

      console.log(
        "[API REQUEST]",
        {
          method: config.method,
          url: config.baseURL
            ? `${config.baseURL}${config.url}`
            : config.url,
          hasToken: Boolean(token),
        }
      );
    }


    return config;

  },
  (error) => {
    return Promise.reject(error);
  }
);


/* =============================================================
   API CLIENT
============================================================= */

export async function apiClient<T>(
  endpoint: string,
  options: AxiosRequestConfig = {}
): Promise<T> {

  try {

    const response =
      await apiClientInstance.request<T>({
        url: endpoint,
        ...options,
      });


    /* =========================================================
       DEVELOPMENT DEBUG
    ========================================================= */

    if (process.env.NODE_ENV === "development") {

      console.log(
        "[API RESPONSE]",
        {
          status: response.status,
          url: endpoint,
          data: response.data,
        }
      );
    }


    return response.data;

  } catch (error: unknown) {

    /* =========================================================
       ALREADY ApiError
    ========================================================= */

    if (error instanceof ApiError) {
      throw error;
    }


    /* =========================================================
       AXIOS ERROR
    ========================================================= */

    if (axios.isAxiosError(error)) {

      const responseData =
        error.response?.data;


      const status =
        error.response?.status ?? 0;


      /* =======================================================
         DEVELOPMENT DEBUG
      ======================================================= */

      if (process.env.NODE_ENV === "development") {

        console.error(
          "[API ERROR]",
          {
            endpoint,
            status,
            response: responseData,
            axiosMessage: error.message,
          }
        );
      }


      /* =======================================================
         NO RESPONSE = NETWORK ERROR
      ======================================================= */

      if (!error.response) {

        throw new ApiError(
          "Unable to connect to the server. Please check that the backend server is running.",
          0,
          "NETWORK_ERROR",
          "NETWORK_ERROR",
          []
        );
      }


      /* =======================================================
         BACKEND RESPONSE
      ======================================================= */

      if (
        responseData &&
        typeof responseData === "object"
      ) {

        const data =
          responseData as ApiErrorResponse & {
            detail?: string;
            title?: string;
            errorMessage?: string;
          };


        /* =====================================================
           GET BEST AVAILABLE MESSAGE
        ===================================================== */

        const message =
          data.message ||
          data.errorMessage ||
          data.detail ||
          (
            typeof data.error === "string"
              ? data.error
              : undefined
          ) ||
          error.message ||
          `Request failed with status ${status}.`;


        /* =====================================================
           ERROR CODE
        ===================================================== */

        const code =
          data.code ||
          (
            typeof data.error === "string"
              ? data.error
              : undefined
          ) ||
          "HTTP_ERROR";


        /* =====================================================
           ERROR NAME / TYPE
        ===================================================== */

        const errorCode =
          (
            typeof data.error === "string"
              ? data.error
              : undefined
          ) ||
          data.code ||
          "HTTP_ERROR";


        /* =====================================================
           VALIDATION ERRORS
        ===================================================== */

        const errors =
          Array.isArray(data.errors)
            ? data.errors
            : [];


        throw new ApiError(
          message,
          status,
          code,
          errorCode,
          errors,
          typeof data.error === "string"
            ? data.error
            : undefined,
          data.path,
          data.timestamp
        );
      }


      /* =======================================================
         STRING BACKEND RESPONSE
      ======================================================= */

      if (
        typeof responseData === "string" &&
        responseData.trim()
      ) {

        throw new ApiError(
          responseData,
          status,
          "HTTP_ERROR",
          "HTTP_ERROR",
          []
        );
      }


      /* =======================================================
         UNKNOWN HTTP ERROR
      ======================================================= */

      let message =
        error.message ||
        "Something went wrong.";


      if (status === 401) {

        message =
          "Your session has expired. Please login again.";

      } else if (status === 403) {

        message =
          "You do not have permission to access this resource.";

      } else if (status === 404) {

        message =
          "The requested resource was not found.";

      } else if (status >= 500) {

        message =
          "Server error. Please try again later.";
      }


      throw new ApiError(
        message,
        status,
        "HTTP_ERROR",
        "HTTP_ERROR",
        []
      );
    }


    /* =========================================================
       NORMAL JAVASCRIPT ERROR
    ========================================================= */

    if (error instanceof Error) {

      throw new ApiError(
        error.message ||
          "Something went wrong.",
        500,
        "CLIENT_ERROR",
        "CLIENT_ERROR",
        []
      );
    }


    /* =========================================================
       UNKNOWN ERROR
    ========================================================= */

    throw new ApiError(
      "Something went wrong. Please try again.",
      500,
      "UNKNOWN_ERROR",
      "UNKNOWN_ERROR",
      []
    );
  }
}


/* =============================================================
   EXPORT AXIOS INSTANCE
============================================================= */

export { apiClientInstance };