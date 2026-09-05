
import type { UserRole } from "@/constants/roles";

/* ============================================================
   USER
============================================================ */

export interface User {
  id: number;

  fullName: string;

  email: string;

  role: UserRole;

  active: boolean;

  createdAt: string;

  updatedAt: string;
}

/* ============================================================
   SINGLE USER RESPONSE
============================================================ */

export interface UserResponse {
  success: boolean;

  message: string;

  data: User | null;

  timestamp?: string;
}

/* ============================================================
   USER PAGE DATA
============================================================ */

export interface UserPageData {
  content: User[];

  page: number;

  size: number;

  totalElements: number;

  totalPages: number;

  first: boolean;

  last: boolean;

  empty: boolean;
}

/* ============================================================
   USERS RESPONSE
============================================================ */

export interface UsersResponse {
  success: boolean;

  message: string;

  data: UserPageData;

  timestamp?: string;
}