
import { api } from "@/config/api";
import { apiClient } from "@/lib/api-client";

import type {
  UserResponse,
  UsersResponse,
} from "@/types/user";

/* ============================================================
   USER SERVICE
============================================================ */

export const userService = {
  /* ==========================================================
     GET USERS

     GET /api/v1/users?page=0&size=20
  ========================================================== */

  getUsers(
    page = 0,
    size = 20,
  ): Promise<UsersResponse> {
    return apiClient<UsersResponse>(
      api.users.all,
      {
        method: "GET",

        params: {
          page,
          size,
        },
      },
    );
  },

  /* ==========================================================
     GET USER BY ID

     GET /api/v1/users/{id}
  ========================================================== */

  getUserById(
    id: number | string,
  ): Promise<UserResponse> {
    return apiClient<UserResponse>(
      api.users.byId(id),
      {
        method: "GET",
      },
    );
  },

  /* ==========================================================
     DELETE USER

     DELETE /api/v1/users/{id}
  ========================================================== */

  deleteUser(
    id: number | string,
  ): Promise<UserResponse> {
    return apiClient<UserResponse>(
      api.users.delete(id),
      {
        method: "DELETE",
      },
    );
  },
};