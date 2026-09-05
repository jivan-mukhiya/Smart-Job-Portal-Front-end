import type { UserRole } from "@/constants/roles";

/* =============================================================
   REGISTER
============================================================= */

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

/* =============================================================
   LOGIN
============================================================= */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginData {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  userId: number;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginData;
  timestamp?: string;
}