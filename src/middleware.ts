
import {
  NextRequest,
  NextResponse,
} from "next/server";

import { routes } from "@/config/routes";

export function middleware(
  request: NextRequest,
) {
  const { pathname } =
    request.nextUrl;

  /*
   * Read authentication data
   * from cookies.
   *
   * Middleware cannot read localStorage.
   */
  const accessToken =
    request.cookies.get(
      "accessToken",
    )?.value;

  const role =
    request.cookies.get(
      "role",
    )?.value;

  /*
   * ============================================================
   * ADMIN ROUTES
   * ============================================================
   *
   * Everything under:
   *
   * /dashboard/admin/*
   *
   * requires:
   *
   * 1. accessToken
   * 2. role === ADMIN
   */
  const isAdminRoute =
    pathname ===
      routes.admin.dashboard ||
    pathname.startsWith(
      "/dashboard/admin/",
    );

  if (isAdminRoute) {
    /*
     * No token -> admin login.
     */
    if (!accessToken) {
      const loginUrl =
        new URL(
          routes.auth.adminLogin,
          request.url,
        );

      return NextResponse.redirect(
        loginUrl,
      );
    }

    /*
     * Token exists but user is not ADMIN.
     *
     * COMPANY and JOB_SEEKER
     * cannot access admin routes.
     */
    if (role !== "ADMIN") {
      const loginUrl =
        new URL(
          routes.auth.adminLogin,
          request.url,
        );

      return NextResponse.redirect(
        loginUrl,
      );
    }

    return NextResponse.next();
  }

  /*
   * ============================================================
   * COMPANY ROUTES
   * ============================================================
   */
  const isCompanyRoute =
    pathname ===
      routes.company.dashboard ||
    pathname.startsWith(
      "/dashboard/company/",
    );

  if (isCompanyRoute) {
    /*
     * No token -> normal login.
     */
    if (!accessToken) {
      const loginUrl =
        new URL(
          routes.auth.login,
          request.url,
        );

      return NextResponse.redirect(
        loginUrl,
      );
    }

    /*
     * Only COMPANY can access
     * company dashboard.
     */
    if (role !== "COMPANY") {
      const loginUrl =
        new URL(
          routes.auth.login,
          request.url,
        );

      return NextResponse.redirect(
        loginUrl,
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/company/:path*",
  ],
};
