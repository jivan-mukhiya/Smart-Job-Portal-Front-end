
import {
  NextRequest,
  NextResponse,
} from "next/server";

import { routes } from "@/config/routes";

/**
 * ============================================================
 * CHECK JWT EXPIRATION
 * ============================================================
 *
 * JWT structure:
 *
 * header.payload.signature
 *
 * The expiration time (exp) is inside
 * the JWT payload.
 *
 * JWT exp = seconds
 * Date.now() = milliseconds
 */
function isTokenExpired(
  token: string,
): boolean {
  try {
    const parts = token.split(".");

    /*
     * A valid JWT must have:
     *
     * header.payload.signature
     */
    if (parts.length !== 3) {
      return true;
    }

    const payloadBase64 = parts[1];

    if (!payloadBase64) {
      return true;
    }

    /*
     * Convert Base64URL payload to JSON.
     */
    const payload = JSON.parse(
      atob(
        payloadBase64
          .replace(/-/g, "+")
          .replace(/_/g, "/"),
      ),
    );

    /*
     * JWT must contain exp.
     */
    if (
      typeof payload.exp !== "number"
    ) {
      return true;
    }

    /*
     * Check whether JWT has expired.
     */
    return (
      payload.exp * 1000 <= Date.now()
    );
  } catch {
    /*
     * If the JWT cannot be decoded,
     * treat it as invalid.
     */
    return true;
  }
}

/**
 * ============================================================
 * REDIRECT TO LOGIN
 * ============================================================
 *
 * This function:
 *
 * 1. Redirects user to login.
 * 2. Removes invalid authentication cookies.
 * 3. Keeps the original requested URL.
 */
function redirectToLogin(
  request: NextRequest,
  loginPath: string,
) {
  const loginUrl = new URL(
    loginPath,
    request.url,
  );

  /*
   * Preserve the page the user
   * originally wanted to visit.
   *
   * Example:
   *
   * /dashboard/company/jobs/10
   *
   * becomes:
   *
   * /auth/login?redirect=/dashboard/company/jobs/10
   */
  loginUrl.searchParams.set(
    "redirect",
    request.nextUrl.pathname +
      request.nextUrl.search,
  );

  const response =
    NextResponse.redirect(loginUrl);

  /*
   * Remove expired/invalid authentication
   * cookies.
   *
   * Middleware cannot remove localStorage.
   * localStorage will be cleared after
   * the frontend loads the login page.
   */
  response.cookies.delete(
    "accessToken",
  );

  response.cookies.delete(
    "role",
  );

  return response;
}

/**
 * ============================================================
 * MIDDLEWARE
 * ============================================================
 */
export function middleware(
  request: NextRequest,
) {
  const { pathname } =
    request.nextUrl;

  /*
   * Middleware can read cookies.
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

  /**
   * ==========================================================
   * ADMIN ROUTES
   * ==========================================================
   *
   * Protected:
   *
   * /dashboard/admin
   * /dashboard/admin/*
   *
   * Requirements:
   *
   * 1. accessToken must exist
   * 2. accessToken must not be expired
   * 3. role must be ADMIN
   */
  const isAdminRoute =
    pathname ===
      routes.admin.dashboard ||
    pathname.startsWith(
      "/dashboard/admin/",
    );

  if (isAdminRoute) {
    /*
     * No access token.
     */
    if (!accessToken) {
      return redirectToLogin(
        request,
        routes.auth.adminLogin,
      );
    }

    /*
     * Access token has expired.
     */
    if (
      isTokenExpired(accessToken)
    ) {
      return redirectToLogin(
        request,
        routes.auth.adminLogin,
      );
    }

    /*
     * Token exists and is valid,
     * but the user is not ADMIN.
     */
    if (role !== "ADMIN") {
      return redirectToLogin(
        request,
        routes.auth.adminLogin,
      );
    }

    /*
     * ADMIN is allowed.
     */
    return NextResponse.next();
  }

  /**
   * ==========================================================
   * COMPANY ROUTES
   * ==========================================================
   *
   * Protected:
   *
   * /dashboard/company
   * /dashboard/company/*
   *
   * Requirements:
   *
   * 1. accessToken must exist
   * 2. accessToken must not be expired
   * 3. role must be COMPANY
   */
  const isCompanyRoute =
    pathname ===
      routes.company.dashboard ||
    pathname.startsWith(
      "/dashboard/company/",
    );

  if (isCompanyRoute) {
    /*
     * No access token.
     */
    if (!accessToken) {
      return redirectToLogin(
        request,
        routes.auth.login,
      );
    }

    /*
     * Access token has expired.
     */
    if (
      isTokenExpired(accessToken)
    ) {
      return redirectToLogin(
        request,
        routes.auth.login,
      );
    }

    /*
     * Token exists and is valid,
     * but the user is not COMPANY.
     */
    if (role !== "COMPANY") {
      return redirectToLogin(
        request,
        routes.auth.login,
      );
    }

    /*
     * COMPANY is allowed.
     */
    return NextResponse.next();
  }

  /**
   * ==========================================================
   * JOB SEEKER ROUTES
   * ==========================================================
   *
   * Protected:
   *
   * /dashboard/jobseeker
   * /dashboard/jobseeker/*
   *
   * We intentionally use the path directly
   * instead of routes.jobSeeker.dashboard
   * because your routes configuration does
   * not contain routes.jobSeeker.
   *
   * Requirements:
   *
   * 1. accessToken must exist
   * 2. accessToken must not be expired
   * 3. role must be JOB_SEEKER
   */
  const isJobSeekerRoute =
    pathname ===
      "/dashboard/jobseeker" ||
    pathname.startsWith(
      "/dashboard/jobseeker/",
    );

  if (isJobSeekerRoute) {
    /*
     * No access token.
     */
    if (!accessToken) {
      return redirectToLogin(
        request,
        routes.auth.login,
      );
    }

    /*
     * Access token has expired.
     */
    if (
      isTokenExpired(accessToken)
    ) {
      return redirectToLogin(
        request,
        routes.auth.login,
      );
    }

    /*
     * Token exists and is valid,
     * but the user is not JOB_SEEKER.
     */
    if (role !== "JOB_SEEKER") {
      return redirectToLogin(
        request,
        routes.auth.login,
      );
    }

    /*
     * JOB_SEEKER is allowed.
     */
    return NextResponse.next();
  }

  /*
   * ==========================================================
   * PUBLIC ROUTES
   * ==========================================================
   *
   * Everything else is allowed.
   */
  return NextResponse.next();
}

/**
 * ============================================================
 * MIDDLEWARE MATCHER
 * ============================================================
 *
 * Middleware will run only for protected
 * dashboard routes.
 */
export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/company/:path*",
    "/dashboard/jobseeker/:path*",
  ],
};