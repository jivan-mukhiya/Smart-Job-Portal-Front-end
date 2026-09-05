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

        throw new ApiError(

          responseData.message ||
            "Something went wrong.",

          responseData.status ||
            error.response?.status ||
            500,

          responseData.code ||
            "UNKNOWN_ERROR",

          responseData.error ||
            "UNKNOWN_ERROR",

          responseData.errors ||
            []

        );

      }


      /* =======================================================
         NETWORK ERROR
      ======================================================= */

      if (!error.response) {

        throw new ApiError(
          "Unable to connect to the server.",
          0,
          "NETWORK_ERROR",
          "NETWORK_ERROR"
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

        "UNKNOWN_ERROR"

      );

    }


    /* =========================================================
       NORMAL ERROR
    ========================================================= */

    if (error instanceof Error) {
      throw error;
    }


    /* =========================================================
       FALLBACK
    ========================================================= */

    throw new ApiError(
      "Something went wrong.",
      500,
      "UNKNOWN_ERROR",
      "UNKNOWN_ERROR"
    );

  }
}
