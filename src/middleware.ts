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
 * JWT exp is stored in seconds.
 * Date.now() is in milliseconds.
 */
function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split(".");

    // JWT must contain:
    // header.payload.signature
    if (parts.length !== 3) {
      return true;
    }

    const payloadBase64 = parts[1];

    if (!payloadBase64) {
      return true;
    }

    const payload = JSON.parse(
      atob(
        payloadBase64
          .replace(/-/g, "+")
          .replace(/_/g, "/"),
      ),
    );

    // JWT must contain exp
    if (typeof payload.exp !== "number") {
      return true;
    }

    // Check expiration
    return payload.exp * 1000 <= Date.now();
  } catch {
    // Invalid JWT
    return true;
  }
}

/**
 * ============================================================
 * REDIRECT TO LOGIN
 * ============================================================
 */
function redirectToLogin(
  request: NextRequest,
  loginPath: string,
) {
  const loginUrl = new URL(
    loginPath,
    request.url,
  );

  /**
   * Preserve requested URL.
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

  /**
   * Remove invalid authentication cookies.
   */
  response.cookies.delete("accessToken");
  response.cookies.delete("role");

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
  const { pathname } = request.nextUrl;

  /**
   * ==========================================================
   * AUTH COOKIES
   * ==========================================================
   */
  const accessToken =
    request.cookies.get("accessToken")?.value;

  const role =
    request.cookies.get("role")?.value;

  /**
   * ==========================================================
   * PUBLIC JOB SEEKER PAGES
   * ==========================================================
   *
   * These pages MUST NOT require authentication.
   *
   * Public:
   *
   * /dashboard/jobseeker/jobs
   * /dashboard/jobseeker/jobs/1
   *
   * /dashboard/jobseeker/companies
   * /dashboard/jobseeker/companies/1
   *
   * This is the important fix.
   */

  const isPublicJobsRoute =
    pathname === routes.jobs.all ||
    pathname.startsWith(
      `${routes.jobs.all}/`,
    );

  const isPublicCompaniesRoute =
    pathname === routes.companies.all ||
    pathname.startsWith(
      `${routes.companies.all}/`,
    );

  /**
   * If the user is visiting a public job/company
   * page, allow access immediately.
   *
   * Do NOT check accessToken.
   * Do NOT check role.
   */
  if (
    isPublicJobsRoute ||
    isPublicCompaniesRoute
  ) {
    return NextResponse.next();
  }

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
   * Only ADMIN is allowed.
   */
  const isAdminRoute =
    pathname === routes.admin.dashboard ||
    pathname.startsWith(
      "/dashboard/admin/",
    );

  if (isAdminRoute) {
    /**
     * No token
     */
    if (!accessToken) {
      return redirectToLogin(
        request,
        routes.auth.adminLogin,
      );
    }

    /**
     * Expired token
     */
    if (isTokenExpired(accessToken)) {
      return redirectToLogin(
        request,
        routes.auth.adminLogin,
      );
    }

    /**
     * Wrong role
     */
    if (role !== "ADMIN") {
      return redirectToLogin(
        request,
        routes.auth.adminLogin,
      );
    }

    /**
     * ADMIN allowed
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
   * Only COMPANY is allowed.
   */
  const isCompanyRoute =
    pathname === routes.company.dashboard ||
    pathname.startsWith(
      "/dashboard/company/",
    );

  if (isCompanyRoute) {
    /**
     * No token
     */
    if (!accessToken) {
      return redirectToLogin(
        request,
        routes.auth.login,
      );
    }

    /**
     * Expired token
     */
    if (isTokenExpired(accessToken)) {
      return redirectToLogin(
        request,
        routes.auth.login,
      );
    }

    /**
     * Wrong role
     */
    if (role !== "COMPANY") {
      return redirectToLogin(
        request,
        routes.auth.login,
      );
    }

    /**
     * COMPANY allowed
     */
    return NextResponse.next();
  }

  /**
   * ==========================================================
   * JOB SEEKER PROTECTED ROUTES
   * ==========================================================
   *
   * Protected:
   *
   * /dashboard/jobseeker
   * /dashboard/jobseeker/profile
   * /dashboard/jobseeker/profile/edit
   * /dashboard/jobseeker/applications
   * /dashboard/jobseeker/applications/*
   *
   * Public job/company routes were already handled above,
   * so they will NOT reach this protection.
   */
  const isJobSeekerRoute =
    pathname === routes.jobseeker.dashboard ||
    pathname.startsWith(
      `${routes.jobseeker.dashboard}/`,
    );

  if (isJobSeekerRoute) {
    /**
     * No token
     */
    if (!accessToken) {
      return redirectToLogin(
        request,
        routes.auth.login,
      );
    }

    /**
     * Expired token
     */
    if (isTokenExpired(accessToken)) {
      return redirectToLogin(
        request,
        routes.auth.login,
      );
    }

    /**
     * Wrong role
     */
    if (role !== "JOB_SEEKER") {
      return redirectToLogin(
        request,
        routes.auth.login,
      );
    }

    /**
     * JOB_SEEKER allowed
     */
    return NextResponse.next();
  }

  /**
   * ==========================================================
   * EVERYTHING ELSE
   * ==========================================================
   *
   * Public routes are allowed.
   */
  return NextResponse.next();
}

/**
 * ============================================================
 * MIDDLEWARE MATCHER
 * ============================================================
 *
 * Middleware runs for dashboard routes.
 */
export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/company/:path*",
    "/dashboard/jobseeker/:path*",
  ],
};