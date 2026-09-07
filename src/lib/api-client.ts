import axios, {
  AxiosRequestConfig,
} from "axios";

import { env } from "@/config/env";

import {
  ApiError,
  ApiErrorResponse,
} from "@/lib/api-error";

import { authStorage } from "@/lib/auth-storage";


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
      config.url?.includes(
        "/auth/login"
      );


    const isRegisterRequest =
      config.url?.includes(
        "/auth/register"
      );


    if (
      token &&
      !isLoginRequest &&
      !isRegisterRequest
    ) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;

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


    return response.data;

  } catch (error: unknown) {

    /* =========================================================
       AXIOS ERROR
    ========================================================= */

    if (axios.isAxiosError(error)) {

      const responseData =
        error.response?.data as
          | ApiErrorResponse
          | undefined;


      /* =======================================================
         BACKEND ERROR RESPONSE
      ======================================================= */

      if (responseData) {

        const status =
          responseData.status ??
          error.response?.status ??
          500;


        const message =
          responseData.message ||
          responseData.error ||
          error.message ||
          "Something went wrong.";


        const code =
          responseData.code ||
          "UNKNOWN_ERROR";


        const errorCode =
          responseData.error ||
          responseData.code ||
          "UNKNOWN_ERROR";


        const errors =
          responseData.errors ||
          [];


        throw new ApiError(
          message,
          status,
          code,
          errorCode,
          errors,
          responseData.error,
          responseData.path,
          responseData.timestamp
        );

      }


      /* =======================================================
         NETWORK ERROR
      ======================================================= */

      if (!error.response) {

        throw new ApiError(
          "Unable to connect to the server. Please check your internet connection.",
          0,
          "NETWORK_ERROR",
          "NETWORK_ERROR",
          []
        );

      }


      /* =======================================================
         UNKNOWN HTTP ERROR
      ======================================================= */

      throw new ApiError(
        error.message ||
          "Something went wrong.",
        error.response.status,
        "UNKNOWN_ERROR",
        "UNKNOWN_ERROR",
        []
      );

    }


    /* =========================================================
       ALREADY ApiError
    ========================================================= */

    if (error instanceof ApiError) {

      throw error;

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
       UNKNOWN / FALLBACK ERROR
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