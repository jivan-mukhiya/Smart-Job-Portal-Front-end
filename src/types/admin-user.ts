
import type { UserRole } from "@/constants/roles";

/* ============================================================
   ADMIN USER
============================================================ */

export interface AdminUser {
  id: number;

  fullName: string;

  email: string;

  role: UserRole;

  active: boolean;

  createdAt: string;

  updatedAt: string;
}