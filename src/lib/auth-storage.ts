
import Cookies from "js-cookie";

import type { LoginData } from "@/types/auth";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "authUser";

const ACCESS_TOKEN_COOKIE = "accessToken";
const ROLE_COOKIE = "role";

export const authStorage = {
  saveLogin(data: LoginData) {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(
      ACCESS_TOKEN_KEY,
      data.accessToken,
    );

    localStorage.setItem(
      REFRESH_TOKEN_KEY,
      data.refreshToken,
    );

    localStorage.setItem(
      USER_KEY,
      JSON.stringify({
        userId: data.userId,
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        tokenType: data.tokenType,
      }),
    );

    Cookies.set(
      ACCESS_TOKEN_COOKIE,
      data.accessToken,
      {
        expires: 1,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    );

    Cookies.set(
      ROLE_COOKIE,
      data.role,
      {
        expires: 1,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    );
  },

  getAccessToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(
      ACCESS_TOKEN_KEY,
    );
  },

  getRefreshToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(
      REFRESH_TOKEN_KEY,
    );
  },

  getUser() {
    if (typeof window === "undefined") {
      return null;
    }

    const user =
      localStorage.getItem(USER_KEY);

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user);
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  },

  getRole(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    const user = this.getUser();

    return user?.role ?? null;
  },

  clear() {
    if (typeof window === "undefined") {
      return;
    }

    /*
     * Remove browser storage.
     */
    localStorage.removeItem(
      ACCESS_TOKEN_KEY,
    );

    localStorage.removeItem(
      REFRESH_TOKEN_KEY,
    );

    localStorage.removeItem(
      USER_KEY,
    );

    /*
     * Remove authentication cookies.
     *
     * These are important because middleware
     * uses them to protect dashboard routes.
     */
    Cookies.remove(
      ACCESS_TOKEN_COOKIE,
      {
        path: "/",
      },
    );

    Cookies.remove(
      ROLE_COOKIE,
      {
        path: "/",
      },
    );
  },
};
