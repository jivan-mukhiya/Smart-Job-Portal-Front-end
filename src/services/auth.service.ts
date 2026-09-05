import { api } from "@/config/api";
import { apiClient } from "@/lib/api-client";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";

export const authService = {
  /* =========================================================
     LOGIN
  ========================================================= */

  login(data: LoginRequest): Promise<LoginResponse> {
    return apiClient<LoginResponse>(api.auth.login, {
      method: "POST",
      data,
    });
  },

  /* =========================================================
     REGISTER
  ========================================================= */

  register(data: RegisterRequest): Promise<RegisterResponse> {
    return apiClient<RegisterResponse>(
      api.auth.register,
      {
        method: "POST",
        data,
      }
    );
  },
};